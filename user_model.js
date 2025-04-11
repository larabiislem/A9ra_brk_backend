const client = require('../config/db');
const bcrypt = require('bcryptjs');
const ClientMaladie = require('./ClientMaladie_model');

const Client = {
  // Trouver un client par son email
  async findClient(email) {
    const result = await client.query('SELECT * FROM connected_restaurant."Client" WHERE adress_mail_client = $1', [email]);
    return result.rows[0];
  },

  // Créer un nouveau client
  async create(id, nom, prenom, age, num, password, adressemaison, email) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await client.query(
      'INSERT INTO connected_restaurant."Client" (id_client, name_client, prenom_client, "Age_client", "Num_tel_client", mot_de_passe_client, adress_client, adress_mail_client) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_client, name_client, prenom_client, "Age_client", "Num_tel_client", adress_client, adress_mail_client',
      [id, nom, prenom, age, num, hashedPassword, adressemaison, email]
    );
    return result.rows[0];
  },

  // Comparer le mot de passe candidat avec le mot de passe hashé
  async compareMDP(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  },

  


}