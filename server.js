// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/live_search', (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) return res.json({ result: 'Enter a search term' });

  // Dummy response for testing
  res.json({
    result: `You searched for: <strong>${query}</strong>`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
