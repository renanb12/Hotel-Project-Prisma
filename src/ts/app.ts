import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '../')));

// Serve o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

// Rota para criar cliente
app.post('/create-cliente', async (req, res) => {
  const { nome, cpf, email, senha, checkin, checkout } = req.body;

  try {
    await prisma.cliente.create({
      data: {
        nome,
        cpf,
        email,
        senha,
        checkin: new Date(checkin),
        checkout: new Date(checkout)
      }
    });
    res.status(200).send('Cliente criado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao criar cliente: ' );
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
