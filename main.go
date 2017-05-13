package main

import (
	"honnef.co/go/js/dom"
	//"math"
	"time"
)

const height = 600
const width = 1500

const notes = 12
const maxtimes = 10


var intersectionX []int
var intersectionY []int

var hotPoints [][]int


func drawBackground(c *dom.HTMLCanvasElement) {
	canvas := c.GetContext2d()

	//canvas.BeginPath()
	canvas.FillStyle = "#cccccc"
	canvas.FillRect(0, 0, width, height)

	for i:=1;i<notes+1;i++ {
		canvas.BeginPath()
		canvas.LineWidth=2;
		canvas.StrokeStyle = "#11c1fa"
		canvas.MoveTo(0, i*(height/notes))
		canvas.LineTo(width, i*(height/notes))
		canvas.Stroke()

		intersectionY = append(intersectionY, i*(height/notes))
	}

	for i:=1;i<maxtimes+1;i++ {
		canvas.BeginPath()
		canvas.LineWidth=2;
		canvas.StrokeStyle = "red"
		canvas.MoveTo(i*(width/maxtimes), 0)
		canvas.LineTo(i*(width/maxtimes), height)
		canvas.Stroke()

		intersectionX = append(intersectionX, i*(width/maxtimes))

	}

	for x:=0;x<len(intersectionX)-1;x++ {
		for y:=0;y<len(intersectionY)-1;y++ {
			hotPoints = append(hotPoints, []int{intersectionX[x], intersectionY[y]})
		}
	}

	for _, point := range hotPoints {
		canvas.BeginPath()
		canvas.StrokeStyle = "#f03355"
		canvas.FillStyle = "#00ffaa"
		canvas.Arc(point[0], point[1], 10, 0, 360, false)
		canvas.Fill()

	}
}

func drawCursor(c *dom.HTMLCanvasElement, pos int) {
	canvas := c.GetContext2d()
	canvas.BeginPath()
	canvas.LineWidth=3;
	canvas.StrokeStyle = "orange"
	canvas.MoveTo(pos*(width/maxtimes), 0)
	canvas.LineTo(pos*(width/maxtimes), height)
	canvas.Stroke()

}

func main() {
	d := dom.GetWindow().Document()
	canvasHTML := d.GetElementByID("sequencer").(dom.HTMLElement)
	c := canvasHTML.(*dom.HTMLCanvasElement)



	go func() {
		i := 0
		for {
			drawCursor(c, i)
			time.Sleep(1)
			drawBackground(c)

			i++

			if i>9 {i=0}

		}
	}()

	//canvas.Fill()
}
/*
package main

import (
	p "github.com/bregydoc/PGoJs/Processing"
)

const width = 1500
const offsetWidth = 20

const height = 650


var intersectionsX []int
var intersectionsY []int

var activePoints [][]int

func drawBackground() {
	p.Background(230)

	for i:=0;i<13;i++ {
		if i!=0 {
			p.Stroke(100)
			p.Line(offsetWidth,i*50,width,i*50)
			intersectionsY = append(intersectionsY, i*50)
		}

	}

	for j:=0;j<10;j++ {
		if j!=0 {
			p.Stroke(100, 200, 150)
			p.Line(j*width/10, 0, j*width/10, height)
			intersectionsX = append(intersectionsX, j*width/10)
		}

	}

	for x:=0;x<len(intersectionsX);x++ {
		for y:=0;y<len(intersectionsY);y++ {
			activePoints = append(activePoints, []int{intersectionsX[x],intersectionsY[y]})
			//println(intersectionsX[x],intersectionsY[y])
		}
	}

	for _, point := range activePoints{
		p.Stroke(255,100,5)
		p.Fill(100,4,125)
		p.Ellipse(point[0], point[1], 10,10)
	}
}

func setup() {
	p.CreateCanvas(width + offsetWidth, height)
	drawBackground()
}

var velocity float64 = 0.05;

var count float64 = 0

const numOfSounds = 12

func draw() {

	lastCount := int(count)

	count = count + velocity

	p.Stroke(100, 100, 255)

	p.Line(activePoints[int(count*numOfSounds)][0], 0, activePoints[int(count*numOfSounds)][0], height)

	if int(count) - lastCount>0 {
		drawBackground()
	}

	if count > float64(len(activePoints)/numOfSounds-1){
		count = 0
	}


}

func main() {

	p.Setup = setup
	p.Draw = draw

	p.LaunchApp()
}


*/