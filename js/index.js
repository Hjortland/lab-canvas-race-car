const myCanvas = document.querySelector('canvas'); 
const ctx = myCanvas.getContext('2d'); 
myCanvas.style.border = '2px solid black'; 

const bgImg = new Road(); 
bgImg.src = './images/road.png'; 
const bgImg2 = new Road(); 
bgImg2.src = './images/road.png';
let bg1y = 0; 
let bg2y = -myCanvas.height; 

// Game variables

let gameOver = false; 
let animateId; 

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const car = new Car(); 
  car.src = './images/car.png'; 

  car.onload = function() {
    ctx.drawImage(car, 120, 300, 40, 65); 
  }

  function animate() {
    ctx.drawImage(bgImg, 0, bg1y, myCanvas.width, myCanvas.height); 
    ctx.drawImage(bgImg2, 0, bg2y, myCanvas.width, myCanvas.height); 
    bg1y += 2; 
    bg2y += 2; 

    if (bg1y > myCanvas.height) {
      bg1y = -myCanvas.height;
    } 
    else if (bg2y > myCanvas.height) {
      bg2y = -myCanvas.height; 
    }
    else if (!gameOver) {
      animateId = requestAnimationFrame(animate); 
    }
    else {cancelAnimationFrame(animateId);
    }
  }}




  function startGame() {
    animate(); 
    car = new Car();
    car.load();
    obstacles = []; 
    score = 0;  
    scoreText.innerHTML = 0;

    setInterval(() => {
      obstacles.push(new Obstacle());
    }, 500);
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 37: // left arrow
          if(car.x > 30)
            car.x -= 10;
          break;
        case 39: // right arrow
          if(car.x < 200)
            car.x += 10;
          break;
      }
      update();
    }
    gameInterval = setInterval(update, 1000/60); 
  }
  
