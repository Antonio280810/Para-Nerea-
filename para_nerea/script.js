const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Animación de entrada al desplazarse por la página.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Abrir y cerrar la carta.
const letterModal = document.querySelector("#letterModal");
const openLetter = document.querySelector("#openLetter");
const closeLetter = document.querySelector("#closeLetter");

function showLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeLetter.focus();
}
function hideLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openLetter.focus();
}
openLetter.addEventListener("click", showLetter);
closeLetter.addEventListener("click", hideLetter);
letterModal.addEventListener("click", event => {
  if (event.target.dataset.close === "true") hideLetter();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && letterModal.classList.contains("open")) hideLetter();
});

// Mensajes sorpresa.
const messageBox = document.querySelector("#messageBox");
document.querySelectorAll(".surprise-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".surprise-card").forEach(item => item.classList.remove("active"));
    card.classList.add("active");
    messageBox.textContent = card.dataset.message;
  });
});

// Confeti sencillo, sin librerías externas.
document.querySelector("#confettiButton").addEventListener("click", () => {
  const pieces = ["✿", "♥", "✦", "❀", "•"];
  for (let i = 0; i < 55; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = ["#d98291", "#e5bd5d", "#a98ac5", "#87a98a"][Math.floor(Math.random() * 4)];
    piece.style.fontSize = `${12 + Math.random() * 18}px`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
  const toast = document.querySelector("#toast");
  toast.textContent = "¡Que tengas un cumpleaños precioso, Nerea! ♡";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
});
