

function setup() {
  createCanvas(380, 350);
}

function draw() {
  background(220);
  text("1." ,20, 15);
  text("2.", 20, 100);
  text("3.", 20, 190);
  text("4.", 20, 250);
  text("5.", 120, 15);
  text("6.", 120, 100);
  text("7.", 120, 190);
  text("8.", 120, 280);
  text("9.", 240, 15);
  
let kleuren = [ "red", "green", "blue", "purple", "yellow"]
for ( let i = 0; i < kleuren.length; i++) {
  fill(kleuren[i])
  text((kleuren[i]),40, 10 + i * 20)
  fill(kleuren[i])
  text((kleuren[i]),40, 100 + i * 20)
}

}

