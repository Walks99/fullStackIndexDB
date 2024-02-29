// Backend server to serve JSON data
const express = require('express');
const app = express();

const cors = require('cors');

const jsonData = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Alice', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
  { id: 4, name: 'Jim', age: 63 },
  { id: 5, name: 'Fat Tony', age: 58 },
  { id: 6, name: 'Fat Bob', age: 45 },
  { id: 7, name: 'Fat John', age: 78 },
  { id: 8, name: 'Ross', age: 68 },
  { id: 9, name: 'Karen', age: 49 },
  {id: 10, name: 'Potato', age: 33},
];

app.use(cors());

app.get('/data', (req, res) => {
  res.json(jsonData);
  console.log('JSON data served:', jsonData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
