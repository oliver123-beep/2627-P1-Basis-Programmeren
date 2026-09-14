let score = 0 


function setup() {
  createCanvas(400, 200);
  score = random(100)
}

function draw() {
  background(220);
  text(score,50,50)
  

if (score >= 90) {
  text("Uitstekend!", 100, 100);
} else if (score > 70) {
  text("Goed!", 100, 100);
} else if (score > 50) {
  text("Voldoende", 100, 100);
} else {
  text("Onvoldoende", 100, 100);
}
  
    
}