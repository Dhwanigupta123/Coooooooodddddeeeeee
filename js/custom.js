const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let noClickCount = 0;

// Start music on page load
bgMusic.volume = 0.3;
bgMusic.play().catch(() => {
  bgMusic.muted = true; // mute if autoplay blocked
});

musicToggle.addEventListener("click", () => {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    musicToggle.textContent = "🔈";
  } else {
    bgMusic.muted = true;
    musicToggle.textContent = "🔇";
  }
});

// Create floating heart at position
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

// Confetti + hearts + redirect on Yes click
yesButton.addEventListener("click", () => {
  const rect = yesButton.getBoundingClientRect();
  for (let i = 0; i < 15; i++) {
    const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 100;
    createHeart(x, y);
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Redirect after 2.5 seconds (change URL as needed)
  setTimeout(() => {
    window.location.href = "https://www.google.com";
  }, 2500);
});

// Fun No button behavior: dodge + cycle funny messages
const noMessages = [
  "Are you sure? 😢",
  "Please say yes! ❤️",
  "I promise I'll be good 😇",
  "No? Come on! 😞",
  "You broke my heart 💔",
  "Okay, maybe next time... 😔",
];

noButton.addEventListener("click", () => {
  alert(noMessages[noClickCount % noMessages.length]);
  noClickCount++;
});

// Dodging mouse on No button hover
noButton.addEventListener("mousemove", (e) => {
  const button = noButton;
  const container = button.parentElement;

  const rect = button.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const moveX = (offsetX - rect.width / 2) * 2;
  const moveY = (offsetY - rect.height / 2) * 2;

  let newLeft = rect.left - containerRect.left - moveX;
  let newTop = rect.top - containerRect.top - moveY;

  // clamp inside container
  newLeft = Math.min(containerRect.width - rect.width, Math.max(0, newLeft));
  newTop = Math.min(containerRect.height - rect.height, Math.max(0, newTop));

  button.style.position = "absolute";
  button.style.left = newLeft + "px";
  button.style.top = newTop + "px";
});

// Reset No button position on mouse leave
noButton.addEventListener("mouseleave", () => {
  noButton.style.position = "static";
  noButton.style.left = "";
  noButton.style.top = "";
});
