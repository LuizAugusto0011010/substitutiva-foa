require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});