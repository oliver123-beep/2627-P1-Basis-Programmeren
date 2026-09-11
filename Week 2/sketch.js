// stoplicht 
let licht = 0; 
let zon = 0;
let wolk = 0;
let auto = 0;



function setup() { 
  createCanvas(600, 400) 
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
  if (licht == 0){
  
  }
  //auto
  auto = frameCount % 680
strokeWeight(1)

// auto rood
fill(255,0,0)
rect(auto + 100, 300, 80, 50)
rect(auto + 180, 320, 30, 30)

// opnieuw links
fill(255,0,0)
rect(auto - 580, 300, 80, 50)
rect(auto - 500, 320, 30, 30)

// rood auto wielen
fill(0,0,0)
circle(auto + 120,350,25)
circle(auto + 170,350,25)

circle(auto - 560,350,25)
circle(auto - 510,350,25)

// auto groen
fill(0,255,0)
rect(auto + 250,320,80,50)
rect(auto + 330,340,30,30)

rect(auto - 430,320,80,50)
rect(auto - 350,340,30,30)

// groen auto wielen
fill(0,0,0)
circle(auto + 270,370,25)
circle(auto + 320,370,25)

circle(auto - 410,370,25)
circle(auto - 360,370,25)


// auto blauw
fill(0,0,255)
rect(auto + 400,300,80,50)
rect(auto + 480,320,30,30)

// blauw auto opnieuw links
rect(auto - 280,300,80,50)
rect(auto - 200,320,30,30)

// blauw auto wielen
fill(0,0,0)
circle(auto + 425,350,25)
circle(auto + 475,350,25)

circle(auto - 255,350,25)
circle(auto - 205,350,25)

  //boom
  strokeWeight(0)
  fill(150, 75, 0,)
  rect(50,220,10,70)
  rect(300,220,10,70)
  rect(200,220,10,70)
  rect(100,325,10,70)
  fill(0,255,0,)
  circle(50,220,50)
  circle(300,220,50)
  circle(200,220,50)
  circle(100,325,50)
  fill(0,100,0)
  circle(60,220,50)
  circle(310,220,50)
  circle(210,220,50)
  circle(110,325,50)
  

  
  
  
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
