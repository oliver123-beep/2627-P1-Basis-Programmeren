// @ts-nocheck
let vakje = 0;
let vakjeGrootte = 70;
let marginRight = 20;
let marginTop = 20;
let rows = 3;
let columns = 3;
let speler1 = true;
let speler2 = false;
let beurt = 1;
let vakjeskleur
let RedWin = false; 
let BlueWin = false;
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let vakjes = []

function preload() {
  click = loadSound("https://cdn.pixabay.com/audio/2025/01/20/audio_9afb73ceb5.mp3");
  //reset = loadImage("refresh-page-option.png");
}

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

    // check who won
    for (let i = 0; i < win.length; i++) {

    if (vakjes[win[i][0]] == 1 &&
        vakjes[win[i][1]] == 1 &&
        vakjes[win[i][2]] == 1) {

        BlueWin = true;
    }

    if (vakjes[win[i][0]] == 2 &&
        vakjes[win[i][1]] == 2 &&
        vakjes[win[i][2]] == 2) {

        RedWin = true;
    }
}
 if (BlueWin == true) 
    {
            
        text("Blauw wint!", 20, 350); 
    } else if (RedWin == true)
     { 
        text("Rood wint!", 20, 350); 
     } 
     else { if (beurt == 1) 
    {
       text("Blauw is aan de beurt", 20, 350); 
    }
     else { 
        text("Rood is aan de beurt", 20, 350); 
    }
 }
   
   // 
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
                        click.play();
                     
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
   for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }

    beurt = 1;
    BlueWin = false;
    RedWin = false;
  }
}
