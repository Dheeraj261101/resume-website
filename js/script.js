// --- typing effect for the role line ---
const roles = ["Java Backend Developer", "Spring Boot Developer", "EDI Developer", "Software Engineer"];
let i = 0, j = 0, forward = true;

function type() {
  const el = document.getElementById("typing");
  if (!el) return;
  if (forward) {
    el.textContent = roles[i].slice(0, ++j);
    if (j === roles[i].length) { forward = false; setTimeout(type, 1200); return; }
  } else {
    el.textContent = roles[i].slice(0, --j);
    if (j === 0) { forward = true; i = (i + 1) % roles.length; }
  }
  setTimeout(type, forward ? 80 : 40);
}
type();

// --- scroll reveal for sections ---
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
