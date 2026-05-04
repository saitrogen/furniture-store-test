// ============================================================
// STOREFRONT — renders product cards from products.json
// ============================================================

let allProducts = [];

async function loadStorefront() {
  setHeaderBranding();
  try {
    const res = await fetch(CONFIG.RAW_BASE + 'products.json?t=' + Date.now());
    allProducts = await res.json();
  } catch {
    allProducts = [];
  }
  document.getElementById('loading').style.display = 'none';
  buildFilters();
  renderProducts(allProducts);
  initLazyLoad();
}

function setHeaderBranding() {
  document.querySelector('header h1').textContent = '🪑 ' + CONFIG.STORE_NAME;
  document.querySelector('header p').textContent = CONFIG.STORE_TAGLINE;
  document.documentElement.style.setProperty('--brand', CONFIG.BRAND_COLOR);
  document.documentElement.style.setProperty('--accent', CONFIG.ACCENT_COLOR);
}

function buildFilters() {
  const cats = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];
  document.getElementById('filters').innerHTML = cats.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  document.getElementById('filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    renderProducts(cat === 'All' ? allProducts : allProducts.filter(p => p.category === cat));
    initLazyLoad();
  });
}

function renderProducts(products) {
  const grid = document.getElementById('grid');
  if (!products.length) {
    grid.innerHTML = '<p class="empty-msg">No products found.</p>';
    return;
  }
  grid.innerHTML = products.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  const imgs = (p.images && p.images.length) ? p.images : [null];
  const msg  = encodeURIComponent(`Hi, I'm interested in ${p.name}`);
  const wa   = p.whatsapp || CONFIG.DEFAULT_WHATSAPP;

  const imgSlides = imgs.map((src, i) => `
    <img
      class="slide ${i === 0 ? 'active' : ''}"
      data-src="${src ? CONFIG.RAW_BASE + src : ''}"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E"
      alt="${p.name} image ${i + 1}"
      width="400" height="300"
    />`).join('');

  const dots = imgs.length > 1
    ? `<div class="dots">${imgs.map((_, i) =>
        `<span class="dot ${i === 0 ? 'active' : ''}" data-i="${i}"></span>`).join('')}</div>`
    : '';

  return `
  <div class="card" id="card-${p.id}">
    <div class="card-imgs" data-id="${p.id}">
      ${imgSlides}
      ${dots}
    </div>
    <div class="card-body">
      <span class="tag">${p.category || ''}</span>
      <h3>${p.name}</h3>
      <div class="price">${p.price}</div>
      <p class="desc">${p.description || ''}</p>
      <a class="wa-btn" href="https://wa.me/${wa}?text=${msg}" target="_blank" rel="noopener">
        💬 WhatsApp Enquiry
      </a>
    </div>
  </div>`;
}

// Image slider — event delegation on grid
document.addEventListener('click', e => {
  const dot = e.target.closest('.dot');
  if (!dot) return;
  const container = dot.closest('.card-imgs');
  const idx = parseInt(dot.dataset.i);
  container.querySelectorAll('.slide').forEach((s, i) => s.classList.toggle('active', i === idx));
  container.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
});

// IntersectionObserver lazy loader — swaps data-src → src
function initLazyLoad() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      }
      obs.unobserve(img);
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
}
