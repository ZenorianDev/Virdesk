function startLoading() {
    const loader = document.getElementById('loader');

    if (loader) {
        // Show loader initially
        loader.style.visibility = 'visible';

        // Simulate loading for 3 seconds, then redirect to home
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            window.location.href = 'home.html';
        }, 3000);
    }
}

// Start loading animation when page loads (only for landing page)
if (document.getElementById('loader')) {
    window.onload = startLoading;
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) {
        clock.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
}
setInterval(updateClock, 1000);

function playMusic() {
    const audio = document.getElementById('ambientMusic');
    if (audio) {
        audio.play().catch(error => console.log("Audio play failed:", error));
    }
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
    if (modal) {
        modal.classList.toggle('active');
    }
}

function addTaskAndClose() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        const task = taskInput.value;
        if (task) {
            alert(`Task added: ${task}`);
            taskInput.value = '';
            toggleModal();
        }
    }
}

// Initial call for clock on pages with clock
if (document.getElementById('clock')) {
    updateClock();
}