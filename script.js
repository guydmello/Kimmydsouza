const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav");
const loadMore = document.getElementById("loadMore");
const thanks = document.getElementById("thanks");

navBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", String(isOpen));
});

loadMore?.addEventListener("click", () => {
  document.querySelectorAll(".reel--hidden").forEach(el => el.style.display = "block");
  loadMore.style.display = "none";
});

// Optional: show "Thanks for submitting!" when returning from Formspree
if (window.location.hash === "#thanks") {
  if (thanks) thanks.hidden = false;
}
