
function Note(position, person, colorAcc) {
	this.x = position[0];
	this.y = position[1];

	this.radius = 30;
	this.offset = 8;

	this.state = false;

	this.numberOfUsers = 0;

	this.person = 0;

	this.backgroundColor = color(0xCC, 0xCC, 0xCC);
	this.selectColor = colorAcc;//color('#80deea');

	this.draw = function () {

		if (this.state==true) {
			noFill();
			ellipse(this.x, this.y, this.radius, this.radius)
			fill(this.selectColor);
			noStroke();
			ellipse(this.x, this.y, this.radius - this.offset, this.radius - this.offset)
		}else{
			noStroke();
			noFill();
			fill(this.backgroundColor);
			ellipse(this.x, this.y, this.radius, this.radius)
		}

		this.refreshCursor();
	}


	this.refreshCursor = function() {
		if (mouseX < this.x + this.radius/2 && mouseX > this.x - this.radius/2) {
			if (mouseY < this.y + this.radius/2 && mouseY > this.y - this.radius/2) {
				cursor(HAND);
			}else{
				cursor(ARROW);
			}

		}else{
			cursor(ARROW);

		}
	}


	this.verifyClick = function() {
		if (mouseX < this.x + this.radius/2 && mouseX > this.x - this.radius/2) {
			if (mouseY < this.y + this.radius/2 && mouseY > this.y - this.radius/2) {

				if (this.state == false) {
					this.state = true;
				}else{
					this.state = false;
				}
			}
		}
	}
}

