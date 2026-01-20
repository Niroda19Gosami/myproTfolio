/* =========================================
   Simple DOM JavaScript (No libs, no strict)
   Portfolio: Web Developer
   ========================================= */

/* ---------- Helper ---------- */
function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return document.querySelectorAll(selector);
}

/* ---------- Theme Toggle ---------- */
var themeToggleBtn = qs("#themeToggle");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark");
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") setTheme("dark");

themeToggleBtn.addEventListener("click", function () {
  var isDark = document.body.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

/* ---------- Mobile Menu ---------- */
var hamburgerBtn = qs("#hamburger");
var mobileMenu = qs("#mobileMenu");

hamburgerBtn.addEventListener("click", function () {
  var isOpen = mobileMenu.style.display === "block";
  mobileMenu.style.display = isOpen ? "none" : "block";
});

qsa("#mobileMenu a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.style.display = "none";
  });
});

/* ---------- Footer Year ---------- */
var yearEl = qs("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Scroll To Top ---------- */
var scrollTopBtn = qs("#scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 450) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Reveal on Scroll ---------- */
var revealEls = qsa(".reveal");

function initReveal() {
  // Fallback if IntersectionObserver not supported
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("show");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  return observer;
}

var revealObserver = initReveal();

/* ---------- Active Nav Link Highlight ---------- */
var sections = qsa("section[id]");
var navLinks = qsa(".menu a");

window.addEventListener("scroll", function () {
  var scrollPos = window.scrollY;

  var currentId = "";
  sections.forEach(function (sec) {
    var top = sec.offsetTop - 110;
    var height = sec.offsetHeight;

    if (scrollPos >= top && scrollPos < top + height) {
      currentId = sec.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    }
  });
});

/* ---------- Projects Data ---------- */
var projects = [
  {
    id: 1,
    title: "E-Commerce Electronics UI",
    category: "Web",
    desc: "Modern e-commerce UI with category filters, product cards and clean responsive layout.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    live: "https://example.com",
    github: "https://github.com/"
  },
  {
    id: 2,
    title: "Portfolio Landing Page",
    category: "UI",
    desc: "Minimal portfolio design with premium typography, smooth scroll and polished sections.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://example.com",
    github: "https://github.com/"
  },
  {
    id: 3,
    title: "Admin Dashboard",
    category: "Web",
    desc: "Dashboard UI with side navigation, card layout and structured admin components.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["UI", "Frontend", "CSS"],
    live: "https://example.com",
    github: "https://github.com/"
  },
  {
    id: 4,
    title: "Restaurant Website",
    category: "UI",
    desc: "Restaurant website UI with menu cards, reservation form, gallery and contact section.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format&fit=crop",
    tags: ["HTML", "CSS"],
    live: "https://example.com",
    github: "https://github.com/"
  },
  {
    id: 5,
    title: "JS Mini Apps",
    category: "JavaScript",
    desc: "Mini apps like Todo, Calculator and Quiz built with DOM manipulation + LocalStorage.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    tags: ["JavaScript", "DOM", "LocalStorage"],
    live: "https://example.com",
    github: "https://github.com/"
  }
];

/* ---------- Projects Render + Filters ---------- */
var filtersEl = qs("#filters");
var projectsGrid = qs("#projectsGrid");

function getCategories() {
  var cats = ["All"];
  projects.forEach(function (p) {
    if (!cats.includes(p.category)) cats.push(p.category);
  });
  return cats;
}

function renderFilters() {
  var categories = getCategories();
  var html = "";

  categories.forEach(function (cat, index) {
    html += '<button class="filter-btn ' + (index === 0 ? "active" : "") +
      '" data-cat="' + cat + '">' + cat + "</button>";
  });

  filtersEl.innerHTML = html;

  // Bind events
  qsa(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      qsa(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      var selected = btn.getAttribute("data-cat");
      var list = selected === "All" ? projects : projects.filter(function (p) {
        return p.category === selected;
      });

      renderProjects(list);
    });
  });
}

function renderProjects(list) {
  var html = "";

  list.forEach(function (p) {
    html +=
      '<article class="project-card reveal">' +
        '<div class="project-thumb">' +
          '<img src="' + p.image + '" alt="' + p.title + '">' +
        "</div>" +
        '<div class="project-body">' +
          "<h3>" + p.title + "</h3>" +
          "<p>" + p.desc.substring(0, 92) + "...</p>" +
          '<div class="project-actions">' +
            '<button class="btn btn-outline open-modal" ' +
              'data-title="' + p.title + '" ' +
              'data-desc="' + p.desc + '" ' +
              'data-image="' + p.image + '" ' +
              'data-tags="' + p.tags.join(",") + '" ' +
              'data-live="' + p.live + '" ' +
              'data-github="' + p.github + '">' +
              "View" +
            "</button>" +
            '<a class="btn btn-primary" href="' + p.live + '" target="_blank">Live</a>' +
          "</div>" +
        "</div>" +
      "</article>";
  });

  projectsGrid.innerHTML = html;

  // Re-observe reveal animations for new elements
  if (revealObserver) {
    qsa("#projectsGrid .reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    qsa("#projectsGrid .reveal").forEach(function (el) {
      el.classList.add("show");
    });
  }

  bindModalButtons();
}

/* ---------- Project Modal ---------- */
var modalOverlay = qs("#modalOverlay");
var modalCloseBtn = qs("#modalClose");
var modalImage = qs("#modalImage");
var modalTitle = qs("#modalTitle");
var modalDesc = qs("#modalDesc");
var modalTags = qs("#modalTags");
var modalLive = qs("#modalLive");
var modalGit = qs("#modalGit");

function openModal(data) {
  modalImage.src = data.image;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;

  // Tags
  var tagsHtml = "";
  data.tags.split(",").forEach(function (t) {
    tagsHtml += "<span>" + t.trim() + "</span>";
  });
  modalTags.innerHTML = tagsHtml;

  modalLive.href = data.live;
  modalGit.href = data.github;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function bindModalButtons() {
  qsa(".open-modal").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal({
        title: btn.getAttribute("data-title"),
        desc: btn.getAttribute("data-desc"),
        image: btn.getAttribute("data-image"),
        tags: btn.getAttribute("data-tags"),
        live: btn.getAttribute("data-live"),
        github: btn.getAttribute("data-github")
      });
    });
  });
}

modalCloseBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
});

/* ---------- Contact Form Demo ---------- */
var contactForm = qs("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully ✅");
    contactForm.reset();
  });
}

/* ---------- Init ---------- */
renderFilters();
renderProjects(projects);
