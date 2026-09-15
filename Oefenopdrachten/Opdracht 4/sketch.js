let vierkant = false
let getal = 0
let licht = 0
let ballX = 400
let ballY = 100
function setup() {
  createCanvas(800, 400)
}

function draw() {
  background(220)
  fill(0,0,0)

  text("1. Houd B in om een blokje te laten verschijnen", 20, 20)
  text("2. Druk op spatie om het getal op 0 te zetten", 20,120)
  text("3. Druk op enter om van rood -> groen -> oranje te gaan",20,240)
  text("4. Beweeg de eightball met WASD of de pijltjestoetsen.",360,20)
  //als het vierkant true is, wordt het vierkant getekend
  if (vierkant == true) {
    strokeWeight(1)
    fill(255,255,255)
    rect(20, 30, 60, 60);
  }
  //getal + 1 
  fill(0,0,0)
  text(getal, 100, 160)
  getal += 1
  //reset getal bij 500
  if (getal >= 500) {
    getal = 0;
  }
  
  // stoplicht
strokeWeight(1)
fill(128,128,128)
rect(300,250,30,90)

// rood
if (licht == 0) {
  fill(255,0,0)
} else {
  fill(80,0,0)
}
circle(315,265,18)

// oranje
if (licht == 2) {
  fill(255,128,0)
} else {
  fill(80,50,0)
}
circle(315,295,18)

// groen
if (licht == 1) {
  fill(0,255,0)
} else {
  fill(0,80,0)
}
circle(315,325,18)

// paal
fill(128,128,128)
rect(310,340,10,30)

//8-ball
strokeWeight(15)
fill(255,255,255)
circle(ballX, ballY, 100)
fill(0,0,0)
text("8", ballX, ballY)

//zorgt ervoor dat de eightball aan de andere kant van het scherm verschijnt als hij buiten het scherm gaat
if (ballX > width  ) {
   ballX = 0
}
if (ballX < 0 ) {
   ballX = width
}
}
//wanneer de spatiebalk wordt ingedrukt, wordt het getal op 0 gezet
function keyPressed() { 
  if (keyCode == 32) {
    getal = 0;
  }
  //wanneer b wordt ingedrukt, verschijnt er een vierkant
  if (key == 'b' || key == 'B') {
    vierkant = true
  }
  if (keyCode == ENTER) {
   licht = licht + 1  
    if (licht > 2) { 
      licht = 0 }
  }
  //beweeg de eightball met de pijltjestoetsen en WASD
  if (keyCode == UP_ARROW) {
    ballY -= 10;
    console.log(keyCode)
  }
  if (keyCode == DOWN_ARROW) {
    ballY += 10;
  }
  if (keyCode == LEFT_ARROW) {
    ballX -= 10;
  }
  if (keyCode == RIGHT_ARROW) {
    ballX += 10;
  }
  if (key == 'w' || key == 'W') {
    ballY -= 10;
  }
  if (key == 's' || key == 'S') {
    ballY += 10;
  }
  if (key == 'a' || key == 'A') {
    ballX -= 10;
  }
  if (key == 'd' || key == 'D') {
    ballX += 10;
  }
}


//wanneer b wordt losgelaten, verdwijnt het vierkant
function keyReleased() {
  if (key == 'b' || key == 'B') {
    vierkant = false
  }
}