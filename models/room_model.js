const { RoomServiceClient } = require('livekit-server-sdk');
const pool = require('../db');
const { create } = require('./user_model');

const livekitHost = process.env.LIVEKIT_HOST;
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

const RoomService = {
  // Créer une salle pour un cours
  createRoomForCours: async (coursId, roomName) => {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // 1. Créer la salle dans LiveKit
      await roomService.createRoom({
        name: roomName,
        emptyTimeout: 60 * 20, // 1 heure
        maxParticipants: 150,
      });
      
      // 2. Lier la salle au cours dans la base de données
      await client.query(
        `UPDATE "A9ra_brk"."Cours" 
         SET room_name = $2 
         WHERE "Id_cour" = $1`,
        [coursId, roomName]
      );
      
      await client.query('COMMIT');
      return { roomName };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Obtenir les salles d'un utilisateur (via ses playlists)
  getUserRooms: async (userId) => {
    const result = await pool.query(
      `SELECT DISTINCT c.room_name FROM "A9ra_brk"."Cours" c
       JOIN "A9ra_brk".playlist_cours pc ON c."Id_cour" = pc.id_cour
       JOIN "A9ra_brk".playlist p ON pc.id_playlist = p.id_playlist
       JOIN "A9ra_brk".user_playlist up ON p.id_playlist = up."id-playlist"
       WHERE up.id_user = $1 AND c.room_name IS NOT NULL`,
      [userId]
    );
    return result.rows.map(row => row.room_name);
  },
  async validateUserAccess(userId, roomName) {
    // Vérifie que l'utilisateur a une playlist contenant le cours lié à la salle
    const result = await pool.query(
      `SELECT 1 FROM "A9ra_brk"."Cours" c
       JOIN "A9ra_brk".playlist_cours pc ON c."Id_cour" = pc.id_cour
       JOIN "A9ra_brk".user_playlist up ON pc.id_playlist = up."id-playlist"
       WHERE up.id_user = $1 AND c.room_name = $2`,
      [userId, roomName]
    );
    return result.rowCount > 0;
  }

};

module.exports = RoomService;