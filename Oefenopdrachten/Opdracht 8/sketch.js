let totaal = optellen(1, 2)
let totaalD = delen(5,2)
let totaalV = vermenigvuldigen(2,3)
let totaalM = aftrekken(2,1)
function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  tekenHuis(0, 300, 50);
  tekenHuis(150, 300, 50);
  tekenHuis(300, 300, 50);
  tekenHuis(450, 300, 50);
  tekenHuis(600, 300, 50);
  cirkel(50,50,50)
  rechthoek(100,50,50,100)
  lijn( 250, 50, 300, 50)
  hello("hello",350, 50,32, "blue")
  text( totaal , 450, 50)
  text( totaalD, 475, 50)
  text(totaalV, 500,50)
  text(totaalM, 525,50)
  
}

function tekenHuis(x, y, grootte) {
  rect(x + 40, y, grootte, grootte);

  triangle(x + 40, y, x + 65, y - 40, x + 90, y);

  rect(x + 45, y + 5, 20, 20);
  rect(x + 70, y + 20, 20, 30);

  return;
}

function cirkel (xC, yC, sC) {
circle(xC,yC,sC);
return;
}
//breedte en lengte veranderen in functie verandert het ook in draw
function rechthoek (xR, yR, bR,lR){
  rect(xR,yR,lR,bR);
  return;
}
function lijn (xL, yL, xxL, yyL){
line(xL, yL, xxL, yyL);
return;
}
function hello (tekst,xT, yT, grootte,kleur){
  push();
fill(kleur)
textSize(grootte)
text(tekst,xT,yT)
  pop()
}
function optellen (a,b){
  return a + b; 
}
function delen (a,b){
  return a/b;
}
function vermenigvuldigen ( a,b){
  return a*b;
}
function aftrekken(a,b){
  return a - b;
}

