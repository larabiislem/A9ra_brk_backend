const playlist_cour = require('../config/db');

//rayan
const playlist_cour = {
    add_playlist_cour: async (id_playlist, id_cour) => {
        const result = await playlist_cour.query(
            'INSERT INTO "A9ra_brk".playlist_cour (id_playlist, id_cour) VALUES ($1, $2) RETURNING *',
            [id_playlist, id_cour]
        );
        return result.rows[0];
    },
    getAllPlaylistsCour: async () => {
        const result = await playlist_cour.query('SELECT * FROM "A9ra_brk".playlist_cour');
        return result.rows;
    },
    deletePlaylistCour: async (id_playlist) => {
        const result = await playlist_cour.query('DELETE FROM "A9ra_brk".playlist_cour WHERE id_playlist = $1 RETURNING *', [id_playlist]);
        return result.rows[0];
    },

}

module.exports = playlist_cour;