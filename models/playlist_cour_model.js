const pool = require('../db');

const PlaylistCour = {
  // Ajouter un cours à une playlist
  addPlaylistCour: async (id_playlist, id_cour) => {
    const result = await pool.query(
      'INSERT INTO "A9ra_brk".playlist_cour (id_playlist, id_cour) VALUES ($1, $2) RETURNING *',
      [id_playlist, id_cour]
    );
    return result.rows[0];
  },

  // Récupérer toutes les relations playlist-cours
  getAllPlaylistsCour: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk".playlist_cour');
    return result.rows;
  },

  // Supprimer un cours d'une playlist
  deletePlaylistCour: async (id_playlist) => {
    const result = await pool.query(
      'DELETE FROM "A9ra_brk".playlist_cour WHERE id_playlist = $1 RETURNING *',
      [id_playlist]
    );
    return result.rows[0];
  },

// Récupérer tous les cours d'une playlist avec leurs salles
getCoursInPlaylist: async (id_playlist) => {
  const result = await pool.query(
    `SELECT c.* FROM "A9ra_brk"."Cours" c
     JOIN "A9ra_brk".playlist_cours pc ON c."Id_cour" = pc.id_cour
     WHERE pc.id_playlist = $1`,
    [id_playlist]
  );
  return result.rows;
},



};

module.exports = PlaylistCour;