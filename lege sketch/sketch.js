let grootte = []
let richting = []
let x = []
let y = []
let z = []
let kleuren = []
let vorm = []
let tijd = []

let boxSound
let sphereSound
let coneSound
let eyeZ

function preload() {
  boxSound = loadSound("box.mp3")
  sphereSound = loadSound("sphere.mp3")
  coneSound = loadSound("cone.mp3")
}

function setup() {
  createCanvas(800, 600, WEBGL);
// loop voor alles
  for (let i = 0; i < 100; i++) {
    // kleuren
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

    // random tijd
    tijd.push(random(100));
  }

  eyeZ = 800;
}

function draw() {
  background(220);
  orbitControl();

  // vormen plaatsen
  for (let i = 0; i < 100; i++) {

    // een vakje komt als de frameCount langs de random wachtijd gaat 
    if (frameCount > tijd[i]) {

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
        tijd[i] = frameCount + random(30, 150);

        // nieuwe random plaats
        x[i] = random(-400, 300);
        y[i] = random(-300, 250);
        z[i] = random(-300, 300);

        // nieuwe random kleur
        kleuren[i] = color(random(255), random(255), random(255));

        // nieuwe random vorm
        vorm[i] = random([0, 1, 2]);
      }

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

function mousePressed() {

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  let Q = createVector(0, 0, eyeZ);
  let v = createVector(mx, my, -eyeZ);

  let dichtstbij = eyeZ * 10;
  let geraakt = -1;

  for (let i = 0; i < 100; i++) {

    if (grootte[i] > 0) {

      let minX = x[i] - grootte[i] / 2;
      let maxX = x[i] + grootte[i] / 2;

      let minY = y[i] - grootte[i] / 2;
      let maxY = y[i] + grootte[i] / 2;

      let minZ = z[i] - grootte[i] / 2;
      let maxZ = z[i] + grootte[i] / 2;

      let tx1 = (minX - Q.x) / v.x;
      let tx2 = (maxX - Q.x) / v.x;

      let ty1 = (minY - Q.y) / v.y;
      let ty2 = (maxY - Q.y) / v.y;

      let tz1 = (minZ - Q.z) / v.z;
      let tz2 = (maxZ - Q.z) / v.z;

      let tmin = max(
        min(tx1, tx2),
        min(ty1, ty2),
        min(tz1, tz2)
      );

      let tmax = min(
        max(tx1, tx2),
        max(ty1, ty2),
        max(tz1, tz2)
      );

      if (tmax >= 0 && tmin <= tmax) {

        if (tmin < dichtstbij) {

          dichtstbij = tmin;
          geraakt = i;
        }
      }
    }
  }

  if (geraakt != -1) {

    if (vorm[geraakt] == 0) {
      boxSound.play();
    }

    if (vorm[geraakt] == 1) {
      sphereSound.play();
    }

    if (vorm[geraakt] == 2) {
      coneSound.play();
    }

    kleuren[geraakt] = color(
      random(255),
      random(255),
      random(255)
    );
  }
}