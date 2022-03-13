const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./api/usuarios');
const Evento = require('./api/eventos');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))
app.use('/api/', Usuario);
app.use('/api/', Evento);

app.set('port', process.env.PORT || 3000);

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.xb2ks.mongodb.net/restapieventos?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    },
    (err, res) => {
        err && console.log('Error al conectar a la base de datos.');
        app.listen(process.env.PORT || 3000, () => {
            console.log('Entramos');
        });
    }
);