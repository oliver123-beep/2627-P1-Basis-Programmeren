let dobbelsteen = 0
let timer = 0
let randomizing = false
let dobbelY = 0



function setup() {
  createCanvas(400, 400);
}

function draw() {
     background(220);
 
 if (randomizing == true && frameCount % 5 == 0) {
    dobbelsteen = floor(random(1,7))
 }

if (randomizing == true){
    timer = timer + deltaTime * 0.001;
}

if (timer >= 1.5) {
    randomizing = false
}
 //dobbelstenen 
   if (dobbelsteen == 1){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
  
  circle(190,290,15)
  }
   if (dobbelsteen == 2){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
 
  circle(170,270,15)
  circle(210,310,15)
  }
   if (dobbelsteen == 3){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
  
  circle(170,270,15)
  circle(190,290,15)
  circle(210,310,15)
  }
   if (dobbelsteen == 4){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
  
  circle(170,270,15)
  circle(210,310,15)
  circle(210, 270,15)
  circle(170,310,15)
  }
   if (dobbelsteen == 5){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
  
  circle(170,270,15)
  circle(210,310,15)
  circle(210, 270,15)
  circle(170,310,15)
  circle(190, 290,15)
  }
   if (dobbelsteen == 6){
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
 
  circle(170,270,15)
  circle(210,310,15)
  circle(210, 270,15)
  circle(170,310,15)
  circle(170, 290, 15)
  circle(210, 290, 15)
  }
  text(timer,20,40)
  text(dobbelsteen,20,20)
}
 function keyPressed(){
  if (keyCode === 32) {
    dobbelsteen = round(random(1.1,6.1))
    randomizing = true
    timer = 0
    
 }
}
