const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co']; //lista blanca
const options = {
  origin: function (origin, callback) {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

// app.get('/categories', (req, res) => {
//   res.send('Hola soy las categorias');
// });

app.get('/home', (req, res) => {
  res.send('Hola este es mi home en express');
});

app.listen(port, () => {
  console.log('Escuchando en el puerto:' + port);
});


routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

