const pool = require('../db');

const Keyword = {
  // Ajouter un nouveau mot-clé
  addKeyword: async (id_keyword, keyword_name) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk"."mot_clé"(id_keyword, keyword_name) VALUES ($1, $2) RETURNING *',
      [id_keyword, keyword_name]
    );
    return result.rows[0];
  },

  // Récupérer tous les mots-clés
  getAllKeywords: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk"."mot_clé"');
    return result.rows;
  },

  // Récupérer un mot-clé spécifique par son ID
  getKeywordById: async (id_keyword) => {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk"."mot_clé" WHERE id_keyword = $1',
      [id_keyword]
    );
    return result.rows[0];
  },

  // Supprimer un mot-clé
  deleteKeyword: async (id_keyword) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk"."mot_clé" WHERE id_keyword = $1 RETURNING *',
      [id_keyword]
    );
    return result.rows[0];
  }
};

module.exports = Keyword;