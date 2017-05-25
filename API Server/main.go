package main

import (
	"github.com/gin-gonic/gin"
	r "gopkg.in/gorethink/gorethink.v3"

	"log"
	"fmt"
	"net/http"
	_"encoding/json"
	"encoding/json"
)

var Session *r.Session

type Mixer struct {
	CurrentPlaying int `gorethink:"current"`
	CurrentState [][]int `gorethink:"content"`
}

func initRethinkDB(url string) {
	var err error
	Session, err = r.Connect(r.ConnectOpts{
		Address: url,
	})
	if err != nil { //Good :)
		log.Fatalln(err)
	}
}

func getCurrentState() *Mixer{
	cursor, err := r.DB("echoes").Table("music").Run(Session)

	if err != nil {
		log.Fatalln(err)
	}
	var result Mixer

	err = cursor.One(&result)

	if err != nil {
		log.Fatalln(err)
	}

	//fmt.Println(result)
	return &result
}

func setCurrentState(currState [][]int) {
	utilData := map[string][][]int{"content": currState}

	_, err := r.DB("echoes").Table("music").Update(utilData).Run(Session)
	if err != nil {
		log.Fatalln(err)
	}

}

func main() {

	initRethinkDB("localhost")

	//getCurrentState()

	router := gin.Default()

	router.GET("/echoes/api/mixer-current-state", func(c *gin.Context) {
		mixer := getCurrentState()
		c.JSON(http.StatusOK, mixer)
	})

	router.POST("/echoes/api/update-state", func(c *gin.Context) {
		receive := c.PostForm("content")

		//fmt.Println("Param",c.Param("content"))
		//fmt.Println("\nPostForm: ", receive, "\n")


		var content [][]int

		err := json.Unmarshal([]byte(receive), &content)

		if err != nil {
			log.Println(err)
			c.String(http.StatusBadRequest, err.Error())
		}

		fmt.Println(content)
		setCurrentState(content)

		data, _ := json.Marshal(content)
		c.String(http.StatusOK, string(data))

	})
	router.Run(":4600")



}
