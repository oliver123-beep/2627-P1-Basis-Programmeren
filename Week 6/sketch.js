let achtergrond = 0;
let honger = 100;
let energie = 100;
let geluk = 100;
let gezondheid = 100;
let munny = 0;
let aantalIjsjes = 3;   // ijsjes inventory
let statsMenuKnop = false;
let roxasIntroStart = true;
let EtenClicked = false;
let etenZichtbaar = false;
let opnieuwKnop;
let startKnop;
let stopKnop;
let sleepingVideo;
let slapenActief = false;

// gevecht
let RoxasFight = false;
let gevechtActief = false;
let heartlessAanwezig = false;  // staat er nu een heartless?
let heartlessNummer = 1;        // welke heartless: 1, 2 of 3
let heartlessKant = "L";        // "L" = links, "R" = rechts
let heartlessStatus = 0;        // 0 = wacht, 1 = heartless slaat Roxas, 2 = Roxas slaat heartless
let heartlessStartTijd = 0;
let heartlessEindTijd = 0;
let volgendeSpawn = 0;

// de twee video's van de heartless die er nu is
let hitVideo;      // roxasHit: Roxas slaat
let getHitVideo;   // roxasGetHit: de heartless slaat

// idle video's: B = wereld 1, A = wereld 2, C = wereld 3
let roxasIdleB;
let roxasIdleA;
let roxasIdleC;

// alle gevechtsvideo's (letter = wereld, cijfer = heartless, L/R = kant)
let roxasHitB1L, roxasGetHitB1L, roxasHitB1R, roxasGetHitB1R;
let roxasHitB2L, roxasGetHitB2L, roxasHitB2R, roxasGetHitB2R;
let roxasHitB3L, roxasGetHitB3L, roxasHitB3R, roxasGetHitB3R;
let roxasHitA1L, roxasGetHitA1L, roxasHitA1R, roxasGetHitA1R;
let roxasHitA2L, roxasGetHitA2L, roxasHitA2R, roxasGetHitA2R;
let roxasHitA3L, roxasGetHitA3L, roxasHitA3R, roxasGetHitA3R;
let roxasHitC1L, roxasGetHitC1L, roxasHitC1R, roxasGetHitC1R;
let roxasHitC2L, roxasGetHitC2L, roxasHitC2R, roxasGetHitC2R;
let roxasHitC3L, roxasGetHitC3L, roxasHitC3R, roxasGetHitC3R;

const WACHTTIJD = 3000;
const PAUZE = 1000;
const ANIMATIETIJD = 1600;
const MUNNY_BELONING = 50;   // munny per verslagen heartless

// prijzen in de shop
const PRIJS_POTION = 10;
const PRIJS_HIPOTION = 25;
const PRIJS_IJSJE = 15;

// klikgebied van Roxas (in de werelden is de scene-video groter)
function opRoxas() {
  if (achtergrond >= 4) {
    return mouseX > 200 && mouseX < 450 && mouseY > 100 && mouseY < 400;
  }
  return mouseX > 250 && mouseX < 350 && mouseY > 200 && mouseY < 300;
}

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

// Maakt een verborgen video die we zelf op het canvas tekenen.
function maakVideo(naam) {
  let v = createVideo(naam);
  v.hide();
  v.volume(0);
  return v;
}

// Tekent een video.
let laatsteVideo;                // de laatste video die getekend is
let eerderGetekend = false;      // is er al een video getekend?

function tekenVideo(v) {
  // duration() is pas groter dan 0 als de video geladen is
  if (v.duration() > 0) {
    image(v, 0, 0, 700, 400);
    laatsteVideo = v;
    eerderGetekend = true;
  } else if (eerderGetekend == true) {
    image(laatsteVideo, 0, 0, 700, 400);
  }
}

