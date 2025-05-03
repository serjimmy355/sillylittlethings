// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// serve static files (registration.html, index.html, etc.)
app.use(express.static(__dirname));
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, passwordHash } = req.body;

  // load existing users
  const file = path.join(__dirname, 'userdetails.txt');
  let lines = [];
  if (fs.existsSync(file)) {
    lines = fs.readFileSync(file, 'utf8')
              .split('\n')
              .filter(Boolean);
  }

  // reject duplicates
  if (lines.some(line => line.split(':')[0] === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // append new user
  fs.appendFileSync(file, `\n${username}:${passwordHash}`);
  return res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
