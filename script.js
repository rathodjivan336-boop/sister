const sparkleLayer = document.getElementById("sparkleLayer");
const toast = document.getElementById("toast");
const music = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkle.style.top = `${65 + Math.random() * 35}%`;
  sparkle.style.fontSize = `${10 + Math.random() * 14}px`;
  sparkle.style.setProperty("--duration", `${4 + Math.random() * 4}s`);
  sparkleLayer.appendChild(sparkle);
  window.setTimeout(() => sparkle.remove(), 8500);
}
window.setInterval(createSparkle, 500);

document.getElementById("openSurprise").addEventListener("click", () => {
  document.getElementById("welcome").scrollIntoView({ behavior: "smooth" });
  burstConfetti(55);
});

function burstConfetti(count = 45) {
  const symbols = ["✦", "✧", "♥", "❀", "✿"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.cssText = `
      position:fixed; z-index:30; pointer-events:none; left:${Math.random() * 100}vw;
      top:-25px; color:${["#c38b9b", "#d8b878", "#f3c9d2", "#fff1cc"][Math.floor(Math.random() * 4)]};
      font-size:${12 + Math.random() * 18}px;`;
    document.body.appendChild(piece);
    const drift = (Math.random() - 0.5) * 260;
    const duration = 1800 + Math.random() * 1800;
    const animation = piece.animate([
      { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${drift}px, ${window.innerHeight + 80}px) rotate(${360 + Math.random() * 600}deg)`, opacity: 0.1 }
    ], { duration, easing: "cubic-bezier(.15,.7,.3,1)" });
    animation.onfinish = () => piece.remove();
  }
}

document.getElementById("secretButton").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  const isHidden = message.hidden;
  message.hidden = !isHidden;
  document.getElementById("secretButton").textContent = isHidden ? "Hide secret message 💗" : "Open your secret message 💗";
  if (isHidden) {
    burstConfetti(35);
    message.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

document.querySelectorAll(".candle").forEach((candle) => {
  candle.addEventListener("click", () => {
    candle.classList.remove("lit");
    const remaining = document.querySelectorAll(".candle.lit").length;
    if (remaining === 0) {
      document.getElementById("cakeMessage").textContent = "Wish made! Happy Birthday, Sakshi! 💗✨";
      burstConfetti(80);
    } else {
      document.getElementById("cakeMessage").textContent = `Beautiful wish! ${remaining} candle${remaining === 1 ? "" : "s"} left ✨`;
    }
  });
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ Pause music";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      showToast("Song add karne ke baad music play hoga: music/kannada-song.mp3");
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ Play music";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});
music.addEventListener("error", () => {
  musicToggle.textContent = "♫ Play music";
});

// Birthday is October 28, 2026. Uses the visitor's device local time.
function updateCountdown() {
  const now = new Date();
  const birthday = new Date(now.getFullYear(), 9, 28, 0, 0, 0);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = birthday.getTime() < today.getTime()
    ? new Date(now.getFullYear() + 1, 9, 28, 0, 0, 0)
    : birthday;
  const diff = target.getTime() - now.getTime();

  if (now.getFullYear() === 2026 && now.getMonth() === 9 && now.getDate() === 28) {
    document.getElementById("countdownDisplay").innerHTML = '<div class="birthday-today">🎉 Happy Birthday, Sakshi! 🎉</div>';
    document.getElementById("countdownMessage").textContent = "ಇಂದು ನಿನ್ನ ವಿಶೇಷ ದಿನ! Have the most beautiful birthday 💗";
    return;
  }
  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById("minutes").textContent = Math.floor((diff % 3600000) / 60000);
  document.getElementById("seconds").textContent = Math.floor((diff % 60000) / 1000);
  document.getElementById("countdownMessage").textContent = `Until 28 October ${target.getFullYear()} 💗`;
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

// Fade sections into view as the visitor scrolls.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Give a helpful message if a placeholder image has not been added yet.
document.querySelectorAll(".photo-card img").forEach((img) => {
  img.addEventListener("error", () => {
    img.alt = "Add your photo file here: " + img.getAttribute("src");
    img.style.display = "none";
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";
    placeholder.textContent = "Add your photo here 📷";
    placeholder.style.cssText = "aspect-ratio:4/4.4;display:grid;place-items:center;background:linear-gradient(135deg,#f4dce1,#f9f0df);color:#806a73;font-size:.85rem;text-align:center;padding:12px;";
    img.after(placeholder);
  });
});
