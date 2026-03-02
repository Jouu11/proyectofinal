const router = require("express").Router();
const pool = require("../db/mysql");

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.brand,
        p.target,
        p.base_price,
        p.is_active,
        c.name AS category
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.is_active = 1
      ORDER BY p.id DESC
    `);

    res.json(rows);

  } catch (err) {
    console.error("Error SQL:", err.message);

    res.status(500).json({
      ok: false,
      message: "Error obteniendo productos",
      detail: err.message
    });
  }
});

module.exports = router;