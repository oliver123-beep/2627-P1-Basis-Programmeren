// de achtergrond waar je nu bent: 0 = trap, 1 = balkon, 2 = shop, 3 = wereldkaart, 4 = wereld 1, 5 = wereld 2, 6 = wereld 3
let achtergrond = 0;

// alle data van Roxas in een object
let data = {
  honger: 100,      // honger van Roxas
  energie: 100,     // energie van Roxas
  geluk: 100,       // geluk van Roxas
  gezondheid: 100,  // gezondheid van Roxas
  munny: 0,         // hoeveel munny je hebt
  ijsjes: 3,        // hoeveel ijsjes je hebt (inventory)
  stokjes: 2,       // grondstof: het stokje
  toppen: 2,        // grondstof: de bovenkant van het ijsje
  timerStart: Date.now(),  // echte tijd (in milliseconden) waarop de timer begon
  // per stat: de echte tijd waarop hij voor het laatst is gedaald
  hongerTijd: Date.now(),
  energieTijd: Date.now(),
  gelukTijd: Date.now(),
  gezondheidTijd: Date.now()
};

// slaat het data object op in de browser
function slaOp() {
  storeItem("roxasData", data);
}

// haalt het opgeslagen data object terug (als er een is)
function laadData() {
  // kijk of er iets is opgeslagen
  let opgeslagen = getItem("roxasData");
  if (opgeslagen) {
    // gebruik de opgeslagen data
    data = opgeslagen;

    // oude opslag heeft de grondstoffen nog niet
    if (data.stokjes === undefined) data.stokjes = 0;
    if (data.toppen === undefined) data.toppen = 0;
    if (data.timerStart === undefined) data.timerStart = Date.now();
    if (data.hongerTijd === undefined) resetStatTijden();

    // was Roxas dood toen je afsloot? Dan begin je met volle stats
    if (dood()) {
      data.honger = 100;
      data.energie = 100;
      data.geluk = 100;
      data.gezondheid = 100;
      resetStatTijden();
    } else {
      // de tijd dat het spel dicht was telt mee, maar Roxas houdt minimaal MIN_OFFLINE over
      statsBijwerken(MIN_OFFLINE);
    }
  }
}

let statsMenuKnop = false;      // is het stats-menu open?
let roxasIntroStart = true;     // speelt de intro nog?
let EtenClicked = false;        // heb je een ijsje vast met je muis?
let TopClicked = false;         // heb je de top van het ijsje vast met je muis?
let etenZichtbaar = false;      // is het ijsje zichtbaar?
let opnieuwKnop;                // de knop "Opnieuw beginnen"
let startKnop;                  // de startknop van het gevecht
let stopKnop;                   // de stopknop van het gevecht
let sleepingVideo;              // de slaapvideo
let slapenActief = false;       // speelt de slaapvideo nu?
let xV = 350                    // x as van het schip
let yV = 120                     // y as van het schip
// hieronder staan de variabelen voor het gevecht
let RoxasFight = false;         // ben je in een wereld waar je kunt vechten?
let gevechtActief = false;      // is er op start geklikt?
let heartlessAanwezig = false;  // staat er nu een heartless?
let heartlessNummer = 1;        // welke heartless: 1, 2 of 3
let heartlessKant = "L";        // "L" = links, "R" = rechts
let heartlessStatus = 0;        // 0 = wacht, 1 = heartless slaat Roxas, 2 = Roxas slaat heartless
let heartlessStartTijd = 0;     // wanneer de heartless kwam
let heartlessEindTijd = 0;      // wanneer de animatie klaar is
let volgendeSpawn = 0;          // wanneer de volgende heartless komt

const WACHTTIJD = 2000;      // na 2 seconden slaat de heartless zelf
const PAUZE = 1000;          // 1 seconde pauze voor de volgende heartless
const ANIMATIETIJD = 1600;   // hoe lang een slag-animatie duurt (in milliseconden)
const MUNNY_BELONING = 50;   // munny per verslagen heartless

// prijzen in de shop
const PRIJS_POTION = 10;
const PRIJS_HIPOTION = 25;
const PRIJS_IJSJE = 15;

// hoeveel milliseconden het duurt voordat een stat 1 punt daalt (elke stat heeft een eigen snelheid)
const HONGER_TIJD = 1700;
const ENERGIE_TIJD = 2000;
const GELUK_TIJD = 1900;
const GEZONDHEID_TIJD = 2200;

