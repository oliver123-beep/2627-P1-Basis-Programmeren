
function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  strokeWeight(1)
  fill(0)
  text(1., 20, 15)
  text(2., 20, 105)
  text(3., 80, 105)
  text(4., 80, 205)
  text(5., 540, 20)
  text(6., 350, 105)
  text(7., 625, 105)
  for( let i = 0; i < 10; i++){
     if ( i == 6)
     {
       fill(0,0,255)
     }
     else 
     {
       fill(255)
     }
    rect(i * 50,20,50,50)
  }

for ( let i = 0; i < 5; i++)
{
  fill( 63.75 * i )
  rect( 20, i * 50 + 110, 50,50 )
}
 let x = 80;
 for( let i = 0; i < 4; i++)
 {
  let breedte = 25 * i + 25;
  fill( 0, 80 * i, 0 )
  rect(x, 115, breedte ,50)
     x = x + breedte;
 
 }
 x = 80
 for ( let i = 0; i < 4; i++)
 {
  let breedte = ( i* 25  + 25)
  let lengte = ( i * 25  + 25)
  fill(0,0, 255 - i * 85)
  rect( x, 205, breedte, lengte)
  x = x + breedte;
 }

 for( let i = 0; i < 6; i ++)
 {
  strokeWeight( 1 * i)
  fill(255)
  circle( i * 30 + 550, 40, 20)
  strokeWeight(1)
 }
 for( let i = 0; i < 10; i ++)
 {
  if ( i % 2 == 1)
  {
    fill( "red")
  }else{
    fill("white")
  }
  circle( 450, 200, 200 - (i * 20) )
  
 }
    let breedte = 0
for( let i = 0; i < 21; i ++)

{
  fill(255)
  if ( i < 11 ){
    breedte = (10 * i + 10)
  rect( 650, i * 10 + 100, breedte, 10)
  }else{
    breedte = (10 * (21 - i))
    rect(650, i * 10 + 100, breedte, 10)
  }
}

  }
