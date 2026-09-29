let kleurenR = []
let getalR = []

function setup() {
  createCanvas(380, 350);
  for (let i = 0; i < 5; i++) {
    kleurenR.push(color(random(255), random(255), random(255)));
  }
  for (let i = 0; i < 12; i++) {
    getalR.push(round(random(0,100)));
  }
}

function draw() {
  background(220);
  text("1." ,20, 15);
  text("2.", 20, 100);
  text("3.", 20, 190);
  text("4.", 20, 250);
  text("5.", 120, 15);
  text("6.", 120, 100);
  text("7.", 120, 190);
  text("8.", 120, 280);
  text("9.", 240, 15);
  
let kleuren = [ "red", "green", "blue", "purple", "yellow"]
for ( let i = 0; i < kleuren.length; i++) {
  fill(kleuren[i])
  text((kleuren[i]),40, 10 + i * 20)
}
  kleuren.shift("red");
  kleuren.push("red");
 for ( let i = 0; i < kleuren.length; i++) {
  fill(kleuren[i])
  text((kleuren[i]),40, 100 + i * 20)
}
  kleuren.splice(1,2)
for ( let i = 0; i < kleuren.length; i++) {
  fill(kleuren[i])
  text((kleuren[i]),40, 200 + i * 20)
}
fill(0)
let getallen = [400, 240, 10, 490, 30, 60, 244, 500, 301, 300]
for (let i = 0; i < getallen.length; i++) {
  if (getallen[i] < 300){
    text(getallen[i], 40, 250 + i * 10)
  }
  }
let totaal = 0
let getalA = [3, 55, 93, 20, 102, 6]
let getalB = [14, 22, 80, 5]
  for (let i = 0; i < getalA.length; i++) {
    totaal = totaal + getalA[i];
  }
  for (let i = 0; i < getalB.length; i++) {
    totaal = totaal + getalB[i];
  }
  text(totaal, 150,40)

let woord = "Overheidsfinancieringstekort."
let E = 0
  for(let i = 0; i < woord.length; i++)
  {
    if ( woord[i] == "e")
    {
      E++;
    }
  }
  text(E,150, 100 )
let kleurenA = [ "red", "green", "blue", "purple", "yellow"]
  kleurenA.sort();
  for ( let i = 0; i < kleurenA.length; i++) {
    fill(kleurenA[i])
    text(kleurenA[i],150, 200 + i * 20)
  }
  fill(0)


for (let i = 0; i < kleurenR.length; i++) {
    fill(kleurenR[i]);
    rect(100 + i * 30, 300, 30, 30);
  }
  fill(0)

 let totaalR = 0;
 let gem = 0;
for (let i = 0; i < getalR.length; i++) {
   text(getalR[i], 300, 20 + i * 15);
   totaalR = totaalR + getalR[i]
   gem = round(totaalR/12)
}  


text("totaal: "+totaalR ,300, 200 )
text("gem: "+gem, 300,210)

}

