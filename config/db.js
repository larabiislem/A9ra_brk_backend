const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Désactiver la vérification SSL
  }
});
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connexion à la base de données réussie.');
    client.release(); // Libérer le client
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Quitter l'application en cas d'erreur
  }
};

// Tester la connexion au démarrage
testConnection();

module.exports = pool;