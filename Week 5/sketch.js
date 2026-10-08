let menu = true;
let vraagNummer = 0;

// Juiste antwoorden  (0 = A, 1 = B, 2 = C, 3 = D)
let juisteOrigineel = [1, 2, 0, 1, 1, 2, 1, 0, 1, 2];
// Wordt na het husselen opnieuw berekend: waar staat het juiste antwoord nu?
let juisteAntwoorden = [];
// Per vraag de nieuwe volgorde van de antwoorden, bijv. [2, 0, 3, 1]
let volgorde = [];
// Onthoudt welk antwoord je hebt gekozen per vraag (-1 = nog niet beantwoord)
let gekozen = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
//alle antwoorden voor alle vragen
let antwoorden = [
  [
    "A. Brengt altijd een critical hit toe",
    "B. Laat de tegenstander flinchen als je als eerste beweegt",
    "C. Verhoogt je Attack",
    "D. Verwijdert stat boosts"
  ],
  [
    "A. Electric",
    "B. Fire",
    "C. Fairy",
    "D. Water"
  ],
  [
    "A. Verlaagt de Attack van tegenstanders",
    "B. Verlaagt hun Speed",
    "C. Verhoogt je Special Attack",
    "D. Voorkomt statusproblemen"
  ],
  [
    "A. Horsea",
    "B. Magikarp",
    "C. Feebas",
    "D. Goldeen"
  ],
  [
    "A. Verhoogt de Attack van je team",
    "B. Verdubbelt de Speed van je team tijdelijk",
    "C. Verlaagt de Defense van tegenstanders",
    "D. Maakt alle aanvallen priority"
  ],
  [
    "A. Lucario",
    "B. Arcanine",
    "C. Salamence",
    "D. Zeraora"
  ],
  [
    "A. Een Pokémon met hoge Speed",
    "B. Een Pokémon met lage Speed",
    "C. Een Pokémon met alleen priority moves",
    "D. Een Pokémon met hoge evasiveness"
  ],
  [
    "A. Ghost/Poison",
    "B. Ghost/Dark",
    "C. Psychic/Poison",
    "D. Dark/Poison"
  ],
  [
    "A. Om alle stat changes te verwijderen",
    "B. Om een beurt te leven en de aanval te scouten",
    "C. Om beide tegenstanders te raken",
    "D. Om direct HP te herstellen"
  ],
  [
    "A. Dragonite",
    "B. Tyranitar",
    "C. Slaking",
    "D. Metagross"
  ]
];

//menu image
function preload() {
  reset = loadImage("refresh-page-option.png");
  gyarados = loadImage("250px-0130Gyarados.png");
  gengar = loadImage("gengar.jpg");
  pokeball = loadImage("Poke_Ball.webp")
}

function setup() {
  createCanvas(400, 400);
//willekeurige volgorde van antwoorden
  husselAlles();
}

//willekeurige volgorde van antwoorden
function husselAlles() {
  volgorde = [];
  juisteAntwoorden = [];

  for (let v = 0; v < antwoorden.length; v++) {
    // shuffle nieuwe antwoorden
    let nieuw = shuffle([0, 1, 2, 3]);
    volgorde.push(nieuw);

    // Zoek op welke plek het juiste antwoord nu staat
    for (let i = 0; i < 4; i++) {
      if (nieuw[i] == juisteOrigineel[v]) {
        juisteAntwoorden.push(i);
      }
    }
  }
}

//menu
function draw() {
  if (menu == true) {
    background(255, 0, 0);
    start();
    image(pokeball, 50,50, 100,100)
  }
  //de knopen na het menu
  if (menu == false) {
    background(255);
    volgende();
    vorige();
    resetknop();
    text(frameCount,350,20);
    // vragen
    if (vraagNummer == 1) {
      vraag("1. Wat doet Fake Out?");
      antwoordenA(0);
    }

    if (vraagNummer == 2) {
      vraag("2. Welk type is super effectief tegen Dragon?");
      antwoordenA(1);
    }

    if (vraagNummer == 3) {
      vraag("3. Wat doet de ability Intimidate?");
      antwoordenA(2);
    }

    if (vraagNummer == 4) {
      vraag("4. Welke Pokémon evolueert in deze pokemon?");
      image(gyarados, 200, 80, 200, 200);
      antwoordenA(3);
    }

    if (vraagNummer == 5) {
      vraag("5. Wat is het effect van Tailwind?");
      antwoordenA(4);
    }

    if (vraagNummer == 6) {
      vraag("6. Welke Pokémon is een pseudo-legendary?");
      antwoordenA(5);
    }

    if (vraagNummer == 7) {
      vraag("7. Wie heeft voordeel onder Trick Room?");
      antwoordenA(6);
    }

    if (vraagNummer == 8) {
      vraag("8. Welk type heeft deze pokemon?");
      image(gengar, 200, 80, 200, 200);
      antwoordenA(7);
    }

    if (vraagNummer == 9) {
      vraag("9. Waarom gebruiken je Protect in doubles?");
      antwoordenA(8);
    }

    if (vraagNummer == 10) {
      vraag("10. Wie heeft de hoogste base stat total?");
      antwoordenA(9);
    }
    //de juist en fout pop up
    feedback();
    //de eindscore
    einde();
  }
}
function timer (){
  x += 0.1 * deltaTime;  // beweegt 0.1 pixels per milliseconde
  fill(255,0,0)
  circle(x, 390, 50);
}
//de startknop
function start() {
  textSize(50);
  fill(0);
  textAlign(CENTER);
  text("start", 200, 200);
}

