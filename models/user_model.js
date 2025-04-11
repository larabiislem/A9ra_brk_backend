const pool = require('../db');
const bcrypt = require('bcryptjs');

const UserModel = {
  // Trouver un utilisateur par son email
  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM "A9ra_brk".utilisateur WHERE email = $1', 
      [email]
    );
    return result.rows[0];
  },

  // Créer un nouvel utilisateur avec mots-clés
  async create(userData, keywords) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Créer l'utilisateur
      const userResult = await client.query(
        `INSERT INTO "A9ra_brk".utilisateur 
        (id_utilisateur, nom, prenom, email, mot_de_passe, age, telephone, adresse) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id_utilisateur, nom, prenom, email, age, telephone, adresse`,
        [
          userData.id_utilisateur,
          userData.nom,
          userData.prenom,
          userData.email,
          hashedPassword,
          userData.age,
          userData.telephone,
          userData.adresse
        ]
      );
      const user = userResult.rows[0];
      
      // Ajouter les mots-clés de l'utilisateur
      if (keywords && keywords.length > 0) {
        for (const keywordId of keywords) {
          await client.query(
            'INSERT INTO "A9ra_brk".user_keyword (id_utilisateur, id_keyword) VALUES ($1, $2)',
            [user.id_utilisateur, keywordId]
          );
        }
      }
      
      await client.query('COMMIT');
      return user;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Vérifier le mot de passe
  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  },

  // Obtenir le profil complet d'un utilisateur (avec mots-clés)
  async getProfile(id_utilisateur) {
    const client = await pool.connect();
    
    try {
      // Récupérer les infos de base
      const userResult = await client.query(
        'SELECT * FROM "A9ra_brk".utilisateur WHERE id_utilisateur = $1',
        [id_utilisateur]
      );
      
      if (!userResult.rows[0]) return null;
      
      // Récupérer les mots-clés associés
      const keywordsResult = await client.query(
        `SELECT k.* FROM "A9ra_brk"."mot_clé" k
         JOIN "A9ra_brk".user_keyword uk ON k.id_keyword = uk.id_keyword
         WHERE uk.id_utilisateur = $1`,
        [id_utilisateur]
      );
      
      // Récupérer les playlists recommandées (matching mots-clés)
      const playlistsResult = await client.query(
        `SELECT DISTINCT p.* FROM "A9ra_brk".playlist p
         JOIN "A9ra_brk".playlist_keyword pk ON p.id_playlist = pk.id_playlist
         JOIN "A9ra_brk".user_keyword uk ON pk.id_keyword = uk.id_keyword
         WHERE uk.id_utilisateur = $1`,
        [id_utilisateur]
      );
      
      return {
        ...userResult.rows[0],
        keywords: keywordsResult.rows,
        recommendedPlaylists: playlistsResult.rows
      };
    } finally {
      client.release();
    }
  },

  // Mettre à jour le profil utilisateur
  async updateProfile(id_utilisateur, updateData) {
    const { nom, prenom, age, telephone, adresse } = updateData;
    const result = await pool.query(
      `UPDATE "A9ra_brk".utilisateur 
       SET nom = $2, prenom = $3, age = $4, telephone = $5, adresse = $6 
       WHERE id_utilisateur = $1 
       RETURNING id_utilisateur, nom, prenom, email, age, telephone, adresse`,
      [id_utilisateur, nom, prenom, age, telephone, adresse]
    );
    return result.rows[0];
  },

  // Mettre à jour les mots-clés de l'utilisateur
  async updateKeywords(id_utilisateur, keywords) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Supprimer les anciens mots-clés
      await client.query(
        'DELETE FROM "A9ra_brk".user_keyword WHERE id_utilisateur = $1',
        [id_utilisateur]
      );
      
      // Ajouter les nouveaux mots-clés
      if (keywords && keywords.length > 0) {
        for (const keywordId of keywords) {
          await client.query(
            'INSERT INTO "A9ra_brk".user_keyword (id_utilisateur, id_keyword) VALUES ($1, $2)',
            [id_utilisateur, keywordId]
          );
        }
      }
      
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Supprimer un compte utilisateur (avec nettoyage des relations)
  async deleteAccount(id_utilisateur) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Supprimer les abonnements
      await client.query(
        'DELETE FROM "A9ra_brk".abonement WHERE id_abonne = $1 OR id_abonnement = $1',
        [id_utilisateur]
      );
      
      // Supprimer les mots-clés associés
      await client.query(
        'DELETE FROM "A9ra_brk".user_keyword WHERE id_utilisateur = $1',
        [id_utilisateur]
      );
      
      // Supprimer les playlists créées par l'utilisateur
      // (Cette partie dépend de votre logique métier)
      
      // Enfin supprimer l'utilisateur
      const result = await client.query(
        'DELETE FROM "A9ra_brk".utilisateur WHERE id_utilisateur = $1 RETURNING *',
        [id_utilisateur]
      );
      
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Changer le mot de passe
  async changePassword(id_utilisateur, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await pool.query(
      'UPDATE "A9ra_brk".utilisateur SET mot_de_passe = $2 WHERE id_utilisateur = $1',
      [id_utilisateur, hashedPassword]
    );
    return true;
  }
};

module.exports = UserModel;