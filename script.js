// Navigation
function navigate(sectionId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// Loader → Home
window.onload = () => {
  if (document.getElementById('loader')) {
    setTimeout(() => navigate('home'), 3000);
  }
};

// Clock
setInterval(() => {
  const clock = document.getElementById('clock');
  if (clock) clock.textContent = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
}, 1000);

// Music
function playMusic() {
  const audio = document.getElementById('ambientMusic');
  audio.play().catch(e=>console.log(e));
}

// Lantern
function releaseLantern() {
  const feelings = prompt("Write your feelings:");
  if (feelings) alert(`Lantern released with: ${feelings}`);
}

// Fullscreen
function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

// To-do & Plant Growth
let plantStage = 0;
function toggleTodoPopup() {
  document.getElementById('todoPopup').classList.toggle('active');
}
function addTask() {
  const input = document.getElementById('taskInput');
  const list = document.getElementById('taskList');
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => completeTask(li);
    list.appendChild(li);
    input.value = '';
  }
}
function completeTask(li) {
  li.style.textDecoration = "line-through";
  plantStage++;
  updatePlantBoard();
}
function toggleDropdown() {
  document.getElementById('plantBoard').classList.toggle('active');
}
function updatePlantBoard() {
  const board = document.getElementById('plantBoard');
  board.textContent = `🌱 Plant growth stage: ${plantStage}`;
}

// Pomodoro
let timer, timeLeft;
function startPomodoro(mode) {
  clearInterval(timer);
  if (mode === 'work') timeLeft = 25*60;
  if (mode === 'short') timeLeft = 5*60;
  if (mode === 'long') timeLeft = 15*60;
  timer = setInterval(updatePomodoro, 1000);
}
function updatePomodoro() {
  if (timeLeft<=0){ clearInterval(timer); alert("Time's up!"); return; }
  timeLeft--;
  const min = Math.floor(timeLeft/60), sec = timeLeft%60;
  document.getElementById('timeDisplay').textContent = `${min}:${sec.toString().padStart(2,'0')}`;
}
function resetPomodoro() {
  clearInterval(timer);
  document.getElementById('timeDisplay').textContent = "25:00";
}
