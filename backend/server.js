const express = require('express');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const app = express();
const port = 3000;

// Middleware para parsear JSON y habilitar CORS simple
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ================== POOL POR CONFIGURACIÓN (para /finanzas) ==================
const poolConfig = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ================== POOL POR CONNECTION STRING (para /clientes) ==================
const poolString = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ================== ENDPOINTS ==================

// GET /finanzas - usa pool por configuración
app.get('/finanzas', async (req, res) => {
  try {
    await poolConfig.query(`
      CREATE TABLE IF NOT EXISTS finanzas_personales (
        id SERIAL PRIMARY KEY,
        fecha DATE NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        categoria VARCHAR(100),
        monto NUMERIC(10,2) NOT NULL
      )
    `);

    const countResult = await poolConfig.query('SELECT COUNT(*) FROM finanzas_personales');
    if (countResult.rows[0].count === '0') {
      await poolConfig.query(`
        INSERT INTO finanzas_personales (fecha, descripcion, categoria, monto) VALUES
        ('2025-01-15', 'Compra supermercado', 'Alimentación', 150.75),
        ('2025-01-16', 'Pago de luz', 'Servicios', 80.20),
        ('2025-01-17', 'Cena restaurante', 'Ocio', 45.90)
      `);
    }

    const { rows } = await poolConfig.query('SELECT * FROM finanzas_personales ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error en /finanzas:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /clientes - usa pool por connection string
app.get('/clientes', async (req, res) => {
  try {
    await poolString.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telefono VARCHAR(20),
        fecha_registro DATE DEFAULT CURRENT_DATE
      )
    `);

    const countResult = await poolString.query('SELECT COUNT(*) FROM clientes');
    if (countResult.rows[0].count === '0') {
      await poolString.query(`
        INSERT INTO clientes (nombre, email, telefono) VALUES
        ('Juan Pérez', 'juan@example.com', '555-1234'),
        ('María Gómez', 'maria@example.com', '555-5678'),
        ('Carlos López', 'carlos@example.com', '555-9012')
      `);
    }

    const { rows } = await poolString.query('SELECT * FROM clientes ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error en /clientes:', error);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});