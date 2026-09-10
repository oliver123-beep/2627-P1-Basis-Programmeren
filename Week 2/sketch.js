// stoplicht 
let licht = 0; 
let zon = 500;
let wolk = 0;
let wolk2 = 0
let wolk3 = 0

function setup() { 
  createCanvas(600, 400); 
} 
 
function draw() { 
  background(220); 
  text(frameCount, 20, 20);
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
  wolk = frameCount % width
  
  fill(255,255,255)
  circle(100 - wolk, 50, 50)
  circle(130 - wolk, 50, 70)
  circle(160 - wolk, 55, 50)
   
  wolk2 = frameCount % width
  circle(300 - wolk2, 70, 50)
  circle(330 - wolk2, 70, 70)
  circle(360 - wolk2, 75, 50)
  wolk3 = frameCount % 310
  circle(500 - wolk3, 20, 50)
  circle(530 - wolk3, 20, 70)
  circle(560 - wolk3, 25, 50)
  
  // stoplicht 
  strokeWeight(1); 
  fill(128,128,128); 
  rect(425,75,50,150); 
 
  // rood 
  if (licht == 0) { 
    fill(255,0,0); 
  } else { 
    fill(80,0,0); 
  } 
  circle(450,100,30); 
 
  // oranje 
  if (licht == 2) { 
    fill(255,128,0); 
  } else { 
    fill(80,50,0); 
  } 
  circle(450,150,30); 
 
  // groen 
  if (licht == 1) { 
    fill(0,255,0); 
  } else { 
    fill(0,80,0); 
  } 
  circle(450,200,30); 
 
  // paal 
  fill(128,128,128); 
  rect(438,225,25,60); 
  //auto
  strokeWeight(1)
  //auto rood
  fill(255,0,0)
  rect(50,300,80,50)
  rect(130,320,30,30)
  //auto groen
  fill(0,255,0)
  rect(200,300,80,50)
  rect(280,320,30,30)
  //auto blauw
  fill(0,0,255)
  rect(400,300,80,50)
  rect(480,320,30,30)
  //wielen
  fill(0,0,0)
  //rood auto wielen
  circle(75,350,25)
  circle(125,350,25)
  //groen auto wielen
  circle(225,350,25)
  circle(275,350,25)
  //blauw auto wielen
  circle(425,350,25)
  circle(475,350,25)

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
    licht = licht + 1; 
 
    // als het licht groter is dan 2, dan wordt het weer 0 
    if (licht > 2) { 
      licht = 0; 
    } 
  } 
} 
