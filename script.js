let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);
function resize () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	i();
}
let mousedownID = -1;
function mousedown() {
	if (mousedownID != -1) {
		clearInterval(mousedownID);
	}
	mousedownID = setInterval(function() {
		if (velocity < 0.11) {
			velocity += 0.005;
		}
	}, 100);
}
function mouseup() {
   if (mousedownID != -1) {
		clearInterval(mousedownID);
	}
	mousedownID = setInterval(function() {
		if (velocity < 0.021) {
			clearInterval(mousedownID);
			mousedownID = -1;
		} else {
			velocity -= 0.005;
		}
	}, 100);
}
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
document.addEventListener("mouseout", mouseup);
let c = canvas.getContext("2d");
let ii = function (colour) {
	this.distX = (Math.random() * window.innerWidth / 8) + window.innerWidth / 8;
	this.minDistX = this.distX / 5 * 4;
	this.subDistX = this.distX / 5 * Math.random() + 1;
	this.distX = this.minDistX;
	this.distY = (Math.random() * window.innerHeight / 6) + window.innerHeight / 6
	this.minDistY = this.distY / 5 * 4;
	this.subDistY = this.distY / 5 * Math.random() + 1;
	this.distY = this.minDistY;
	this.radius = Math.round(Math.random() * 10) + 5;
	this.radians = Math.random() * Math.PI * 2;
	this.subRadians = Math.random() * Math.PI * 2;
	this.colour = colour;
	
	this.x = (window.innerWidth / 2 - this.radius / 2) + (Math.cos(this.radians) * this.distX) + (Math.sin(this.subRadians) * this.subDistX);
	this.y = (window.innerHeight / 2 - this.radius / 2) + (Math.sin(this.radians) * this.distY) + (Math.sin(this.subRadians) * this.subDistY);
	
	this.draw = function () {
		this.radians += velocity;
		this.subRadians += 0.005;
		this.x = (window.innerWidth / 2 - this.radius / 2) + (Math.cos(this.radians) * this.distX) + (Math.sin(this.subRadians) * this.subDistX);
		this.y = (window.innerHeight / 2 - this.radius / 2) + (Math.sin(this.radians) * this.distY) + (Math.sin(this.subRadians) * this.subDistY);
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.fillStyle = colour;
		c.fill();
	}
}
let velocity = 0.02;
let colours = ["#214191", "#90CBFF", "#F2F2F2"];
let iii = [];
function i() {
	iii = [];
	for (let i = 0; i < 200; i++) {
		iii.push(new ii(colours[Math.round(Math.random() * colours.length)]));
	}
}
function iv () {
	requestAnimationFrame(iv);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);
	c.fillStyle = "rgba(0,0,0,0.1)";
	c.fillRect(0, 0, window.innerWidth, window.innerHeight);
	for (let i in iii) {
		iii[i].draw();
	}
}
i();
iv();