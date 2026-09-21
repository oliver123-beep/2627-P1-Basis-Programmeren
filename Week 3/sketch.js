let vierkant1 = 0
let vierkant2 = 0
let vierkant3 = 0
let vierkant4 = 0
let vierkant5 = 0
let vierkant6 = 0
let vierkant7 = 0
let vierkant8 = 0
let vierkant9 = 0
let RedWin = false
let BlueWin = false
let speler1 = true
let speler2 = false


function setup() {
  createCanvas(400, 400)
}


function draw() {

  background(220)

  // Groot bord
  fill(0)
  rect(100, 100, 200, 200, 10)


  // VAKJE 1
  fill(255)
  if (mouseX > 110 && mouseX < 160 && mouseY > 110 && mouseY < 160){
    fill(200)
  }
  if (vierkant1 == 1) {
    fill(255, 0, 0)
  } else if (vierkant1 == 2) {
    fill(0, 0, 255)
  }
  rect(110, 110, 50, 50, 10)


  // VAKJE 2
  fill(255)
  if (mouseX > 175 && mouseX < 225 && mouseY > 110 && mouseY < 160){
    fill(200)
  }
  if (vierkant2 == 3) {
    fill(255, 0, 0)
  } else if (vierkant2 == 4) {
    fill(0, 0, 255)
  }
  rect(175, 110, 50, 50, 10)


  // VAKJE 3
  fill(255)
  if (mouseX > 240 && mouseX < 290 && mouseY > 110 && mouseY < 160){
    fill(200)
  }
  if (vierkant3 == 5) {
    fill(255, 0, 0)
  } else if (vierkant3 == 6) {
    fill(0, 0, 255)
  }
  rect(240, 110, 50, 50, 10)
 

  // VAKJE 4
  fill(255)
  if (mouseX > 110 && mouseX < 160 && mouseY > 175 && mouseY < 225){
    fill(200)
  }
  if (vierkant4 == 7) {
    fill(255, 0, 0)
  } else if (vierkant4 == 8) {
    fill(0, 0, 255)
  }
  rect(110, 175, 50, 50, 10)


  // VAKJE 5
  fill(255)
  if (mouseX > 175 && mouseX < 225 && mouseY > 175 && mouseY < 225){
    fill(200)
  }
  if (vierkant5 == 9) {
    fill(255, 0, 0)
  } else if (vierkant5 == 10) {
    fill(0, 0, 255)
  }
  rect(175, 175, 50, 50, 10)


  // VAKJE 6
  fill(255)
  if (mouseX > 240 && mouseX < 290 && mouseY > 175 && mouseY < 225){
    fill(200)
  }
  if (vierkant6 == 11) {
    fill(255, 0, 0)
  } else if (vierkant6 == 12) {
    fill(0, 0, 255)
  }
  rect(240, 175, 50, 50, 10)


  // VAKJE 7
  fill(255)
  if (mouseX > 110 && mouseX < 160 && mouseY > 240 && mouseY < 290){
    fill(200)
  }
  if (vierkant7 == 13) {
    fill(255, 0, 0)
  } else if (vierkant7 == 14) {
    fill(0, 0, 255)
  }
  rect(110, 240, 50, 50, 10)


  // VAKJE 8
  fill(255)
  if (mouseX > 175 && mouseX < 225 && mouseY > 240 && mouseY < 290){
    fill(200)
  }
  if (vierkant8 == 15) {
    fill(255, 0, 0)
  } else if (vierkant8 == 16) {
    fill(0, 0, 255)
  }
  rect(175, 240, 50, 50, 10)


  // VAKJE 9
  fill(255)
  if (mouseX > 240 && mouseX < 290 && mouseY > 240 && mouseY < 290){
    fill(200)
  }
  if (vierkant9 == 17) {
    fill(255, 0, 0)
  } else if (vierkant9 == 18) {
    fill(0, 0, 255)
  }
  rect(240, 240, 50, 50, 10)
//red wins
  if ((vierkant1 == 1 && vierkant2 == 3 && vierkant3 == 5)||(vierkant1 == 1 && vierkant4 == 7 && vierkant7 == 13)||(vierkant1 == 1 && vierkant5 == 9 && vierkant9 == 17)||(vierkant2 == 3 && vierkant5 == 9 && vierkant8 == 15)||(vierkant3 == 5 && vierkant6 == 11 && vierkant9 == 17)||(vierkant4 == 7 && vierkant5 == 9 && vierkant6 == 11)||(vierkant7 == 13 && vierkant8 == 15 && vierkant9 == 17)||(vierkant3 == 5 && vierkant5 == 9 && vierkant7 == 13))
    if (BlueWin == false)
 {
    fill(0)
    text("red wins",20,20)
    RedWin = true
  }
 //blue wins
  if ((vierkant1 == 2 && vierkant2 == 4 && vierkant3 == 6)||(vierkant1 == 2 && vierkant4 == 8 && vierkant7 == 14)||(vierkant1 == 2 && vierkant5 == 10 && vierkant9 == 18)||(vierkant2 == 4 && vierkant5 == 10 && vierkant8 == 16)||(vierkant3 == 6 && vierkant6 == 12 && vierkant9 == 18)||(vierkant4 == 8 && vierkant5 == 10 && vierkant6 == 12)||(vierkant7 == 14 && vierkant8 == 16 && vierkant9 == 18)||(vierkant3 == 6 && vierkant5 == 10 && vierkant7 == 14))
    if (RedWin == false) 
    {
    fill(0)
    textSize(32)
    text("blue wins",100,90)
    BlueWin = true
  }
}


