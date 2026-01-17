const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
  nav.classList.add("open");
  navBtn.classList.add("is-open");
  navBtn.setAttribute("aria-expanded", "true");

  navOverlay.hidden = false;
  requestAnimationFrame(() => {
    navOverlay.style.opacity = "1";
  });
}

function closeMenu() {
  nav.classList.remove("open");
  navBtn.classList.remove("is-open");
  navBtn.setAttribute("aria-expanded", "false");

  navOverlay.style.opacity = "0";
  setTimeout(() => {
    navOverlay.hidden = true;
  }, 260);
}



navBtn?.addEventListener("click", (e) => {
  e.preventDefault();
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

// // Load more reels
// loadMore?.addEventListener("click", () => {
//   document.querySelectorAll(".reel--hidden").forEach((el) => {
//     el.style.display = "block";
//   });
//   loadMore.style.display = "none";
// });

// Load more gallery photos
const loadMoreGallery = document.getElementById("loadMoreGallery");

loadMoreGallery?.addEventListener("click", () => {
  document.querySelectorAll(".galleryItem.hidden").forEach((img) => {
    img.classList.remove("hidden");
  });

  loadMoreGallery.style.display = "none";
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


// Contact form (Formspree) - show thank you message without leaving page
const contactForm = document.getElementById("contactForm");
const thanks = document.getElementById("thanks");
const contactSubmit = document.getElementById("contactSubmit");

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Hide thanks if user submits again
  if (thanks) thanks.hidden = true;

  // Disable button while sending
  if (contactSubmit) {
    contactSubmit.disabled = true;
    contactSubmit.textContent = "SENDING...";
  }

  try {
    const formData = new FormData(contactForm);

    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      contactForm.reset();
      if (thanks) thanks.hidden = false;
    } else {
      alert("Oops — something went wrong. Please try again.");
    }
  } catch (err) {
    alert("Network error — please try again.");
  } finally {
    if (contactSubmit) {
      contactSubmit.disabled = false;
      contactSubmit.textContent = "SEND";
    }
  }
});


navOverlay.style.opacity = "0";
setTimeout(() => {
  navOverlay.hidden = true;
}, 260);

document.querySelectorAll(".reelThumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const id = thumb.dataset.id;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    thumb.replaceWith(iframe);
  });
});
