function startLoading() {
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('startBtn');

    // Show loader and hide start button initially
    startBtn.classList.add('hidden');
    loader.style.display = 'flex'; // or 'block', depending on your layout

    // Simulate loading for 3 seconds, then show start button
    setTimeout(() => {
        loader.style.display = 'none'; // Removes it from layout
        startBtn.classList.remove('hidden');
    }, 3000);
}

// Start loading animation when page loads
window.onload = startLoading;

document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    updateClock();
});

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
setInterval(updateClock, 1000);

function playMusic() {
    const audio = document.getElementById('ambientMusic');
    audio.play().catch(error => console.log("Audio play failed:", error));
}

function releaseLantern() {
    const feelings = prompt("Write your feelings for the lantern:");
    if (feelings) {
        alert(`Lantern released with feelings: ${feelings}`);
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function toggleModal() {
    const modal = document.getElementById('plantModal');
    modal.classList.toggle('active');
}

function addTaskAndClose() {
    const task = document.getElementById('taskInput').value;
    if (task) {
        alert(`Task added: ${task}`);
        document.getElementById('taskInput').value = '';
        toggleModal();
    }
}

// Initial call
updateClock();