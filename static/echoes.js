/**
 * Created by Bregy Malpartida on 09/05/17.
 */

var synth;

function setup() {
	createCanvas(1000, 640);

	synth = new Synth([width, height]);

}

function draw() {
	synth.draw();
}

function mouseClicked() {
	synth.mouseClickHelper();
	
}

