let tasks = [];
let plantHeight = 50;

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
    const feelings = document.getElementById('lanternFeelings').value;
    if (feelings) {
        alert(`Lantern released with feelings: ${feelings}`);
        document.getElementById('lanternFeelings').value = '';
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
        tasks.push(task);
        plantHeight += 20;
        document.getElementById('plantGrowth').style.height = `${plantHeight}px`;
        alert(`Task added: ${task}`);
        document.getElementById('taskInput').value = '';
        toggleModal();
    }
}

// Simple Pomodoro timer
let pomodoroTime = 25 * 60;
function startPomodoro() {
    let timeLeft = pomodoroTime;
    const timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            alert(`Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`);
        } else {
            clearInterval(timer);
            alert("Pomodoro finished!");
            addTaskAndClose();
        }
    }, 1000);
}

// Initial call
updateClock();