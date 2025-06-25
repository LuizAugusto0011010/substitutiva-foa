require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`JWT Secret: ${process.env.JWT_SECRET}`);
});