let grootte = []
let richting = []
let x = []
let y = []
let z = []
let kleuren = []
let vorm = []
let wachtijd = []

let aantal = 0

function preload () {
  soundBox = loadSound ("audio_9afb73ceb5 - kopie.mp3")
}

function setup() {
  createCanvas(800, 600, WEBGL);
// loop voor random getal waardoor tussen 100 en 150 vormen komen
  aantal = round(random(100, 150));
  for (let i = 0; i < aantal; i++) {
    // random kleuren
    kleuren.push(color(random(255), random(255), random(255)));
    // 10 random plekken in de array zetten
    x.push(random(-400, 300));
    y.push(random(-300, 250));
    z.push(random(-300, 300));
    // random vorm kiezen 0 is box en 1 is circle
    vorm.push(random([0, 1, 2]));
    // groote eigen array en richting eigen array
    grootte.push(0);
    richting.push(1);
    // random wachttijd
    wachtijd.push(random(100));
  }
}

function draw() {
  background(220);
  orbitControl();

  // vormen plaatsen
  for (let i = 0; i < aantal; i++) {
    // een vakje komt als de frameCount langs de random wachtijd gaat 
    if (frameCount > wachtijd[i]) {
      // Groter en kleiner maken
      grootte[i] += richting[i];
      //kleiner
      if (grootte[i] >= 50) {
        richting[i] = -1;
      }
      //groter
      // Als de vorm weg is
      if (grootte[i] <= 0) {
        grootte[i] = 0;
        richting[i] = 1;
        // als de vorm verdwijnt(0) krijgt het een nieuwe wachtijd
        wachtijd[i] = frameCount + random(30, 150);
        // nieuwe random plaats
        x[i] = random(-400, 300);
        y[i] = random(-300, 250);
        z[i] = random(-300, 300);
        // nieuwe random kleur
        kleuren[i] = color(random(255), random(255), random(255));
        // nieuwe random vorm
        vorm[i] = random([0, 1, 2]);
      }
    //vormen maken
      //onthoud
      push();
      //kleur
      fill(kleuren[i]);
      //positie van 3d vormen
      translate(x[i], y[i], z[i]);
      //als de random vorm 0 zegt is het een doos en 1 is een sphere en 2 is een cone
      if (vorm[i] == 0) {
        box(grootte[i]);
      } else if (vorm[i] == 1) {
        sphere(grootte[i]);
      } else {
        cone(grootte[i]);
      }
      //reset
      pop();
    }
  }
}
// als je op spatie klikt krig je een nieuwe random kleur
function keyPressed () {
if (keyCode == 32){
  for (let i = 0; i < aantal; i++) {
    kleuren[i] = color(random(255), random(255), random(255));
  }
  soundBox.play();
}
}
function mousePressed()
{
  for (let i = 0; i < aantal; i++) {
    if (grootte[i] > 40){
      if (mouseX < box && mouseX > box && mouseY < box && mouseY > box) {
        soundBox.play();
      }
    } 
  }
}
 