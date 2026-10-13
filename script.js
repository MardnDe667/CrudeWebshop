const products = [
  {
    id: "stoneware-mug",
    name: "Sunday stoneware mug",
    category: "Kitchen",
    price: 24,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80",
    alt: "Handmade ceramic mug on a warm neutral background"
  },
  {
    id: "linen-tote",
    name: "Market day linen tote",
    category: "Accessories",
    price: 32,
    tag: "Everyday favorite",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    alt: "Neutral canvas tote bag"
  },
  {
    id: "soft-throw",
    name: "Slow morning throw",
    category: "Home",
    price: 68,
    tag: "Made to cozy up",
    image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=800&q=80",
    alt: "Soft textured throw blanket draped over a chair"
  },
  {
    id: "glass-vase",
    name: "Little everyday vase",
    category: "Home",
    price: 38,
    tag: "Just arrived",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80",
    alt: "Simple glass vase holding a few branches"
  }
];

const productGrid = document.querySelector("#product-grid");
const categoryFilter = document.querySelector("#category-filter");
const cartCount = document.querySelector("#cart-count");
const cartButton = document.querySelector("#cart-button");
const toast = document.querySelector("#toast");
const shopToggle = document.querySelector("#shop-toggle");
const shopMenu = document.querySelector("#shop-menu");
const cart = new Map();
let toastTimeout;

function renderProducts(category = "All") {
  const visibleProducts = category === "All"
    ? products
    : products.filter((product) => product.category === category);

  if (visibleProducts.length === 0) {
    productGrid.innerHTML = '<p class="empty-state">No products in this category yet.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-category">${product.category}</p>
        </div>
        <p class="product-price">$${product.price}</p>
      </div>
      <button class="add-button" type="button" data-product-id="${product.id}">Add to bag</button>
    </article>
  `).join("");
}

function updateCartCount() {
  const itemCount = [...cart.values()].reduce((total, quantity) => total + quantity, 0);
  cartCount.textContent = itemCount;
  cartButton.setAttribute("aria-label", `Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product-id]");
  if (!button) return;

  const product = products.find((item) => item.id === button.dataset.productId);
  if (!product) return;

  cart.set(product.id, (cart.get(product.id) || 0) + 1);
  updateCartCount();
  showToast(`${product.name} added to your bag`);
});

categoryFilter.addEventListener("change", () => renderProducts(categoryFilter.value));

shopToggle.addEventListener("click", () => {
  const isExpanded = shopToggle.getAttribute("aria-expanded") === "true";
  shopToggle.setAttribute("aria-expanded", String(!isExpanded));
  shopMenu.hidden = isExpanded;
});

shopMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  categoryFilter.value = button.dataset.category;
  renderProducts(button.dataset.category);
  shopToggle.setAttribute("aria-expanded", "false");
  shopMenu.hidden = true;
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-dropdown")) {
    shopToggle.setAttribute("aria-expanded", "false");
    shopMenu.hidden = true;
  }
});

cartButton.addEventListener("click", () => {
  const itemCount = [...cart.values()].reduce((total, quantity) => total + quantity, 0);
  showToast(itemCount ? `Your bag has ${itemCount} ${itemCount === 1 ? "item" : "items"}` : "Your bag is empty — find something you love.");
});

renderProducts();