// Laadt alle video's.
function laadVideos() {
  roxasIdleB = maakVideo("roxasIdleB.mp4");
  roxasIdleA = maakVideo("roxasIdleA.mp4");
  roxasIdleC = maakVideo("roxasIdleC.mp4");

  roxasHitB1L = maakVideo("roxasHitB1L.mp4");
  roxasGetHitB1L = maakVideo("roxasGetHitB1L.mp4");
  roxasHitB1R = maakVideo("roxasHitB1R.mp4");
  roxasGetHitB1R = maakVideo("roxasGetHitB1R.mp4");
  roxasHitB2L = maakVideo("roxasHitB2L.mp4");
  roxasGetHitB2L = maakVideo("roxasGetHitB2L.mp4");
  roxasHitB2R = maakVideo("roxasHitB2R.mp4");
  roxasGetHitB2R = maakVideo("roxasGetHitB2R.mp4");
  roxasHitB3L = maakVideo("roxasHitB3L.mp4");
  roxasGetHitB3L = maakVideo("roxasGetHitB3L.mp4");
  roxasHitB3R = maakVideo("roxasHitB3R.mp4");
  roxasGetHitB3R = maakVideo("roxasGetHitB3R.mp4");
  roxasHitA1L = maakVideo("roxasHitA1L.mp4");
  roxasGetHitA1L = maakVideo("roxasGetHitA1L.mp4");
  roxasHitA1R = maakVideo("roxasHitA1R.mp4");
  roxasGetHitA1R = maakVideo("roxasGetHitA1R.mp4");
  roxasHitA2L = maakVideo("roxasHitA2L.mp4");
  roxasGetHitA2L = maakVideo("roxasGetHitA2L.mp4");
  roxasHitA2R = maakVideo("roxasHitA2R.mp4");
  roxasGetHitA2R = maakVideo("roxasGetHitA2R.mp4");
  roxasHitA3L = maakVideo("roxasHitA3L.mp4");
  roxasGetHitA3L = maakVideo("roxasGetHitA3L.mp4");
  roxasHitA3R = maakVideo("roxasHitA3R.mp4");
  roxasGetHitA3R = maakVideo("roxasGetHitA3R.mp4");
  roxasHitC1L = maakVideo("roxasHitC1L.mp4");
  roxasGetHitC1L = maakVideo("roxasGetHitC1L.mp4");
  roxasHitC1R = maakVideo("roxasHitC1R.mp4");
  roxasGetHitC1R = maakVideo("roxasGetHitC1R.mp4");
  roxasHitC2L = maakVideo("roxasHitC2L.mp4");
  roxasGetHitC2L = maakVideo("roxasGetHitC2L.mp4");
  roxasHitC2R = maakVideo("roxasHitC2R.mp4");
  roxasGetHitC2R = maakVideo("roxasGetHitC2R.mp4");
  roxasHitC3L = maakVideo("roxasHitC3L.mp4");
  roxasGetHitC3L = maakVideo("roxasGetHitC3L.mp4");
  roxasHitC3R = maakVideo("roxasHitC3R.mp4");
  roxasGetHitC3R = maakVideo("roxasGetHitC3R.mp4");
}

// Kiest de twee video's die bij de heartless horen die er nu is.
function kiesVideos() {
  if (achtergrond == 4 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitB1L;
    getHitVideo = roxasGetHitB1L;
  }
  if (achtergrond == 4 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitB1R;
    getHitVideo = roxasGetHitB1R;
  }
  if (achtergrond == 4 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitB2L;
    getHitVideo = roxasGetHitB2L;
  }
  if (achtergrond == 4 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitB2R;
    getHitVideo = roxasGetHitB2R;
  }
  if (achtergrond == 4 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitB3L;
    getHitVideo = roxasGetHitB3L;
  }
  if (achtergrond == 4 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitB3R;
    getHitVideo = roxasGetHitB3R;
  }
  if (achtergrond == 5 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitA1L;
    getHitVideo = roxasGetHitA1L;
  }
  if (achtergrond == 5 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitA1R;
    getHitVideo = roxasGetHitA1R;
  }
  if (achtergrond == 5 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitA2L;
    getHitVideo = roxasGetHitA2L;
  }
  if (achtergrond == 5 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitA2R;
    getHitVideo = roxasGetHitA2R;
  }
  if (achtergrond == 5 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitA3L;
    getHitVideo = roxasGetHitA3L;
  }
  if (achtergrond == 5 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitA3R;
    getHitVideo = roxasGetHitA3R;
  }
  if (achtergrond == 6 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitC1L;
    getHitVideo = roxasGetHitC1L;
  }
  if (achtergrond == 6 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitC1R;
    getHitVideo = roxasGetHitC1R;
  }
  if (achtergrond == 6 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitC2L;
    getHitVideo = roxasGetHitC2L;
  }
  if (achtergrond == 6 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitC2R;
    getHitVideo = roxasGetHitC2R;
  }
  if (achtergrond == 6 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitC3L;
    getHitVideo = roxasGetHitC3L;
  }
  if (achtergrond == 6 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitC3R;
    getHitVideo = roxasGetHitC3R;
  }
}

