const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const db = require('../config/db');
const Aluno = require('../models/Aluno');


router.use(authMiddleware);

router.get('/', (req, res) => {
    res.json(db.alunos);
});


router.post('/', (req, res) => {
    const { nome, idade, modalidade } = req.body;

    if (!nome || !idade || !modalidade) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
    }

    if (!db.modalidades.includes(modalidade)) {
        return res.status(400).json({ message: 'Modalidade inválida' });
    }

    const id = db.alunos.length > 0 ? Math.max(...db.alunos.map(a => a.id)) + 1 : 1;
    const novoAluno = new Aluno(id, nome, idade, modalidade);

    db.alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, modalidade } = req.body;

    const alunoIndex = db.alunos.findIndex(a => a.id === id);
    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    if (nome) db.alunos[alunoIndex].nome = nome;
    if (idade) db.alunos[alunoIndex].idade = idade;
    if (modalidade) {
        if (!db.modalidades.includes(modalidade)) {
            return res.status(400).json({ message: 'Modalidade inválida' });
        }
        db.alunos[alunoIndex].modalidade = modalidade;
    }

    res.json(db.alunos[alunoIndex]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const alunoIndex = db.alunos.findIndex(a => a.id === id);
    if (alunoIndex === -1) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    const alunoRemovido = db.alunos.splice(alunoIndex, 1);
    res.json(alunoRemovido[0]);
});

module.exports = router;