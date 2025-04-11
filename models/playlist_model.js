const pool = require('../db');

const Playlist = {
  // Ajouter une nouvelle playlist et la lier à un utilisateur
  addPlaylist: async (id_playlist, name_playlist, playlist_cat, playlist_type, id_user) => {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN'); // Début de la transaction
      
      // 1. Insertion de la playlist
      const playlistResult = await client.query(
        'INSERT INTO "A9ra_brk".playlist(id_playlist, name_playlist, playlist_cat, playlist_type) VALUES ($1, $2, $3, $4) RETURNING *',
        [id_playlist, name_playlist, playlist_cat, playlist_type]
      );
      
      // 2. Lier la playlist à l'utilisateur
      await client.query(
        'INSERT INTO "A9ra_brk".user_playlist(id_user, "id-playlist") VALUES ($1, $2)',
        [id_user, id_playlist]
      );
      
      await client.query('COMMIT'); // Validation de la transaction
      return playlistResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK'); // Annulation en cas d'erreur
      throw error;
    } finally {
      client.release(); // Libération du client
    }
  },

  // Récupérer toutes les playlists
  getAllPlaylists: async () => {
    const result = await pool.query('SELECT * FROM "A9ra_brk".playlist');
    return result.rows;
  },

  // Récupérer une playlist par son ID
  getPlaylistById: async (id_playlist) => {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk".playlist WHERE id_playlist = $1',
      [id_playlist]
    );
    return result.rows[0];
  },

  // Récupérer les playlists d'un utilisateur spécifique
  getPlaylistsByUserId: async (id_user) => {
    const result = await pool.query(
      `SELECT p.* FROM "A9ra_brk".playlist p
       JOIN "A9ra_brk".user_playlist up ON p.id_playlist = up."id-playlist"
       WHERE up.id_user = $1`,
      [id_user]
    );
    return result.rows;
  },

  // Mettre à jour une playlist
  updatePlaylist: async (id_playlist, name_playlist, playlist_cat, playlist_type) => {
    const result = await pool.query(
      'UPDATE "A9ra_brk".playlist SET name_playlist = $2, playlist_cat = $3, playlist_type = $4 WHERE id_playlist = $1 RETURNING *',
      [id_playlist, name_playlist, playlist_cat, playlist_type]
    );
    return result.rows[0];
  },

  // Supprimer une playlist (avec nettoyage des relations)
  deletePlaylist: async (id_playlist) => {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // 1. Supprimer les mots-clés associés
      await client.query(
        'DELETE FROM "A9ra_brk".playlist_keyword WHERE id_playlist = $1',
        [id_playlist]
      );
      
      // 2. Supprimer le lien avec l'utilisateur
      await client.query(
        'DELETE FROM "A9ra_brk".user_playlist WHERE "id-playlist" = $1',
        [id_playlist]
      );
      
      // 3. Supprimer la playlist elle-même
      const result = await client.query(
        'DELETE FROM "A9ra_brk".playlist WHERE id_playlist = $1 RETURNING *',
        [id_playlist]
      );
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
};

module.exports = Playlist;