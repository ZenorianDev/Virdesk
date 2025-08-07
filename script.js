let progress = 0;

function updateLoading() {
    const progressBar = document.getElementById('progress');
    progress += 1;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
        clearInterval(loadingInterval);
        document.getElementById('startButton').classList.remove('hidden');
        document.getElementById('startButton').focus();
    }
}

const loadingInterval = setInterval(updateLoading, 30);

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    updateClock();
});

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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