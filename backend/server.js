const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'postgres-orders',
  user: 'shopflow_user',
  password: 'shopflow_password',
  database: 'orders_db',
  port: 5432
});

app.get('/api/v1/orders', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/v1/orders', async (req, res) => {
  try {

    const order = req.body;
    const orderId = uuidv4();

    await pool.query(
      `
      INSERT INTO orders
      (id,user_id,total_amount,status)
      VALUES($1,$2,$3,$4)
      `,
      [
        orderId,
        order.userId,
        order.totalAmount,
        'CREATED'
      ]
    );

    for (const item of order.items) {

      await pool.query(
        `
        INSERT INTO order_items
        (
          id,
          order_id,
          product_id,
          product_name,
          unit_price,
          quantity
        )
        VALUES($1,$2,$3,$4,$5,$6)
        `,
        [
          uuidv4(),
          orderId,
          item.productId,
          item.productName,
          item.unitPrice,
          item.quantity
        ]
      );
    }

    res.status(201).json({
      id: orderId,
      status: 'CREATED'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('API ShopFlow rodando na porta 3000');
});
