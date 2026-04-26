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


## Adding Real Photos

Replace the gradient placeholder `<div>` blocks in gallery and news cards with real `<img>` tags:
```html
<img src="../images/your-photo.jpg" alt="Description of photo" loading="lazy">
```
