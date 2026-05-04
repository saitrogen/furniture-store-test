# Stitch UI Designs - Reference Documentation

This folder contains 9 complete UI designs exported from Stitch for the Nordic Earth furniture store. These are HTML snapshots of the design system and serve as visual/code references during implementation.

## Design System: Nordic Earth

### Colors
- **Primary**: `#3b2a1a` (deep espresso brown)
- **Secondary**: `#6d5b4a` (warm brown)
- **Tertiary**: `#857260` (warm taupe)
- **Surfaces**: `#fff8f5` to `#f0edea` (warm creams/greys)
- **Text Primary**: `#1d1b19`
- **Text Muted**: `#857260`
- **Accent/Price**: `#ba1a1a` (red)
- **Success/Button**: `#155724` (green) or emerald-600
- **Border**: `#d1c4ba` or `#e8e1de`

### Typography
- **Font Family**: Public Sans (400, 500, 600, 700 weights)
- **Headings**: 700 weight, 1.2 line-height
- **Body**: 400 weight, 1.6 line-height
- **Font Sizes**:
  - h1: 2.25rem
  - h2: 1.875rem
  - h3: 1.5rem
  - body: 1rem
  - small: 0.875rem

### Spacing Grid (8px base)
- **Gutter**: 40px (2.5rem) - horizontal space between container edges and content
- **Section Gap**: 80px (5rem) - vertical space between major sections
- **Card Gap**: 20-40px depending on grid
- **Element Padding**: 16px-24px

### Shapes & Borders
- **Border Radius**: 8px (default), 12px (cards), 16px (buttons), 24px (large), 9999px (pills)
- **Borders**: 1px solid, subtle tonal layering
- **Shadows**: Minimal - sm (0 1px 4px rgba), default (0 2px 8px rgba), md (0 4px 12px rgba)

---

## Files & Implementation Reference

### 1. **1-desktop-homepage.html**
**Screen**: Astro Furniture Storefront (Desktop)
**Extract**:
- Search input styling (borderless, surface-light background)
- Category filter pills (filter-pill class, active state)
- Price range inputs (min/max pattern)
- Product grid (4 columns, 280px min-width, 40px gap)
- Results counter text placement
- Empty state styling

**Implement in**: `src/pages/index.astro`, `src/components/ProductGrid.tsx`

---

### 2. **2-desktop-product-detail.html**
**Screen**: Product Detail - Nordic Velvet Cloud Sofa
**Extract**:
- Image gallery with thumbnails on side
- Large hero image placeholder
- Sticky sidebar layout (desktop)
- Sticky product info panel:
  - Category badge
  - Product name (h2)
  - Price (large, red text)
  - Rating display
  - Description section
  - Specifications list styling
  - Stock status indicator
  - WhatsApp button (full-width, emerald-600)
- Related products carousel
- Review cards section

**Implement in**:
- `src/pages/products/[id].astro` (new dynamic route)
- `src/components/ProductGallery.tsx` (new)
- `src/components/ProductSpecs.tsx` (new)
- `src/components/RelatedProducts.tsx` (new)

---

### 3. **3-desktop-advanced-filters.html**
**Screen**: Advanced Browse & Filter - Nordic Living
**Extract**:
- Left sidebar (300px fixed width)
- Expandable filter sections:
  - Categories (with counts)
  - Price range slider
  - Materials checkboxes
  - Dimensions filter
  - Color selection
- Active filter chips at top
- Clear all button styling
- Sort dropdown
- View toggle (grid/list)
- Product grid showing filtered results

**Implement in**:
- `src/pages/browse.astro` (new)
- `src/components/FilterSidebar.tsx` (new)
- `src/components/FilterChips.tsx` (new)

---

### 4. **4-desktop-favorites.html**
**Screen**: Favorites Collection
**Extract**:
- Hero banner section
- Organized sections (Recently Saved, Most Viewed, Best Sellers)
- Product cards with remove button (X icon)
- Empty state messaging
- Card grid layout

**Implement in**:
- `src/pages/favorites.astro` (new)
- `src/components/FavoritesGrid.tsx` (new)
- `src/lib/favorites.ts` (new - localStorage helpers)

---

### 5. **5-desktop-admin-products.html**
**Screen**: Admin Dashboard - Products Table
**Extract**:
- Left sidebar navigation:
  - Dashboard
  - Products (active)
  - Orders
  - Analytics
  - Settings
- Products table structure:
  - Image thumbnail column
  - Name, Category, Price, Stock columns
  - Action buttons (edit, delete, view)
- Table header styling
- Row hover effects
- Pagination (optional)

**Implement in**:
- `src/pages/admin/products.astro` (new)
- `src/layouts/AdminLayout.astro` (new)
- `src/components/AdminSidebar.tsx` (new)
- `src/components/AdminProductsTable.tsx` (new)

