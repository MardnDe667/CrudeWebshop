# Common Goods Webshop

A small, responsive webshop demo built with plain HTML, CSS, and JavaScript. It includes a dropdown shop menu, product category filtering, add-to-bag buttons, and a live bag count.

## Project files

- `index.html` — page content, navigation, product area, and footer.
- `style.css` — colors, layout, product cards, dropdown styling, and responsive layouts.
- `script.js` — product data and the interactions used by the page.

## How it was built

1. **Set up the project folder.** Created `CrudeWebshop` and added separate files for the HTML page, stylesheet, and JavaScript.
2. **Built the page structure in HTML.** Added the announcement bar, header, shop dropdown, hero section, product section, story section, footer, and a status area for feedback messages.
3. **Styled the store in CSS.** Added the warm neutral color palette, typography, image layouts, product cards, hover states, and responsive rules for smaller screens.
4. **Added product data and rendering in JavaScript.** Defined sample products with names, categories, prices, tags, and image URLs, then used that data to render the product cards.
5. **Connected the category controls.** The select control and the header dropdown both filter products by category. Selecting a category from the header also scrolls to the product section.
6. **Made the bag buttons interactive.** Clicking “Add to bag” increments the selected product quantity, updates the header count, and displays a short confirmation message. The bag button shows the current item count.
7. **Checked the result.** Checked the JavaScript syntax and opened the page in a browser. Verified the dropdown opens, category filtering displays the matching products, and adding a product updates the bag count.

## Run locally

Open `index.html` in a modern web browser. No build tools, package installation, or server are required.

The photos and web fonts are loaded from external URLs, so an internet connection is needed to display them. The rest of the page works as a local static site.

## Scope

This is a front-end demo, not a production checkout. The bag exists only in the current page session; there is no payment flow, backend, or persistent cart storage.
