// Wait for DOM to be ready for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Landing page loader -> redirect
  const loader = document.getElementById('loader');
  if (loader) {
    startLoading();
  }

  // Initialize clock if present
  if (document.getElementById('clock')) {
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Prepare audio toggle if present
  const musicBtn = document.getElementById('musicBtn');
  const audio = document.getElementById('ambientMusic');
  if (musicBtn && audio) {
    musicBtn.setAttribute('aria-pressed', 'false');
  }
});

function startLoading() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.visibility = 'visible';
  setTimeout(() => {
    loader.style.visibility = 'hidden';
    window.location.href = 'home.html';
  }, 3000);
}

function pad2(n) { return n.toString().padStart(2, '0'); }
function updateClock() {
  const clock = document.getElementById('clock');
  if (!clock) return;
  const now = new Date();
  let hours = now.getHours();
  const minutes = pad2(now.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; if (hours === 0) hours = 12;
  clock.textContent = `${pad2(hours)}:${minutes} ${ampm}`;
}

function toggleMusic() {
  const audio = document.getElementById('ambientMusic');
  const btn = document.getElementById('musicBtn');
  if (!audio || !btn) return;

  if (audio.paused) {
    audio.play().then(() => {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('is-playing');
    }).catch(err => console.log('Audio play failed:', err));
  } else {
    audio.pause();
    btn.setAttribute('aria-pressed', 'false');
    btn.classList.remove('is-playing');
  }
}

function releaseLantern() {
  const feelings = prompt("Write your feelings for the lantern:");
  if (feelings) alert(`Lantern released with feelings: ${feelings}`);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

function toggleModal() {
  const modal = document.getElementById('plantModal');
  if (modal) modal.classList.toggle('active');
}

function addTaskAndClose() {
  const taskInput = document.getElementById('taskInput');
  if (!taskInput) return;
  const task = taskInput.value.trim();
  if (task) {
    alert(`Task added: ${task}`);
    taskInput.value = '';
    toggleModal();
  }
}
