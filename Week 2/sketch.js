// stoplicht 
let stoplicht = 0; 
let zon = 0;
let maan = 0
let wolk = 0;
let auto = 0;
let auto2 = 0
let auto3 = 0
let boom = 0;
let boom2 = 0
let autoY = 0
let daynight = 0
let day = 0
let night = 0
let licht = 0
let toeter

function preload() {
  toeter = loadSound("https://cdn.pixabay.com/download/audio/2025/08/07/audio_bbccbeb8a8.mp3?filename=dragon-studio-car-honk-386166.mp3")
}




function setup() { 
  createCanvas(600, 400) 
 night = color(0,0,0)
 day = color(255,255,255)
} 
 
function draw() { 


if (zon < width ){

 if (zon < width / 2) {
      licht = map(zon, 0, width / 2, 0.3, 1)
    } else {
      licht = map(zon, width / 2, width, 1, 0.3)
    }

    daynight = lerpColor(night, day, licht)
  
}else {
  let licht

    if (maan < width / 2) {
      licht = map(maan, 0, width / 2, 0.3, 0)
    } else {
      licht = map(maan, width / 2, width, 0, 0.3)
    }

    daynight = lerpColor(night, day, licht)
}
   background(daynight) 
  
  

  //lucht
  fill(0,100,255,100)
  rect(0,0,600,400)
  //zon
if (zon < width){
  strokeWeight(0)
  fill(200,200,0,100)
  circle(zon,60,100)
  fill(200,200,0,200)
  circle(zon,60,70)
  fill(225,200,0,)
  circle(zon,60,50)
  }
  zon = frameCount % 1200 
  
  //maan
   if (zon >= width){
    strokeWeight(5)
    fill(200,200,200)
   circle(maan,60,80)
  }
   maan = (frameCount - 600) % 1200
   
 
//gras
  strokeWeight(0)
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
  if (stoplicht == 0) { 
    fill(255,0,0) 
  } else { 
    fill(80,0,0) 
  } 
  circle(450,100,30) 
 
  // oranje 
  if (stoplicht == 2) { 
    fill(255,128,0) 
  } else { 
    fill(80,50,0) 
  } 
  circle(450,150,30) 
 
  // groen 
  if (stoplicht == 1) { 
    fill(0,255,0) 
  } else { 
    fill(0,80,0)
  } 
  circle(450,200,30)
 
  // paal 
  fill(128,128,128) 
  rect(438,225,25,60)
 
  //auto's stoppen
  if (stoplicht == 0 ){
    if (auto < 350 || auto > 400) {
      auto = auto + deltaTime * 0.5;} 
  }else if (stoplicht == 2){
  auto = (auto + deltaTime * 0.1) % 680
  } else{
    auto = (auto + deltaTime * 0.5) % 680
  }
if (stoplicht == 0 ){ 
  if (auto2 < 800 || auto2 > 900) {
    auto2 = auto2 + deltaTime * 0.5;}
    if (auto3 > 750) {
      auto3 = 0
    }

  }else if (stoplicht == 2){
  auto2 = (auto2 + deltaTime * 0.2) % 680
  } else{
    auto2 = (auto2 + deltaTime * 1) % 680
  }
if (stoplicht == 0 ){
  if (auto3 < 500 || auto3 > 550){ 
    auto3 = auto3 + deltaTime * 0.5}
    if (auto3 > 750) {
      auto3 = 0
    }
  }else if (stoplicht == 2){
  auto3 = (auto3 + deltaTime * 0.1) % 680
  } else{
    auto3 = (auto3 + deltaTime * 0.5) % 680
  }


 

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
 
 
  //boomstam
  strokeWeight(0)
  fill(150, 75, 0,)
  rect(50,220,10,70)
  rect(300,220,10,70)
  rect(200,220,10,70)
  rect(100,325,10,70)
  fill(0,255,0,)
 //lichte bladeren
  circle(boom + 40,220,50)
  circle(boom + 300,220,50)
  circle(boom + 200,220,50)
  circle(boom + 100,325,50)
  //donkere bladeren
  fill(0,100,0)
  circle( 60 - boom2,220,50)
  circle(310 - boom2,220,50)
  circle(210 - boom2,220,50)
  circle(110 - boom2,325,50)

  
  
//text(frameCount, 20, 20)
  //text (auto, 20, 40)
  //text (auto2, 20, 60)
  //text (auto3, 20, 80)

  
} 
 
//elke keer dat je op enter drukt gaat het licht een stap verder 
function keyPressed() { 
  if (keyCode == ENTER) { 
    stoplicht = stoplicht + 1 
 
    // als het licht groter is dan 2, dan wordt het weer 0 
    if (stoplicht > 2) { 
      stoplicht = 0 
    } 
  } 
} 
//toeter
function mousePressed() {
  if (mouseX > auto && mouseX < auto + 110 &&
      mouseY > 300 && mouseY < 350){
   toeter.play();
    }
    if (mouseX > auto3 + 400 && mouseX < auto3 + 510 &&
      mouseY > 300 && mouseY < 350){
   toeter.play();
    }
    // blauwe auto links
  if (mouseX > auto3 - 280 && mouseX < auto3 - 170 && 
     mouseY > 300 && mouseY < 350) {
    toeter.play()
  }
  // groene auto rechts
  if (mouseX > auto2 + 250 &&
      mouseX < auto2 + 360 &&
      mouseY > 300 &&
      mouseY < 350) {
    toeter.play()
  }

  // groene auto links
  if (mouseX > auto2 - 430 &&
      mouseX < auto2 - 320 &&
      mouseY > 320 &&
      mouseY < 370) {
    toeter.play()
  }
}

