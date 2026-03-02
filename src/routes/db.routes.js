const router = require("express").Router();
const pool = require("../db/mysql");

// GET /api/db/ping
router.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows[0] });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error conectando a la base de datos",
      detail: err.message,
      code: err.code,
    });
  }
});

module.exports = router;