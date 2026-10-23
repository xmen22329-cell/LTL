// ===============================
// GIAY NEW - APP.JS
// ===============================

// ===============================
// DATA SẢN PHẨM
// ===============================

const products = [
  {
    id: 1,
    name: "Gucci Ace",
    category: "GUCCI",
    price: 10890000,
    oldPrice: 15290000,
    image: "assets/images/gucci-ace.webp",
    sizes: [38, 39, 40, 41, 42, 43],
    description:
      "Gucci Ace là mẫu sneaker mang phong cách thời trang cao cấp, thiết kế thanh lịch và dễ phối đồ."
  },

  {
    id: 2,
    name: "Nike Air",
    category: "NIKE",
    price: 2190000,
    image: "assets/images/nike.webp",
    sizes: [38, 39, 40, 41, 42],
    description:
      "Nike Air mang phong cách thể thao hiện đại, phù hợp cho nhiều hoạt động hằng ngày."
  },

  {
    id: 3,
    name: "Dior B27",
    category: "Dior",
    price: 9190000,
    oldPrice: 13590000,
    image: "assets/images/dior.webp",
    sizes: [39, 40, 41, 42, 43],
    description:
      "Dior B27 nổi bật với thiết kế mạnh mẽ, hiện đại và đậm chất thời trang."
  },

  {
    id: 4,
    name: "Saint Laurent",
    category: "YSL",
    price: 4290000,
    image: "assets/images/ysl.webp",
    sizes: [39, 40, 41, 42, 43],
    description:
      "Saint Laurent mang thiết kế tối giản, sang trọng và dễ kết hợp với nhiều phong cách."
  },

  {
    id: 5,
    name: "Gucci Tennis",
    category: "GUCCI",
    price: 12890000,
    oldPrice: 13290000,
    image: "assets/images/Gucci Tennis.webp",
    sizes: [38, 39, 40, 41, 42, 43],
    description:
      "Gucci Tennis là mẫu sneaker mang phong cách thể thao, thiết kế trẻ trung và năng động."
  },

  {
    id: 6,
    name: "Nike Air Jordan",
    category: "NIKE",
    price: 3190000,
    image: "assets/images/Air Jordan.webp",
    sizes: [38, 39, 40, 41, 42],
    description:
      "Nike Air Jordan mang phong cách thể thao hiện đại, phù hợp cho nhiều hoạt động hằng ngày."
  },

  {
    id: 7,
    name: "Dior Granville",
    category: "Dior",
    price: 25190000,
    oldPrice: 30590000,
    image: "assets/images/Dior Granville.webp",
    sizes: [39, 40, 41, 42, 43],
    description:
      "Dior Granville nổi bật với thiết kế mạnh mẽ, hiện đại và đậm chất thời trang."
  },

  {
    id: 8,
    name: "Boot Nữ Yves Saint Laurent",
    category: "YSL",
    price: 19290000,
    image: "assets/images/Boot Nữ Yves Saint Laurent.webp",
    sizes: [39, 40, 41, 42, 43],
    description:
      "Saint Laurent mang thiết kế tối giản, sang trọng quý phái và dễ kết hợp với nhiều phong cách."
  }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("soleCart")) || [];


// ===============================
// DOM
// ===============================

const productGrid = document.getElementById("productGrid");
const emptyProducts = document.getElementById("emptyProducts");

const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");

const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");


// ===============================
// FORMAT TIỀN
// ===============================

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN").format(price) + "₫";
}


// ===============================
// PRODUCT IMAGE
// ===============================

function getProductImage(product) {
  return `
    <img
      src="${product.image}"
      alt="${product.name}"
      onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'product-placeholder\\'>👟</div>'"
    >
  `;
}


// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(list = products) {

  if (!productGrid) return;

  productGrid.innerHTML = "";

  if (!list.length) {
    if (emptyProducts) {
      emptyProducts.style.display = "block";
    }
    return;
  }

  if (emptyProducts) {
    emptyProducts.style.display = "none";
  }

  list.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        ${getProductImage(product)}

        ${
          product.oldPrice
            ? `<span class="product-badge">SALE</span>`
            : ""
        }
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="product-price">

          <strong>
            ${formatPrice(product.price)}
          </strong>

          ${
            product.oldPrice
              ? `
                <del>
                  ${formatPrice(product.oldPrice)}
                </del>
              `
              : ""
          }

        </div>

      </div>
    `;

    card.addEventListener("click", () => {
      openProductModal(product.id);
    });

    productGrid.appendChild(card);
  });
}


// ===============================
// FILTER CATEGORY
// ===============================

function filterCategory(category) {

  if (categoryFilter) {
    categoryFilter.value = category;
  }

  const filtered = products.filter(
    product => product.category === category
  );

  renderProducts(filtered);

  const productsSection = document.getElementById("products");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// ===============================
// SEARCH + FILTER + SORT
// ===============================

function applyFilters() {

  let result = [...products];

  const category =
    categoryFilter
      ? categoryFilter.value
      : "all";

  const search =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

  // CATEGORY

  if (category !== "all") {

    result = result.filter(
      product => product.category === category
    );

  }

  // SEARCH

  if (search) {

    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );

  }

  // SORT

  if (sortSelect) {

    switch (sortSelect.value) {

      case "price-low":

        result.sort(
          (a, b) => a.price - b.price
        );

        break;

      case "price-high":

        result.sort(
          (a, b) => b.price - a.price
        );

        break;

      case "name":

        result.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name,
              "vi"
            )
        );

        break;
    }

  }

  renderProducts(result);
}


// ===============================
// PRODUCT MODAL
// ===============================

function openProductModal(productId) {

  const product = products.find(
    p => p.id === productId
  );

  if (!product) return;

  const modal =
    document.getElementById("productModal");

  if (!modal) return;

  const modalImage =
    document.getElementById("modalImage");

  const modalName =
    document.getElementById("modalName");

  const modalCategory =
    document.getElementById("modalCategory");

  const modalPrice =
    document.getElementById("modalPrice");

  const modalOldPrice =
    document.getElementById("modalOldPrice");

  const modalDescription =
    document.getElementById("modalDescription");

  const sizeSelect =
    document.getElementById("sizeSelect");

  if (modalImage) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
  }

  if (modalName) {
    modalName.textContent = product.name;
  }

  if (modalCategory) {
    modalCategory.textContent =
      product.category;
  }

  if (modalPrice) {
    modalPrice.textContent =
      formatPrice(product.price);
  }

  if (modalOldPrice) {

    if (product.oldPrice) {

      modalOldPrice.textContent =
        formatPrice(product.oldPrice);

      modalOldPrice.style.display =
        "inline";

    } else {

      modalOldPrice.style.display =
        "none";

    }

  }

  if (modalDescription) {

    modalDescription.textContent =
      product.description || "";

  }

  if (sizeSelect) {

    sizeSelect.innerHTML = `
      <option value="">
        Chọn size
      </option>
    `;

    product.sizes.forEach(size => {

      sizeSelect.innerHTML += `
        <option value="${size}">
          Size ${size}
        </option>
      `;

    });

  }

  modal.dataset.productId =
    product.id;

  modal.classList.add("active");

  document.body.classList.add("modal-open");
}


// ===============================
// CLOSE PRODUCT MODAL
// ===============================

function closeProductModal() {

  const modal =
    document.getElementById("productModal");

  if (!modal) return;

  modal.classList.remove("active");

  document.body.classList.remove(
    "modal-open"
  );
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId, size) {

  const product =
    products.find(
      p => p.id === productId
    );

  if (!product) return;

  if (!size) {

    alert("Vui lòng chọn size.");

    return;
  }

  const existing =
    cart.find(
      item =>
        item.productId === productId &&
        String(item.size) === String(size)
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      productId: productId,
      size: size,
      quantity: 1
    });

  }

  saveCart();

  renderCart();

  closeProductModal();

  alert("Đã thêm sản phẩm vào giỏ hàng.");
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

  localStorage.setItem(
    "soleCart",
    JSON.stringify(cart)
  );

}


// ===============================
// RENDER CART
// ===============================

function renderCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartEmpty =
    document.getElementById("cartEmpty");

  const cartFooter =
    document.getElementById("cartFooter");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (!cart.length) {

    if (cartEmpty) {
      cartEmpty.style.display = "block";
    }

    if (cartFooter) {
      cartFooter.style.display = "none";
    }

    updateCartCount();

    return;
  }

  if (cartEmpty) {
    cartEmpty.style.display = "none";
  }

  if (cartFooter) {
    cartFooter.style.display = "block";
  }

  cart.forEach((item, index) => {

    const product =
      products.find(
        p => p.id === item.productId
      );

    if (!product) return;

    const cartItem =
      document.createElement("div");

    cartItem.className =
      "cart-item";

    cartItem.innerHTML = `

      <div class="cart-item-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>

      <div class="cart-item-info">

        <h4>
          ${product.name}
        </h4>

        <p>
          Size ${item.size}
        </p>

        <strong>
          ${formatPrice(product.price)}
        </strong>

        <div class="cart-item-controls">

          <button
            onclick="changeQuantity(${index}, -1)"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="changeQuantity(${index}, 1)"
          >
            +
          </button>

          <button
            class="cart-remove"
            onclick="removeFromCart(${index})"
          >
            ×
          </button>

        </div>

      </div>
    `;

    cartItems.appendChild(cartItem);
  });

  updateCartCount();

  updateCartTotal();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, change) {

  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }

  saveCart();

  renderCart();
}


// ===============================
// REMOVE CART ITEM
// ===============================

function removeFromCart(index) {

  if (!cart[index]) return;

  cart.splice(index, 1);

  saveCart();

  renderCart();
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

  if (!cartCount) return;

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  cartCount.textContent = count;
}


// ===============================
// CART TOTAL
// ===============================

function updateCartTotal() {

  const cartSubtotal =
    document.getElementById(
      "cartSubtotal"
    );

  const cartTotal =
    document.getElementById(
      "cartTotal"
    );

  let total = 0;

  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.productId
      );

    if (product) {

      total +=
        product.price *
        item.quantity;

    }

  });

  if (cartSubtotal) {

    cartSubtotal.textContent =
      formatPrice(total);

  }

  if (cartTotal) {

    cartTotal.textContent =
      formatPrice(total);

  }
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

  if (!cartDrawer) return;

  cartDrawer.classList.add("active");

  document.body.classList.add(
    "cart-open"
  );

  renderCart();
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

  if (!cartDrawer) return;

  cartDrawer.classList.remove("active");

  document.body.classList.remove(
    "cart-open"
  );
}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

  if (!cart.length) {

    alert("Giỏ hàng đang trống.");

    return;
  }

  window.location.href =
    "checkout.html";
}


// ===============================
// HOME
// ===============================

function goHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ===============================
// SEARCH BOX
// ===============================

function openSearch() {

  const searchBox =
    document.getElementById(
      "searchBox"
    );

  if (!searchBox) return;

  searchBox.classList.add("active");

  if (searchInput) {
    searchInput.focus();
  }

}


function closeSearchBox() {

  const searchBox =
    document.getElementById(
      "searchBox"
    );

  if (!searchBox) return;

  searchBox.classList.remove(
    "active"
  );

}


// ===============================
// MOBILE MENU
// ===============================

function setupMobileMenu() {

  const headerInner =
    document.querySelector(
      ".header-inner"
    );

  const nav =
    document.querySelector(".nav");

  if (!headerInner || !nav) return;

  // Tránh tạo menu nhiều lần

  if (
    document.querySelector(
      ".mobile-menu-btn"
    )
  ) {
    return;
  }

  const menuButton =
    document.createElement(
      "button"
    );

  menuButton.className =
    "mobile-menu-btn";

  menuButton.type = "button";

  menuButton.setAttribute(
    "aria-label",
    "Mở menu"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.textContent = "☰";

  const headerActions =
    headerInner.querySelector(
      ".header-actions"
    );

  if (headerActions) {

    headerInner.insertBefore(
      menuButton,
      headerActions
    );

  } else {

    headerInner.appendChild(
      menuButton
    );

  }

  // Mở / đóng menu

  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle(
          "mobile-open"
        );

      menuButton.textContent =
        isOpen ? "✕" : "☰";

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );

  // Bấm menu thì tự đóng

  nav.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "mobile-open"
          );

          menuButton.textContent =
            "☰";

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });
}


// ===============================
// INIT
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Hiển thị sản phẩm
    renderProducts(products);

    // Hiển thị giỏ hàng
    renderCart();

    // Menu mobile
    setupMobileMenu();

    // Nút giỏ hàng
    if (cartBtn) {

      cartBtn.addEventListener(
        "click",
        openCart
      );

    }

    // Nút tìm kiếm
    const searchBtn =
      document.getElementById(
        "searchBtn"
      );

    if (searchBtn) {

      searchBtn.addEventListener(
        "click",
        openSearch
      );

    }

    // Đóng tìm kiếm
    const closeSearch =
      document.getElementById(
        "closeSearch"
      );

    if (closeSearch) {

      closeSearch.addEventListener(
        "click",
        closeSearchBox
      );

    }

    // Tìm kiếm realtime
    if (searchInput) {

      searchInput.addEventListener(
        "input",
        applyFilters
      );

    }

    // Category
    if (categoryFilter) {

      categoryFilter.addEventListener(
        "change",
        applyFilters
      );

    }

    // Sort
    if (sortSelect) {

      sortSelect.addEventListener(
        "change",
        applyFilters
      );

    }

    // ESC để đóng modal / cart / search

    document.addEventListener(
      "keydown",
      event => {

        if (event.key !== "Escape") {
          return;
        }

        closeProductModal();

        closeCart();

        closeSearchBox();

      }
    );

  }
);