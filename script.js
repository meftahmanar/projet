let cart = [];

function addToCart(id, name, price) {
    const product = { id, name, price, quantity: 1 };
    const existingProduct = cart.find(p => p.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function showCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        cartItems.innerHTML += `<p>${item.name} - ${item.quantity} x $${item.price}</p>`;
    });

    document.getElementById('cart-modal').style.display = 'block';
}

function hideCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    // Enregistre le panier dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirection vers la page de checkout
    window.location.href = 'checkout.html';
}

