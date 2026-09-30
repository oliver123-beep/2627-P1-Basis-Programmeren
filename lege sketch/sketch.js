
let grootte = []
let richting = []
let x = []
let y = []
let z = []
let kleuren = []
let vorm = []
let wachtijd = []

let aantal = 0
let soundBox

// 3 vaste blokken
let blokX = [-200, 0, 200]
let blokY = [0, 0, 0]
let blokZ = [0, 0, 0]


function preload() {

  soundBox = loadSound("audio_9afb73ceb5.mp3")

}


function setup() {

  createCanvas(800, 600, WEBGL)

  

  // random aantal vormen

  aantal = round(random(100, 150))

  for (let i = 0; i < aantal; i++) {

    // random kleuren

    kleuren.push(color(
      random(255),
      random(255),
      random(255)
    ))

    // random plekken

    x.push(random(-400, 300))
    y.push(random(-300, 250))
    z.push(random(-300, 300))

    // random vorm

    vorm.push(random([0, 1, 2]))

    // grootte en richting

    grootte.push(0)
    richting.push(1)

    // random wachttijd

    wachtijd.push(random(100))

  }

}


function draw() {

  background(220)
  orbitControl();


  // 3 vaste blokken

  for (let i = 0; i < 3; i++) {

    push()

    fill(100, 100, 255)

    translate(
      blokX[i],
      blokY[i],
      blokZ[i]
    )

    box(80)

    pop()

  }


  // random vormen

  for (let i = 0; i < aantal; i++) {

    if (frameCount > wachtijd[i]) {

      // groter en kleiner maken

      grootte[i] += richting[i]


      if (grootte[i] >= 50) {

        richting[i] = -1

      }


      // als de vorm weg is

      if (grootte[i] <= 0) {

        grootte[i] = 0
        richting[i] = 1

        // nieuwe wachttijd

        wachtijd[i] = frameCount + random(30, 150)

        // nieuwe plek

        x[i] = random(-400, 300)
        y[i] = random(-300, 250)
        z[i] = random(-300, 300)

        // nieuwe kleur

        kleuren[i] = color(
          random(255),
          random(255),
          random(255)
        )

        // nieuwe vorm

        vorm[i] = random([0, 1, 2])

      }


      push()

      fill(kleuren[i])

      translate(
        x[i],
        y[i],
        z[i]
      )


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


// spatie = nieuwe kleuren

function keyPressed() {

  if (keyCode == 32) {

    for (let i = 0; i < aantal; i++) {

      kleuren[i] = color(
        random(255),
        random(255),
        random(255)
      )

    }

    soundBox.play()

  }

}


// klikken op de 3 blokken

function mousePressed() {

  // muispositie omzetten naar WEBGL
  let muisX = mouseX - width / 2
  let muisY = mouseY - height / 2


  // kijken naar de 3 blokken

  for (let i = 0; i < 3; i++) {

    // afstand van muis tot blok op het scherm

    let afstandX = abs(muisX - blokX[i])
    let afstandY = abs(muisY - blokY[i])

    // neppe hitbox want het werkt alleen op x 40 en y 40 en niet op de blokken
    if (afstandX < 40 && afstandY < 40) {
      soundBox.play()
    }

  }

}
