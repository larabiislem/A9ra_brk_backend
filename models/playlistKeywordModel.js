const pool = require('../db');

const PlaylistKeyword = {
  // Ajouter un mot-clé à une playlist
  addKeywordToPlaylist: async (id_playlist, id_keyword) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk".playlist_keyword(id_playlist, id_keyword) VALUES ($1, $2) RETURNING *',
      [id_playlist, id_keyword]
    );
    return result.rows[0];
  },

  // Récupérer tous les mots-clés d'une playlist
  getKeywordsForPlaylist: async (id_playlist) => {
    const result = await pool.query(
      `SELECT k.* FROM "A9ra_brk"."mot_clé" k
       JOIN "A9ra_brk".playlist_keyword pk ON k.id_keyword = pk.id_keyword
       WHERE pk.id_playlist = $1`,
      [id_playlist]
    );
    return result.rows;
  },

  // Retirer un mot-clé d'une playlist
  removeKeywordFromPlaylist: async (id_playlist, id_keyword) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk".playlist_keyword WHERE id_playlist = $1 AND id_keyword = $2 RETURNING *',
      [id_playlist, id_keyword]
    );
    return result.rows[0];
  }
};

module.exports = PlaylistKeyword;