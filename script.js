// ---------- Utilities ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const pad2 = (n) => String(n).padStart(2, "0");

// LocalStorage helpers
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

// ---------- App State ----------
const ROUTES = ["/", "/home", "/pomodoro", "/short", "/long", "/rest", "/lantern"];
const DURATIONS = { pomodoro: 25*60, short: 5*60, long: 15*60 }; // seconds
let activeTimer = null; // {type, total, remaining, running, intervalId}
let tasks = []; // {id, text, done}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  // Landing page
  if (location.hash === "" || location.hash === "#/" || location.hash === "#") {
    const loader = $("#loader");
    if (loader) {
      loader.style.visibility = "visible";
      setTimeout(() => {
        $("#landingPage").classList.add("hidden");
        $("#home").classList.remove("hidden");
        location.hash = "/home";
      }, 3000);
    }
  } else {
    $("#landingPage").classList.add("hidden");
    $("#home").classList.remove("hidden");
  }

  // Global controls
  $("#musicBtn")?.addEventListener("click", toggleMusic);
  $("#fullscreenBtn")?.addEventListener("click", toggleFullScreen);
  $("#lanternBtn")?.addEventListener("click", () => navigate("/lantern"));
  $("#lanternRelease")?.addEventListener("click", releaseLantern);

  // Plant panel
  $("#openPlantBtn")?.addEventListener("click", () => $("#plantPanel").classList.toggle("open"));
  $("#closePlantPanel")?.addEventListener("click", () => $("#plantPanel").classList.remove("open"));

  // To-Do modal
  $("#openTasksBtn")?.addEventListener("click", openTodo);
  $("#closeTodoBtn")?.addEventListener("click", closeTodo);
  $("#addTodoBtn")?.addEventListener("click", addTodoFromInput);
  $("#todoText")?.addEventListener("keydown", (e) => { if (e.key === "Enter") addTodoFromInput(); });
  $("#clearDoneBtn")?.addEventListener("click", clearCompleted);

  // Load tasks + setup plant
  tasks = store.get("virdesk_tasks", []);
  renderTodos();
  updatePlant();

  // Clock + greeting
  if ($("#clock") || $("#restClock")) {
    updateClock();
    setInterval(updateClock, 1000);
  }
  const g = $("#greeting");
  if (g) g.textContent = getGreeting();

  // Router
  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // initial
});

// ---------- Routing ----------
function navigate(path) {
  if (!ROUTES.includes(path)) path = "/home";
  if (location.hash !== `#${path}`) location.hash = path;
  else handleRoute();
}

function handleRoute() {
  const path = (location.hash.replace(/^#/, "") || "/home");

  // Show/hide sections
  $$(".page").forEach(sec => {
    const r = sec.getAttribute("data-route");
    sec.classList.toggle("hidden", r !== path);
  });

  // Update chip active states
  $$(".timer-modes .chip").forEach(ch => {
    const href = ch.getAttribute("href");
    ch.classList.toggle("active", href === `#${path}`);
  });

  // Setup timer UI (don’t auto-start)
  if (path === "/pomodoro") setupTimer("pomodoro");
  else if (path === "/short") setupTimer("short");
  else if (path === "/long") setupTimer("long");
}

// ---------- Clock / Greeting ----------
function updateClock() {
  const now = new Date();
  const clockEls = ["#clock", "#restClock"].map(sel => $(sel)).filter(Boolean);
  let hrs = now.getHours();
  const mins = pad2(now.getMinutes());
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12 || 12;
  clockEls.forEach(el => el.textContent = `${pad2(hrs)}:${mins} ${ampm}`);
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning!";
  if (h < 18) return "Good afternoon!";
  return "Good evening!";
}

// ---------- Music ----------
function toggleMusic() {
  const audio = $("#ambientMusic") || new Audio("assets/Lofi Girl finally stops studying.mp3"); // Fallback audio (adjust path as needed)
  audio.id = "ambientMusic";
  const btn = $("#musicBtn");
  if (!audio || !btn) return;
  if (audio.paused) {
    audio.play().then(() => btn.setAttribute("aria-pressed", "true"))
      .catch(err => console.log("Audio play failed:", err));
  } else {
    audio.pause();
    btn.setAttribute("aria-pressed", "false");
  }
}

// ---------- Fullscreen ----------
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => alert(`Fullscreen error: ${err.message}`));
  } else {
    document.exitFullscreen?.();
  }
}

// ---------- Lantern ----------
function releaseLantern() {
  const feelings = prompt("Write your feelings for the lantern:");
  if (feelings) alert(`Lantern released with feelings: ${feelings}`);
}

// ---------- To-Do ----------
function openTodo() { $("#todoModal").classList.add("active"); renderTodos(); }
function closeTodo() { $("#todoModal").classList.remove("active"); }

function addTodoFromInput() {
  const input = $("#todoText");
  const text = (input.value || "").trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  store.set("virdesk_tasks", tasks);
  input.value = "";
  renderTodos();
  updatePlant();
}

