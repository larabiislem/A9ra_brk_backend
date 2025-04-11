const pool = require('../config/db');

const AbonementModel = {
  // Ajouter un abonnement (un utilisateur suit un autre utilisateur)
  addAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk".abonement (id_abonne, id_abonnement) VALUES ($1, $2) RETURNING *',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  // Supprimer un abonnement (unfollow)
  deleteAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk".abonement WHERE id_abonne = $1 AND id_abonnement = $2 RETURNING *',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  // Récupérer tous les abonnements (toutes les relations)
  getAllAbonnements: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk".abonement');
    return result.rows;
  },

  // Récupérer la liste des abonnés d'un utilisateur (ceux qui le suivent)
  getAbonnesByUser: async (id_utilisateur) => {
    const result = await pool.query(
      `SELECT u.* FROM "A9ra_brk".utilisateur u
       JOIN "A9ra_brk".abonement a ON u.id_utilisateur = a.id_abonne
       WHERE a.id_abonnement = $1`,
      [id_utilisateur]
    );
    return result.rows;
  },

  // Récupérer la liste des abonnements d'un utilisateur (ceux qu'il suit)
  getAbonnementsByUser: async (id_utilisateur) => {
    const result = await pool.query(
      `SELECT u.* FROM "A9ra_brk".utilisateur u
       JOIN "A9ra_brk".abonement a ON u.id_utilisateur = a.id_abonnement
       WHERE a.id_abonne = $1`,
      [id_utilisateur]
    );
    return result.rows;
  },

  // Vérifier si un utilisateur suit un autre utilisateur
  checkAbonnement: async (id_abonne, id_abonnement) => {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk".abonement WHERE id_abonne = $1 AND id_abonnement = $2',
      [id_abonne, id_abonnement]
    );
    return result.rows[0];
  },

  // Compter le nombre d'abonnés d'un utilisateur
  countAbonnes: async (id_utilisateur) => {
    const result = await pool.query(
      'SELECT COUNT(*) FROM "A9ra_brk".abonement WHERE id_abonnement = $1',
      [id_utilisateur]
    );
    return parseInt(result.rows[0].count);
  },

  // Compter le nombre d'abonnements d'un utilisateur
  countAbonnements: async (id_utilisateur) => {
    const result = await pool.query(
      'SELECT COUNT(*) FROM "A9ra_brk".abonement WHERE id_abonne = $1',
      [id_utilisateur]
    );
    return parseInt(result.rows[0].count);
  }
};

module.exports = AbonementModel;
        
    