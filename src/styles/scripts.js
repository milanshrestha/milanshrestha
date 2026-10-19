// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");
const navList = document.getElementById("nav-list");

if (toggle && nav && navList) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu on link click (mobile only — harmless on desktop)
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();
