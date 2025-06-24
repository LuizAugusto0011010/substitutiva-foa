const express = require('express');
const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.send('API da Academia Força Total');
});

module.exports = app;