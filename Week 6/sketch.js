let achtergrond = 0;
let honger = 100;
let energie = 100;
let geluk = 100;
let gezondheid = 100;
let statsMenuKnop = false;
let roxasIntroStart = true;
let EtenClicked = false;
let etenZichtbaar = false;
let opnieuwKnop;
let aanvalFrames = [];
let frameAantal = 60;

// video / gevecht
let vid;
let videoSpeelt = false;
let RoxasFight = false;
let hitLeft = false;
let hitRight = false;

function preload() {
  stairs = loadImage("background.gif");
  balcon = loadImage("achtergrond.jpg");
  HalloweenTown = loadImage("Halloween_Town-_Curly_Hill_29_KH.webp");
  World1 = loadImage("Halloween_Town_KH_logo.webp");
  Agrabah = loadImage("Agrabah_29_KHII.webp");
  World2 = loadImage("Agrabah_KH_logo.webp");
  Olympus = loadImage("Olympus_Coliseum_Arena_KH.webp");
  World3 = loadImage("Olympus_Coliseum_KH_logo.webp");
  World4 = loadImage("Twilight_Town_KHCOM.webp");
  WorldMenu = loadImage("Schermafbeelding 2026-10-26 112938.png");
  Roxas1 = loadImage("RoxasHood.gif");
  statsMenu = loadImage("—Pngtree— vector icon_3791388 - kopie.png");
  RoxasIntro = loadImage("RoxasIntro2.gif");
  RoxasDead = loadImage("roxasDead.gif");
  font = loadFont("KHMenu-Bold.otf");
  SeaSaltIceCream = loadImage("Sea-Salt_Ice_Cream_29_KHII.webp");
  Shop = loadImage("shop.webp");
  Potion = loadImage("Potion.png");
  HiPotion = loadImage("Hi-Potion.png");
  gummiShip = loadImage("gummi.png");
  WorldMenuButton = loadImage("World Menu Pixel Button.png");
  SeaSaltIceCreamButton = loadImage("Sea Salt Ice Cream Shop Button.png");
}

function setup() {
  let canvas = createCanvas(700, 400);

  // video wordt in setup gemaakt (niet in preload)
  vid = createVideo("RealRoxasHit.mp4");
  vid.hide();       // verberg het losse HTML-element, we tekenen hem zelf op het canvas
  vid.volume(0);    // muted, anders blokkeert de browser het afspelen
  vid.onended(function () {
    videoSpeelt = false;
  });

  opnieuwKnop = createButton("Opnieuw beginnen");
  opnieuwKnop.position(300, 300);
  opnieuwKnop.size(200, 40);
  opnieuwKnop.style("font-size", "20px");
  opnieuwKnop.style("background-color", "brown");
  opnieuwKnop.style("color", "white");
  opnieuwKnop.style("font-family", "font");
  opnieuwKnop.style("border-color", "red");
  opnieuwKnop.style("border-width", "3px");
  opnieuwKnop.style("border-radius", "10px");
  opnieuwKnop.mousePressed(opnieuw);
  opnieuwKnop.hide();
}

function draw() {
  start();

  // je kunt alleen vechten in de werelden (Halloween Town, Agrabah, Olympus)
  RoxasFight = achtergrond >= 4;

  if (roxasIntroStart == true) {
    background(RoxasIntro);
  } else {
    if (dood()) {
      background(RoxasDead);
      opnieuwKnop.show();
      frameCount = 0;
    } else {
      Achtergronden();
      Roxas();
      Eten();
      EtenMove();
      VideoTekenen();
      image(statsMenu, 600, 300, 100, 100);

      // verlaagt de stats ook als het menu afgesloten is
      honger = verlaag(honger, 40);
      energie = verlaag(energie, 60);
      geluk = verlaag(geluk, 70);
      gezondheid = verlaag(gezondheid, 90);

      // stats te zien alleen als het menu open is
      if (statsMenuKnop == true) {
        Stats("honger", honger, 20);
        Stats("energie", energie, 60);
        Stats("geluk", geluk, 100);
        Stats("gezondheid", gezondheid, 140);
        MenuKnoppen();
      }
    }
  }
}

// tekent de aanvalsvideo bovenop de achtergrond, alleen terwijl hij speelt
function VideoTekenen() {
  if (videoSpeelt == true && RoxasFight == true) {
    if (hitLeft == true) {
      image(vid, 0, 0, 700, 400);
    }
  }
}

function startVideo() {
  vid.stop();
  vid.time(0);
  vid.play();
  videoSpeelt = true;
}

function opnieuw() {
  honger = 100;
  energie = 100;
  geluk = 100;
  gezondheid = 100;
  achtergrond = 0;
  statsMenuKnop = false;
  roxasIntroStart = true;
  EtenClicked = false;
  etenZichtbaar = false;
  videoSpeelt = false;
  vid.stop();
  opnieuwKnop.hide();
}

function verlaag(waarde, snelheid) {
  if (frameCount % snelheid === 0 && waarde > 0) {
    return waarde - 1;
  }
  return waarde;
}

function Stats(naam, waarde, y) {
  // tekst is geel in Halloween Town, anders zwart
  if (achtergrond == 4) {
    fill(255, 255, 0);
  } else {
    fill(0);
  }
  text(naam + ": " + waarde, 600, y - 5);
  fill(0);
  rect(600, y, 100, 10);
  fill(255, 0, 0);
  rect(600, y, waarde, 10);
}

function MenuKnoppen() {
  fill(139, 69, 19);
  stroke(255, 0, 0);
  strokeWeight(2);
  rect(600, 170, 100, 25, 5);
  rect(600, 200, 100, 25, 5);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  text("menu", 650, 182);
  text("eten", 650, 212);
  textAlign(LEFT, BASELINE);
}

