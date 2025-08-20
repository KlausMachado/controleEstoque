const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ok : true, timestamp: Date().toString()});
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API is running on  http://localhost:${PORT}`);
});