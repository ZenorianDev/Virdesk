
    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById('clock').textContent = time;
    }

    function updateGreeting() {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good Morning 🌞' : hour < 18 ? 'Good Afternoon ☀️' : 'Good Evening 🌙';
      document.getElementById('greeting').textContent = greeting;
    }

    function updateQuote() {
      const quotes = [
        "You got this!",
        "Every step counts.",
        "Stay focused, stay kind.",
        "Progress is progress."
      ];
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      document.getElementById('quote').textContent = q;
    }

    function openTool(id) {
      document.querySelectorAll('.tool-panel').forEach(panel => panel.classList.add('hidden'));
      document.getElementById(id).classList.remove('hidden');
    }

    function addTodo() {
      const input = document.getElementById('todo-input');
      const text = input.value.trim();
      if (!text) return;
      const li = document.createElement('li');
      li.textContent = text;
      li.onclick = () => {
        li.classList.toggle('done');
        growPlant();
      };
      document.getElementById('todo-list').appendChild(li);
      input.value = '';
    }

    let pomodoroInterval;
    function startPomodoro() {
      let minutes = 25, seconds = 0;
      clearInterval(pomodoroInterval);
      pomodoroInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(pomodoroInterval);
            growPlant();
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }, 1000);
    }

    function resetPomodoro() {
      clearInterval(pomodoroInterval);
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

    let growthStage = 1;
    function growPlant() {
      if (growthStage >= 5) return;
      growthStage++;
      document.getElementById('plant-img').src = `plant${growthStage}.png`;
    }

    updateClock();
    updateGreeting();
    updateQuote();
    setInterval(updateClock, 1000);
