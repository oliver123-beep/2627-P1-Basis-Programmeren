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

const AANTAL = 100

let pickAangevraagd = false
let pressX, pressY

function preload() {
  boxSound = loadSound("audio_9afb73ceb5 - kopie.mp3")
  sphereSound = loadSound("soundreality-pop-423717.mp3")
  coneSound = loadSound("universfield-bright-notification-352449.mp3")
}

function setup() {
  createCanvas(800, 600, WEBGL)

  // nodig voor color picking
  setAttributes('antialias', false)
  pixelDensity(1)

  for (let i = 0; i < AANTAL; i++) {
    kleuren.push(color(random(255), random(255), random(255)))
    x.push(random(-400, 300))
    y.push(random(-300, 250))
    z.push(random(-300, 300))
    vorm.push(random([0, 1, 2])) // 0 = box, 1 = sphere, 2 = cone
    grootte.push(0)
    richting.push(1)
    tijd.push(random(100))
  }
}

function draw() {
  orbitControl()
  updateVormen()

  // klik afhandelen met een onzichtbare pick-pass
  if (pickAangevraagd) {
    pickAangevraagd = false
    tekenScene(true)

    let c = get(mouseX, mouseY)
    let geraakt = c[0] - 1 // id = index + 1, 0 = niets

    if (geraakt >= 0 && geraakt < AANTAL) {
      vormGeraakt(geraakt)
    }
  }

  tekenScene(false)
}

function updateVormen() {
  for (let i = 0; i < AANTAL; i++) {
    if (frameCount > tijd[i]) {
      grootte[i] += richting[i]

      if (grootte[i] >= 50) {
        richting[i] = -1
      }

      if (grootte[i] <= 0) {
        grootte[i] = 0
        richting[i] = 1
        tijd[i] = frameCount + random(30, 150)

        x[i] = random(-400, 300)
        y[i] = random(-300, 250)
        z[i] = random(-300, 300)
        kleuren[i] = color(random(255), random(255), random(255))
        vorm[i] = random([0, 1, 2])
      }
    }
  }
}

function tekenScene(pickModus) {
  background(pickModus ? 0 : 220)
  strokeWeight(1);

  for (let i = 0; i < AANTAL; i++) {
    if (frameCount > tijd[i] && grootte[i] > 0) {
      push()

      if (pickModus) {
        fill(i + 1, 0, 0)
      } else {
        fill(kleuren[i])
      }

      translate(x[i], y[i], z[i])

      if (vorm[i] == 0) {
        box(grootte[i])
      } else if (vorm[i] == 1) {
        sphere(grootte[i])
      } else {
        cone(grootte[i])
      }

      pop()
    }
  }
}

function vormGeraakt(i) {
  // geluid per vorm
  if (vorm[i] == 0) {
    boxSound.play()
  } else if (vorm[i] == 1) {
    sphereSound.play()
  } else {
    coneSound.play()
  }

  // nieuwe random kleur
  kleuren[i] = color(random(255), random(255), random(255))
}

function mousePressed() {
  userStartAudio() // laat de browser geluid toe
  pressX = mouseX
  pressY = mouseY
}

// telt alleen als klik als je niet gesleept hebt met orbitControl
function mouseReleased() {
  if (dist(mouseX, mouseY, pressX, pressY) < 5) {
    pickAangevraagd = true
  }
}