---

### 6. **6-desktop-admin-modal.html**
**Screen**: Admin Dashboard - Add Product Modal
**Extract**:
- Modal overlay styling
- Form layout:
  - Product name input
  - Price input (currency)
  - Category dropdown
  - Description textarea
  - Image upload with preview
  - Form validation feedback
- Save/Cancel button placement
- Modal dimensions and positioning

**Implement in**:
- `src/components/ProductFormModal.tsx` (new)

---

### 7. **7-mobile-homepage.html**
**Screen**: Furniture Store - Mobile Home
**Extract**:
- Sticky header (compact, hamburger menu, search)
- Search bar (full-width, below header)
- Horizontal category pills (scrollable)
- Product grid (2 columns, smaller cards)
- Bottom navigation tabs:
  - Home (active)
  - Search
  - Favorites
  - Account
- Mobile-specific spacing and font sizes

**Implement in**: Responsive updates to existing components, add bottom nav

---

### 8. **8-mobile-product-detail.html**
**Screen**: Mobile Product Detail - Nordic Sofa
**Extract**:
- Full-width image carousel
- Dot indicators at bottom
- Category badge
- Product name
- Price (large, red)
- Star rating display
- Full description
- Specifications list:
  - Material
  - Dimensions
  - Weight
- Stock status badge
- Full-width WhatsApp button
- Related products below (horizontal scroll)

**Implement in**:
- Mobile version of `src/pages/products/[id].astro`
- Responsive `ProductGallery.tsx`

---

### 9. **9-mobile-category-browse.html**
**Screen**: Mobile Category: Beds
**Extract**:
- Category header with back button
- Inline filters:
  - Price slider
  - Material radios
  - Size selection
- Results counter
- Sort dropdown (Newest, Price, Popular)
- Product grid (2 columns)
- Card styling (compact for mobile)

**Implement in**:
- `src/pages/categories/[category].astro` (new dynamic route)
- `src/components/CategoryFilters.tsx` (new)
- Mobile-responsive design

---

## Implementation Workflow

### Phase 1: Homepage Polish (Week 1)
1. Compare current site with `1-desktop-homepage.html`
2. Extract CSS classes and layout structure
3. Update ProductGrid and ProductCard components
4. Verify colors match Nordic Earth exactly
5. Test search and filters

### Phase 2: Product Detail Pages (Weeks 2-3)
1. Study `2-desktop-product-detail.html` and `8-mobile-product-detail.html`
2. Create new components for gallery, specs, related products
3. Create `[id].astro` dynamic route
4. Test image carousel and sticky sidebar
5. Verify mobile responsiveness

### Phase 3: Advanced Features (Weeks 3-4)
1. Build advanced filter page from `3-desktop-advanced-filters.html`
2. Create category browse from `9-mobile-category-browse.html`
3. Build favorites from `4-desktop-favorites.html`

### Phase 4: Admin Interface (Week 5)
1. Study admin designs (`5-desktop-admin-products.html`, `6-desktop-admin-modal.html`)
2. Create admin layout and components
3. Build products table and form modal

---

## Quick CSS/Component Extraction Tips

1. **Open HTML file in browser** to see live rendering
2. **Use DevTools** (right-click → Inspect) to extract:
   - Class names
   - Color values
   - Font sizes
   - Spacing values
   - Grid/flex properties
3. **Copy relevant CSS** into global.css or component styles
4. **Extract component structure** (HTML layout) and convert to React/Astro

---

## Color Reference Snippets

```css
/* Primary Colors */
--primary: #3b2a1a;
--primary-dark: #3b2a1a;
--secondary: #6d5b4a;
--tertiary: #857260;

/* Surfaces */
--surface: #fff8f5;
--surface-light: #f9f2ef;
--surface-lighter: #f3ece9;
--surface-light: #ffffff;

/* Text */
--text-primary: #1d1b19;
--text-secondary: #4e453e;
--text-muted: #857260;

/* Functional */
--accent: #ba1a1a;    /* Price/alerts */
--success: #155724;   /* Or use emerald-600 */
--border: #d1c4ba;
--border-light: #e8e1de;
```

---

## File Viewing

To view any design in your browser:
```bash
# Open in default browser
open docs/ui-designs/1-desktop-homepage.html

# Or serve locally
python3 -m http.server 8000
# Visit http://localhost:8000/docs/ui-designs/
```

---

## Notes

- All designs use **Public Sans** font (imported from Google Fonts)
- Designs are **responsive** - they adapt to screen size
- **No JavaScript** animations in these snapshots (static HTML)
- Use as **visual reference** and **CSS source** during implementation
- Extract **structure, colors, spacing** - adapt to React/Astro component system

---

Last updated: 2026-05-04
