require('dotenv').config(); // Charger les variables d'environnement
const express = require('express'); // Importer Express
const pool = require('./config/db'); // Importer la connexion à la base de données
const errorHandler = require("./controller/errorHandler");




const app = express();
app.use(express.json());




app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

