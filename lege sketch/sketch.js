// @ts-nocheck
let vakje = 0;
let vakjeGrootte = 70;
let marginRight = 20;
let marginTop = 20;
let rows = 3;
let columns = 3;
let speler1 = true
let speler2 = false
let beurt = 1
let vakjeskleur

let vakjes = []

function setup() {
    createCanvas(400, 400);
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            vakjes.push(0);
        }
    }
}

function draw() {
    background("grey");
   text(vakjes, 20,20)
   text ( beurt, 20, 400)
    vakjes[0]
    vakjes[1]
    vakjes[2]

   
    
    let vakjesCounter = 0;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            
            let vakjeXPos = marginRight + x * (vakjeGrootte + 5);
            let vakjeYPos = marginTop + y * (vakjeGrootte + 5);

            if (vakjes[vakjesCounter] == 0){
                fill("white")
            }
           if (vakjes[vakjesCounter] == 1 ) {
              fill("blue")
                
            }
            if (vakjes[vakjesCounter] == 2){
              fill("red")
            }
           

            rect(vakjeXPos, vakjeYPos, vakjeGrootte, vakjeGrootte,5);
            vakjesCounter++;
        }
    }
   
}


function mousePressed(){
    if (mouseButton == "left"){
        let vakjesCounter = 0;

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                
                let vakjeXPos = marginRight + x * (vakjeGrootte + 5);
                let vakjeYPos = marginTop + y * (vakjeGrootte + 5);
                
                if (mouseX > vakjeXPos && mouseX < vakjeXPos + vakjeGrootte && 
                    mouseY > vakjeYPos && mouseY < vakjeYPos + vakjeGrootte ){
                     
                      if (beurt == 1 && vakjes[vakjesCounter] == 0) 
                      {
                      vakjes[vakjesCounter] = 1
                      }
                      if (beurt == 2 && vakjes[vakjesCounter] == 0)
                      {
                        vakjes[vakjesCounter] = 2
                      }
                  beurt++;
                  
                  if (beurt > 2)
                  {
                    beurt = 1;
                  }
                  }
                  vakjesCounter++;    
                }
                 
                
                
              
            }
        }
        
    }
    function keyPressed(){
  if (keyCode == ENTER) {
   vakjes[vakjesCounter] = 0;
   beurt = 1;
  }
}
