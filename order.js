

// This function loads the order summary on order.html
function loadOrderSummary() {
    let cart = getCart();
    let orderItemsList = document.getElementById('order-items-list');
    let orderTotal = document.getElementById('order-total');

    if (cart.length === 0) {
        if (orderItemsList) orderItemsList.innerHTML = '<p>No items in cart. <a href="menu.html">Go to Menu</a></p>';
        return;
    }

    let html = '';
    let total = 0;

    // Loop through cart items and display them
    cart.forEach(function(item) {
        total += item.price * item.quantity;
        html += `<p>${item.name} x${item.quantity} — ₹${item.price * item.quantity}</p>`;
    });

    if (orderItemsList) orderItemsList.innerHTML = html;
    if (orderTotal) orderTotal.textContent = '₹' + total;
}

// function places the order
function placeOrder() {
    // Get values from the form
    let name = document.getElementById('student-name').value;
    let department = document.getElementById('department').value;
    let yearSection = document.getElementById('year-section').value;
    let roomNumber = document.getElementById('room-number').value;
    let phone = document.getElementById('phone').value;

    //form validation 
    // Check if all fields are filled
    if (!name || !department || !yearSection || !roomNumber || !phone) {
        alert('⚠️ Please fill in all the details you dummy😤!');
        return;
    }

    // Check if cart has items
    let cart = getCart();
    if (cart.length === 0) {
        alert('⚠️ Your cart is empty! Please add items first.');
        return;
    }

    // Hide the form and show success message
    let formSection = document.getElementById('order-form-section');
    let successSection = document.getElementById('success-section');
    let successMessage = document.getElementById('success-message');

    if (formSection) formSection.style.display = 'none';
    if (successSection) successSection.style.display = 'block';

    // Show personalized success message
    if (successMessage) {
        successMessage.textContent = 'Thank you, ' + name + '! Your order will be delivered to ' + roomNumber + ' (' + yearSection + ', ' + department + ') shortly!';
    }

    // Clear the cart after order is placed
    localStorage.removeItem('amizhtha-cart');
}
