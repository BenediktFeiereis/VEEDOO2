function startApp() {
    document.getElementById('Protkoll');
}
function startApp() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("nextScreen").classList.remove("hidden");
    document.getElementById("Einsatzmanagement").classList.remove("hidden");
  }
  let timer;
  let seconds = 0;
  let isRunning = false;

  function updateDisplay() {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${mins}:${secs}`;
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        seconds++;
        updateDisplay();
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    isRunning = false;
    updateDisplay();
  }

  updateDisplay(); // initial anzeigen
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }