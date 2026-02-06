// ===== State Management =====
let allUrls = [];
let filteredUrls = [];
let categories = [];
let aboutData = null;
let currentCategory = "all";
let searchQuery = "";

// ===== DOM Elements =====
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search");
const categoryFilter = document.getElementById("category-filter");
const categoryTabs = document.querySelector(".category-tabs");
const addBtn = document.getElementById("add-btn");
const modal = document.getElementById("add-modal");
const modalClose = document.getElementById("modal-close");
const cancelBtn = document.getElementById("cancel-btn");
const addForm = document.getElementById("add-form");
const emptyState = document.getElementById("empty-state");
const totalCount = document.getElementById("total-count");
const categoryCount = document.getElementById("category-count");
const showingCount = document.getElementById("showing-count");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
const navLinks = document.querySelectorAll(".nav-link");
const aboutContainer = document.getElementById("about-container");

// ===== Category Icons =====
const categoryIcons = {
  "online-tools": "🔗",
  "desktop-apps": "💻",
  "chrome-extensions": "🌐",
  "vscode-extensions": "📝",
  misc: "📦",
};

const categoryNames = {
  "online-tools": "Online Tools",
  "desktop-apps": "Desktop Apps",
  "chrome-extensions": "Chrome Extensions",
  "vscode-extensions": "VSCode Extensions",
  misc: "Misc",
};

