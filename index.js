import express from 'express';
import sequelize from './config/database.js';
import Usuario from './models/usuarios.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, data_nasc, cpf, foto_url } = req.body;
    const novoUsuario = await Usuario.create({ nome, email, data_nasc, cpf, foto_url });
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, data_nasc, cpf, foto_url } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    await usuario.update({ nome, email, data_nasc, cpf, foto_url });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});