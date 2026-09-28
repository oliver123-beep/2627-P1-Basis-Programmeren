/*
By Okazz
*/ 
let colors = ['#fdfffc', '#235789', '#c1292e', '#f1d302', '#020100'];
let ctx;
let circles = [];
let motions = [];
let noiseFilter;

function setup() {
	createCanvas(900, 900);
	rectMode(CENTER);
	ctx = drawingContext;
	for (let i = 0; i < 10000; i++) {
		let d = width * random(0.05, 0.15);
		let x = (width/2) + (random(-0.35, 0.35) * (width - d/2));
		let y = (height/2) + (random(-0.35, 0.35) * (height - d/2));
		let newShape = { x: x, y: y, d: d };
		let overlap = false;
		for (let c of circles) {
			if (checkCircleCollision(newShape, c)) {
				overlap = true;
				break;
			}
		}
		if (!overlap) {
			circles.push({x:x, y:y, d:d});
		}
	}
	for(let c of circles){
		motions.push(new Motion(c.x, c.y, c.d));
	}

	noiseFilter = createImage(width, height);
	noiseFilter.loadPixels();
	let pix = noiseFilter.width * noiseFilter.height * 4;
	for (let i = 0; i < pix; i += 4) {
		let x = (i / 4) % noiseFilter.width;
		let y = floor(map(i, 0, pix, 0, noiseFilter.height));
		let alph = random(30);
		let c = noise(y * 0.08, x * 0.08) * 240;
		noiseFilter.pixels[i] = c;
		noiseFilter.pixels[i + 1] = c;
		noiseFilter.pixels[i + 2] = c;
		noiseFilter.pixels[i + 3] = alph;
	}
	noiseFilter.updatePixels();
}

function draw() {
	background(255);
		for(let m of motions){
			m.show();
			m.move();
		}
	image(noiseFilter, 0, 0);
}

function checkCircleCollision(a, b) {
	let distSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
	let radiusSum = (a.d / 2) + (b.d / 2);
	return distSq < radiusSum ** 2;
}

function easeOutCirc(x) {
	return sqrt(1 - Math.pow(x - 1, 2));
}

class Motion {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.d = d;
		this.n = int(random(4, 15));
		this.sw = d / this.n;
		this.te = int(random(200, 400));
		this.t = 0;
		this.circles = [];
		this.cols = [];
		shuffle(colors, true);
		for (let i = 0; i < this.n; i++) {
			this.cols.push(colors[i % colors.length]);
			this.circles.push(new Circle(0, 0, this.d * 1.1, -((this.te / this.n) * i) + this.te, this.te, this.cols[i]));
		}
		this.count = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		strokeWeight(0);
		stroke(0);
		noFill();
		circle(0, 0, this.d);
		drawingContext.clip();
		for (let i = 0; i < this.circles.length; i++) {
			let r = this.circles[i];
			r.show();
			r.move();
		}
		for (let i = 0; i < this.circles.length; i++) {
			let r = this.circles[i];

			if (r.isDead) {
				this.count++;
				this.circles.splice(i, 1);
				this.circles.push(new Circle(0, 0, this.d*1.1, 0, this.te, this.cols[this.count % this.cols.length]));
			}
		}
		pop();

	}
	move() {
		this.t++;
	}
}

class Circle {
	constructor(x, y, d, t0, t1, col) {
		let th = random(TAU);
		let r = random(0, 0.5) * d
		this.x0 = x + r * cos(th);
		this.x1 = x;
		this.y0 = y + r * sin(th)
		this.y1 = y;
		this.x = this.x0;
		this.y = this.y0;

		this.d = 0;
		this.d1 = d;
		this.t = t0;
		this.t1 = t1;
		this.isDead = false;
		this.col = col;

		
	}

	show() {
		noStroke();
		fill(this.col);
		circle(this.x, this.y, this.d);
	}   

	move() {
		if (0 < this.t && this.t < this.t1) {
			let n = norm(this.t, 0, this.t1 - 1);
			this.d = lerp(0, this.d1, easeOutCirc(n));
			this.x = lerp(this.x0, this.x1, easeOutCirc(n));
			this.y = lerp(this.y0, this.y1, easeOutCirc(n));
		}
		if (this.t > this.t1) {
			this.isDead = true;
		}

		this.t++;
	}
}