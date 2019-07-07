require('./config/config');

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Habilitar la carpeta Public
app.use(express.static(path.resolve(__dirname, '../server/public')))

console.log(path.resolve(__dirname, '../server/public'));

//Configuración global de rutas
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('BASE DE DATOS ONLINE');
    })

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
})