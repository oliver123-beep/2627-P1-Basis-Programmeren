let achtergrond = 0;
let honger = 100;
let energie = 100;
let geluk = 100;
let gezondheid = 100;
let statsMenuKnop = false;

function preload() {
  stairs = loadImage("background.gif");
  balcon = loadImage("achtergrond.jpg");
  Roxas1 = loadImage("RoxasHood.gif");
  statsMenu = loadImage("—Pngtree— vector icon_3791388 - kopie.png");
  RoxasIntro = loadImage("RoxasIntro.gif")
  RoxasDead = loadImage("roxasDead.gif")
}

function setup() {
  createCanvas(700, 400);
}

function draw() {
  if (dood()){
    background(RoxasDead)
  } else {
  Achtergronden();
  Roxas();
  image(statsMenu, 600, 300, 100, 100);

  // verlaagt de stats ook als het menu afgesloten is
  honger = verlaag(honger, 10);
  energie = verlaag(energie, 80);
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

function Achtergronden() {
  if (achtergrond == 0) {
    background(stairs);
  }
  if (achtergrond == 1) {
    background(balcon);
  }
  if (achtergrond > 1) {
    achtergrond = 0;
  }
}

function Roxas() {
  image(Roxas1, 200, 200, 200, 200);
}

function mousePressed() {
  // klik op het icoon: menu open/dicht
  if (mouseX > 600 && mouseX < 700 && mouseY > 300 && mouseY < 400) {
    statsMenuKnop = !statsMenuKnop;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    achtergrond++;
  }
}