// eten is overal te zien behalve in de shop en de worldmap
function etenScherm() {
  return achtergrond != 2 && achtergrond != 3;
}

// ijsje is te zien op het balcon, of als je het met de knop hebt aangezet
function etenTeZien() {
  return etenScherm() && (etenZichtbaar == true || achtergrond == 1);
}

function dood() {
  return gezondheid <= 0 || honger <= 0 || energie <= 0 || geluk <= 0;
}

function start() {
  if (frameCount == 110) {
    roxasIntroStart = false;
  }
}

function Achtergronden() {
  if (achtergrond == 0) {
    background(stairs);
  }
  if (achtergrond == 1) {
    background(balcon);
  }
  if (achtergrond == 2) {
    background(Shop);
    Healing();
  }
  if (achtergrond == 3) {
    background(WorldMenu);
    image(World1, 120, 10, 170, 190);
    image(World2, 100, 170, 170, 190);
    image(World3, 450, 200, 170, 190);
    image(World4, 300, 50, 150, 170);
    //gummi laten bewegen
    image(gummiShip, 350, 120, 120, 100);
  }
  if (achtergrond == 4) {
    background(HalloweenTown);
  }
  if (achtergrond == 5) {
    background(Agrabah);
  }
  if (achtergrond == 6) {
    background(Olympus);
  }
}

function Roxas() {
  if (achtergrond <= 1) {
    image(Roxas1, 200, 200, 200, 200);
  }
}

function EtenMove() {
  if (EtenClicked == true && etenScherm()) {
    image(SeaSaltIceCream, mouseX, mouseY, 50, 100);
  }
}

function Eten() {
  if (EtenClicked == false && etenTeZien()) {
    image(SeaSaltIceCream, 50, 50, 50, 100);
  }
}

function Healing() {
  image(Potion, 250, 370, 150, 20);
  image(HiPotion, 250, 345, 150, 20);
  image(WorldMenuButton, 400, 355, 150, 50);
  image(SeaSaltIceCreamButton, 400, 330, 150, 50);
}

function mousePressed() {
  // knoppen in het menu
  if (statsMenuKnop == true && mouseX > 600 && mouseX < 700) {
    if (mouseY > 170 && mouseY < 195) {
      achtergrond = 2; // shop
      return;
    }
    if (mouseY > 200 && mouseY < 225 && etenScherm()) {
      etenZichtbaar = !etenZichtbaar; // ijsje aan/uit
      return;
    }
  }

  if (mouseX > 600 && mouseX < 700
      && mouseY > 300 && mouseY < 400) {
    statsMenuKnop = !statsMenuKnop;
  }

  // eten preset
  if (mouseX > 50 && mouseX < 100
      && mouseY > 50 && mouseY < 150
      && etenTeZien()) {
    EtenClicked = true;
  }

  // eten klikken op roxas
  if (mouseX > 250 && mouseX < 350
      && mouseY > 200 && mouseY < 300
      && etenScherm()
      && EtenClicked == true) {
    honger = honger + 10;
    EtenClicked = false;
    if (honger >= 100) {
      honger = 100;
      gezondheid = gezondheid - 10;
    }
  }

  // potion
  if (mouseX > 250 && mouseX < 400
      && mouseY > 370 && mouseY < 390
      && achtergrond == 2) {
    gezondheid = gezondheid + 5;
    if (gezondheid >= 100) {
      gezondheid = 100;
      geluk = geluk - 10;
    }
  }
  //munny mechanic

  // hi-potion
  if (mouseX > 250 && mouseX < 400
      && mouseY > 345 && mouseY < 365
      && achtergrond == 2) {
    gezondheid = gezondheid + 10;
    if (gezondheid >= 100) {
      gezondheid = 100;
      geluk = geluk - 10;
    }
  }
  //munny mechanic

  // world1
  if (mouseX > 120 && mouseX < 120 + 170
      && mouseY > 10 && mouseY < 10 + 190
      && achtergrond == 3) {
    achtergrond = 4;
  }

  // World2
  if (mouseX > 100 && mouseX < 100 + 170
      && mouseY > 170 && mouseY < 170 + 190
      && achtergrond == 3) {
    achtergrond = 5;
  }

  // World3
  if (mouseX > 450 && mouseX < 450 + 170
      && mouseY > 200 && mouseY < 200 + 190
      && achtergrond == 3) {
    achtergrond = 6;
  }

  // World4
  if (mouseX > 300 && mouseX < 300 + 150
      && mouseY > 50 && mouseY < 50 + 170
      && achtergrond == 3) {
    achtergrond = 0;
  }

  if (mouseX > 400 && mouseX < 550
      && mouseY > 355 && mouseY < 405
      && achtergrond == 2) {
    achtergrond = 3;
    // ijsje ++;
    //munny = munny -15
  }
  if (mouseX > 400 && mouseX < 550
      && mouseY > 330 && mouseY < 380
      && achtergrond == 2) {
  }
}

function keyPressed() {
  if (keyCode == 32 && !dood()) {
    if (!roxasIntroStart && achtergrond <= 2) {
      achtergrond++;
      etenZichtbaar = false;
    }
    roxasIntroStart = false;
  }

  // pijltjestoetsen: in een wereld speelt de aanvalsvideo af
  if (keyCode === 37 && RoxasFight == true) {
    hitLeft = true;
    hitRight = false;
    startVideo();
  } else if (keyCode === 39 && RoxasFight == true) {
    hitRight = true;
    hitLeft = false;
    startVideo();
  }
}