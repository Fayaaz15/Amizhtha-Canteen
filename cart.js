// ================================
// CART.JS - Cart Logic
// ================================

// This function gets the cart from localStorage
// localStorage is like a small database in the browser
function getCart() {
    let cart = localStorage.getItem('amizhtha-cart');
    if (cart) {
        return JSON.parse(cart); // Convert text to array
    } else {
        return []; // Return empty array if no cart
    }
}

// This function saves the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('amizhtha-cart', JSON.stringify(cart));
}

// This function adds an item to the cart
function addToCart(name, price) {
    let cart = getCart();

    // Check if item already exists in cart
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If item exists, increase quantity
        existingItem.quantity += 1;
    } else {
        // If item doesn't exist, add it
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);

    // Show feedback to user
    alert('✅ ' + name + ' added to cart!');
}

// This function removes an item from the cart
function removeFromCart(name) {
    let cart = getCart();

    // Filter out the item with matching name
    cart = cart.filter(item => item.name !== name);

    saveCart(cart);

    // Refresh the cart display
    displayCart();
}

// This function displays cart items on cart.html
function displayCart() {
    let cart = getCart();
    let cartList = document.getElementById('cart-list');
    let emptyCart = document.getElementById('empty-cart');

    // If cart is empty
    if (cart.length === 0) {
        if (cartList) cartList.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'block';
        updateSummary(0, 0);
        return;
    }

    // If cart has items
    if (emptyCart) emptyCart.style.display = 'none';

    let html = '';
    let totalItems = 0;
    let totalPrice = 0;

    // Loop through each item and create HTML
    cart.forEach(function(item) {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        html += `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div style="color:#aaa; font-size:14px;">Qty: ${item.quantity}</div>
                </div>
                <div class="cart-item-price">₹${item.price * item.quantity}</div>
                <button class="btn-remove" onclick="removeFromCart('${item.name}')">Remove ❌</button>
            </div>
        `;
    });

    if (cartList) cartList.innerHTML = html;
    updateSummary(totalItems, totalPrice);
}

// This function updates the order summary numbers
function updateSummary(totalItems, totalPrice) {
    let totalItemsEl = document.getElementById('total-items');
    let subtotalEl = document.getElementById('subtotal');
    let totalPriceEl = document.getElementById('total-price');

    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (subtotalEl) subtotalEl.textContent = '₹' + totalPrice;
    if (totalPriceEl) totalPriceEl.textContent = '₹' + totalPrice;
}
