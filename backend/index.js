const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send("<h1>hiiiiiiii</h1>");
});

// Availabe routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on http://localhost:${port}`);
});
