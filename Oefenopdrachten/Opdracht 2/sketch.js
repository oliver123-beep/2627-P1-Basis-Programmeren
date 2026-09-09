function setup() {
  createCanvas(400, 400);
}
 
function draw() {
  background(220);
  //100 wordt een variable
  let x = 100  
  text(x,20,20)
  //hello world wordt een variable 
  let greeting = "hello world"
  text(greeting,20,60)
  //20 wordt staat gelijk aan a en 10 aan b
  let a = 20
  let b = 10
  //rekensommen 
  let optellen = a + b
  let aftrekken = a - b
  let vermenigvuldigen = a * b
  let delen = a / b
  //de text
  text("optellen: " + optellen,20,80)
  text("aftrekken: " + aftrekken,20,100)
  text("vermenigvuldigen: " + vermenigvuldigen,20,120)
  text("delen: " + delen,20,140)
}
