const playlist = require('../config/db');

const playlist = {

    async addPlaylist(id_playlist, name_playlist, playlist_cat, playlist_type) {
        const result = await client.query(
            'INSERT INTO "A9ra_brk".playlist (id_playlist, name_playlist, playlist_cat, playlist_type) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_playlist, name_playlist, playlist_cat, playlist_type]
        );
        return result.rows[0];
    },

    async getAllPlaylists() {
        const result = await client.query('SELECT * FROM "A9ra_brk".playlist');
        return result.rows;
    },

    async getPlaylistById(id_playlist) {
        const result = await client.query(
            'SELECT * FROM "A9ra_brk".playlist WHERE id_playlist = $1',
            [id_playlist]
        );
        return result.rows[0];
    },

    async deletePlaylist(id_playlist) {
        const result = await client.query(
            'DELETE FROM "A9ra_brk".playlist WHERE id_playlist = $1 RETURNING *',
            [id_playlist]
        );
        return result.rows[0];
    },

    async ajoutMotCleDansPlaylist(id_playlist, id_keyword) {
        const result = await client.query(
            'INSERT INTO "A9ra_brk".playlist_keyword (id_playlist, id_keyword) VALUES ($1, $2) RETURNING *',
            [id_playlist, id_keyword]
        );
        return result.rows[0];
}
}

module.exports = playlist;