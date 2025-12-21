const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav"); // navPanel
const navOverlay = document.getElementById("navOverlay");

const loadMore = document.getElementById("loadMore");
const thanks = document.getElementById("thanks");
const toTop = document.getElementById("toTop");

function openMenu() {
  nav.classList.add("open");
  navBtn.classList.add("is-open");
  navBtn.setAttribute("aria-expanded", "true");
  navOverlay.hidden = false;
}

function closeMenu() {
  nav.classList.remove("open");
  navBtn.classList.remove("is-open");
  navBtn.setAttribute("aria-expanded", "false");
  navOverlay.hidden = true;
}

navBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.contains("open");
  if (isOpen) closeMenu();
  else openMenu();
});

navOverlay?.addEventListener("click", closeMenu);

nav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Load more reels
loadMore?.addEventListener("click", () => {
  document.querySelectorAll(".reel--hidden").forEach((el) => {
    el.style.display = "block";
  });
  loadMore.style.display = "none";
});

// Back to top show/hide
function updateToTopVisibility() {
  if (!toTop) return;
  const y = window.scrollY || document.documentElement.scrollTop;
  toTop.hidden = !(y > 500);
}
window.addEventListener("scroll", updateToTopVisibility, { passive: true });
updateToTopVisibility();

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Optional: if you redirect back with #thanks after form submit
if (window.location.hash === "#thanks") {
  if (thanks) thanks.hidden = false;
}
