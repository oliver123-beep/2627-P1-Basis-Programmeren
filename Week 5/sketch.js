let menu = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (menu == false){
    background(220)
  } else if (menu == true) {
    background(255,0,0);
    fill(0)
    rect (200,200,50,50)
  }
 

}

function mousePressed()
{
  if (mouseX < 200 && mouseX > 250 && mouseY < 200 && mouseY > 250)
  {
    menu = false;
    console.log("menu klikt")
  }
}