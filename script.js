function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}

function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';
  document.getElementById('greeting').textContent = greeting;
}

  document.querySelector('.plant').style.cursor = 'pointer';
  document.querySelector('.plant').title = "Virdesk helps you grow! 🌱";

function showPanel(id) {
  document.querySelectorAll('.tool-content').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  const panel = document.getElementById(id);
  panel.classList.add('active');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth' });
}

function startPomodoro() {
  let mins = 25, secs = 0;
  clearInterval(window.interval);
  window.interval = setInterval(() => {
    if (secs === 0) {
      if (mins === 0) return clearInterval(window.interval);
      mins--; secs = 59;
    } else secs--;
    document.getElementById('timer').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, 1000);
}

function resetPomodoro() {
  clearInterval(window.interval);
  document.getElementById('timer').textContent = '25:00';
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  li.onclick = () => li.classList.toggle('done');
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
}

function playSound(id) {
  document.querySelectorAll('audio').forEach(a => a.pause());
  const audio = document.getElementById(id);
  audio.currentTime = 0;
  audio.play();
}

function releaseLantern() {
  const msg = document.getElementById('lantern-message').value.trim();
  if (!msg) return;
  const lantern = document.createElement('div');
  lantern.className = 'lantern';
  lantern.textContent = msg;
  document.getElementById('lantern-sky').appendChild(lantern);
  setTimeout(() => lantern.remove(), 5000);
  document.getElementById('lantern-message').value = '';
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

updateClock();
updateGreeting();
setInterval(updateClock, 1000);