// true = speler is aan de beurt
// speler 1 = rood
// speler 2 = blauw
//oneven getallen zijn rood 
//even gettalen zijn blauw

function mousePressed() {

  // VAKJE 1
  if (mouseX > 110 && mouseX < 160 && mouseY > 110 && mouseY < 160 && vierkant1 == 0 && speler1 == true) {

    vierkant1 = 1
    speler1 = false
    speler2 = true

  } else if (mouseX > 110 && mouseX < 160 && mouseY > 110 && mouseY < 160 && vierkant1 == 0 && speler1 == false) {

    vierkant1 = 2
    speler1 = true
    speler2 = false
  }


  // VAKJE 2
  if (mouseX > 175 && mouseX < 225 && mouseY > 110 && mouseY < 160 && vierkant2 == 0 && speler1 == true) {

    vierkant2 = 3
    speler1 = false
    speler2 = true

  } else if (mouseX > 175 && mouseX < 225 && mouseY > 110 && mouseY < 160 && vierkant2 == 0 && speler1 == false) {

    vierkant2 = 4
    speler1 = true
    speler2 = false
  }


  // VAKJE 3
  if (mouseX > 240 && mouseX < 290 && mouseY > 110 && mouseY < 160 && vierkant3 == 0 && speler1 == true) {

    vierkant3 = 5
    speler1 = false
    speler2 = true

  } else if (mouseX > 240 && mouseX < 290 && mouseY > 110 && mouseY < 160 && vierkant3 == 0 && speler1 == false) {

    vierkant3 = 6
    speler1 = true
    speler2 = false
  }


  // VAKJE 4
  if (mouseX > 110 && mouseX < 160 && mouseY > 175 && mouseY < 225 && vierkant4 == 0 && speler1 == true) {

    vierkant4 = 7
    speler1 = false
    speler2 = true

  } else if (mouseX > 110 && mouseX < 160 && mouseY > 175 && mouseY < 225 && vierkant4 == 0 && speler1 == false) {

    vierkant4 = 8
    speler1 = true
    speler2 = false
  }


  // VAKJE 5
  if (mouseX > 175 && mouseX < 225 && mouseY > 175 && mouseY < 225 && vierkant5 == 0 && speler1 == true) {

    vierkant5 = 9
    speler1 = false
    speler2 = true

  } else if (mouseX > 175 && mouseX < 225 && mouseY > 175 && mouseY < 225 && vierkant5 == 0 && speler1 == false) {

    vierkant5 = 10
    speler1 = true
    speler2 = false
  }


  // VAKJE 6
  if (mouseX > 240 && mouseX < 290 && mouseY > 175 && mouseY < 225 && vierkant6 == 0 && speler1 == true) {

    vierkant6 = 11
    speler1 = false
    speler2 = true

  } else if (mouseX > 240 && mouseX < 290 && mouseY > 175 && mouseY < 225 && vierkant6 == 0 && speler1 == false) {

    vierkant6 = 12
    speler1 = true
    speler2 = false
  }


  // VAKJE 7
  if (mouseX > 110 && mouseX < 160 && mouseY > 240 && mouseY < 290 && vierkant7 == 0 && speler1 == true) {

    vierkant7 = 13
    speler1 = false
    speler2 = true

  } else if (mouseX > 110 && mouseX < 160 && mouseY > 240 && mouseY < 290 && vierkant7 == 0 && speler1 == false) {

    vierkant7 = 14
    speler1 = true
    speler2 = false
  }


  // VAKJE 8
  if (mouseX > 175 && mouseX < 225 && mouseY > 240 && mouseY < 290 && vierkant8 == 0 && speler1 == true) {

    vierkant8 = 15
    speler1 = false
    speler2 = true

  } else if (mouseX > 175 && mouseX < 225 &&mouseY > 240 && mouseY < 290 && vierkant8 == 0 && speler1 == false) {

    vierkant8 = 16
    speler1 = true
    speler2 = false
  }


  // VAKJE 9
  if (mouseX > 240 && mouseX < 290 && mouseY > 240 && mouseY < 290 && vierkant9 == 0 && speler1 == true) {

    vierkant9 = 17
    speler1 = false
    speler2 = true

  } else if (mouseX > 240 && mouseX < 290 &&  mouseY > 240 && mouseY < 290 && vierkant9 == 0 && speler1 == false) {

    vierkant9 = 18
    speler1 = true
    speler2 = false
  }
}


function keyPressed() {

  if (keyCode == ENTER) {
    vierkant1 = 0
    vierkant2 = 0
    vierkant3 = 0
    vierkant4 = 0
    vierkant5 = 0
    vierkant6 = 0
    vierkant7 = 0
    vierkant8 = 0
    vierkant9 = 0
    
    speler1 = true
    speler2 = false
  }
}