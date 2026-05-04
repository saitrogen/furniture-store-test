# Astro Migration Guide - Furniture Store

## ✅ What's Done

Your furniture store has been successfully migrated from vanilla HTML/CSS/JS to **Astro** with better UI/UX and modern tooling.

### Key Features Implemented

✨ **Modern Framework**
- Astro (static site generation + React components)
- Zero-JS by default → super fast
- Perfect for GitHub Pages

🔍 **Search & Filtering**
- Full-text search across product names, categories, descriptions
- Category filter buttons
- Price range sliders (₹0-10k, ₹10-25k, ₹25k-50k, ₹50k+)
- Real-time filtering with result counts
- "Clear all filters" button

🎨 **Beautiful UI**
- Responsive grid (1-4 columns depending on screen size)
- Product info: image carousel, name, price, description, category
- WhatsApp inquiry button (pre-fills product details)
- Image slider with dot navigation for multiple product images
- Lazy loading images
- Tailwind CSS (replicated your existing design tokens)

📦 **Same Data Model**
- Products stored in `products.json` (same flat file)
- Images in `images/` folder (same storage)
- GitHub as backend (ready for future admin interface)

🚀 **CI/CD Ready**
- GitHub Actions workflow for automatic deployment
- Builds on every push to `main`
- Deploys automatically to GitHub Pages

---

## 📁 New Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx        # Individual product cards
│   │   └── ProductGrid.tsx        # Grid + search/filter + products list
│   ├── layouts/
│   │   └── Layout.astro          # Base layout for all pages
│   ├── pages/
│   │   └── index.astro           # Main storefront page
│   ├── lib/
│   │   ├── products.ts           # Load products from products.json
│   │   └── search.ts             # Full-text search logic
│   └── styles/
│       └── global.css            # Tailwind + global styles
├── public/
│   ├── images/                   # Product images (same as before)
│   └── products.json             # Product data (same as before)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages auto-deployment
├── astro.config.mjs              # Astro configuration
├── tailwind.config.mjs           # Tailwind with brand colors
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
# Site runs on http://localhost:3000
```

### Build for Production
```bash
npm run build
# Static site generated in dist/ folder
```

### Preview Production Build
```bash
npm run preview
# Preview built site locally
```

---

## 🔧 Configuration

### Brand Colors (Tailwind)
Edit `tailwind.config.mjs` to customize:
```javascript
colors: {
  brand: '#3b2a1a',    // Brown - primary
  accent: '#c0392b',   // Red - highlights
  'bg-light': '#f5f0eb',
  // ... more colors
}
```

### Store Branding
Edit `src/layouts/Layout.astro`:
```astro
<h1>🪑 Furniture Store</h1>
<p>Quality furniture — Browse & connect directly</p>
```

---

## 📊 Adding Products

1. Edit `products.json`:
```json
{
  "id": "product-id",
  "name": "Product Name",
  "price": "₹10,000",
  "category": "Bed",
  "description": "Short description",
  "whatsapp": "919876543210",
  "images": ["images/product-id-1.jpg"]
}
```

2. Add images to `public/images/` folder (follow naming: `{product-id}-{number}.ext`)

3. Rebuild:
```bash
npm run build
```

---

## 🔍 Search & Filtering Features

### How It Works
- **Search**: Real-time full-text search across name, category, description
- **Categories**: Click category buttons to filter
- **Price Range**: Use min/max inputs to filter by price
- **Combined**: All filters work together (AND logic)
- **Active Count**: Shows how many filters are active
- **Clear**: One button to clear all filters

### Example Workflows
- Search "sofa" → Shows all sofas
- Click "Bed" → Shows only beds
- Set price ₹10,000-25,000 → Shows beds in that range
- Search + category + price → All filters applied

---

## 📱 Responsive Design

| Device | Grid | Notes |
|--------|------|-------|
| Mobile | 1 col | Full width cards |
| Tablet | 2-3 cols | Stacked nicely |
| Desktop | 4 cols | Full use of space |

All filters and search work smoothly on mobile too.

---

## 🌐 GitHub Pages Deployment

### Automatic Deployment
The GitHub Actions workflow automatically:
1. Runs on every push to `main` branch
2. Builds the site
3. Deploys to GitHub Pages

### First Time Setup
1. Merge this branch to `main`:
   ```bash
   git checkout main
   git merge feature/astro-rebuild
   git push origin main
   ```

2. Go to your GitHub repo → Settings → Pages
   - Source: GitHub Actions (should be auto-selected)
   - Custom domain: (optional)

3. Check Actions tab to monitor deployment

### Your Site URL
- `https://YOUR_USERNAME.github.io/furniture-store-test/`

---

## 📝 Adding More Features

### Product Detail Pages
Create `src/pages/[id].astro` for individual product pages:
```astro
---
import { loadProducts } from '../lib/products';

export async function getStaticPaths() {
  const products = await loadProducts();
  return products.map(p => ({
    params: { id: p.id },
    props: { product: p }
  }));
}

const { product } = Astro.props;
---

<h1>{product.name}</h1>
<!-- Detail page content -->
```

### Admin Interface (Future)
The current admin system still works. You can:
1. Keep using `admin.html` as-is
   - Or migrate it to Astro: create `src/pages/admin.astro`
   - Both work with the same GitHub backend

### Wishlist / Favorites
Add JavaScript state management (React hook) to ProductGrid.

### Multi-language Support
Add i18n with Astro's integration.

---

## 🐛 Troubleshooting

### Build fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Images not showing
- Check images are in `public/images/`
- Check `products.json` has correct image paths
- Paths should start with `images/`

### Styles not applying
- Add CSS to `src/styles/global.css`
- Or use Tailwind classes in components
- Rebuild after style changes

### GitHub Pages not updating
- Check Actions tab for workflow errors
- Ensure `main` branch has latest commits
- Wait 1-2 min after push, then hard refresh (Cmd+Shift+R)

---

## 📚 Next Steps

1. **Test locally**: `npm run dev`, add more products to `products.json`
2. **Customize**: Update store name, colors, and messaging in Layout
3. **Merge to main**: When ready: `git checkout main && git merge feature/astro-rebuild && git push`
4. **Monitor GitHub Pages**: Go to repo Actions tab to watch deployment
5. **Add more products**: Update `products.json` and rebuild
6. **Admin interface**: Migrate `admin.html` to Astro when needed

---

## 📞 Support Resources

- **Astro Docs**: https://docs.astro.build
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs
- **GitHub Pages**: https://pages.github.com

---

## 🎉 Congratulations!

Your furniture store is now powered by Astro with:
- ⚡ Lightning-fast performance
- 🔍 Powerful search & filtering
- 🎨 Beautiful, modern UI
- 📱 Responsive design
- 🚀 Automatic deployment

Time to add hundreds of products! 🪑✨