function toggleTodo(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  store.set("virdesk_tasks", tasks);
  renderTodos();
  updatePlant();
}

function removeTodo(id) {
  tasks = tasks.filter(t => t.id !== id);
  store.set("virdesk_tasks", tasks);
  renderTodos();
  updatePlant();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  store.set("virdesk_tasks", tasks);
  renderTodos();
  updatePlant();
}

function renderTodos() {
  const ul = $("#todoList");
  if (!ul) return;
  ul.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "todo-item" + (t.done ? " done" : "");
    li.innerHTML = `
      <input type="checkbox" ${t.done ? "checked" : ""} aria-label="Mark done">
      <div class="todo-text">${escapeHtml(t.text)}</div>
      <div class="todo-actions">
        <button class="pill small remove" aria-label="Remove task"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    li.querySelector("input").addEventListener("change", () => toggleTodo(t.id));
    li.querySelector(".remove").addEventListener("click", () => removeTodo(t.id));
    ul.appendChild(li);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ---------- Plant Growth ----------
function updatePlant() {
  const completed = tasks.filter(t => t.done).length;
  const total = Math.max(tasks.length, 1);
  const pct = Math.min(100, Math.round((completed / total) * 100));
  $("#completedCount") && ($("#completedCount").textContent = String(completed));
  $("#plantProgress") && ($("#plantProgress").style.width = pct + "%");

  const img = $("#plantImg");
  if (!img) return;
  let stage = "assets/plant-stage1.png";
  if (completed >= 7) stage = "assets/plant-stage3.gif";
  else if (completed >= 4) stage = "assets/plant-stage2.gif";
  img.src = stage;
}

// ---------- Timer ----------
function setupTimer(type) {
  // Tear down any existing timer
  if (activeTimer?.intervalId) clearInterval(activeTimer.intervalId);

  const total = (type === "pomodoro" ? DURATIONS.pomodoro : type === "short" ? DURATIONS.short : DURATIONS.long);
  activeTimer = { type, total, remaining: total, running: false, intervalId: null };

  // Bind controls per type
  const ids = {
    pomodoro: { display: "#timerDisplay", ring: "#timerRing", start: "#startPauseBtn", reset: "#resetBtn" },
    short: { display: "#shortDisplay", ring: "#shortRing", start: "#shortStartPause", reset: "#shortReset" },
    long: { display: "#longDisplay", ring: "#longRing", start: "#longStartPause", reset: "#longReset" },
  }[type];

  // Reset UI
  setDisplay(ids.display, total);
  setRing(ids.ring, 0);
  const startBtn = $(ids.start);
  const resetBtn = $(ids.reset);
  if (startBtn) {
    startBtn.innerHTML = `<i class="fa-solid fa-play"></i><span>Start</span>`;
    startBtn.onclick = () => toggleTimer(ids);
  }
  if (resetBtn) resetBtn.onclick = () => resetTimer(ids);
}

function toggleTimer(ids) {
  if (!activeTimer) return;
  if (activeTimer.running) {
    pauseTimer(ids);
  } else {
    startTimer(ids);
  }
}

function startTimer(ids) {
  if (!activeTimer || activeTimer.running) return;
  activeTimer.running = true;
  const btn = $(ids.start);
  if (btn) btn.innerHTML = `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
  activeTimer.intervalId = setInterval(() => {
    activeTimer.remaining = Math.max(0, activeTimer.remaining - 1);
    setDisplay(ids.display, activeTimer.remaining);
    const progress = 100 * (1 - activeTimer.remaining / activeTimer.total);
    setRing(ids.ring, progress);
    if (activeTimer.remaining <= 0) {
      clearInterval(activeTimer.intervalId);
      activeTimer.running = false;
      if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i><span>Start</span>`;
      ding();
    }
  }, 1000);
}

function pauseTimer(ids) {
  if (!activeTimer || !activeTimer.running) return;
  activeTimer.running = false;
  clearInterval(activeTimer.intervalId);
  const btn = $(ids.start);
  if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i><span>Resume</span>`;
}

function resetTimer(ids) {
  if (!activeTimer) return;
  clearInterval(activeTimer.intervalId);
  activeTimer.remaining = activeTimer.total;
  activeTimer.running = false;
  setDisplay(ids.display, activeTimer.total);
  setRing(ids.ring, 0);
  const btn = $(ids.start);
  if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i><span>Start</span>`;
}

function setDisplay(sel, secs) {
  const el = $(sel);
  if (!el) return;
  const m = Math.floor(secs / 60), s = secs % 60;
  el.textContent = `${pad2(m)}:${pad2(s)}`;
}

function setRing(sel, pct) {
  const r = $(sel);
  if (r) r.style.setProperty("--p", String(pct));
}

function ding() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880; // A5
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.start();
    o.stop(ctx.currentTime + 0.6);
  } catch (e) { /* ignore */ }
}