let currentLevel = 1;
let score = 0;
let gridSize = 2;
const maxGridSize = 12;
const maxRounds = 150;
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("current-level");
const gridContainer = document.getElementById("grid-container");
const startButton = document.getElementById("start-btn");
const shareButtons = document.getElementById("share-buttons");
const modeToggle = document.getElementById("mode-toggle");
const toggleText = document.getElementById("toggle-text");

startButton.addEventListener("click", startGame);
modeToggle.addEventListener("change", toggleMode);

function startGame() {
  startButton.style.display = "none";
  nextLevel();
}

function nextLevel() {
  if (currentLevel > maxRounds) {
    gameOver();
    return;
  }
  
  levelElement.textContent = currentLevel;
  scoreElement.textContent = score;
  updateGrid(gridSize);

  // Adjust difficulty: Increase grid size and decrease color variation.
  if (currentLevel % 5 === 0 && gridSize < maxGridSize) {
    gridSize++;
  }
  currentLevel++;
}

function updateGrid(size) {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  
  const baseColor = getRandomColor();
  const variationColor = getColorVariation(baseColor);
  
  const randomTile = Math.floor(Math.random() * size * size);
  
  for (let i = 0; i < size * size; i++) {
    const tile = document.createElement('div');
    tile.style.backgroundColor = i === randomTile ? variationColor : baseColor;
    tile.className = 'tile';
    tile.addEventListener('click', () => handleTileClick(i === randomTile));
    gridContainer.appendChild(tile);
  }
}

function handleTileClick(isCorrect) {
  if (isCorrect) {
    score++;
    scoreElement.textContent = score;
    nextLevel();
  } else {
    gameOver();
  }
}

function gameOver() {
  gridContainer.innerHTML = '';
  shareButtons.classList.remove("hidden");

  let message = getGameOverMessage(score);
  alert(message); // Can be replaced with browser notification.
}

function getGameOverMessage(score) {
  if (score <= 15) return "You're so close! Try again and beat your high score!";
  if (score <= 30) return "Just missed it! You’ve got what it takes, try again!";
  if (score <= 45) return "Almost there! A few more tries and victory is yours!";
  if (score <= 60) return "Don’t stop now! The next level is waiting for you!";
  if (score <= 75) return "Great effort! Keep going, the next challenge awaits you!";
  if (score <= 90) return "You’ve mastered this far, now push through to the top!";
  if (score <= 105) return "Your progress is amazing! Restart and climb even higher!";
  if (score <= 120) return "Unstoppable! Try again, and conquer the toughest levels yet!";
  if (score <= 135) return "Challenge accepted? Keep playing and dominate the leaderboard!";
  return "Woo-hoo! Congratulations! You have eagle eyes!";
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  toggleText.textContent = document.body.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getColorVariation(baseColor) {
  // Modify color slightly (darker or lighter)
  // Example code to manipulate color: Slight variation of RGB
  return baseColor;
}
