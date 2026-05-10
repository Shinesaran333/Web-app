import { bestSellers } from "./veraproducts.js";

const productsContainer = document.getElementById("products");

bestSellers.forEach(product => {
  productsContainer.innerHTML += `
    <div class="card" onclick="showSection('candles')">
      <img src="${product.image}" class="product-img">
      <div class="product-name">${product.name}</div>
    </div>
  `;
});