const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoute = require('./routes/products');
const checkoutRoute = require('./routes/checkout');
const ordersRoute = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/furniture-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/products', productsRoute);
app.use('/api', checkoutRoute);
app.use('/api/orders', ordersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
