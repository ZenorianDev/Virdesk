// ============================
// Router
// ============================
function showPage(route) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));

  const page = document.querySelector(`[data-route="${route}"]`);
  if (page) {
    page.classList.remove("hidden");
  }
}

// Handle hash changes
function handleHashChange() {
  const route = location.hash.replace("#", "") || "/home";
  showPage(route);
}

window.addEventListener("hashchange", handleHashChange);

// ============================
// Landing → Home
// ============================
window.addEventListener("DOMContentLoaded", () => {
  showPage("/"); // show landing first

  setTimeout(() => {
    location.hash = "/home"; // auto go to home
  }, 3000);

  updateClock();
  setInterval(updateClock, 1000);
});

// ============================
// Clock
// ============================
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  document.getElementById("clock").textContent = `${hour12}:${minutes} ${ampm}`;
}

// ============================
// Music Toggle
// ============================
function toggleMusic() {
  const music = document.getElementById("ambientMusic");
  const btn = document.getElementById("musicBtn");
  if (music.paused) {
    music.play();
    btn.setAttribute("aria-pressed", "true");
  } else {
    music.pause();
    btn.setAttribute("aria-pressed", "false");
  }
}

// ============================
// Fullscreen
// ============================
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ============================
// Lantern Release (simple effect)
// ============================
function releaseLantern() {
  const lantern = document.createElement("div");
  lantern.className = "lantern";
  document.body.appendChild(lantern);

  setTimeout(() => {
    lantern.remove();
  }, 4000);
}

// ============================
// Plant Modal + Tasks
// ============================
function toggleModal() {
  document.getElementById("plantModal").classList.toggle("show");
}

function addTaskAndClose() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
    growPlant();
    input.value = "";
  }
  toggleModal();
}

// Simple plant growth (cycles images)
let plantStage = 1;
function growPlant() {
  plantStage++;
  if (plantStage > 3) plantStage = 3;

  const body = document.querySelector("body");
  body.style.backgroundImage = `url('img/plant-stage${plantStage}.png')`;
}

// ============================
// Pomodoro Timers
// ============================
function setupTimer(displayId, startBtnId, resetBtnId, minutes) {
  let duration = minutes * 60;
  let timeLeft = duration;
  let interval = null;

  const display = document.getElementById(displayId);
  const startBtn = document.getElementById(startBtnId);
  const resetBtn = document.getElementById(resetBtnId);

  function updateDisplay() {
    const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");
    display.textContent = `${m}:${s}`;
  }

  function tick() {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Time's up!");
    }
  }

  startBtn.addEventListener("click", () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
      startBtn.innerHTML = `<i class="fa-solid fa-play"></i><span>Start</span>`;
    } else {
      interval = setInterval(tick, 1000);
      startBtn.innerHTML = `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
    }
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    timeLeft = duration;
    updateDisplay();
    startBtn.innerHTML = `<i class="fa-solid fa-play"></i><span>Start</span>`;
  });

  updateDisplay();
}

// Setup each timer
window.addEventListener("DOMContentLoaded", () => {
  setupTimer("timerDisplay", "startPauseBtn", "resetBtn", 25); // Pomodoro
  setupTimer("shortDisplay", "shortStartPause", "shortReset", 5); // Short break
  setupTimer("longDisplay", "longStartPause", "longReset", 15); // Long break
});
