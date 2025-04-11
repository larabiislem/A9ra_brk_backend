const pool = require('../db');

const AbonementModel = {
  // Ajouter un abonnement (un utilisateur suit un autre utilisateur)
  addAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk"."Abonnement"(id_abonne, id_abonnement) VALUES ($1, $2) RETURNING *',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  // Supprimer un abonnement (unfollow)
  deleteAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk"."Abonnement" WHERE id_abonne = $1 AND id_abonnement = $2 RETURNING *',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  // Récupérer tous les abonnements (toutes les relations)
  getAllAbonnements: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk".abonement');
    return result.rows;
  },

  getAbonnesByUser: async (id_utilisateur) => {
    const result = await pool.query(
      `SELECT u."id-user", u.nom_user, u.prenom_user, u.bio, u.email_user 
       FROM "A9ra_brk"."user" u
       JOIN "A9ra_brk"."Abonnement" a ON u."id-user" = a.id_abonne
       WHERE a.id_abonnement = $1`,
      [id_utilisateur]
    );
    return result.rows;
  },

  // Récupérer les abonnements d'un utilisateur (ceux qu'il suit)
  getAbonnementsByUser: async (id_utilisateur) => {
    const result = await pool.query(
      `SELECT u."id-user", u.nom_user, u.prenom_user, u.bio, u.email_user
       FROM "A9ra_brk"."user" u
       JOIN "A9ra_brk"."Abonnement" a ON u."id-user" = a.id_abonnement
       WHERE a.id_abonne = $1`,
      [id_utilisateur]
    );
    return result.rows;
  },
 
  checkAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk"."Abonnement" WHERE id_abonne = $1 AND id_abonnement = $2',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  
  countAbonnes: async (id_utilisateur) => {
    const result = await pool.query(
      'SELECT COUNT(*) FROM "A9ra_brk"."Abonnement" WHERE id_abonnement = $1',
      [id_utilisateur]
    );
    return parseInt(result.rows[0].count);
  },

  countAbonnements: async (id_utilisateur) => {
    const result = await pool.query(
      'SELECT COUNT(*) FROM "A9ra_brk"."Abonnement" WHERE id_abonne = $1',
      [id_utilisateur]
    );
    return parseInt(result.rows[0].count);
  }
};

module.exports = AbonementModel;
        
    