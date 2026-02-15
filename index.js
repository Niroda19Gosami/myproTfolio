/* =========================================
   Portfolio JS
   ========================================= */

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

var themeToggleBtn = qs('#themeToggle');

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '\u2600';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '\u263E';
    localStorage.setItem('theme', 'light');
  }
}

var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  setTheme('dark');
} else {
  setTheme('light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    var isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });
}

var hamburgerBtn = qs('#hamburger');
var mobileMenu = qs('#mobileMenu');

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', function () {
    var isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
  });

  qsa('#mobileMenu a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.style.display = 'none';
    });
  });
}

var yearEl = qs('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

var scrollTopBtn = qs('#scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

var revealEls = qsa('.reveal');

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('show');
    });
    return null;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  return observer;
}

var revealObserver = initReveal();

var sections = qsa('section[id]');
var navLinks = qsa('.menu a');

if (sections.length && navLinks.length) {
  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY;
    var currentId = '';

    sections.forEach(function (sec) {
      var top = sec.offsetTop - 110;
      var height = sec.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  });
}

var projects = [
  {
    id: 1,
    title: 'E-Commerce Electronics UI',
    category: 'Web',
    desc: 'Modern e-commerce UI with category filters, product cards and clean responsive layout.',
    image: './images/electro mart.png',
    tags: ['HTML', 'CSS', 'JS', 'Bootstrap'],
    live: 'https://niroda19gosami.github.io/ElectroMart---Electronics-Store/',
    github: 'https://github.com/Niroda19Gosami/ElectroMart---Electronics-Store'
  },
  {
    id: 2,
    title: 'Portfolio Landing Page',
    category: 'UI',
    desc: 'Minimal portfolio design with premium typography, smooth scroll and polished sections.',
    image: './images/portfolio-code.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://niroda19gosami.github.io/myproTfolio/',
    github: 'https://github.com/Niroda19Gosami/myproTfolio'
  },
  {
    id: 3,
    title: 'Bengali Weeding',
    category: 'Web',
    desc: 'Weeding service UI with side navigation, card layout and structured components.',
    image: './images/Bengali-Weeding.png',
    tags: ['UI', 'Frontend', 'CSS'],
    live: 'https://niroda19gosami.github.io/THE-Bengali-events--Bengali-weeding/',
    github: 'https://github.com/Niroda19Gosami/THE-Bengali-events--Bengali-weeding'
  },
  {
    id: 4,
    title: 'Restaurant Website',
    category: 'UI',
    desc: 'Bengali Restaurant website UI with Menu gallery, Add to cart, Place order and Contact section.',
    image: './images/Restrurent.png',
    tags: ['HTML', 'CSS'],
    live: 'https://niroda19gosami.github.io/--BENGALI--CUISINE-RESTRURENT-/',
    github: 'https://github.com/Niroda19Gosami/--BENGALI--CUISINE-RESTRURENT-'
  },
  {
    id: 5,
    title: 'Hotel Booking website',
    category: 'Web',
    desc: 'Hotel Booking website multi page-UI with Room Menu gallery, reservation, place order and contact section.',
    image: './images/hotel-booking.png',
    tags: ['HTML', 'CSS'],
    live: 'https://niroda19gosami.github.io/HILLWOOD-hoteL-booking-website./',
    github: 'https://github.com/Niroda19Gosami/HILLWOOD-hoteL-booking-website.'
  },
  {
    id: 6,
    title: 'JS Mini Apps',
    category: 'JavaScript',
    desc: 'Mini apps like Todo, Calculator and Quiz built with DOM manipulation and LocalStorage.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    tags: ['JavaScript', 'DOM', 'LocalStorage'],
    live: 'https://example.com',
    github: 'https://github.com/'
  }
];

var filtersEl = qs('#filters');
var projectsGrid = qs('#projectsGrid');

function normalizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';

  var trimmed = url.trim();
  if (!trimmed) return '#';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  return 'https://' + trimmed.replace(/^\/+/, '');
}

function getCategories() {
  var cats = ['All'];
  projects.forEach(function (p) {
    if (!cats.includes(p.category)) cats.push(p.category);
  });
  return cats;
}

function renderFilters() {
  if (!filtersEl) return;

  var categories = getCategories();
  var html = '';

  categories.forEach(function (cat, index) {
    html += '<button class="filter-btn ' + (index === 0 ? 'active' : '') + '" data-cat="' + cat + '">' + cat + '</button>';
  });

  filtersEl.innerHTML = html;

  qsa('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      qsa('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      var selected = btn.getAttribute('data-cat');
      var list = selected === 'All' ? projects : projects.filter(function (p) {
        return p.category === selected;
      });

      renderProjects(list);
    });
  });
}

function renderProjects(list) {
  if (!projectsGrid) return;

  var html = '';

  list.forEach(function (p) {
    var liveUrl = normalizeUrl(p.live);

    html +=
      '<article class="project-card reveal">' +
      '<div class="project-thumb">' +
      '<img src="' + p.image + '" alt="' + p.title + '">' +
      '</div>' +
      '<div class="project-body">' +
      '<h3>' + p.title + '</h3>' +
      '<p>' + p.desc.substring(0, 92) + '...</p>' +
      '<div class="project-actions">' +
      '<button class="btn btn-outline open-modal" data-id="' + p.id + '">' +
      'View' +
      '</button>' +
      '<a class="btn btn-primary" href="' + liveUrl + '" target="_blank" rel="noopener noreferrer">Live</a>' +
      '</div>' +
      '</div>' +
      '</article>';
  });

  projectsGrid.innerHTML = html;

  if (revealObserver) {
    qsa('#projectsGrid .reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    qsa('#projectsGrid .reveal').forEach(function (el) {
      el.classList.add('show');
    });
  }

  bindModalButtons();
}

var modalOverlay = qs('#modalOverlay');
var modalCloseBtn = qs('#modalClose');
var modalImage = qs('#modalImage');
var modalTitle = qs('#modalTitle');
var modalDesc = qs('#modalDesc');
var modalTags = qs('#modalTags');
var modalLive = qs('#modalLive');
var modalGit = qs('#modalGit');

function openModal(data) {
  if (!modalOverlay) return;

  var liveUrl = normalizeUrl(data.live);
  var githubUrl = normalizeUrl(data.github);

  if (modalImage) modalImage.src = data.image || '';
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDesc) modalDesc.textContent = data.desc;

  if (modalTags) {
    var tagsHtml = '';
    var tags = Array.isArray(data.tags)
      ? data.tags
      : String(data.tags || '').split(',');

    tags.forEach(function (t) {
      tagsHtml += '<span>' + t.trim() + '</span>';
    });
    modalTags.innerHTML = tagsHtml;
  }

  if (modalLive) modalLive.href = liveUrl;
  if (modalGit) modalGit.href = githubUrl;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;

  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function bindModalButtons() {
  qsa('.open-modal').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var projectId = Number(btn.getAttribute('data-id'));
      var project = projects.find(function (item) {
        return item.id === projectId;
      });

      if (!project) return;
      openModal(project);
    });
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

var contactForm = qs('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent successfully.');
    contactForm.reset();
  });
}

renderFilters();
renderProjects(projects);
