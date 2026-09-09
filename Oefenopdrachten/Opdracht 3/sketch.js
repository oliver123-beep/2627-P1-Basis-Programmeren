
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  // Naam
  fill(0,0,0)
  text ("Olivier de Witte",20,20)
  //vlag
  strokeWeight(0)
  fill(255,0,0)
  rect(20,30,100,25)
  fill(255,255,255)
  rect(20,50,100,25)
  fill(0,0,255)
  rect(20,70,100,25)
  // zwarte schaakbord stukken
  strokeWeight(2)
  fill(0,0,0)
  rect(20,100,25,25)
  rect(45,125,25,25)
  rect(70,100,25,25)
  rect(20,150,25,25)
  rect(70,150,25,25)
  // witte schaakbord stukken
  fill(255,255,255)
  rect(45,100,25,25)
  rect(20,125,25,25)
  rect(70,125,25,25)
  rect(45,150,25,25)
  // huisje
  strokeWeight(5)
  noFill()
  rect(20,220,50,50)
  line(20,220,45,180)
  line(70,220,45,180)
  //stoplicht
  strokeWeight(0)
  fill(128,128,128)
  rect(150,20,50,150)
  fill(255,0,0)
  circle(175,50,30)
  fill(255,128,0)
  circle(175,95,30)
  fill(0,255,0)
  circle(175,140,30)
  fill(128,128,128)
  rect(163,170,25,50)
  //dobblesteen
  fill(255,255,255)
  strokeWeight(5)
  rect(150,250,80,80,10)
  fill(0,0,0)
  circle(170,270,15)
  circle(190,290,15)
  circle(210,310,15)
  //mario
  strokeWeight(0)
  text("Mario",250,25)
  
  //rood
  fill(255,0,0)
  rect(275,30,35,5)
  rect(270,35,55,5)
  rect(260,70,60,35)
  rect(250,78,80,10)
  rect(245,88,90,10)
  //oranje
  fill(255,150,0)
  rect(270,40,35,20)
  rect(270,55,45,15)
  rect(305,45,15,15)
  rect(315,50,10,5)
  //bruin
  fill(150, 75, 0)
  rect(270,40,15,5)
  rect(275,45,5,10)
  rect(280,50,5,5)
  rect(265,45,5,15)
  rect(270,55,5,5)
  rect(250,125,25,15)
  rect(300,125,25,15)
  rect(300,125,5,5)
  //zwart
  fill(0,0,0)
  rect(305,40,5,12)
  rect(300,55,20,5)
  rect(310,50,5,5)
  //blauw
  fill(0,0,255)
  rect(275,70,5,20)
  rect(275,85,30,30)
  rect(300,75,5,15)
  rect(270,95,40,20)
  rect(260,110,20,15)
  rect(300,110,20,15)
  //geel
  fill(255,200,0)
  rect(275,95,5,5)
  rect(300,95,5,5)
  
  
 
}
