// ===== DECORATIVE STARS =====
const emojis = ["⭐", "✨", "🌟", "💫"];
for (let i = 0; i < 8; i++) {
  const s = document.createElement("div");
  s.className = "star";
  s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  s.style.top = Math.random() * 90 + "%";
  s.style.left = Math.random() * 90 + "%";
  s.style.animationDelay = Math.random() * 2 + "s";
  s.style.fontSize = 0.8 + Math.random() * 0.8 + "rem";
  document.body.appendChild(s);
}

// ===== ENVELOPE OPEN =====
let opened = false;
function openEnvelope() {
  if (opened) return;
  opened = true;

  const wrapper = document.getElementById("envelopeWrapper");
  wrapper.classList.add("opening");

  setTimeout(() => {
    // Hide envelope screen
    document.getElementById("envelopeScreen").classList.add("hide");

    // Show card screen
    document.getElementById("cardScreen").classList.add("show");

    // Start balloons
    startBalloons();

    // Confetti!
    fireConfetti();
  }, 800);
}

// ===== BALLOONS =====
const balloonColors = [
  "#ff4b6e",
  "#ffcc00",
  "#00d2ff",
  "#92ff48",
  "#a18cd1",
  "#fbc2eb",
  "#ff7675",
  "#74b9ff",
];

function createBalloon() {
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.left = Math.random() * 100 + "vw";
  const scale = 0.8 + Math.random() * 0.5;
  b.style.transform = `scale(${scale})`;
  b.style.background =
    balloonColors[Math.floor(Math.random() * balloonColors.length)];
  const duration = 8 + Math.random() * 10;
  b.style.animationDuration = duration + "s";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), duration * 1000);
}

function startBalloons() {
  setInterval(createBalloon, 300);
}

// ===== CONFETTI =====
function fireConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

// ===== PHOTO UPLOAD =====
function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const inner = document.getElementById("photoFrameInner");
    inner.innerHTML = `<img src="${e.target.result}" alt="Foto">`;
  };
  reader.readAsDataURL(file);
}
