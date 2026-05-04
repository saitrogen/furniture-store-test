// ============================================================
// ADMIN — full CRUD: add, edit, delete products + images
// ============================================================

let products = [];
let editIndex = -1; // -1 = add mode, >=0 = edit mode
let existingImages = []; // images already saved for product being edited
let imagesToDelete = []; // images marked for removal during edit

// ── Auth ────────────────────────────────────────────────────

async function init() {
  document.documentElement.style.setProperty('--brand', CONFIG.BRAND_COLOR);
  document.documentElement.style.setProperty('--accent', CONFIG.ACCENT_COLOR);
  document.querySelector('header h1').textContent = '🛋 ' + CONFIG.STORE_NAME + ' Admin';

  const token = localStorage.getItem('gh_token');
  if (!token) {
    document.getElementById('loginSection').style.display = 'block';
    return;
  }
  const user = await getAuthUser();
  if (!user) {
    localStorage.removeItem('gh_token');
    document.getElementById('loginSection').style.display = 'block';
    return;
  }
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('adminSection').style.display = 'block';
  document.getElementById('userInfo').innerHTML =
    `<span>👤 ${user.login}</span>
     <button class="btn btn-sm btn-outline" onclick="logout()">Logout</button>`;
  await loadProducts();
}

function showLogin() {
  const t = prompt(
    'Paste your GitHub Personal Access Token\n(Fine-grained: Contents read+write on this repo)'
  );
  if (t && t.trim()) {
    localStorage.setItem('gh_token', t.trim());
    init();
  }
}

function logout() {
  localStorage.removeItem('gh_token');
  location.reload();
}

// ── Load & Render Product List ───────────────────────────────

async function loadProducts() {
  try {
    const res = await fetch(CONFIG.RAW_BASE + 'products.json?t=' + Date.now());
    products = await res.json();
  } catch { products = []; }
  renderProductList();
}

function renderProductList() {
  const list = document.getElementById('productList');
  if (!products.length) {
    list.innerHTML = '<p class="empty-msg">No products yet. Add your first one above.</p>';
    return;
  }
  list.innerHTML = products.map((p, i) => {
    const thumb = p.images && p.images[0]
      ? `${CONFIG.RAW_BASE}${p.images[0]}`
      : '';
    return `
    <div class="product-item" id="item-${i}">
      <div class="product-thumb" style="background-image:url('${thumb}')">
        ${!thumb ? '<span>📷</span>' : ''}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.category || '—'} · ${p.price}</p>
        <p class="pid">${p.id}</p>
      </div>
      <div class="product-actions">
        <button class="btn btn-sm btn-edit" onclick="startEdit(${i})">✏️ Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${i})">🗑 Delete</button>
      </div>
    </div>`;
  }).join('');
}

// ── Form: Add / Edit ─────────────────────────────────────────

function startEdit(index) {
  editIndex = index;
  imagesToDelete = [];
  const p = products[index];
  existingImages = [...(p.images || [])];

  document.getElementById('pid').value = p.id;
  document.getElementById('pid').disabled = true; // ID is immutable once set
  document.getElementById('pname').value = p.name;
  document.getElementById('pprice').value = p.price;
  document.getElementById('pcat').value = p.category || '';
  document.getElementById('pwa').value = p.whatsapp || '';
  document.getElementById('pdesc').value = p.description || '';

  document.getElementById('formTitle').textContent = `✏️ Editing: ${p.name}`;
  document.getElementById('submitBtn').textContent = '💾 Save Changes';
  document.getElementById('cancelBtn').style.display = 'inline-flex';
  document.getElementById('pimages').value = '';
  document.getElementById('newImgPreview').innerHTML = '';

  renderExistingImages();
  document.getElementById('formCard').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
  editIndex = -1;
  imagesToDelete = [];
  existingImages = [];
  resetForm();
}

function resetForm() {
  document.getElementById('pid').value = '';
  document.getElementById('pid').disabled = false;
  document.getElementById('pname').value = '';
  document.getElementById('pprice').value = '';
  document.getElementById('pcat').value = '';
  document.getElementById('pwa').value = '';
  document.getElementById('pdesc').value = '';
  document.getElementById('pimages').value = '';
  document.getElementById('newImgPreview').innerHTML = '';
  document.getElementById('existingImgs').innerHTML = '';
  document.getElementById('formTitle').textContent = '➕ Add New Product';
  document.getElementById('submitBtn').textContent = '✅ Add Product';
  document.getElementById('cancelBtn').style.display = 'none';
}

// ── Existing Image Management (Edit Mode) ────────────────────