// Speelt de idle van de wereld waar je nu bent (blijft herhalen).
function speelIdle() {
  if (achtergrond == 4) {
    roxasIdleB.loop();
  }
  if (achtergrond == 5) {
    roxasIdleA.loop();
  }
  if (achtergrond == 6) {
    roxasIdleC.loop();
  }
}

// Speelt een video vanaf het begin af.
function startVid(v) {
  v.time(0);
  v.play();
}

function setup() {
  createCanvas(700, 400);

  laadVideos();

  // Nieuwe slaapvideo.
  sleepingVideo = maakVideo("sleeping.mp4");
  sleepingVideo.onended(function() {
    slapenActief = false;
    sleepingVideo.pause();
  });

  roxasIdleB.loop();
  roxasIdleA.loop();
  roxasIdleC.loop();

  // Opnieuw-knop.
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

  // Start-knop voor gevechten.
  startKnop = createButton("Start");
  startKnop.position(20, 340);
  startKnop.size(90, 35);
  startKnop.style("font-size", "18px");
  startKnop.style("background-color", "green");
  startKnop.style("color", "white");
  startKnop.mousePressed(startGevecht);
  startKnop.hide();

  // Stop-knop voor gevechten.
  stopKnop = createButton("Stop");
  stopKnop.position(120, 340);
  stopKnop.size(90, 35);
  stopKnop.style("font-size", "18px");
  stopKnop.style("background-color", "darkred");
  stopKnop.style("color", "white");
  stopKnop.mousePressed(stopGevecht);
  stopKnop.hide();
}

function draw() {
  start();

  // Vechten kan alleen in de drie werelden.
  RoxasFight = achtergrond >= 4;

  // start/stop verdwijnen als je slaapt
  if (RoxasFight && !dood() && !roxasIntroStart && slapenActief == false) {
    startKnop.show();
    stopKnop.show();
  } else {
    startKnop.hide();
    stopKnop.hide();
  }

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

      if (RoxasFight) {
        GevechtUpdate();
        HeartlessTekenen();
        GevechtInfo();
      }

      image(statsMenu, 600, 300, 100, 100);

      // Statistieken lopen langzaam terug.
      honger = verlaag(honger, 60);
      energie = verlaag(energie, 80);
      geluk = verlaag(geluk, 75);
      gezondheid = verlaag(gezondheid, 90);

      if (statsMenuKnop == true) {
        Stats("honger", honger, 20);
        Stats("energie", energie, 60);
        Stats("geluk", geluk, 100);
        Stats("gezondheid", gezondheid, 140);
        MenuKnoppen();
      }
    }
  }

  // Slaapvideo boven op de game tekenen.
  if (slapenActief &&
      sleepingVideo &&
      sleepingVideo.duration() > 0) {
    image(sleepingVideo, 0, 0, 700, 400);
  }
}

// ---------------- GEVECHT ----------------

function startGevecht() {
  gevechtActief = true;
  speelIdle();
  if (heartlessAanwezig == false) {
    volgendeSpawn = millis();
  }
}

function stopGevecht() {
  gevechtActief = false; // er komen geen nieuwe heartless meer
  if (heartlessAanwezig == true) {
    hitVideo.pause();
    getHitVideo.pause();
    heartlessAanwezig = false;
  }
}

