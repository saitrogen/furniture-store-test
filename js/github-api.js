// ============================================================
// GITHUB API — all GitHub Contents API calls live here
// ============================================================

function authHeaders() {
  const token = localStorage.getItem('gh_token');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };
}

async function ghGetFile(path) {
  const res = await fetch(`${CONFIG.API_BASE}/${path}`, { headers: authHeaders() });
  if (!res.ok) return null;
  return res.json(); // { sha, content, ... }
}

async function ghPutFile(path, contentBase64, message, sha = null) {
  const body = { message, content: contentBase64 };
  if (sha) body.sha = sha;
  const res = await fetch(`${CONFIG.API_BASE}/${path}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  return res.ok ? res.json() : Promise.reject(await res.json());
}

async function ghDeleteFile(path, message) {
  const file = await ghGetFile(path);
  if (!file) return true; // already gone
  const res = await fetch(`${CONFIG.API_BASE}/${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
    body: JSON.stringify({ message, sha: file.sha })
  });
  return res.ok;
}

async function ghListDir(path) {
  const res = await fetch(`${CONFIG.API_BASE}/${path}`, { headers: authHeaders() });
  if (!res.ok) return [];
  return res.json(); // array of { name, path, sha, type }
}

async function saveProducts(products) {
  const existing = await ghGetFile('products.json');
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(products, null, 2))));
  return ghPutFile('products.json', content, 'Update products.json', existing?.sha);
}

async function uploadImageFile(file, repoPath) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result.split(',')[1];
      try {
        const existing = await ghGetFile(repoPath);
        await ghPutFile(repoPath, base64, `Upload image: ${repoPath}`, existing?.sha);
        resolve(repoPath);
      } catch (err) { reject(err); }
    };
    reader.readAsDataURL(file);
  });
}

async function deleteImageFiles(imagePaths) {
  for (const p of imagePaths) {
    await ghDeleteFile(p, `Delete image: ${p}`);
  }
}

async function getAuthUser() {
  const res = await fetch('https://api.github.com/user', { headers: authHeaders() });
  if (!res.ok) return null;
  return res.json();
}
