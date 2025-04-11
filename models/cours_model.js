const Cours = require('../config/db');

const Cours = {


    async addplaylist(idplaylist, name_playlist, playlist_type, playlist_cat) {
        const result = await client.query(
            'INSERT INTO "A9ra_brk".playlist (id_playlist, name_playlist, playlist_type, playlist_cat) VALUES ($1, $2,$3,$4) RETURNING *',
            [idplaylist, name_playlist, playlist_type, playlist_cat]
        );
        return result.rows[0];

    },

     async getAllPlaylists() {
        const result = await client.query('SELECT * FROM "A9ra_brk".playlist');
        return result.rows; },

    async getPlaylistById(idplaylist) {
        const result = await client.query('SELECT * FROM "A9ra_brk".playlist WHERE id_playlist = $1', [idplaylist]);
        return result.rows[0];
    },

    async deletePlaylist(idplaylist) {
        const result = await client.query('DELETE FROM "A9ra_brk".playlist WHERE id_playlist = $1 RETURNING *', [idplaylist]);
        return result.rows[0];
    },

    
    async ajoutMotcledansplaylist(id_playlist, id){
        const result = await client.query(
            'INSERT INTO "A9ra_brk".playlist (id_playlist, id_motcle) VALUES ($1, $2) RETURNING *',
            [id_playlist, id]
        );
        return result.rows[0];

    },

    async consultermotcledansplaylist(id_playlist, id){
        const result = await client.query(
            'SELECT id_motcle FROM "A9ra_brk".playlist WHERE id_playlist = $1',
            [id_playlist]
        );
        return result.rows[0];
    },

}
