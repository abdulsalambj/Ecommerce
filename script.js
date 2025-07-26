const products = [
  { id: 1, name: "Green T-shirt", price: 800, image: "asset/product1_green_1.jpg" },
  { id: 2, name: "Maroon T-shirt", price: 700, image: "asset/product1_maroon_1.jpg" },
  { id: 3, name: "White T-shirt", price: 900, image: "asset/product1_white_1.jpg" },
  { id: 4, name: "Red T-shirt", price: 1200, image: "asset/product1_red_1.jpg" }
];

function renderProducts() {
  const container = document.getElementById("product-container");
  products.forEach(product => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${product.image}" class="product-img" />
      <h3>${product.name}</h3>
      <p>Rs ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  const found = cart.find(p => p.id === id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalQtyEl = document.getElementById("total-qty");
  const totalPriceEl = document.getElementById("total-price");

  container.innerHTML = "";
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalQty += item.quantity;
    totalPrice += item.price * item.quantity;

    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item.image}" class="product-img" />
      <h3>${item.name}</h3>
      <p>Rs ${item.price}</p>
      <p>Subtotal: Rs ${item.price * item.quantity}</p>
      <button onclick="changeQty(${index}, -1)">-</button>
      <span>${item.quantity}</span>
      <button onclick="changeQty(${index}, 1)">+</button>
      <button onclick="removeItem(${index})">Delete</button>
    `;
    container.appendChild(div);
  });

  totalQtyEl.textContent = totalQty;
  totalPriceEl.textContent = totalPrice;
  updateCartCount();
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
