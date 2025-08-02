function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}

    setInterval(updateClock, 1000);
    updateClock();

    function updateGreeting() {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';
      document.getElementById('greeting').textContent = greeting;
    }
    updateGreeting();

function showPanel(id) {
  // Hide all panels
  document.querySelectorAll('.tool-content').forEach(section => {
    section.style.display = 'none';
  });
  // Show the selected panel
  const section = document.getElementById(id);
  if (section) section.style.display = 'block';
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

    let interval;
    function startPomodoro() {
      let mins = 25, secs = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        if (secs === 0) {
          if (mins === 0) {
            clearInterval(interval);
            return;
          }
          mins--;
          secs = 59;
        } else secs--;
        document.getElementById('timer').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }, 1000);
    }

    function resetPomodoro() {
      clearInterval(interval);
      document.getElementById('timer').textContent = '25:00';
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