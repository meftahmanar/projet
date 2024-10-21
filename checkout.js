// Récupérer les articles du panier depuis localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Afficher le résumé de la commande
function displayOrderSummary() {
    let orderSummary = document.getElementById('order-summary');
    let total = 0;

    cart.forEach(item => {
        orderSummary.innerHTML += `<p>${item.name} - ${item.quantity} x $${item.price}</p>`;
        total += item.quantity * item.price;
    });

    orderSummary.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Appel API pour envoyer la commande
function placeOrder(order) {
    fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (response.ok) {
            alert('Order placed successfully!');
            localStorage.removeItem('cart');  // Vider le panier après la commande
            window.location.href = '/';      // Retour à la page principale
        } else {
            alert('There was an issue placing your order. Please try again.');
        }
    });
}

// Soumission du formulaire de checkout
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Créer l'objet de la commande
    const order = {
        customer: {
            name: name,
            email: email,
            address: address
        },
        items: cart,
        total: cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
    };

    placeOrder(order);
});

// Afficher le résumé de la commande au chargement de la page
displayOrderSummary();
