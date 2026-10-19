// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");
const navList = document.getElementById("nav-list");

if (toggle && nav && navList) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Search Modal Functionality
const searchModal = document.getElementById("search-modal");
const searchTriggers = document.querySelectorAll(".search-link");
const searchCloseBtn = document.querySelector(".search-modal-close");
const searchBackdrop = document.querySelector(".search-modal-backdrop");
const modalSearchInput = document.getElementById("modal-search-input");
const modalSearchResults = document.getElementById("modal-search-results");

function openSearchModal(e) {
  if (e) e.preventDefault();
  if (searchModal) {
    searchModal.classList.add("open");
    searchModal.setAttribute("aria-hidden", "false");
    if (modalSearchInput) {
      setTimeout(() => modalSearchInput.focus(), 50);
    }
  }
}

function closeSearchModal() {
  if (searchModal) {
    searchModal.classList.remove("open");
    searchModal.setAttribute("aria-hidden", "true");
  }
}

searchTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openSearchModal);
});

if (searchCloseBtn) {
  searchCloseBtn.addEventListener("click", closeSearchModal);
}

if (searchBackdrop) {
  searchBackdrop.addEventListener("click", closeSearchModal);
}

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    if (searchModal && searchModal.classList.contains("open")) {
      closeSearchModal();
    } else {
      openSearchModal();
    }
  }
  if (e.key === "Escape" && searchModal && searchModal.classList.contains("open")) {
    closeSearchModal();
  }
});

if (modalSearchInput && window.siteSearchIndex) {
  const allItems = [
    ...(window.siteSearchIndex.articles || []),
    ...(window.siteSearchIndex.projects || [])
  ];

  modalSearchInput.addEventListener("input", () => {
    const q = modalSearchInput.value.trim().toLowerCase();
    if (!q) {
      modalSearchResults.innerHTML = '<p class="search-hint">Type to start searching across all articles and projects...</p>';
      return;
    }

    const matches = allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      modalSearchResults.innerHTML = '<p class="search-hint">No matching articles or projects found.</p>';
      return;
    }

    const html = `<ul>${matches
      .map(
        (m) =>
          `<li><a href="${m.url}"><span style="text-transform: uppercase; font-size: 0.7rem; color: var(--color-primary); display: block; margin-bottom: 0.125rem;">${m.type}</span>${m.title}</a>${m.excerpt ? `<p class="excerpt">${m.excerpt}</p>` : ""}</li>`
      )
      .join("")}</ul>`;
    modalSearchResults.innerHTML = html;
  });
}

// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