// als het spel dicht was, dalen de stats niet lager dan dit (zodat Roxas niet dood is als je terugkomt)
const MIN_OFFLINE = 10;

// bepaalt of je muis op Roxas staat (in de werelden is de scene-video groter)
function opRoxas() {
  // in een wereld
  if (achtergrond >= 4) {
    return mouseX > 200 && mouseX < 450 && mouseY > 100 && mouseY < 400;
  }
  // op de andere achtergronden
  return mouseX > 250 && mouseX < 350 && mouseY > 200 && mouseY < 300;
}

// laadt alle plaatjes en het lettertype voordat het spel start
function preload() {
  // achtergronden
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

  // Roxas en het menu
  Roxas1 = loadImage("RoxasHood.gif");
  statsMenu = loadImage("—Pngtree— vector icon_3791388 - kopie.png");
  RoxasIntro = loadImage("RoxasIntro2.gif");
  RoxasDead = loadImage("roxasDead.gif");
  font = loadFont("KHMenu-Bold.otf");
  RoxasMoe = loadImage("RoxasHood.png")
  RoxasHonger = loadImage("RoxasHonger.png") 
  RoxasOngelukig = loadImage("RoxasOngelukig.png")
  RoxasOngezond = loadImage("RoxasOngezond.png")

  // ijsje en shop
  SeaSaltIceCream = loadImage("Sea-Salt_Ice_Cream_29_KHII.webp");
  Shop = loadImage("shop.webp");
  Potion = loadImage("Potion.png");
  HiPotion = loadImage("Hi-Potion.png");
  gummiShip = loadImage("gummi.png");
  WorldMenuButton = loadImage("World Menu Pixel Button.png");
  SeaSaltIceCreamButton = loadImage("Sea Salt Ice Cream Shop Button.png");

  // grondstoffen voor het maken van eten
  stokjeIcoon = loadImage("Stokje.png");
  ijsTopIcoon = loadImage("BovenIjsje.png");
}

// maakt een verborgen video die we zelf op het canvas tekenen
function maakVideo(naam) {
  let v = createVideo(naam);  // laad de video
  v.hide();                   // verberg het losse videoblokje
  v.volume(0);                // geluid uit, anders blokkeert de browser het afspelen
  return v;
}

let laatsteVideo;                // de laatste video die getekend is
let eerderGetekend = false;      // is er al een video getekend?

// tekent een video op het canvas
function tekenVideo(v) {
  // duration() is pas groter dan 0 als de video geladen is
  if (v.duration() > 0) {
    image(v, 0, 0, 700, 400);
    laatsteVideo = v;
    eerderGetekend = true;
  }
  // nog niet geladen: teken de vorige video, zodat het niet knippert
  else if (eerderGetekend == true) {
    image(laatsteVideo, 0, 0, 700, 400);
  }
}

