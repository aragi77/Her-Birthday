const btn = document.getElementById("surpriseBtn");
const popup = document.getElementById("surprisePopup");

btn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  startConfetti();
  startHearts();

  // Auto hide popup after 6s
  setTimeout(() => {
    popup.classList.add("hidden");
  }, 6000);
});

/* 🎉 Confetti Animation */
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

function randomColor() {
  const colors = ["#ffb6c1", "#ffc0cb", "#ffe4e1", "#fff0f5", "#f8bbd0"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 6 + 4,
      color: randomColor(),
      speed: Math.random() * 3 + 2,
    });
  }
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((p) => {
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;
    if (p.y > confettiCanvas.height) p.y = 0 - p.size;
  });
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confettiPieces = [];
  createConfetti();
  drawConfetti();
  setTimeout(() => (confettiPieces = []), 5000);
}

/* 💕 Floating Hearts Animation */
const heartsCanvas = document.getElementById("hearts");
const heartsCtx = heartsCanvas.getContext("2d");
let hearts = [];

heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

function createHeart() {
  return {
    x: Math.random() * heartsCanvas.width,
    y: heartsCanvas.height + 10,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    alpha: 1,
  };
}

function drawHeart(x, y, size) {
  heartsCtx.save();
  heartsCtx.translate(x, y);
  heartsCtx.scale(size / 20, size / 20);
  heartsCtx.beginPath();
  heartsCtx.moveTo(0, 0);
  heartsCtx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
  heartsCtx.bezierCurveTo(15, 5, 10, -10, 0, 0);
  heartsCtx.fillStyle = "rgba(255,182,193,0.8)";
  heartsCtx.fill();
  heartsCtx.restore();
}

function drawHearts() {
  heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach((h, i) => {
    drawHeart(h.x, h.y, h.size);
    h.y -= h.speed;
    h.alpha -= 0.005;
    if (h.alpha <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(drawHearts);
}

function startHearts() {
  hearts = [];
  for (let i = 0; i < 25; i++) hearts.push(createHeart());
  drawHearts();
  const heartInterval = setInterval(() => hearts.push(createHeart()), 200);
  setTimeout(() => clearInterval(heartInterval), 4000);
}

window.addEventListener("resize", () => {
  confettiCanvas.width = heartsCanvas.width = window.innerWidth;
  confettiCanvas.height = heartsCanvas.height = window.innerHeight;
});
