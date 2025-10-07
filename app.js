import express from 'express';
import { engine } from 'express-handlebars'
import db from './db/connnection.js';
import path from 'path';
import bodyParser from 'body-parser';
import jobsRoutes from './routes/jobs.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));

// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

db.authenticate()
  .then(() => {
        console.log('Conectou-se ao Banco de Dados.');
    })
    .catch((error) => {
        console.log('Falha ao conectar-se ao Banco de Dados', error);
    });

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
});

app.use('/jobs', jobsRoutes);