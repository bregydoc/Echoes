/**
 * Created by Bregy Malpartida on 09/05/17.
 */

var notes = [];
var numOfNotes = 12;
var numOfLineTimes = 10;

var horExpand = 100;
var verExpand = -50;

var horOffset = 100;
var verOffset = 100;

function setup() {
	createCanvas(1000, 640);

	for (var i=0;i<numOfNotes;i++) {
		for (var j=0;j<numOfLineTimes;j++) {
			var colorA = color(50,j*255/numOfLineTimes, 150);
			note  = new Note([i*((width+horExpand)/numOfNotes) + horOffset, j*((verExpand+height)/numOfNotes) + verOffset], 0, colorA);
			notes.push(note);
		}
	}	
}

function draw() {
	for (var i=0;i<notes.length;i++) {
		notes[i].draw();
	}		
}

function mouseClicked() {
	for (var i=0;i<notes.length;i++) {
		notes[i].verifyClick();
	}
	
}