// laadt alle video's
function laadVideos() {
  // de idle video's van de drie werelden
  roxasIdleB = maakVideo("roxasIdleB.mp4");
  roxasIdleA = maakVideo("roxasIdleA.mp4");
  roxasIdleC = maakVideo("roxasIdleC.mp4");

  // wereld 1 (B), heartless 1, 2 en 3
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

  // wereld 2 (A), heartless 1, 2 en 3
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

  // wereld 3 (C), heartless 1, 2 en 3
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

// kiest de twee video's die bij de heartless horen die er nu is
function kiesVideos() {
  // wereld 1, heartless 1, links
  if (achtergrond == 4 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitB1L;
    getHitVideo = roxasGetHitB1L;
  }
  // wereld 1, heartless 1, rechts
  if (achtergrond == 4 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitB1R;
    getHitVideo = roxasGetHitB1R;
  }
  // wereld 1, heartless 2, links
  if (achtergrond == 4 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitB2L;
    getHitVideo = roxasGetHitB2L;
  }
  // wereld 1, heartless 2, rechts
  if (achtergrond == 4 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitB2R;
    getHitVideo = roxasGetHitB2R;
  }
  // wereld 1, heartless 3, links
  if (achtergrond == 4 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitB3L;
    getHitVideo = roxasGetHitB3L;
  }
  // wereld 1, heartless 3, rechts
  if (achtergrond == 4 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitB3R;
    getHitVideo = roxasGetHitB3R;
  }
  // wereld 2, heartless 1, links
  if (achtergrond == 5 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitA1L;
    getHitVideo = roxasGetHitA1L;
  }
  // wereld 2, heartless 1, rechts
  if (achtergrond == 5 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitA1R;
    getHitVideo = roxasGetHitA1R;
  }
  // wereld 2, heartless 2, links
  if (achtergrond == 5 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitA2L;
    getHitVideo = roxasGetHitA2L;
  }
  // wereld 2, heartless 2, rechts
  if (achtergrond == 5 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitA2R;
    getHitVideo = roxasGetHitA2R;
  }
  // wereld 2, heartless 3, links
  if (achtergrond == 5 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitA3L;
    getHitVideo = roxasGetHitA3L;
  }
  // wereld 2, heartless 3, rechts
  if (achtergrond == 5 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitA3R;
    getHitVideo = roxasGetHitA3R;
  }
  // wereld 3, heartless 1, links
  if (achtergrond == 6 && heartlessNummer == 1 && heartlessKant == "L") {
    hitVideo = roxasHitC1L;
    getHitVideo = roxasGetHitC1L;
  }
  // wereld 3, heartless 1, rechts
  if (achtergrond == 6 && heartlessNummer == 1 && heartlessKant == "R") {
    hitVideo = roxasHitC1R;
    getHitVideo = roxasGetHitC1R;
  }
  // wereld 3, heartless 2, links
  if (achtergrond == 6 && heartlessNummer == 2 && heartlessKant == "L") {
    hitVideo = roxasHitC2L;
    getHitVideo = roxasGetHitC2L;
  }
  // wereld 3, heartless 2, rechts
  if (achtergrond == 6 && heartlessNummer == 2 && heartlessKant == "R") {
    hitVideo = roxasHitC2R;
    getHitVideo = roxasGetHitC2R;
  }
  // wereld 3, heartless 3, links
  if (achtergrond == 6 && heartlessNummer == 3 && heartlessKant == "L") {
    hitVideo = roxasHitC3L;
    getHitVideo = roxasGetHitC3L;
  }
  // wereld 3, heartless 3, rechts
  if (achtergrond == 6 && heartlessNummer == 3 && heartlessKant == "R") {
    hitVideo = roxasHitC3R;
    getHitVideo = roxasGetHitC3R;
  }
}

// speelt de idle van de wereld waar je nu bent (blijft herhalen)
function speelIdle() {
  // wereld 1
  if (achtergrond == 4) {
    roxasIdleB.loop();
  }
  // wereld 2
  if (achtergrond == 5) {
    roxasIdleA.loop();
  }
  // wereld 3
  if (achtergrond == 6) {
    roxasIdleC.loop();
  }
}

// speelt een video vanaf het begin af
function startVid(v) {
  v.time(0);  // terug naar het begin
  v.play();   // afspelen
}

// wordt 1 keer uitgevoerd als het spel start
function setup() {
  // het speelveld
  createCanvas(700, 400);

  // haal de opgeslagen data terug en sla op als je de pagina sluit
  laadData();
  window.addEventListener("beforeunload", slaOp);

  // laad alle video's
  laadVideos();

  // de slaapvideo
  sleepingVideo = maakVideo("sleeping.mp4");
  // als de slaapvideo klaar is, stopt het slapen
  sleepingVideo.onended(function() {
    slapenActief = false;
    sleepingVideo.pause();
  });

  // de idle video's blijven herhalen
  roxasIdleB.loop();
  roxasIdleA.loop();
  roxasIdleC.loop();

  // de knop "Opnieuw beginnen"
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

  // de startknop van het gevecht
  startKnop = createButton("Start");
  startKnop.position(20, 340);
  startKnop.size(90, 35);
  startKnop.style("font-size", "18px");
  startKnop.style("background-color", "green");
  startKnop.style("color", "white");
  startKnop.mousePressed(startGevecht);
  startKnop.hide();

  // de stopknop van het gevecht
  stopKnop = createButton("Stop");
  stopKnop.position(120, 340);
  stopKnop.size(90, 35);
  stopKnop.style("font-size", "18px");
  stopKnop.style("background-color", "darkred");
  stopKnop.style("color", "white");
  stopKnop.mousePressed(stopGevecht);
  stopKnop.hide();
}

// wordt de hele tijd herhaald (elk frame)
function draw() {
  // kijk of de intro klaar is
  start();

  // vechten kan alleen in de drie werelden
  RoxasFight = achtergrond >= 4;

  // start/stop zijn alleen te zien in een wereld, en verdwijnen als je slaapt
  if (RoxasFight && !dood() && !roxasIntroStart && slapenActief == false) {
    startKnop.show();
    stopKnop.show();
  } else {
    startKnop.hide();
    stopKnop.hide();
  }

  // eerst de intro
  if (roxasIntroStart == true) {
    background(RoxasIntro);
  } else {
    // Roxas is dood: laat het dood-scherm zien
    if (dood()) {
      background(RoxasDead);
      opnieuwKnop.show();
      frameCount = 0;
    } else {
      // teken de achtergrond, Roxas en het ijsje
      Achtergronden();
      Roxas();
      Eten();
      EtenMove();
      Grondstoffen();

      // in een wereld: het gevecht
      if (RoxasFight) {
        GevechtUpdate();
        HeartlessTekenen();
        GevechtInfo();
      }
      StatIcoontjes();
      TimerTekenen();
      // het plaatje om het stats-menu te openen
      image(statsMenu, 600, 300, 100, 100);

      // de stats lopen langzaam terug (op de echte klok)
      if (slapenActief == false) {
        statsBijwerken(0);
      } else {
        // tijdens het slapen dalen ze niet
        resetStatTijden();
      }
      // elke 2 seconden opslaan (60 frames = ongeveer 1 seconde)
      if (frameCount % 120 == 0) {
        slaOp();
      }

      // als het stats-menu open is, laat de stats en knoppen zien
      if (statsMenuKnop == true) {
        Stats("honger", data.honger, 20);
        Stats("energie", data.energie, 60);
        Stats("geluk", data.geluk, 100);
        Stats("gezondheid", data.gezondheid, 140);
        MenuKnoppen();
      }
    }
  }
  // de slaapvideo boven op alles tekenen
  if (slapenActief &&
      sleepingVideo &&
      sleepingVideo.duration() > 0) {
    image(sleepingVideo, 0, 0, 700, 400);
  }
}

// hieronder staat alles voor het gevecht

// start het gevecht (startknop)
function startGevecht() {
  gevechtActief = true;
  etenZichtbaar = false; 
  speelIdle();  // de idle blijft loopen tot er een heartless komt
  // als er nog geen heartless is, komt er meteen een
  if (heartlessAanwezig == false) {
    volgendeSpawn = millis();
  }
}

// stopt het gevecht (stopknop)
function stopGevecht() {
  gevechtActief = false; // er komen geen nieuwe heartless meer
  // de heartless die er nu is verdwijnt ook meteen
  if (heartlessAanwezig == true) {
    hitVideo.pause();
    getHitVideo.pause();
    heartlessAanwezig = false;
  }
}

// zet het gevecht terug (bij het binnengaan van een wereld)
function resetGevecht() {
  gevechtActief = false;
  heartlessAanwezig = false;
  speelIdle(); // idle speelt zodra je de wereld binnengaat
}

// regelt het gevecht: nieuwe heartless, wachttijd en einde van de animatie
function GevechtUpdate() {
  let nu = millis();  // de tijd van nu in milliseconden

  if (heartlessAanwezig == false) {
    // geen heartless: idle speelt, en na de pauze komt er een nieuwe
    if (gevechtActief == true && nu >= volgendeSpawn) {
      // kies willekeurig heartless 1, 2 of 3
      heartlessNummer = floor(random(1, 4));
      // kies willekeurig links of rechts
      if (random() < 0.5) {
        heartlessKant = "L";
      } else {
        heartlessKant = "R";
      }
      // kies de juiste video's
      kiesVideos();

      // de heartless is er
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

// de heartless slaat Roxas: speel roxasGetHit
function heartlessSlaat() {
  heartlessStatus = 1;
  startVid(getHitVideo);
  heartlessEindTijd = millis() + ANIMATIETIJD;

  // Roxas wordt geraakt: -10 gezondheid en geluk
  data.gezondheid = max(0, data.gezondheid - 10);
  data.geluk = max(0, data.geluk - 10);
}

// Roxas slaat de heartless: speel roxasHit
function heartlessVerslagen() {
  heartlessStatus = 2;
  startVid(hitVideo);
  heartlessEindTijd = millis() + ANIMATIETIJD;

  // beloning: +20 geluk, munny erbij en -5 energie
  data.geluk = min(100, data.geluk + 20);
  data.munny = data.munny + MUNNY_BELONING;
  data.energie = max(0, data.energie - 5);

  // de heartless laat een grondstof vallen
  if (random() < 0.5) {
    data.stokjes = data.stokjes + 1;
  } else {
    data.toppen = data.toppen + 1;
  }
}

// tekent de video van de heartless die er nu is
function HeartlessTekenen() {
  if (heartlessAanwezig == true) {
    // Roxas slaat: teken de hit video
    if (heartlessStatus == 2) {
      tekenVideo(hitVideo);
    }
    // de heartless wacht of slaat: teken de get hit video
    else {
      tekenVideo(getHitVideo);
    }
  }
}

// laat je munny zien tijdens het gevecht
function GevechtInfo() {
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(16);
  text("munny: " + data.munny, 10, 25);
  noStroke();
  textSize(12);
}

// Roxas slaat links of rechts (kant is "L" of "R")
function Slaan(kant) {
  // alleen als er een heartless wacht
  if (heartlessAanwezig == true && heartlessStatus == 0) {
    if (heartlessKant == kant) {
      heartlessVerslagen(); // goede kant
    } else {
      heartlessSlaat();     // verkeerde kant
    }
  }
}

// zet alles terug als je opnieuw begint
function opnieuw() {
  // alle data terug naar het begin
  data.honger = 100;
  data.energie = 100;
  data.geluk = 100;
  data.gezondheid = 100;
  data.munny = 0;
  data.ijsjes = 3;
  data.stokjes = 2;
  data.toppen = 2;
  data.timerStart = Date.now();
  resetStatTijden();
  TopClicked = false;

  // terug naar de trap en de intro
  achtergrond = 0;
  statsMenuKnop = false;
  roxasIntroStart = true;
  EtenClicked = false;
  etenZichtbaar = false;

  // stop het slapen
  slapenActief = false;

  if (sleepingVideo) {
    sleepingVideo.pause();
  }

  // gevecht terugzetten, de reset opslaan en de knop verbergen
  resetGevecht();
  slaOp();
  opnieuwKnop.hide();
}

// laat de stats dalen op basis van de echte tijd die voorbij is
// minimum = tot hoe laag ze maximaal mogen dalen (0 tijdens het spelen)
function statsBijwerken(minimum) {
  data.honger = daal(data.honger, "hongerTijd", HONGER_TIJD, minimum);
  data.energie = daal(data.energie, "energieTijd", ENERGIE_TIJD, minimum);
  data.geluk = daal(data.geluk, "gelukTijd", GELUK_TIJD, minimum);
  data.gezondheid = daal(data.gezondheid, "gezondheidTijd", GEZONDHEID_TIJD, minimum);
}

// laat 1 stat dalen: waarde = de stat, tijdNaam = waar de laatste daaltijd staat, snelheid = ms per punt
function daal(waarde, tijdNaam, snelheid, minimum) {
  // hoeveel punten had de stat intussen moeten dalen?
  let punten = floor((Date.now() - data[tijdNaam]) / snelheid);
  if (punten > 0) {
    // alleen de verwerkte tijd opschuiven, zodat de rest niet verloren gaat
    data[tijdNaam] = data[tijdNaam] + punten * snelheid;
    return max(minimum, waarde - punten);
  }
  return waarde;
}

// zet de laatste daaltijd van alle stats op nu (bij slapen, opnieuw beginnen of een reset)
function resetStatTijden() {
  data.hongerTijd = Date.now();
  data.energieTijd = Date.now();
  data.gelukTijd = Date.now();
  data.gezondheidTijd = Date.now();
}

// tekent een stat met een balk (naam, waarde en hoogte)
function Stats(naam, waarde, y) {
  // gele tekst in Halloween Town, anders zwart
  if (achtergrond == 4) {
    fill(255, 255, 0);
  } else {
    fill(0);
  }

  // de tekst boven de balk
  text(naam + ": " + waarde, 600, y - 5);

  // de zwarte achtergrond van de balk
  fill(0);
  rect(600, y, 100, 10);

  // de rode balk met de waarde
  fill(255, 0, 0);
  rect(600, y, waarde, 10);
}

// tekent de knoppen van het menu
function MenuKnoppen() {
  // tijdens het vechten zijn de knoppen grijs (niet klikbaar)
  if ((gevechtActief || heartlessAanwezig)) {
    fill(90);
  } else {
    fill(139, 69, 19);
  }
  stroke(255, 0, 0);
  strokeWeight(2);

  // de drie knoppen
  rect(600, 170, 100, 25, 5);
  rect(600, 200, 100, 25, 5);
  rect(600, 230, 100, 25, 5);

  noStroke();
  fill(255);

  textAlign(CENTER, CENTER);

  // de tekst op de knoppen
  text("menu", 650, 182);
  text("eten", 650, 212);
  text("slapen", 650, 242);

  textAlign(LEFT, BASELINE);
}

// eten is overal zichtbaar behalve in de shop en op de wereldkaart
function etenScherm() {
  return achtergrond != 2 && achtergrond != 3;
}

// bepaalt of het ijsje zichtbaar is
function etenTeZien() {
  return etenScherm() &&
    (etenZichtbaar == true || achtergrond == 1);
}

// bepaalt of Roxas dood is
function dood() {
  return data.gezondheid <= 0 ||
    data.honger <= 0 ||
    data.energie <= 0 ||
    data.geluk <= 0;
}

// na 110 frames is de intro klaar
function start() {
  if (frameCount == 110) {
    roxasIntroStart = false;
  }
}

// tekent de juiste achtergrond
function Achtergronden() {
  // de trap
  if (achtergrond == 0) {
    background(stairs);
  }

  // het balkon
  if (achtergrond == 1) {
    background(balcon);
  }

  // de shop
  if (achtergrond == 2) {
    background(Shop);
    Healing();
  }

  // de wereldkaart met de vier werelden
  if (achtergrond == 3) {
    background(WorldMenu);

    image(World1, 120, 10, 170, 190);
    image(World2, 100, 170, 170, 190);
    image(World3, 450, 200, 170, 190);
    image(World4, 300, 50, 150, 170);

    image(gummiShip, xV, yV, 120, 100);
  }
}

// tekent Roxas
function Roxas() {
  // op de trap en het balkon
  if (achtergrond <= 1) {
    if (data.gezondheid < 30) {
    image(RoxasOngezond,200,200,200,200)     
  } else if (data.energie < 30) {
    image(RoxasMoe,200,200,200,200)      
  } else if (data.honger < 30) {
    image(RoxasHonger, 200, 200, 200, 200);   
  } else if (data.geluk < 30) {
    image(RoxasOngelukig, 200, 200, 200, 200);    
  } else {
    image(Roxas1, 200, 200, 200, 200);
  }
  }
  // in de drie werelden speelt de idle video (als er geen heartless is)
  if (achtergrond >= 4) {
    if (heartlessAanwezig == false) {
      // wereld 1
      if (achtergrond == 4) {
        tekenVideo(roxasIdleB);
      }
      // wereld 2
      if (achtergrond == 5) {
        tekenVideo(roxasIdleA);
      }
      // wereld 3
      if (achtergrond == 6) {
        tekenVideo(roxasIdleC);
      }
    }
  }
}
  // laat bovenin het scherm een plaatje zien voor elke stat onder 30
function StatIcoontjes() {
  // niet op de trap en het balkon, en niet tijdens het slapen
  if (achtergrond < 2 || slapenActief) {
    return;
  }

  // verzamel de plaatjes van de stats die te laag zijn
  let lijst = [];
  if (data.honger < 30) {
    lijst.push(RoxasHonger);
  }
  if (data.energie < 30) {
    lijst.push(RoxasMoe);
  }
  if (data.geluk < 30) {
    lijst.push(RoxasOngelukig);
  }
  if (data.gezondheid < 30) {
    lijst.push(RoxasOngezond);
  }
  // teken ze naast elkaar
  for (let i = 0; i < lijst.length; i++) {
    image(lijst[i], 150 + i * 60, 5, 75, 75);
  }
}
// Date.now() is de echte klok, dus het maakt niet uit of het spel op de achtergrond stilstaat
function timerMs() {
  return Date.now() - data.timerStart;
}

// maakt van milliseconden een tekst als 01:05:09 (uren:minuten:seconden)
function tijdTekst(ms) {
  let totaal = floor(ms / 1000);
  let uren = floor(totaal / 3600);
  let minuten = floor((totaal % 3600) / 60);
  let seconden = totaal % 60;
  return nf(uren, 2) + ":" + nf(minuten, 2) + ":" + nf(seconden, 2);
}

// tekent de timer bovenin het scherm
function TimerTekenen() {
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(14);
  text("tijd: " + tijdTekst(timerMs()), 480, 25);
  noStroke();
  textSize(12);
}

// het ijsje volgt je muis als je hem vast hebt
function EtenMove() {
  if (EtenClicked == true && etenScherm()) {
    image(SeaSaltIceCream, mouseX, mouseY, 50, 100);
  }
}

// tekent het ijsje linksboven
function Eten() {
  // alleen te zien als je nog ijsjes hebt
  if (EtenClicked == false && etenTeZien()) {
    image(SeaSaltIceCream, 50, 50, 50, 100);

    // hoeveel ijsjes je hebt
    fill(255);
    stroke(0);
    strokeWeight(3);
    text("x" + data.ijsjes, 105, 100);
    noStroke();
  }
}

// tekent het stokje en de top (de top volgt je muis als je hem vast hebt)
function Grondstoffen() {
  // alleen op het balkon en niet tijdens het slapen
  if (achtergrond != 1 || slapenActief) {
    TopClicked = false;
    return;
  }

  // het stokje en de top liggen los
  image(stokjeIcoon, 130, 310, 30, 40);
  if (TopClicked == false) {
    image(ijsTopIcoon, 30, 300, 60, 60);
  }

  // hoeveel je er hebt
  fill(255);
  stroke(0);
  strokeWeight(3);
  text("x" + data.toppen, 50, 375);
  text("x" + data.stokjes, 135, 375);
  noStroke();

  // de top volgt je muis
  if (TopClicked == true) {
    image(ijsTopIcoon, mouseX - 25, mouseY - 20, 60, 60);
  }
}

// tekent de shop (potions, knoppen, munny en ijsjes)
function Healing() {
  // de potions
  image(Potion, 250, 370, 150, 20);
  image(HiPotion, 250, 345, 150, 20);

  // de knoppen
  image(WorldMenuButton, 400, 355, 150, 50);
  image(SeaSaltIceCreamButton, 400, 330, 150, 50);

  // munny en inventory
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(14);
  text("munny: " + data.munny, 10, 25);
  text("ijsjes: " + data.ijsjes, 10, 45);
  noStroke();
  textSize(12);
}

// wordt uitgevoerd als je met de muis klikt
function mousePressed() {

  // de knoppen in het stats-menu
  if (statsMenuKnop == true &&
      mouseX > 600 &&
      mouseX < 700) {

    // tijdens het vechten werken de menuknoppen niet
    if ((gevechtActief || heartlessAanwezig) && mouseY > 170 && mouseY < 255) {
      return;
    }

    // naar de shop
    if (mouseY > 170 && mouseY < 195) {
      achtergrond = 2;
      resetGevecht();
      return;
    }

    // eten aan- of uitzetten (kan alleen als je niet vecht)
    if (mouseY > 200 &&
        mouseY < 225 &&
        etenScherm() &&
        !gevechtActief &&
        heartlessAanwezig == false) {

      etenZichtbaar = !etenZichtbaar;
      return;
    }

    // slapen en energie terugkrijgen (kan niet tijdens een gevecht)
    if (mouseY > 230 &&
        mouseY < 255 &&
        !gevechtActief &&
        heartlessAanwezig == false &&
        !slapenActief) {

      data.energie = min(100, data.energie + 50);
      data.geluk = max(0, data.geluk - 20);
      EtenClicked = false;
      slapenActief = true;

      // speel de slaapvideo
      sleepingVideo.time(0);
      sleepingVideo.play();

      return;
    }
  }

  // het stats-menu openen of sluiten
  if (mouseX > 600 &&
      mouseX < 700 &&
      mouseY > 300 &&
      mouseY < 400) {

    statsMenuKnop = !statsMenuKnop;
  }

  // de top van het ijsje pakken (alleen op het balkon)
  if (mouseX > 30 &&
      mouseX < 90 &&
      mouseY > 300 &&
      mouseY < 360 &&
      achtergrond == 1 &&
      !slapenActief) {

    if (TopClicked == true) {
      TopClicked = false;
    }
      else if (data.toppen > 0 && EtenClicked == false) {
      TopClicked = true;
      }
  }

  // met de top op het stokje klikken: een ijsje maken
  if (TopClicked == true &&
      mouseX > 130 &&
      mouseX < 160 &&
      mouseY > 290 &&
      mouseY < 380 &&
      achtergrond == 1 &&
      data.stokjes > 0 &&
      data.toppen > 0) {

    data.stokjes = data.stokjes - 1;
    data.toppen = data.toppen - 1;
    data.ijsjes = data.ijsjes + 1;
    TopClicked = false;
  }

  // een ijsje pakken
  if (mouseX > 50 &&
      mouseX < 100 &&
      mouseY > 50 &&
      mouseY < 150 &&
      etenTeZien() &&
      data.ijsjes > 0 &&
      heartlessAanwezig == false &&
      TopClicked == false) {

    EtenClicked = true;
  }

  // het ijsje aan Roxas geven (alleen als Roxas idle is)
  if (opRoxas() &&
      etenScherm() &&
      heartlessAanwezig == false &&
      !slapenActief &&
      EtenClicked == true) {

    data.honger = data.honger + 30;
    data.ijsjes = data.ijsjes - 1; // ijsje is op
    EtenClicked = false;

    // honger blijft 100 en je verliest gezondheid
    if (data.honger >= 100) {
      data.honger = 100;
      data.gezondheid = data.gezondheid - 10;
    }
  }

  // een potion kopen en gebruiken
  if (mouseX > 250 &&
      mouseX < 400 &&
      mouseY > 370 &&
      mouseY < 390 &&
      achtergrond == 2 &&
      data.munny >= PRIJS_POTION) {

    data.munny = data.munny - PRIJS_POTION;
    data.gezondheid = data.gezondheid + 10;

    // gezondheid al vol: je verliest geluk
    if (data.gezondheid >= 100) {
      data.gezondheid = 100;
      data.geluk = data.geluk - 10;
    }
  }

  // een hi-potion kopen en gebruiken
  if (mouseX > 250 &&
      mouseX < 400 &&
      mouseY > 345 &&
      mouseY < 365 &&
      achtergrond == 2 &&
      data.munny >= PRIJS_HIPOTION) {

    data.munny = data.munny - PRIJS_HIPOTION;
    data.gezondheid = data.gezondheid + 20;

    // gezondheid al vol: je verliest geluk
    if (data.gezondheid >= 100) {
      data.gezondheid = 100;
      data.geluk = data.geluk - 10;
    }
  }

  // wereld 1: Halloween Town
  if (mouseX > 120 &&
      mouseX < 120 + 170 &&
      mouseY > 10 &&
      mouseY < 10 + 190 &&
      achtergrond == 3) {

    achtergrond = 4;
    resetGevecht();
  }

  // wereld 2: Agrabah
  if (mouseX > 100 &&
      mouseX < 100 + 170 &&
      mouseY > 170 &&
      mouseY < 170 + 190 &&
      achtergrond == 3) {

    achtergrond = 5;
    resetGevecht();
  }

  // wereld 3: Olympus Coliseum
  if (mouseX > 450 &&
      mouseX < 450 + 170 &&
      mouseY > 200 &&
      mouseY < 200 + 190 &&
      achtergrond == 3) {

    achtergrond = 6;
    resetGevecht();
  }

  // terug naar de eerste achtergrond
  if (mouseX > 300 &&
      mouseX < 300 + 150 &&
      mouseY > 50 &&
      mouseY < 50 + 170 &&
      achtergrond == 3) {

    achtergrond = 0;
  }

  // vanuit de shop terug naar de wereldkaart
  if (mouseX > 400 &&
      mouseX < 550 &&
      mouseY > 355 &&
      mouseY < 405 &&
      achtergrond == 2) {
      etenZichtbaar = false
    achtergrond = 3;
  }

  // een ijsje kopen
  if (mouseX > 400 &&
      mouseX < 550 &&
      mouseY > 330 &&
      mouseY < 380 &&
      achtergrond == 2 &&
      data.munny >= PRIJS_IJSJE) {

    data.munny = data.munny - PRIJS_IJSJE;
    data.ijsjes = data.ijsjes + 1;
  }
}

// wordt uitgevoerd als je een toets indrukt
function keyPressed() {

  // tijdens de slaapvideo geen andere acties uitvoeren
  if (slapenActief) {
    return;
  }

  // spatiebalk om verder te gaan
  if (keyCode == 32 && !dood()) {

    if (!roxasIntroStart && achtergrond <= 2) {
      achtergrond++;
      etenZichtbaar = false;
    }

    roxasIntroStart = false;
  }

  // pijltjestoetsen om aan te vallen
  if (RoxasFight == true && !dood()) {

    // linkerpijltje
    if (keyCode === 37) {
      Slaan("L");
  }
    // rechterpijltje
   if (keyCode === 39) {
      Slaan("R");
    }
  }
}