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
let Draw = false; 
let Hoofdmenu = true; 
let AI = false; 
let Counter = 0;
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
  reset = loadImage("refresh-page-option.png");
  play = loadImage("pngfind.com-video-play-button-png-471563.png")
  menu = loadImage ("—Pngtree— vector icon_3791388.png")
  font = loadFont ("Super Waffles.ttf")
  aiImage = loadImage ("AI-Robot-Illustrated-SVG-Icon.svg")
  Player = loadImage ("team.svg")
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
    

    

    vakjes[0]
    vakjes[1]
    vakjes[2]
    

    // check wie wint door te kijken of ze blauw of rood zijn en in de volgorde van "win"
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
    //gelijkspel als blauw of rood nog niet gewonnen heeft en als alle vakjes vol zitten 
    if (BlueWin == false && RedWin == false) {

        let vol = true;
        for (let i = 0; i < vakjes.length; i++) { 
        if (vakjes[i] == 0) { 
            vol = false; 
        }
    }
    if (vol == true) { 
        Draw = true;
     }
    }

//achtergrond als je wint
 if (BlueWin == true) 
    {
        background(0,0,255);
        fill(255)
        textSize(32)   
        text("Blauw wint!", 20, 350);
        image(reset, 250,50, 50,50) ;
        
    } else if (RedWin == true)
     { 
        background(255,0,0);
        fill(0)
        textSize(32)
        text("Rood wint!", 20, 350);
        image(reset, 250,50, 50,50);
        
     } else if ( Draw == true)
    {
        background("grey")
        fill(255)
        textSize(32)   
        text("Gelijkspel!", 20, 350);
        image(reset, 250,50, 50,50) ;
     }
     //laten zien wie aan de beurt is
     else if (beurt == 1) 
    {
        background(0, 0, 200); 
        fill(255)
        textSize(25)
       text("Blauw is aan de beurt", 20, 350);
      
    }
     else  { 
        background(200, 0, 0);
        fill(255)
        textSize(25)
        text("Rood is aan de beurt", 20, 350); 
        
    }
 }
   
   // vakjes maken
    let vakjesCounter = 0;
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            
            let vakjeXPos = marginRight + x * (vakjeGrootte + 5);
            let vakjeYPos = marginTop + y * (vakjeGrootte + 5);

            //vakjes kleuren

            if (vakjes[vakjesCounter] == 0){
                fill("white")
            }
           if (vakjes[vakjesCounter] == 1 ) {
              fill("blue")
                
            }
            if (vakjes[vakjesCounter] == 2){
              fill("red")
            }
            //vakjes hover
            if (mouseX > vakjeXPos && mouseX < vakjeXPos + vakjeGrootte && 
                mouseY > vakjeYPos && mouseY < vakjeYPos + vakjeGrootte &&
            vakjes[vakjesCounter] == 0) {
                fill("grey")
            }
            strokeWeight(2);
 // duidelijk maken wie er gewonen heeft door de winnende vakjes te vinden en dan de strokeWeight groter te maken
 if ( Hoofdmenu == false) {
 for (let i = 0; i < win.length; i++) {
    if (vakjes[win[i][0]] != 0 &&
        vakjes[win[i][0]] == vakjes[win[i][1]] &&
        vakjes[win[i][1]] == vakjes[win[i][2]]) {

        if (vakjesCounter == win[i][0] ||
            vakjesCounter == win[i][1] ||
            vakjesCounter == win[i][2]) {
            
            strokeWeight(5);
        }
    }
}       //de vakjes
            rect(vakjeXPos, vakjeYPos, vakjeGrootte, vakjeGrootte,5);
            vakjesCounter++;
        }
    }
  }
    fill(255)
    textSize(20)
   text("Klik enter om te reseten ", 20, 300)
    // hoofdmenu
    if (Hoofdmenu == true){
    background("green")
    text("click to play", 225, 150 )
    //ai
    image(aiImage,0,250,150,150)
    //2 player
    image(Player, 120, 300, 75, 75)
    textSize(12)
    text ("2 player", 130, 300,)
    text("ai", 90, 290 )

    textSize(50)
    textFont(font)
    text("Tic Tac Toe" ,70,220)
    
     image(play, 250, 50, 75,75)
    
    }
    if (Hoofdmenu == false){
    image(menu, 240, 100, 75,75);
    }
    fill(0)
    

 

}


function mousePressed(){
    if (mouseButton == "left"){
      
      // ai knop ( de image is raar dus de afmetingen zijn zelf gemeten)
    if (mouseX > 40 && mouseX < 105 && mouseY > 290 && mouseY < 365){
    AI = true;
   Hoofdmenu = false;
   for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }

    beurt = 1;
    BlueWin = false;
    RedWin = false;
    Draw = false;
    Counter = 0;
    }
    //2 player
    if (mouseX > 120 && mouseX < 195 && mouseY > 300 && mouseY < 375){
    AI = false;
   Hoofdmenu = false;
   for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }

    beurt = 1;
    BlueWin = false;
    RedWin = false;
    Draw = false;
    Counter = 0;
   
    }
  

// hoofd menu 
// play button
 if (mouseX > 250 && mouseX < 325 && mouseY > 50 && mouseY < 125){
for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }
        beurt = 1;
        Counter = 0;
        Hoofdmenu = false;
}
   
        
        //als je op de refresh knop klikt reset de game
        if ( RedWin == true || BlueWin == true || Draw == true && Hoofdmenu == false ){
        if (mouseX > 250 && mouseX < 300 && mouseY > 50 && mouseY < 100)
        {
        for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }
        beurt = 1;
        BlueWin = false;
        RedWin = false;
        Draw = false;
        Hoofdmenu = false;
        Counter = 0;
  }
    }
    // hoofdmenu 
    if (Hoofdmenu == false){
      if (mouseX > 240 && mouseX < 315 && mouseY > 100 && mouseY < 175){
        Hoofdmenu = true;
      }
   }

        
            let vakjesCounter = 0;
    
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < columns; y++) {
                
                let vakjeXPos = marginRight + x * (vakjeGrootte + 5);
                let vakjeYPos = marginTop + y * (vakjeGrootte + 5);
                // als je op de vakjes klikt start de code
                if (mouseX > vakjeXPos && mouseX < vakjeXPos + vakjeGrootte && 
                    mouseY > vakjeYPos && mouseY < vakjeYPos + vakjeGrootte){
                     
                      if (beurt == 1 && vakjes[vakjesCounter] == 0 && RedWin == false && BlueWin == false &&
                        Hoofdmenu == false) 
                      {
                      vakjes[vakjesCounter] = 1
                      beurt++;
                      Counter++;
                      click.play();
                      }
                      if (beurt == 2 && vakjes[vakjesCounter] == 0 && RedWin == false && BlueWin == false &&
                        Hoofdmenu == false)
                      {
                        vakjes[vakjesCounter] = 2
                        beurt++;
                        Counter++;
                        click.play();
                      }
                      if (AI == true && beurt == 2 && Counter < 9 && RedWin == false && BlueWin == false && Draw == false) {

                      let plek = floor(random(9));

                      while (vakjes[plek] != 0) {
                      plek = floor(random(9));
                      }

                      vakjes[plek] = 2;

                      beurt = 1;
                      Counter++;
                      click.play();
                    }         
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
    //reset bij enter
    function keyPressed(){
  if (keyCode == ENTER) {
   for (let i = 0; i < vakjes.length; i++) {
        vakjes[i] = 0;
    }

    beurt = 1;
    BlueWin = false;
    RedWin = false;
    Draw = false;
    Hoofdmenu = false;
    Counter = 0; 
  }
}
