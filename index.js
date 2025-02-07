const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  if (!isNaN(newItemPrice) && !isNaN(cartTotal)) {
    const total = cartTotal + newItemPrice;
    res.send(total.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});


// Endpoint 2: Apply a discount based on membership status
 app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';

  if (!isNaN(cartTotal)) {
    let finalPrice = cartTotal;
    if (isMember) {
      finalPrice = cartTotal * 0.9; // 10% discount
    }
    res.send(finalPrice.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});

// Endpoint 3: Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

  if (!isNaN(cartTotal)) {
    const tax = cartTotal * 0.05; // 5% tax rate
    res.send(tax.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});

// Endpoint 4: Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod.toLowerCase();
  const distance = parseFloat(req.query.distance);

  if (!isNaN(distance)) {
    let deliveryDays = 0;
    if (shippingMethod === 'standard') {
      deliveryDays = Math.ceil(distance / 50);
    } else if (shippingMethod === 'express') {
      deliveryDays = Math.ceil(distance / 100);
    }

    res.send(deliveryDays.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});

// Endpoint 5: Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  if (!isNaN(weight) && !isNaN(distance)) {
    const cost = weight * distance * 0.1;
    res.send(cost.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});

// Endpoint 6: Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  if (!isNaN(purchaseAmount)) {
    const loyaltyPoints = purchaseAmount * 2; // 1 point for every 2 currency units
    res.send(loyaltyPoints.toString());
  } else {
    res.status(400).send('Invalid input');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
