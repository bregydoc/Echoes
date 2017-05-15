/**
 * Created by Bregy Malpartida on 09/05/17.
 */

var synth;
var timeLine;

var currentPos = 0;

function setup() {
	createCanvas(1500, 800);

	synth = new Synth([width, height]);
	timeLine = new TravelLine(synth);

	synth.updateState();	

	//console.log(synth.xPositions);
}

function draw() {
	background(255);

	synth.draw();
	timeLine.draw(int(currentPos));
	currentPos = synth.updateState();	
	//timeLine.getCurrentPlay();
}

function mouseClicked() {
	synth.mouseClickHelper();
	
}

