require("dotenv").config();
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

const express = require("express");
const cors = require("cors");

const app = express();

//  Verificación de variables
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

// Middleware
app.use(cors());
app.use(express.json());

// Conexión MySQL
const pool = require("./db/mysql");

// Verificar conexión al iniciar
pool.getConnection()
  .then(conn => {
    console.log("Conectado a MySQL");
    conn.release();
  })
  .catch(err => {
    console.error("Error conectando a MySQL:", err.message);
  });

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando correctamente" });
});

// Rutas
app.use("/api/products", require("./routes/products.routes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});