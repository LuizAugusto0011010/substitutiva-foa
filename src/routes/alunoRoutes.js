const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const db = require('../config/db');
const Aluno = require('../models/Aluno');

router.use(authMiddleware);
