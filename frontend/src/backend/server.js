// server.jsx
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.set('trust proxy', 1);
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5174', // your frontend origin
  credentials: true               // allow session cookies to be sent
}));

app.use(express.json()); // Parses incoming JSON

app.use(session({
  secret: '12a5c0b96d8f1e4bbcc94c1a78f2d9b4d6a83b705d9e6ea6a2cb9f23cf8e0ad4',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true in production with https
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',         // ← Your MySQL password
  database: 'boh', // ← Replace with your DB name
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('❌ Error inserting user:', err);
      return res.status(500).json({ success: false, message: 'Database error or duplicate email' });
    }
    console.log('✅ New user registered:', result.insertId);
    res.json({ success: true, userId: result.insertId });
  });
});

//Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

      req.session.user = results[0];

      res.json({ message: 'Login successful', user: req.session.user });
    }
  );
});

// get user info if logged in
app.get('/api/profile', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = req.session.user;
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at || null,
    user_phonenumber: user.user_phonenumber || null,
    user_type: user.user_type || null
  });
});

// Endpoint pentru a obține activitățile
app.get('/api/activities', (req, res) => {
  db.query('SELECT * FROM activities', (err, results) => {
    if (err) {
      console.error('Error fetching activities:', err);
      res.status(500).send('Server Error');
      return;
    }
    res.json(results); // Returnează datele activităților în format JSON
  });
});

// ✅ Orașe distincte
app.get('/api/cities', (req, res) => {
  db.query('SELECT DISTINCT activity_city FROM activities', (err, results) => {
    if (err) {
      console.error('Error fetching cities:', err);
      return res.status(500).send('Server Error');
    }
    const cities = results.map(row => row.activity_city).filter(Boolean);
    res.json(cities);
  });
});

// Endpoint pentru filtrarea activităților
app.get('/api/activities/filter', (req, res) => {
  const { types } = req.query;

  console.log('Filter types:', types); // Verifică filtrele primite

  if (!types || types.trim() === '') {
    db.query('SELECT * FROM activities', (err, results) => {
      if (err) {
        console.error('Error fetching all activities:', err);
        return res.status(500).json({ error: 'Server Error' });
      }
      return res.json(results);
    });
    return;
  }

  const typeArray = types.split(',').map(type => type.trim());
  const conditions = typeArray.map(() => `activity_type LIKE ?`).join(' OR ');
  const likeValues = typeArray.map(type => `%${type}%`);

  db.query(`SELECT * FROM activities WHERE ${conditions}`, likeValues, (err, results) => {
    if (err) {
      console.error('Error filtering activities:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    console.log('Filtered results:', results); // Verifică rezultatele filtrate
    res.json(results);
  });
});

// Endpoint pentru a obține activitatea după ID
app.get('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM activities WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching activity:', err);
      return res.status(500).send('Server Error');
    }
    if (results.length === 0) {
      return res.status(404).send('Activity not found');
    }
    res.json(results[0]); // Returnează doar primul rezultat (activitatea găsită)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

