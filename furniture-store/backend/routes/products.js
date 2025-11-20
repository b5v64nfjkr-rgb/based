const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/products - list all products from Supabase
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products - create a new product
router.post('/', async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, price, description, image }]);
    if (error) throw error;
    res.json({ success: true, product: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Product create error' });
  }
});

// DELETE /api/products/:id - delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Product delete error' });
  }
});

module.exports = router;
