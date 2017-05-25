import pygame
import time
import threading
import rethinkdb as r

#      1 ... 6

TIME = 0.2
LENGTH_OF_MUSIC_LINE = 10


content = [[] for i in range(LENGTH_OF_MUSIC_LINE)]
#music = {"content": [[0], [0, 1], [0], [0, 1], [0], [0, 1], [1], [0, 2]]}
music = {"content": content}

pygame.mixer.pre_init(44100, -16, 2, 2048)

pygame.init()

sounds = {}




def playingLoop(music):
    # Cheap but working
    r.connect("localhost", 28015).repl()

    currentState = 0
    while True:
        count = 0
        print '---'
        for state in music['content']:
            print count, state
            for i in state:
                sounds[i].play()
            time.sleep(0.3)
            # Here, add the current cursor control

            r.db("echoes").table("music").update({"current": currentState}).run()
            currentState += 1
            if currentState > 9:
                currentState = 0
            print currentState
            count += 1



def dbDump(music):
    r.connect("localhost", 28015).repl()

    cursor = r.db("echoes").table("music").changes().run()

    for document in cursor:
        music['content'] = document['new_val']['content']
        print document['new_val']


#pygame.mixer.music.load()
for i in range(13):
    try:
        filename = 'sound' + str(i+1) + '.ogg'
        print 'Charging ' + filename + " ..."
        sounds[i] = pygame.mixer.Sound(filename)
    #sounds[3] = pygame.mixer.Sound("hihat2.wav")
    except Exception as e:
        print e
        continue


modifierDB = threading.Thread(target=dbDump, args=(music,))
loopT = threading.Thread(target=playingLoop, args=(music,))



loopT.start()
modifierDB.start()


