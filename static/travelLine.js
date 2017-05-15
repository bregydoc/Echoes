function TravelLine(synth) {
	this.currentValue = 0;
	this.synth = synth;

	this.draw = function (value) {

		if (typeof value !== 'undefined') {
			this.currentValue = value;
		}

		strokeWeight(4);
		stroke(230, 50, 1);

		//console.log(this.synth.xPositions[this.currentValue], 0, this.synth.xPositions[this.currentValue], this.synth.relativeHeight);

		line(this.synth.xPositions[this.currentValue], 0, this.synth.xPositions[this.currentValue], this.synth.relativeHeight);
		
	}

	this.getCurrentPlay = function () {
		var playing = [];
		var runner = 0;

		for (var i=0;i<12;i++) {
			var note = this.synth.notes[runner];
			//console.log(runner);	
			runner += (10 + this.currentValue);

		}
	}

}