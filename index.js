const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jsonParser = bodyParser.json();


let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

let items = [{
        name: "Super Mario Kart",
        description: "Juego de aventuras",
        platform: "Nintendo",
        img: "./assets/images/mariokart.jpg"
    },
    {
        name: "Gran turismo",
        description: "Juego de carreras",
        platform: "PlayStation",
        img: "./assets/images/gt.jpg"
    },
    {
        name: "GTA",
        description: "Juego de aventuras",
        platform: "Todas las plataformas",
        img: "./assets/images/gta.jpg"
    },
    {
        name: "Mortal Kombat",
        description: "Juego de peleas",
        platform: "Todas las plataformas",
        img: "./assets/images/mk.jpg"
    },
    {
        name: "Pokemon",
        description: "Juego de estrategia y aventura",
        platform: "Nintendo Switch",
        img: "./assets/images/pokemon.jpg"
    }
];


const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/products', jsonParser, (req, res) => {

    respuesta = {
        error: true,
        codigo: 200,
        mensaje: items
    };
    res.send(respuesta);

});

app.get('/product/:id', jsonParser, (req, res) => {

    let id = req.params.id;

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: items[id]
    };

    res.send(respuesta);

});

app.post('/product', jsonParser, (req, res) => {

    if (!req.body) {
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Error creando el nuevo juego.'
        };
    } else {

        items.push(req.body);
        respuesta = {
            error: false,
            codigo: 201,
            mensaje: req.body
        };
    }

    res.send(respuesta);
});

app.put('/product/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    items[id].name = req.body.name;
    items[id].description = req.body.description;
    items[id].platform = req.body.platform;
    items[id].img = req.body.img;

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Juego actualizado.'
    };

    res.send(respuesta);
});

app.delete('/product/:id', jsonParser, (req, res) => {
    let id = req.params.id;

    items.splice(id, 1);

    respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Juego eliminado.'
    };

    res.send(respuesta);
});

app.listen(3001, () => {
    console.log("Api is up.");
});