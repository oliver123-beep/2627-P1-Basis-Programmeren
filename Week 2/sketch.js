// stoplicht 
let licht = 0; 
let zon = 0;
let wolk = 0;
let auto = 0;
let auto2 = 0
let auto3 = 0
let boom = 0;
let boom2 = 0
let autoY = 0
let stopunt = auto3 + 450







function setup() { 
  createCanvas(600, 400) 
  // Set angle mode to degrees
  angleMode(DEGREES);
  
} 
 
function draw() { 
  background(220) 
  text(frameCount, 20, 20)
  //lucht
  fill(0,100,255,100)
  rect(0,0,600,400)
  //zon
  fill(200,200,0,100)
  circle(zon,60,100)
  fill(200,200,0,200)
  circle(zon,60,70)
  fill(225,200,0,)
  circle(zon,60,50)
  zon = frameCount % width
   
  //maan
  fill(255,255,255)
  translate(width/2, height-100);
  rotate(frameCount );
  strokeWeight(5);
  circle(200,0,80)
  

 
//gras
  
  fill(0,255,0)
  rect(0,270,600,200)
  //weg
  fill(128,128,128)
  rect(0,310,600,80)
  fill(255,255,255)
  rect(0,335,200,20,10)
  rect(400,335,200,20,10)
  //bergen
  strokeWeight(3)
  fill(128,128,128)
  triangle(300,270,350,100,450,270)
  triangle(350,270,400,100,500,270)
  triangle(250,270,300,50,400,270)
  strokeWeight(0)
  
  //wolk
  //800 is het moment waar de wolken resetten
  wolk = frameCount % 800
  fill(255,255,255)
  //wolk 1
  circle(100 - wolk, 50, 50)
  circle(130 - wolk, 50, 70)
  circle(160 - wolk, 55, 50)
//wolk1 andere kant met + 800 x coordinaten 
  circle(900 - wolk, 50, 50)
  circle(930 - wolk, 50, 70)
  circle(960 - wolk, 55, 50)
   //wolk2
  circle(300 - wolk, 70, 50)
  circle(330 - wolk, 70, 70)
  circle(360 - wolk, 75, 50)

  circle(1100 - wolk, 70, 50)
  circle(1130 - wolk, 70, 70)
  circle(1160 - wolk, 75, 50)
  //wolk3
  circle(500 - wolk, 20, 50)
  circle(530 - wolk, 20, 70)
  circle(560 - wolk, 25, 50)

  circle(1300 - wolk, 20, 50)
  circle(1330 - wolk, 20, 70)
  circle(1360 - wolk, 25, 50)
  // stoplicht 
  strokeWeight(1)
  fill(128,128,128) 
  rect(425,75,50,150) 
 
  // rood 
  if (licht == 0) { 
    fill(255,0,0) 
  } else { 
    fill(80,0,0) 
  } 
  circle(450,100,30) 
 
  // oranje 
  if (licht == 2) { 
    fill(255,128,0) 
  } else { 
    fill(80,50,0) 
  } 
  circle(450,150,30) 
 
  // groen 
  if (licht == 1) { 
    fill(0,255,0) 
  } else { 
    fill(0,80,0)
  } 
  circle(450,200,30)
 
  // paal 
  fill(128,128,128) 
  rect(438,225,25,60)
 //auto's stoppen
  if (licht == 0 ){
    if (auto < 350 || auto > 400) {
      auto = auto + deltaTime * 0.5;} 
  }else if (licht == 2){
  auto = (auto + deltaTime * 0.1) % 680
  } else{
    auto = (auto + deltaTime * 0.5) % 680
  }
if (licht == 0 ){ 
  if (auto2 < 800 || auto2 > 900) {
    auto2 = auto2 + deltaTime * 0.5;}

  }else if (licht == 2){
  auto2 = (auto2 + deltaTime * 0.2) % 680
  } else{
    auto2 = (auto2 + deltaTime * 1) % 680
  }
if (licht == 0 ){
  if (auto3 < 500 || auto3 > 550){ 
    auto3 = auto3 + deltaTime * 0.5}
    if (auto3 > 750) {
      auto3 = 0
    }
  }else if (licht == 2){
  auto3 = (auto3 + deltaTime * 0.1) % 680
  } else{
    auto3 = (auto3 + deltaTime * 0.5) % 680
  }

text(auto2, 20, 40)
 

  //auto 
strokeWeight(1)

// auto rood
fill(255,0,0)
rect(auto, 300, 80, 50)
rect(auto + 80, 320, 30, 30)

// opnieuw links
if (auto > width) {
  auto = -80;
}

// rood auto wielen
fill(0,0,0)
circle(auto + 20,350,25)
circle(auto + 70,350,25)

// auto blauw
fill(0,0,255)
rect(auto3 + 400,300,80,50)
rect(auto3 + 480,320,30,30)

// blauw auto opnieuw links
rect(auto3 - 280,300,80,50)
rect(auto3 - 200,320,30,30)

// blauw auto wielen
fill(0,0,0)
circle(auto3 + 425,350,25)
circle(auto3 + 475,350,25)

circle(auto3 - 255,350,25)
circle(auto3 - 205,350,25)

  // auto groen
fill(0,255,0)
rect(auto2 + 250,320,80,50)
rect(auto2 + 330,340,30,30)

rect(auto2 - 430,320,80,50)
rect(auto2 - 350,340,30,30)

// groen auto wielen
fill(0,0,0)
circle(auto2 + 270,370,25)
circle(auto2 + 320,370,25)

circle(auto2 - 410,370,25)
circle(auto2 - 360,370,25)
  //boom 
  boom = 0 + Math .sin(frameCount * 0.1) * 3
  boom2 = 0 + Math .cos(frameCount * 0.1) * 3
 
 
  
  strokeWeight(0)
  fill(150, 75, 0,)
  rect(50,220,10,70)
  rect(300,220,10,70)
  rect(200,220,10,70)
  rect(100,325,10,70)
  fill(0,255,0,)
 
  circle(boom + 40,220,50)
  circle(boom + 300,220,50)
  circle(boom + 200,220,50)
  circle(boom + 100,325,50)
  fill(0,100,0)
  circle( 60 - boom2,220,50)
  circle(310 - boom2,220,50)
  circle(210 - boom2,220,50)
  circle(110 - boom2,325,50)

 
  
} 
 
//elke keer dat je op enter drukt gaat het licht een stap verder 
function keyPressed() { 
  if (keyCode == ENTER) { 
    licht = licht + 1 
 
    // als het licht groter is dan 2, dan wordt het weer 0 
    if (licht > 2) { 
      licht = 0 
    } 
  } 
} 