function renderExistingImages() {
  const container = document.getElementById('existingImgs');
  if (!existingImages.length) {
    container.innerHTML = '<p class="hint">No images yet.</p>';
    return;
  }
  container.innerHTML = `
    <p class="hint">Current images — click ✕ to remove on save:</p>
    <div class="img-thumb-row">
      ${existingImages.map((src, i) => {
        const markedForDelete = imagesToDelete.includes(src);
        return `
        <div class="img-thumb ${markedForDelete ? 'marked-delete' : ''}" data-src="${src}">
          <img src="${CONFIG.RAW_BASE}${src}" alt="img" />
          <button class="img-remove-btn" onclick="toggleDeleteImage('${src}')" title="${markedForDelete ? 'Undo remove' : 'Remove image'}">
            ${markedForDelete ? '↩' : '✕'}
          </button>
        </div>`;
      }).join('')}
    </div>`;
}

function toggleDeleteImage(src) {
  const idx = imagesToDelete.indexOf(src);
  if (idx === -1) imagesToDelete.push(src);
  else imagesToDelete.splice(idx, 1);
  renderExistingImages();
}

// ── New Image Preview ─────────────────────────────────────────

function previewNewImages(input) {
  const preview = document.getElementById('newImgPreview');
  preview.innerHTML = '';
  [...input.files].forEach(f => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(f);
  });
}

// ── Submit: Add or Save Edit ──────────────────────────────────

async function submitForm() {
  const id          = document.getElementById('pid').value.trim();
  const name        = document.getElementById('pname').value.trim();
  const price       = document.getElementById('pprice').value.trim();
  const category    = document.getElementById('pcat').value.trim();
  const whatsapp    = document.getElementById('pwa').value.trim();
  const description = document.getElementById('pdesc').value.trim();
  const newFiles    = document.getElementById('pimages').files;

  if (!id || !name || !price) {
    showStatus('Please fill in Product ID, Name, and Price.', 'error');
    return;
  }
  if (editIndex === -1 && products.find(p => p.id === id)) {
    showStatus('A product with this ID already exists.', 'error');
    return;
  }

  setLoading(true);

  try {
    // 1. Delete images marked for removal
    if (imagesToDelete.length) {
      showStatus('Removing deleted images...', 'info');
      await deleteImageFiles(imagesToDelete);
    }

    // 2. Upload new images
    const uploadedPaths = [];
    if (newFiles.length) {
      showStatus(`Uploading ${newFiles.length} image(s)...`, 'info');
      // Find next available index
      const existingCount = editIndex >= 0
        ? (products[editIndex].images || []).filter(p => !imagesToDelete.includes(p)).length
        : 0;
      for (let i = 0; i < newFiles.length; i++) {
        const ext  = newFiles[i].name.split('.').pop().toLowerCase();
        const path = `images/${id}-${existingCount + i + 1}.${ext}`;
        await uploadImageFile(newFiles[i], path);
        uploadedPaths.push(path);
      }
    }

    // 3. Build final image array
    const remainingExisting = existingImages.filter(src => !imagesToDelete.includes(src));
    const finalImages = [...remainingExisting, ...uploadedPaths];

    // 4. Build product object
    const product = { id, name, price, category, description, whatsapp, images: finalImages };

    // 5. Update products array
    if (editIndex >= 0) {
      products[editIndex] = product;
    } else {
      products.push(product);
    }

    // 6. Save products.json
    showStatus('Saving product data...', 'info');
    await saveProducts(products);

    showStatus(
      editIndex >= 0 ? `✅ "${name}" updated!` : `✅ "${name}" added!`,
      'success'
    );
    resetForm();
    editIndex = -1;
    imagesToDelete = [];
    existingImages = [];
    await loadProducts();

  } catch (err) {
    console.error(err);
    showStatus('❌ Operation failed. Check console for details.', 'error');
  }

  setLoading(false);
}

// ── Delete Product (with image cleanup) ──────────────────────

async function deleteProduct(index) {
  const p = products[index];
  if (!confirm(`Delete "${p.name}"?\nThis will also delete all its images.`)) return;

  setLoading(true);
  try {
    if (p.images && p.images.length) {
      showStatus('Deleting images...', 'info');
      await deleteImageFiles(p.images);
    }
    products.splice(index, 1);
    showStatus('Saving...', 'info');
    await saveProducts(products);
    showStatus(`✅ "${p.name}" deleted.`, 'success');
    await loadProducts();
  } catch (err) {
    console.error(err);
    showStatus('❌ Delete failed.', 'error');
  }
  setLoading(false);
}

// ── UI Helpers ────────────────────────────────────────────────

function showStatus(msg, type = 'info') {
  const s = document.getElementById('status');
  s.textContent = msg;
  s.className = `status ${type}`;
  s.style.display = 'block';
  clearTimeout(s._timer);
  if (type === 'success') s._timer = setTimeout(() => s.style.display = 'none', 4000);
}

function setLoading(on) {
  document.getElementById('submitBtn').disabled = on;
  document.getElementById('submitBtn').textContent = on ? '⏳ Working...' : (
    editIndex >= 0 ? '💾 Save Changes' : '✅ Add Product'
  );
}

init();
