const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connection à MongoDB
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true });

// Modèle de commande
const orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        address: String
    },
    items: Array,
    total: Number,
    status: { type: String, default: 'Pending' }
});
const Order = mongoose.model('Order', orderSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint pour passer une commande
app.post('/checkout', (req, res) => {
    const order = new Order(req.body);

    order.save()
        .then(() => res.status(201).send('Order placed successfully'))
        .catch(err => res.status(500).send('Error placing order: ' + err));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
