import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'freedom2026*',
    database: 'classicmodels',
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// ==========================================
// Question 1: כמה לקוחות מבוססים בצרפת?
// URL לבידיקה: http://localhost:3000/question1
// ==========================================
app.get('/question1', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS franceCustomers FROM customers WHERE country = 'France'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// Question 2: השם הפרטי ושם המשפחה של עובדים שמדווחים למספר 1143
// URL לבדיקה: http://localhost:3000/question2
// ==========================================
app.get('/question2', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT firstName, lastName FROM employees WHERE reportsTo = 1143");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// Question 3: מה כמות המוצרים במלאי בקטגוריית Classic Cars?
// URL לבדיקה: http://localhost:3000/question3
// ==========================================
app.get('/question3', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT SUM(quantityInStock) AS totalStock FROM products WHERE productLine = 'Classic Cars'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});