//de vragen functie
function vraag(tekst) {
  textSize(18);
  fill(0);
  textAlign(LEFT);
  text(tekst, 10, 50);
}

// de antwoord functie
//nummer is voor welke vraag
function antwoordenA(nummer) {
  textSize(15);
  textAlign(LEFT);
  noStroke();

  let letters = ["A", "B", "C", "D"];

  for (let i = 0; i < 4; i++) {
    // kleur het gekozen antwoord groen (goed) of rood (fout)
    if (gekozen[nummer] == i) {
      if (i == juisteAntwoorden[nummer]) {
        fill(0, 170, 0);
      } else {
        fill(220, 0, 0);
      }
    } else {
      fill(0);
    }

    // de tekst op de gehusselde plek en haal de oude letter ("A.") eraf
    let tekst = antwoorden[nummer][volgorde[nummer][i]].substring(3);
    // de nieuwe letter ervoor
    text(letters[i] + ". " + tekst, 10, 90 + i * 30);
  }
}

// Laat "Juist!" of "Fout!" zien
function feedback() {
  let nummer = vraagNummer - 1;
  if (nummer < 0) return;
  //als het nog niet gekozen is
  if (gekozen[nummer] != -1) {
    textSize(24);
    textAlign(CENTER);
    noStroke();
    //als het gekozen nummer het juiste antwoord is is het juist
    if (gekozen[nummer] == juisteAntwoorden[nummer]) {
      fill(0, 170, 0);
      text("Juist!", 200, 260);
    } else {
      fill(220, 0, 0);
      text("Fout!", 200, 260);
    }
    textAlign(LEFT);
  }
}

//volgende knop
function volgende() {
  strokeWeight(5);
  stroke(0);
  fill(255);
  rect(250, 300, 100, 50);
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT);
  text("volgende", 260, 330);
}

//vorige knop
function vorige() {
  strokeWeight(5);
  stroke(0);
  fill(255);
  rect(50, 300, 100, 50);
  fill(0);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("vorige", 60, 330);
}

//resetknop
function resetknop() {
  image(reset, 175, 325, 50, 50);
}

// Kijkt of alle vragen zijn beantwoord
function alleBeantwoord() {
  for (let i = 0; i < gekozen.length; i++) {
    if (gekozen[i] == -1) {
      return false;
    }
  }
  return true;
}

// Laat "Einde!" en de score zien op de laatste vraag
function einde() {
  if (vraagNummer == 10 && alleBeantwoord()) {
    let score = 0;
    for (let i = 0; i < gekozen.length; i++) {
      if (gekozen[i] == juisteAntwoorden[i]) {
        score++;
      }
    }

    fill(0);
    noStroke();
    textSize(22);
    textAlign(CENTER);
    text("Einde! Score: " + score + "/10", 200, 392);
    textAlign(LEFT);
  }
}

function mousePressed() {
  //start knop
  if (menu == true) {
    if (mouseX > 150 && mouseX < 250 &&
        mouseY > 150 && mouseY < 250) {
      menu = false;
      vraagNummer = 1;
    }
  }

  else {
    // Antwoord aanklikken bepaalend bij welk antwoord het is
    let nummer = vraagNummer - 1;
    for (let i = 0; i < 4; i++) {
      let y = 90 + i * 30;
      // Klikgebied: rond de tekstregel
      if (mouseX > 10 && mouseX < 390 &&
          mouseY > y - 18 && mouseY < y + 8) {
        // Alleen kiezen als je nog niet geantwoord hebt
        if (gekozen[nummer] == -1) {
          gekozen[nummer] = i;
        }
      }
    }

    // Volgende
    if (mouseX > 250 && mouseX < 350 &&
        mouseY > 300 && mouseY < 350) {
      if (vraagNummer < 10) {
        vraagNummer++;
        frameCount = 0;
      }
    }

    // Vorige
    if (mouseX > 50 && mouseX < 150 &&
        mouseY > 300 && mouseY < 350) {
      if (vraagNummer > 1) {
        vraagNummer--;
      }
    }

    // terug naar menu
    if (mouseX > 175 && mouseX < 225 &&
        mouseY > 325 && mouseY < 375) {
      menu = true;
      // Alle antwoorden wissen
      for (let i = 0; i < gekozen.length; i++) {
        gekozen[i] = -1;
      }
      // Nieuwe willekeurige volgorde voor de volgende ronde
      husselAlles();
      frameCount = 0;
    }
  }
}