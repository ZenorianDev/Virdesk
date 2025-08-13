function startLoading() {
    const loader = document.getElementById('loader');

    // Show loader initially
    loader.style.visibility = 'visible';

    // Simulate loading for 3 seconds, then transition to home
    setTimeout(() => {
        loader.style.visibility = 'hidden';
        document.getElementById('landingPage').classList.add('hidden');
        document.getElementById('home').classList.remove('hidden');
        updateClock();
    }, 3000);
}

// Start loading animation when page loads
window.onload = startLoading;

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
setInterval(updateClock, 1000);

function showSection(section) {
    alert(`Showing ${section} section`);
}

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

// Note: Potential Permissions Policy violation (unload) may occur due to page transition.
// If persistent, consider adding <meta http-equiv="Permissions-Policy" content="unload"> to <head>,
// though this is a workaround and should be monitored.