function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);

  for(let i = 0; i < 3; i++ ) {
     fill(0)
    circle( 20, 20 * i + 10,20)
  }
}
