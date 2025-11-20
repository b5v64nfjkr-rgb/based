const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// POST /api/orders - create a new order
router.post('/', async (req, res) => {
  const { user_id, cart, total } = req.body;
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{ user_id, cart, total }]);
    if (error) throw error;
    res.json({ success: true, order: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Order error' });
  }
});

// GET /api/orders/:user_id - get orders for a user
router.get('/:user_id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', req.params.user_id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Order fetch error' });
  }
});

// GET /api/orders/all - get all orders (admin)
router.get('/all', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Order fetch error' });
  }
});

module.exports = router;
