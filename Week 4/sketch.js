let grootte = [];   // huidige grootte van elke vorm
let richting = [];  // 1 = groeien, -1 = krimpen
let x = [];         // x-positie
let y = [];         // y-positie
let z = [];         // z-positie (diepte)
let kleuren = [];   // kleur van elke vorm
let vorm = [];      // 0 = box, 1 = sphere, 2 = cone
let tijd = [];      // frame waarop de vorm mag verschijnen

let boxSound;
let sphereSound;
let coneSound;

// Aantal vormen
const AANTAL = 100;



let pickAangevraagd = false; // true als er net geklikt is
let pressX, pressY;          // plek waar de muis werd ingedrukt
let clickX, clickY;          // plek waar er geklikt is (nieuw)

// preload laadt bestanden voordat de sketch start
function preload() {
  // geluiden voor de verschillende vormen
  boxSound = loadSound("audio_9afb73ceb5 - kopie.mp3");
  sphereSound = loadSound("soundreality-pop-423717.mp3");
  coneSound = loadSound("universfield-bright-notification-352449.mp3");
}

function setup() {
  createCanvas(800, 600, WEBGL);

  // 1 schermpixel = 1 canvaspixel, zodat get() de juiste pixel pakt
  pixelDensity(1);

  // voor elke vorm begin plaats maken
  for (let i = 0; i < AANTAL; i++) {
    // random kleur
    kleuren.push(color(random(255), random(255), random(255)));

    // random plek in de ruimte
    x.push(random(-400, 300));
    y.push(random(-300, 250));
    z.push(random(-300, 300));

    // random vorm kiezen: 0 = box, 1 = sphere, 2 = cone
    vorm.push(random([0, 1, 2]));

    // begint onzichtbaar (grootte 0) en gaat eerst groeien
    grootte.push(0);
    richting.push(1);

    // random wachttijd voordat de vorm verschijnt
    tijd.push(random(100));
  }
}

function draw() {
  // als er geklikt is, doen we een onzichtbare "pick-pass" die de tekenscene 1 keer laat tekenen
  // dit gebeurt eerst, zodat je klikt op het beeld dat je net zag
  if (pickAangevraagd) {
    pickAangevraagd = false;

    // teken de scène met voor elke vorm een unieke kleur
    tekenScene(true);

    // lees de kleur van de pixel uit op de plek van de klik: [r, g, b, a]
    let c = get(clickX, clickY);

    // het id zit in het rode kanaal (id = index + 1, want 0 = niets)
    let geraakt = c[0] - 1;

    // als het een geldig id is, is er een vorm geraakt
    if (geraakt >= 0 && geraakt < AANTAL) {
      vormGeraakt(geraakt);
    }
  }

  // camera draaien, zoomen en pannen met de muis
  orbitControl();

  // eerst de animatie bijwerken (één keer per frame)
  updateVormen();

  // daarna de echte scène tekenen (de pick-pass wordt nooit getoond)
  tekenScene(false);
}

// laat de vormen groeien, krimpen en opnieuw verschijnen
function updateVormen() {
  for (let i = 0; i < AANTAL; i++) {

    // pas als de wachttijd voorbij is, mag de vorm verschijnen
    if (frameCount > tijd[i]) {

      // groter of kleiner maken
      grootte[i] += richting[i];

      // bij grootte 50 gaat de vorm weer krimpen
      if (grootte[i] >= 50) {
        richting[i] = -1;
      }

      // als de vorm weg is (grootte 0)
      if (grootte[i] <= 0) {
        grootte[i] = 0;
        richting[i] = 1; // de volgende keer weer groeien

        // nieuwe wachttijd voor de volgende verschijning
        tijd[i] = frameCount + random(30, 150);

        // nieuwe random plek
        x[i] = random(-400, 300);
        y[i] = random(-300, 250);
        z[i] = random(-300, 300);

        // nieuwe random kleur
        kleuren[i] = color(random(255), random(255), random(255));

        // nieuwe random vorm
        vorm[i] = random([0, 1, 2]);
      }
    }
  }
}

// tekent alle vormen
// pickModus = true  -> onzichtbare pick-pass met id-kleuren
// pickModus = false -> de normale weergave
function tekenScene(pickModus) {
  // in de pick-pass is de achtergrond zwart (= id 0 = niets geraakt)
  background(220);

  // in de pick-pass geen rand, anders verpest de rand de id-kleuren
  if (pickModus) {
    noStroke();
  } else {
    // in de normale weergave wel een zwarte rand
    stroke(0);
    strokeWeight(1);
  }

  for (let i = 0; i < AANTAL; i++) {

    // alleen vormen tekenen die al verschenen zijn en zichtbaar zijn
    if (frameCount > tijd[i] && grootte[i] > 0) {

      // onthoud de huidige instellingen
      push();

      if (pickModus) {
        // unieke kleur per vorm: het id zit in het rode kanaal
        fill(i + 1, 0, 0);
      } else {
        // de echte kleur van de vorm
        fill(kleuren[i]);
      }

      // verplaats naar de positie van deze vorm
      translate(x[i], y[i], z[i]);

      // teken de juiste vorm
      if (vorm[i] == 0) {
        box(grootte[i]);
      } else if (vorm[i] == 1) {
        sphere(grootte[i]);
      } else {
        cone(grootte[i]);
      }

      // zet de instellingen weer terug
      pop();
    }
  }
}

// wordt aangeroepen als een vorm is aangeklikt
function vormGeraakt(i) {
  // speel het geluid dat bij de vorm hoort
  if (vorm[i] == 0) {
    boxSound.play();
  } else if (vorm[i] == 1) {
    sphereSound.play();
  } else {
    coneSound.play();
  }

  // geef de vorm een nieuwe random kleur
  kleuren[i] = color(random(255), random(255), random(255));
}

// muisknop ingedrukt
function mousePressed() {
  // browsers blokkeren geluid tot er geklikt is, dit staat het toe
  userStartAudio();

  // onthoud waar de muis werd ingedrukt
  pressX = mouseX;
  pressY = mouseY;
}

// muisknop losgelaten
function mouseReleased() {
  // het telt alleen als klik als de muis nauwelijks bewogen is,
  // anders was je aan het draaien met orbitControl
  if (dist(mouseX, mouseY, pressX, pressY) < 10) {
    pickAangevraagd = true;


    // onthoud waar er geklikt is
    clickX = mouseX;
    clickY = mouseY;
  }
}

// spatiebalk: alle vormen een nieuwe kleur
function keyPressed() {
  if (keyCode === 32) {
    for (let i = 0; i < AANTAL; i++) {
      kleuren[i] = color(random(255), random(255), random(255));
    }

    // voorkomt dat de pagina scrolt bij de spatiebalk
    return false;
  }
}