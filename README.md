# See Yes Garden Next.js Migration

This is the new Next.js source for the See Yes Garden website migration.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Current migration status

- Home page migrated first.
- Key images copied from the WordPress uploads folder into `public/images`.
- Product categories are represented in `data/products.ts`.
- WordPress core, plugins, cache, logs, private config, and PHP files are intentionally excluded.

## Content still needed from WordPress admin

- Full WordPress export XML: Tools > Export > All content.
- Elementor templates and page exports for Home, About, Contact, and product/category pages.
- ACF field group export JSON.
- Custom Post Type UI export for the `products` post type and `product_cat` taxonomy.
- Product list with slugs, titles, subtitles, overview, material, size, MOQ, lead time, images, application images, factory images, and FAQ.
- Contact form settings and email recipient rules.
- SEO titles, meta descriptions, menus, footer content, favicon, and logo.