function resetGevecht() {
  gevechtActief = false;
  heartlessAanwezig = false;
  speelIdle(); // idle speelt zodra je de wereld binnengaat
}

function GevechtUpdate() {
  let nu = millis();

  if (heartlessAanwezig == false) {
    // geen heartless: idle speelt, en na de pauze komt er een nieuwe
    if (gevechtActief == true && nu >= volgendeSpawn) {
      heartlessNummer = floor(random(1, 4));
      if (random() < 0.5) {
        heartlessKant = "L";
      } else {
        heartlessKant = "R";
      }
      kiesVideos();

      heartlessAanwezig = true;
      heartlessStatus = 0;
      heartlessStartTijd = nu;
      EtenClicked = false; // ijsje valt weg zodra er een heartless komt

      // eerste beeld blijft staan terwijl hij wacht
      getHitVideo.time(0);
      getHitVideo.pause();
    }
  } else {
    // na 3 seconden slaat de heartless zelf
    if (heartlessStatus == 0 && nu - heartlessStartTijd >= WACHTTIJD) {
      heartlessSlaat();
    }
    // animatie klaar: volgende heartless na de pauze
    else if (heartlessStatus != 0 && nu >= heartlessEindTijd) {
      heartlessAanwezig = false;
      volgendeSpawn = nu + PAUZE;
    }
  }
}

// De heartless slaat Roxas: speel roxasGetHit
function heartlessSlaat() {
  heartlessStatus = 1;
  startVid(getHitVideo);
  heartlessEindTijd = millis() + ANIMATIETIJD;

  gezondheid = max(0, gezondheid - 10);
  geluk = max(0, geluk - 10);
}

// Roxas slaat de heartless: speel roxasHit
function heartlessVerslagen() {
  heartlessStatus = 2;
  startVid(hitVideo);
  heartlessEindTijd = millis() + ANIMATIETIJD;

  geluk = min(100, geluk + 10);
  munny = munny + MUNNY_BELONING;
  energie = max(0, energie - 5);
}

function HeartlessTekenen() {
  if (heartlessAanwezig == true) {
    if (heartlessStatus == 2) {
      tekenVideo(hitVideo);
    } else {
      tekenVideo(getHitVideo);
    }
  }
}

function GevechtInfo() {
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(16);
  text("munny: " + munny, 10, 25);
  noStroke();
  textSize(12);
}

// kant is "L" of "R"
function Slaan(kant) {
  if (heartlessAanwezig == true && heartlessStatus == 0) {
    if (heartlessKant == kant) {
      heartlessVerslagen(); // goede kant
    } else {
      heartlessSlaat();     // verkeerde kant
    }
  }
}

// ---------------- OPNIEUW BEGINNEN ----------------

function opnieuw() {
  honger = 100;
  energie = 100;
  geluk = 100;
  gezondheid = 100;
  munny = 0;
  aantalIjsjes = 3;

  achtergrond = 0;
  statsMenuKnop = false;
  roxasIntroStart = true;
  EtenClicked = false;
  etenZichtbaar = false;

  slapenActief = false;

  if (sleepingVideo) {
    sleepingVideo.pause();
  }

  resetGevecht();
  opnieuwKnop.hide();
}

// ---------------- STATISTIEKEN ----------------

function verlaag(waarde, snelheid) {
  if (frameCount % snelheid === 0 && waarde > 0) {
    return waarde - 1;
  }

  return waarde;
}

