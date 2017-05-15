function Synth(size) {
	this.notes = [];

	this.numOfNotes = 12;
	this.numOfLineTimes = 10;

	this.horExpand = -50;
	this.verExpand = -50;

	this.horOffset = 100;
	this.verOffset = 100;

	this.relativeWidth = size[0];
	this.relativeHeight = size[1];

	//console.log(this.relativeWidth, " - ", this.relativeHeight);

	this.xPositions = []

	this.colors = ['#33FFCA', '#06DE55', '#6BE306', '#ECFF00', '#FF3200', '#00FF00', '#00E4FF', '#DB56EE', '#56EEB2', '#8DCBFF', '#FC52FF', '#9152FF'];

	expander = 0;
	for (var i=0;i<this.numOfNotes;i++) {
		for (var j=0;j<this.numOfLineTimes;j++) {
			
			var colorA = color(60, 50+ (j*255/this.numOfLineTimes)+expander, 170);
			//var colorA = this.colors[j];
			var status = false; 
			
			//if (i==6) {
			//	status =true; 
			//}

			if (random() > 0.8) {
				status = true;
			}
			
			var kx = ((this.relativeWidth+this.horExpand)/this.numOfLineTimes);
			var ky = ((this.verExpand+this.relativeHeight)/this.numOfNotes);

			if (j==0) {
				this.xPositions.push(i*kx + this.horOffset);
			}

			var note = new Note([i*kx + this.horOffset, j*ky + this.verOffset], status, colorA);

			this.notes.push(note);
		}
	}	

	console.log(this.notes);
	//console.log(this.xPositions);
	this.updateState = function (){
		var ifAllOk = false;
		if (typeof MixerState == 'undefined') {
			console.log("Nothing")
		}else{

			if (typeof(MixerState.CurrentPlaying) != 'undefined') {
				//console.log("Returned...", MixerState.CurrentPlaying);
				ifAllOk = true;
			}

			//console.log(MixerState.CurrentState);
		}

		var finalState = [];
		for (var i=0;i<this.numOfLineTimes;i++) {
			var line = [];
			for (var j=0;j<10;j++) {
				if (this.notes[i*10 + j].state == true) {
					line.push(j);
				}
			}

			finalState.push(line);
 		}

 		//console.log(finalState);
		LocalState = finalState;
		if (ifAllOk==true) {
			return MixerState.CurrentPlaying;
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
