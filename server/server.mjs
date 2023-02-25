import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

app.use(cors());

const newsApiBaseUrl = "https://newsapi.org/v2";

app.get('/api/news', async (req, res) => {
  const { country = 'us', category = 'general', page = 1, pagesize = 9 } = req.query;
  const url = `${newsApiBaseUrl}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pagesize}&apiKey=30a1c5dbf79b409e80b16f3ead4976a3`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch news data from NewsAPI" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