// ===== Social Icons SVG =====
const socialIcons = {
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`,
};

// ===== Initialize App =====
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  fetchAboutData();
  setupEventListeners();
});

// ===== Fetch URLs Data =====
async function fetchData() {
  try {
    const [urlsResponse, categoriesResponse] = await Promise.all([
      fetch("/api/urls"),
      fetch("/api/categories"),
    ]);

    const urlsData = await urlsResponse.json();
    categories = await categoriesResponse.json();

    allUrls = urlsData.urls || [];
    filteredUrls = [...allUrls];

    renderCategoryFilter();
    renderCategoryTabs();
    renderCards();
    updateStats();
  } catch (error) {
    console.error("Error fetching data:", error);
    showToast("Error loading data", "error");
  }
}

// ===== Fetch About Data =====
async function fetchAboutData() {
  try {
    const response = await fetch("/api/about");
    if (!response.ok) throw new Error("Failed to fetch about data");

    aboutData = await response.json();
    renderAboutPage();
  } catch (error) {
    console.error("Error fetching about data:", error);
    aboutContainer.innerHTML = `
            <div class="error-state">
                <p>Failed to load about data</p>
            </div>
        `;
  }
}

// ===== Render About Page (with null safety) =====
function renderAboutPage() {
  if (!aboutData) {
    aboutContainer.innerHTML = `
            <div class="error-state">
                <p>No about data available</p>
            </div>
        `;
    return;
  }

  // Destructure with default values
  const {
    name = "Anonymous",
    tagline = "",
    avatar = "",
    bio = [],
    stats = [],
    socialLinks = [],
    skills = [],
    quote = null,
  } = aboutData;

  // Generate avatar
  const avatarHTML = avatar
    ? `<div class="about-avatar">
               <img src="${avatar}" alt="${name}" onerror="this.parentElement.innerHTML='👤'">
           </div>`
    : `<div class="about-avatar-emoji">👤</div>`;

  // Generate bio paragraphs (only if bio exists and has items)
  const bioHTML =
    bio.length > 0
      ? `<div class="about-content">
               ${bio.map((p) => `<p>${p}</p>`).join("")}
           </div>`
      : "";

  // Generate stats (only if stats exists and has items)
  const statsHTML =
    stats.length > 0
      ? `<div class="about-stats">
               ${stats
                 .map(
                   (stat) => `
                   <div class="about-stat">
                       <span class="about-stat-icon">${stat.icon || "📌"}</span>
                       <span class="about-stat-label">${stat.label || ""}</span>
                   </div>
               `,
                 )
                 .join("")}
           </div>`
      : "";

  // Generate social links (only if socialLinks exists and has items)
  const socialLinksHTML =
    socialLinks.length > 0
      ? `<div class="about-links">
               <h3>Let's Connect</h3>
               <div class="social-links">
                   ${socialLinks
                     .map(
                       (link) => `
                       <a href="${link.url || "#"}" target="_blank" rel="noopener noreferrer" class="social-link">
                           ${socialIcons[link.icon] || socialIcons.website}
                           ${link.name || "Link"}
                       </a>
                   `,
                     )
                     .join("")}
               </div>
           </div>`
      : "";

  // Generate skills (only if skills exists and has items)
  const skillsHTML =
    skills.length > 0
      ? `<div class="about-skills">
               <h3>Skills & Technologies</h3>
               <div class="skill-tags">
                   ${skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
               </div>
           </div>`
      : "";

  // Generate quote (only if quote exists)
  const quoteHTML =
    quote && quote.text
      ? `<blockquote class="about-quote">
               <p>"${quote.text}"</p>
               ${quote.author ? `<cite>— ${quote.author}</cite>` : ""}
           </blockquote>`
      : "";

  // Render complete about page
  aboutContainer.innerHTML = `
        ${avatarHTML}
        
        <h1>${name}</h1>
        ${tagline ? `<p class="about-tagline">${tagline}</p>` : ""}
        
        ${bioHTML}
        ${quoteHTML}
        ${statsHTML}
        ${skillsHTML}
        ${socialLinksHTML}
    `;
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
  // Search
  searchInput.addEventListener("input", handleSearch);
  clearSearchBtn.addEventListener("click", clearSearch);

  // Category filter
  categoryFilter.addEventListener("change", handleCategoryChange);

  // Modal
  addBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Form submission
  addForm.addEventListener("submit", handleFormSubmit);

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavigation);
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "/" && !modal.classList.contains("active")) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

// ===== Render Functions =====
function renderCards() {
  if (filteredUrls.length === 0) {
    cardsContainer.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const cardsHTML = filteredUrls.map((url) => createCardHTML(url)).join("");
  cardsContainer.innerHTML = cardsHTML;

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteUrl(parseInt(btn.dataset.id)));
  });
}

function createCardHTML(url) {
  const categoryIcon = categoryIcons[url.category] || "📌";
  const categoryName = categoryNames[url.category] || url.category;
  const tagsHTML = url.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return `
        <article class="card" data-id="${url.id}">
            <div class="card-header">
                <h3 class="card-title">
                    ${categoryIcon}
                    <a href="${url.url}" target="_blank" rel="noopener noreferrer">${url.name}</a>
                </h3>
                <span class="card-category">${categoryName}</span>
            </div>
            <p class="card-description">${url.description}</p>
            <div class="card-tags">${tagsHTML}</div>
            <div class="card-actions">
                <a href="${url.url}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Visit
                </a>
                <button class="card-btn card-btn-danger delete-btn" data-id="${url.id}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </article>
    `;
}

function renderCategoryFilter() {
  const options = categories
    .map((cat) => `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`)
    .join("");

  categoryFilter.innerHTML = `<option value="all">All Categories</option>${options}`;
}

function renderCategoryTabs() {
  const tabsHTML = categories
    .map(
      (cat) =>
        `<button class="tab-btn" data-category="${cat.id}">${cat.icon} ${cat.name}</button>`,
    )
    .join("");

  categoryTabs.innerHTML = `<button class="tab-btn active" data-category="all">All</button>${tabsHTML}`;

  // Add click listeners
  categoryTabs.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs
        .querySelectorAll(".tab-btn")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      categoryFilter.value = currentCategory;
      filterUrls();
    });
  });
}

function updateStats() {
  totalCount.textContent = allUrls.length;
  categoryCount.textContent = categories.length;
  showingCount.textContent = filteredUrls.length;
}

// ===== Search & Filter =====
function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase().trim();
  clearSearchBtn.style.display = searchQuery ? "flex" : "none";
  filterUrls();
}

function clearSearch() {
  searchInput.value = "";
  searchQuery = "";
  clearSearchBtn.style.display = "none";
  filterUrls();
}

function handleCategoryChange(e) {
  currentCategory = e.target.value;

  // Update tabs
  categoryTabs.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === currentCategory);
  });

  filterUrls();
}

function filterUrls() {
  filteredUrls = allUrls.filter((url) => {
    const matchesCategory =
      currentCategory === "all" || url.category === currentCategory;
    const matchesSearch =
      !searchQuery ||
      url.name.toLowerCase().includes(searchQuery) ||
      url.description.toLowerCase().includes(searchQuery) ||
      url.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  renderCards();
  updateStats();
}

// ===== Modal Functions =====
function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.getElementById("tool-name").focus();
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  addForm.reset();
}

// ===== Form Handling =====
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("tool-name").value.trim(),
    url: document.getElementById("tool-url").value.trim(),
    description: document.getElementById("tool-description").value.trim(),
    category: document.getElementById("tool-category").value,
    tags: document
      .getElementById("tool-tags")
      .value.split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag),
  };

  try {
    const response = await fetch("/api/urls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to add URL");

    const newUrl = await response.json();
    allUrls.push(newUrl);
    filterUrls();
    closeModal();
    showToast("Tool added successfully!", "success");
  } catch (error) {
    console.error("Error adding URL:", error);
    showToast("Error adding tool", "error");
  }
}

// ===== Delete URL =====
async function deleteUrl(id) {
  if (!confirm("Are you sure you want to delete this tool?")) return;

  try {
    const response = await fetch(`/api/urls/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete URL");

    allUrls = allUrls.filter((url) => url.id !== id);
    filterUrls();
    showToast("Tool deleted successfully!", "success");
  } catch (error) {
    console.error("Error deleting URL:", error);
    showToast("Error deleting tool", "error");
  }
}

// ===== Navigation =====
function handleNavigation(e) {
  e.preventDefault();
  const page = e.target.dataset.page;

  // Update nav links
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  // Show/hide pages
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.toggle("active", p.id === `${page}-page`);
  });
}

// ===== Toast Notification =====
function showToast(message, type = "success") {
  toastMessage.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
