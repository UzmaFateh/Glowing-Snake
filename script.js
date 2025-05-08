

const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");
const difficulty = document.getElementById("difficulty");

const box = 20;
const size = 20;
let snake = [{ x: 9, y: 10 }];
let food = randomFood();
let dx = 1, dy = 0;
let score = 1;
let delay = Number(difficulty.value);
let interval;
let gameStarted = false;

function randomFood() {
  return {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
  };
}

function drawBoard() {
  board.innerHTML = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      if (snake.some(s => s.x === x && s.y === y)) {
        cell.className = "snake";
      } else if (food.x === x && food.y === y) {
        cell.className = "food";
      }
      board.appendChild(cell);
    }
  }
}

function move() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= size ||
    head.y < 0 || head.y >= size ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  drawBoard();
}

function endGame() {
  clearInterval(interval);
  overlay.classList.add("active");
  finalScore.textContent = score;
}

function startGame() {
  snake = [{ x: 9, y: 10 }];
  dx = 1; dy = 0;
  score = 1;
  scoreDisplay.textContent = score;
  food = randomFood();
  overlay.classList.remove("active");
  clearInterval(interval);
  interval = setInterval(move, delay);
  drawBoard();
  gameStarted = true;
}

restartBtn.addEventListener("click", startGame);
difficulty.addEventListener("change", (e) => {
  delay = Number(e.target.value);
  if (gameStarted) {
    clearInterval(interval);
    interval = setInterval(move, delay);
  }
});

document.addEventListener("keydown", e => {
  if (!gameStarted) startGame();

  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

// ✅ Touch controls
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const dir = btn.dataset.dir;
    if (!gameStarted) startGame();
    if (dir === "up" && dy === 0) { dx = 0; dy = -1; }
    if (dir === "down" && dy === 0) { dx = 0; dy = 1; }
    if (dir === "left" && dx === 0) { dx = -1; dy = 0; }
    if (dir === "right" && dx === 0) { dx = 1; dy = 0; }
  });
});


if (i === 0) {
  snakePart.classList.add("snake-head");
}

