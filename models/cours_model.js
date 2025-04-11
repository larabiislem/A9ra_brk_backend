const pool = require('../config/db');

const Cours = {
  // Ajouter un nouveau cours
  addCours: async (id_cour, description_cour, date_update, duré, title_cour) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk"."Cours" ("Id_cour", description_cour, date_update, "duré", title_cour) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_cour, description_cour, date_update, duré, title_cour]
    );
    return result.rows[0];
  },

  // Récupérer tous les cours
  getAllCours: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk".cours');
    return result.rows;
  },

  // Récupérer un cours par son ID
  getCoursById: async (id_cour) => {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk"."Cours" WHERE id_cour = $1',
      [id_cour]
    );
    return result.rows[0];
  },

  // Mettre à jour un cours
  updateCours: async (id_cour, description_cour, date_update, duré, title_cour) => {
    const result = await pool.query(
      'UPDATE "A9ra_brk"."Cours" SET description_cour = $2, date_update = $3, "duré" = $4, title_cour = $5 WHERE "Id_cour" = $1 RETURNING *',
      [id_cour, description_cour, date_update, duré, title_cour]
    );
    return result.rows[0];
  },

  // Supprimer un cours
  deleteCours: async (id_cour) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk"."Cours" WHERE "Id_cour" = $1 RETURNING *',
      [id_cour]
    );
    return result.rows[0];
  }
};

module.exports = Cours;