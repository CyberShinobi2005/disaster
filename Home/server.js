// npm install express body-parser node-fetch dotenv
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Gemini API route
app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt missing' });

  try {
    const response = await fetch('https://gemini.api.url/v1/query', { // Gemini API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({ prompt, max_tokens: 200 })
    });

    const data = await response.json();
    res.json({ reply: data.reply || "Sorry, no response from Gemini API." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong while fetching response." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
