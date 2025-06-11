require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const ALMA_BASE_URL = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1';

app.use(cors());
app.use(express.json());

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const url = `${ALMA_BASE_URL}/users/${userId}/personal-data`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `apikey ${process.env.ALMA_API_KEY}`,
        Accept: 'application/json'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
