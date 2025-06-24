const db = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/r9r6V7WYspY.lkH1B6Lx7XvYfQaO', // senha: 12345
      role: 'admin'
    }
  ],
  alunos: [
    {
      id: 1,
      nome: 'João Silva',
      idade: 28,
      modalidade: 'Musculação'
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      idade: 35,
      modalidade: 'Pilates'
    }
  ],
  modalidades: [
    'Musculação',
    'CrossFit',
    'Zumba',
    'Pilates',
    'Natação'
  ]
};

module.exports = db;