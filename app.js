import express from 'express';
import db from './db/connnection.js';
import bodyParser from 'body-parser';
import jobsRoutes from './routes/jobs.js'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));

db.authenticate()
  .then(() => {
        console.log('Conectou-se ao Banco de Dados.');
    })
    .catch((error) => {
        console.log('Falha ao conectar-se ao Banco de Dados', error);
    });

app.get('/', (req, res) => {
    res.send('Server on!');
});

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
});

app.use('/jobs', jobsRoutes);