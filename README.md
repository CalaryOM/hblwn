# HOMABAY LBQ NETWORK — Website Project

## Project Structure

```
homabay_lbq_network/
├── index.html              ← Homepage (open this to start)
├── css/
│   └── styles.css          ← All styles for every page
├── js/
│   └── main.js             ← All interactivity (nav, gallery, counters, form)
├── pages/
│   ├── about.html          ← About Us page
│   ├── programs.html       ← Programs page (detailed)
│   ├── gallery.html        ← Full photo gallery
│   ├── news.html           ← News & Stories
│   └── contact.html        ← Contact + Donate page
├── images/                 ← Place your images here
└── README.md               ← This file
```

## How to Use

1. Open `index.html` in a browser to view the homepage.
2. All navigation links connect to the pages in `/pages/`.
3. To add real photos, place image files in the `/images/` folder and update `src` attributes in the HTML.

## Improvements Made

- Split into separate pages (Home, About, Programs, Gallery, News, Contact)
- Separated CSS and JS into their own files for easy editing
- Added full `aria-*` accessibility attributes throughout
- Improved form: uses proper `<label for>` + `id` pairs, shows success message inline (no alert popup)
- Added 24/7 emergency hotline to contact page
- Added news category tags and "Read More" links
- Added donate section with KES-denominated tiers
- Improved gallery: each item now shows a label on hover
- Improved lightbox: round buttons with hover states
- Improved footer: link hover now also shifts slightly right for a nice effect
- Added `--shadow-sm/md/lg` design tokens for consistent elevation
- Added hero bottom border accent strip
- Counter animation now strips non-numeric characters properly
- Mobile menu now sets `aria-expanded` correctly

## To Deploy

Upload the entire folder to any web host. No server-side code is needed — it's a pure HTML/CSS/JS static site.

## Adding Real Photos

Replace the gradient placeholder `<div>` blocks in gallery and news cards with real `<img>` tags:
```html
<img src="../images/your-photo.jpg" alt="Description of photo" loading="lazy">
```
