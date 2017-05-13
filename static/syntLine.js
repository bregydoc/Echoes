function Synth(size) {
	this.notes = [];

	this.numOfNotes = 12;
	this.numOfLineTimes = 10;

	this.horExpand = 100;
	this.verExpand = -50;

	this.horOffset = 100;
	this.verOffset = 100;

	this.relativeWidth = size[0];
	this.relativeHight = size[1];

	for (var i=0;i<this.numOfNotes;i++) {
		for (var j=0;j<this.numOfLineTimes;j++) {
			
			var colorA = color(100,j*255/this.numOfLineTimes, 100);
			
			var status = false; 
			
			if (i==6) {
				status =true; 
			}
			
			var kx = ((this.relativeWidth+this.horExpand)/this.numOfNotes);
			var ky = ((this.verExpand+this.relativeHight)/this.numOfNotes);

			var note = new Note([i*kx + this.horOffset, j*ky + this.verOffset], status, colorA);

			this.notes.push(note);
		}
	}	

	this.draw = function() {
		for (var i=0;i<this.notes.length;i++) {
			this.notes[i].draw();
		}		
	}

	this.mouseClickHelper = function() {
		for (var i=0;i<this.notes.length;i++) {
			this.notes[i].verifyClick();
		}
	}

}
