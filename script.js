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
  function confirmReset() {
    if (confirm("Möchtest du die Seite wirklich neu laden? Alle Eingaben gehen verloren.")) {
  location.reload();
    }
  }

updateDisplay(); // initial anzeigen
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const fileName = `veedoo_prot_${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}-${pad(now.getHours())}_${pad(now.getMinutes())}.pdf`;

  let y = 10;

  doc.setFontSize(18);
  doc.text("Veedoo Protokoll", 10, y);
  y += 5;
  doc.line(10, y, 200, y);
  y += 10;

  const timer = document.getElementById("timer")?.textContent?.trim() || "00:00";
  doc.setFontSize(12);
  doc.text(`Timerzeit gesamt: ${timer}`, 10, y);
  doc.text(`${dateStr} – ${timeStr}`, 150, y, { align: "right" });
  y += 8;
  doc.line(10, y, 200, y);
  y += 10;

  const inputs = document.querySelectorAll("input, textarea, select");
  const ausgefüllt = [];
  const leer = [];

  inputs.forEach(el => {
    const val = el.value?.trim();
    const label = el.placeholder || el.name || el.id || el.type;
    const type = el.type;

    if (type === "checkbox") {
      const text = label + (el.checked ? " ✔" : " ✘");
      ausgefüllt.push(text);
    } else if (val) {
      const text = `${label}: ${val}`;
      ausgefüllt.push(text);
    } else {
      leer.push(label);
    }
  });

  // Ausgefüllte Inhalte
  doc.setFont(undefined, "normal");
  ausgefüllt.forEach(txt => {
    doc.text(txt, 10, y);
    y += 6;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save(fileName);
}