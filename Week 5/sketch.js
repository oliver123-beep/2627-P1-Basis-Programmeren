let menu = true;
let vraagNummer = 0;
let antwoorden = [
  "A.Brengt altijd een critical hit toe",
  "B.Flincht de tegenstander als eerste",
  "C.Verhoogt je Attack",
  "D.Verwijdert stat boosts",
  "A. Electric",
  "B. Fire",
  "C. Fairy",
  "D. Water",
  "A.Verlaagt de Attack van tegenstanders",
  "B. Verlaagt hun Speed",
  "C. Verhoogt je Special Attack",
  "D. Voorkomt statusproblemen",
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (menu == true) {
    background(255, 0, 0);
    start();
  }

  if (menu == false) {
    background(220);
    volgende();
    vorige();

    if (vraagNummer == 1) {
      vraag("1.Wat doet Fake Out?");
      antwoordenA();
    }

    if (vraagNummer == 2) {
      vraag("2. Welk type is supereffectief tegen Dragon?");
      antwoordenA();
    }
    if (vraagNummer == 3) {
      vraag("3.Wat doet de ability Intimidate?");
      antwoordenA();
    }
  }
}

function start() {
  textSize(50);
  fill(0);
  text("start", 200, 200);
}

function vraag(tekst) {
  textSize(18);
  fill(0);
  textAlign(LEFT);
  text(tekst, 10, 50);
}
function antwoordenA() {
  textSize(15);
  fill(0);
  for(i = 0; i < 4; i++) 
  {
    text(antwoorden[i], 10, 90 + i * 30);
  }
  
}

function volgende() {
  strokeWeight(5);
  fill(255);
  rect(250, 300, 100, 50);
  fill(0);
  textSize(20);
  text("volgende", 260, 325);
}

function vorige() {
  strokeWeight(5);
  fill(255);
  rect(50, 300, 100, 50);
  fill(0);
  textSize(20);
  text("vorige", 60, 325);
}

function mousePressed() {
  // Startknop
  if (menu == true) {
    if (mouseX > 200 && mouseX < 300 &&
        mouseY > 170 && mouseY < 200) {
      menu = false;
      vraagNummer += 1;
      console.log("start")
    }
  }

  // Volgende-knop
  if (menu == false) {
    if (mouseX > 250 && mouseX < 350 &&
        mouseY > 300 && mouseY < 350) {
        vraagNummer += 1;
        console.log("volgende")
        antwoorden.splice(0,4)
      
    }

    // Vorige-knop
    if (mouseX > 50 && mouseX < 150 &&
        mouseY > 300 && mouseY < 350) {
        vraagNummer -= 1;
        console.log("vorige")
        antwoorden.unshift()
    }
  }
}