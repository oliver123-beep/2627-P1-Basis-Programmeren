let achtergrond = 0;
let honger = 100;
let energie = 100;
let geluk = 100;
let gezondheid = 100;
let statsMenuKnop = false;
let roxasIntroStart = true;
let opnieuwKnop

function preload() {
  stairs = loadImage("background.gif");
  balcon = loadImage("achtergrond.jpg");
  Roxas1 = loadImage("RoxasHood.gif");
  statsMenu = loadImage("—Pngtree— vector icon_3791388 - kopie.png");
  RoxasIntro = loadImage("RoxasIntro2.gif")
  RoxasDead = loadImage("roxasDead.gif")
  font = loadFont("KHMenu-Bold.otf")
  SeaSaltIceCream = loadImage("Sea-Salt_Ice_Cream_29_KHII.webp")
}

function setup() {
 let canvas = createCanvas(700, 400);

  opnieuwKnop = createButton("Opnieuw beginnen");
  opnieuwKnop.position(300,300);
  opnieuwKnop.size(200, 40);
  opnieuwKnop.style("font-size", "20px");
  opnieuwKnop.style("background-color","brown")
  opnieuwKnop.style("color", "white")
  opnieuwKnop.style("font-family", "font");
  opnieuwKnop.style("border-color", "red")
  opnieuwKnop.style("border-width", "3px")
  opnieuwKnop.style("border-radius", "10px")
  opnieuwKnop.mousePressed(opnieuw);
  opnieuwKnop.hide();
}

function draw() {
  start();
if (roxasIntroStart == true) {
  background(RoxasIntro)
} else {
  if (dood()){
    background(RoxasDead);
    opnieuwKnop.show();
    frameCount = 0;
  } else {
  Achtergronden();
  Roxas();
  image(statsMenu, 600, 300, 100, 100);

  // verlaagt de stats ook als het menu afgesloten is
  honger = verlaag(honger, 20);
  energie = verlaag(energie, 60);
  geluk = verlaag(geluk, 70);
  gezondheid = verlaag(gezondheid, 90);

  // stats te zien alleen als het menu open is
  if (statsMenuKnop == true) {
    Stats("honger", honger, 20);
    Stats("energie", energie, 60);
    Stats("geluk", geluk, 100);
    Stats("gezondheid", gezondheid, 140);
      }
    }
  }
}
function opnieuw() {
  honger = 100;
  energie = 100;
  geluk = 100;
  gezondheid = 100;
  achtergrond = 0;
  statsMenuKnop = false;
  roxasIntroStart = true;
  opnieuwKnop.hide();
}

function verlaag(waarde, snelheid) {
  if (frameCount % snelheid === 0 && waarde > 0) {
    return waarde - 1;
  }
  return waarde;
}

function Stats(naam, waarde, y) {
  fill(0);
  text(naam + ": " + waarde, 600, y - 5);
  rect(600, y, 100, 10);
  fill(255, 0, 0);
  rect(600, y, waarde, 10);
}

function dood() {
  return gezondheid == 0 || honger == 0 || energie == 0 || geluk == 0;
}

function start() {
  if (frameCount == 110){
    roxasIntroStart = false;
  }
}

function Achtergronden() {
  if (achtergrond == 0) {
    background(stairs);
  }
  if (achtergrond == 1) {
    background(balcon);
    Eten();
  }
  if (achtergrond > 1) {
    achtergrond = 0;
  }
}

function Roxas() {
  image(Roxas1, 200, 200, 200, 200);
}

function Eten(){
  image(SeaSaltIceCream, mouseX, mouseY, 50,100)
 
}

function mousePressed() {
  if (mouseX > 600 && mouseX < 700 
      && mouseY > 300 && mouseY < 400) {
    statsMenuKnop = !statsMenuKnop;
  }
  if (mouseX > 50 && mouseX < 100 
      && mouseY > 50 && mouseY < 150) {
      
    }
}

function keyPressed() {
  if (keyCode == 32 && !dood()) {
    if ( !roxasIntroStart) {
      achtergrond++;
    }
    roxasIntroStart = false;
  }
}