function Stats(naam, waarde, y) {
  // Gele tekst in Halloween Town.
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

// ---------------- MENU ----------------

function MenuKnoppen() {
  // tijdens het vechten zijn de knoppen grijs (niet klikbaar)
  if ((gevechtActief || heartlessAanwezig)) {
    fill(90);
  } else {
    fill(139, 69, 19);
  }
  stroke(255, 0, 0);
  strokeWeight(2);

  rect(600, 170, 100, 25, 5);
  rect(600, 200, 100, 25, 5);
  rect(600, 230, 100, 25, 5);

  noStroke();
  fill(255);

  textAlign(CENTER, CENTER);

  text("menu", 650, 182);
  text("eten", 650, 212);
  text("slapen", 650, 242);

  textAlign(LEFT, BASELINE);
}

// Eten is overal zichtbaar behalve in de shop en worldmap.
function etenScherm() {
  return achtergrond != 2 && achtergrond != 3;
}

// Bepaalt of het ijsje zichtbaar is.
function etenTeZien() {
  return etenScherm() &&
    (etenZichtbaar == true || achtergrond == 1);
}

// Bepaalt of Roxas dood is.
function dood() {
  return gezondheid <= 0 ||
    honger <= 0 ||
    energie <= 0 ||
    geluk <= 0;
}

function start() {
  if (frameCount == 110) {
    roxasIntroStart = false;
  }
}

// ---------------- ACHTERGRONDEN ----------------

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

// ---------------- ROXAS ----------------

function Roxas() {
  if (achtergrond <= 1) {
    image(Roxas1, 200, 200, 200, 200);
  }

  // Idle-animatie in de drie werelden.
  if (achtergrond >= 4) {
    if (heartlessAanwezig == false) {
      if (achtergrond == 4) {
        tekenVideo(roxasIdleB);
      }
      if (achtergrond == 5) {
        tekenVideo(roxasIdleA);
      }
      if (achtergrond == 6) {
        tekenVideo(roxasIdleC);
      }
    }
  }
}

// ---------------- ETEN ----------------

function EtenMove() {
  if (EtenClicked == true && etenScherm()) {
    image(SeaSaltIceCream, mouseX, mouseY, 50, 100);
  }
}

function Eten() {
  // alleen te zien als je nog ijsjes hebt
  if (EtenClicked == false && etenTeZien() && aantalIjsjes > 0) {
    image(SeaSaltIceCream, 50, 50, 50, 100);

    fill(255);
    stroke(0);
    strokeWeight(3);
    text("x" + aantalIjsjes, 105, 100);
    noStroke();
  }
}

// ---------------- SHOP ----------------

function Healing() {
  image(Potion, 250, 370, 150, 20);
  image(HiPotion, 250, 345, 150, 20);

  image(WorldMenuButton, 400, 355, 150, 50);
  image(SeaSaltIceCreamButton, 400, 330, 150, 50);

  // munny, inventory en prijzen
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(14);
  text("munny: " + munny, 10, 25);
  text("ijsjes: " + aantalIjsjes, 10, 45);
  noStroke();
  textSize(12);
}
// ---------------- MUISKLIKKEN ----------------

function mousePressed() {

  // Knoppen in het stats-menu.
  if (statsMenuKnop == true &&
      mouseX > 600 &&
      mouseX < 700) {

    // Tijdens het vechten werken de menuknoppen niet.
    if ((gevechtActief || heartlessAanwezig) && mouseY > 170 && mouseY < 255) {
      return;
    }

    // Naar de shop.
    if (mouseY > 170 && mouseY < 195) {
      achtergrond = 2;
      resetGevecht();
      return;
    }

    // Eten aan- of uitzetten.
    // Dit kan alleen als je niet aan het vechten bent.
    if (mouseY > 200 &&
        mouseY < 225 &&
        etenScherm() &&
        !gevechtActief &&
        heartlessAanwezig == false) {

      etenZichtbaar = !etenZichtbaar;
      return;
    }

    // Slapen en energie terugkrijgen.
    // Dit kan niet tijdens een gevecht.
    if (mouseY > 230 &&
        mouseY < 255 &&
        !gevechtActief &&
        heartlessAanwezig == false &&
        !slapenActief) {

      energie = min(100, energie + 50);
      EtenClicked = false;
      slapenActief = true;

      sleepingVideo.time(0);
      sleepingVideo.play();

      return;
    }
  }

  // Stats-menu openen of sluiten.
  if (mouseX > 600 &&
      mouseX < 700 &&
      mouseY > 300 &&
      mouseY < 400) {

    statsMenuKnop = !statsMenuKnop;
  }

  // Een ijsje selecteren.
  if (mouseX > 50 &&
      mouseX < 100 &&
      mouseY > 50 &&
      mouseY < 150 &&
      etenTeZien() &&
      aantalIjsjes > 0 &&
      heartlessAanwezig == false) {

    EtenClicked = true;
  }

  // Het ijsje aan Roxas geven (alleen als Roxas idle is).
  if (opRoxas() &&
      etenScherm() &&
      heartlessAanwezig == false &&
      !slapenActief &&
      EtenClicked == true) {

    honger = honger + 10;
    aantalIjsjes = aantalIjsjes - 1; // ijsje is op
    EtenClicked = false;

    if (honger >= 100) {
      honger = 100;
      gezondheid = gezondheid - 10;
    }
  }

  // Potion gebruiken.
  if (mouseX > 250 &&
      mouseX < 400 &&
      mouseY > 370 &&
      mouseY < 390 &&
      achtergrond == 2 &&
      munny >= PRIJS_POTION) {

    munny = munny - PRIJS_POTION;
    gezondheid = gezondheid + 5;

    if (gezondheid >= 100) {
      gezondheid = 100;
      geluk = geluk - 10;
    }
  }

  // Hi-Potion gebruiken.
  if (mouseX > 250 &&
      mouseX < 400 &&
      mouseY > 345 &&
      mouseY < 365 &&
      achtergrond == 2 &&
      munny >= PRIJS_HIPOTION) {

    munny = munny - PRIJS_HIPOTION;
    gezondheid = gezondheid + 10;

    if (gezondheid >= 100) {
      gezondheid = 100;
      geluk = geluk - 10;
    }
  }

  // Wereld 1: Halloween Town.
  if (mouseX > 120 &&
      mouseX < 120 + 170 &&
      mouseY > 10 &&
      mouseY < 10 + 190 &&
      achtergrond == 3) {

    achtergrond = 4;
    resetGevecht();
  }

  // Wereld 2: Agrabah.
  if (mouseX > 100 &&
      mouseX < 100 + 170 &&
      mouseY > 170 &&
      mouseY < 170 + 190 &&
      achtergrond == 3) {

    achtergrond = 5;
    resetGevecht();
  }

  // Wereld 3: Olympus Coliseum.
  if (mouseX > 450 &&
      mouseX < 450 + 170 &&
      mouseY > 200 &&
      mouseY < 200 + 190 &&
      achtergrond == 3) {

    achtergrond = 6;
    resetGevecht();
  }

  // Terug naar de eerste achtergrond.
  if (mouseX > 300 &&
      mouseX < 300 + 150 &&
      mouseY > 50 &&
      mouseY < 50 + 170 &&
      achtergrond == 3) {

    achtergrond = 0;
  }

  // Vanuit de shop terug naar de wereldkaart.
  if (mouseX > 400 &&
      mouseX < 550 &&
      mouseY > 355 &&
      mouseY < 405 &&
      achtergrond == 2) {

    achtergrond = 3;
  }

  // Een ijsje kopen.
  if (mouseX > 400 &&
      mouseX < 550 &&
      mouseY > 330 &&
      mouseY < 380 &&
      achtergrond == 2 &&
      munny >= PRIJS_IJSJE) {

    munny = munny - PRIJS_IJSJE;
    aantalIjsjes = aantalIjsjes + 1;
  }
}

// ---------------- TOETSENBORD ----------------

function keyPressed() {

  // Tijdens de slaapvideo geen andere acties uitvoeren.
  if (slapenActief) {
    return;
  }

  // Spatiebalk om verder te gaan.
  if (keyCode == 32 && !dood()) {

    if (!roxasIntroStart && achtergrond <= 2) {
      achtergrond++;
      etenZichtbaar = false;
    }

    roxasIntroStart = false;
  }

  // Pijltjestoetsen om aan te vallen.
  if (RoxasFight == true && !dood()) {

    if (keyCode === 37) {
      Slaan("L");
    } else if (keyCode === 39) {
      Slaan("R");
    }
  }
}