const Cours = require('../config/db');

const Cours = {
    addCours: async ( id_cour,description_cour, date_update, duré, title_cour) => {
        const result = await Cours.query(
            'INSERT INTO "A9ra_brk".cours ("Id_cour", description_cour, date_update, duré, title_cour) VALUES ($1, $2, $3, $4,$5) RETURNING *',
            [description_cour, date_update, duré, title_cour]
        );
        return result.rows[0];
    },


    getAllCours: async () => {
        const result = await Cours.query('SELECT * FROM "A9ra_brk".cours');
        return result.rows;
    },
    deleteCours: async (id_cour) => {
        const result = await Cours.query('DELETE FROM "A9ra_brk".cours WHERE id_cour = $1 RETURNING *', [id_cour]);
        return result.rows[0];
    },
    getCoursById: async (id_cour) => {
        const result = await Cours.query('SELECT * FROM "A9ra_brk".cours WHERE id_cour = $1', [id_cour]);
        return result.rows[0];
    },
    updateCours: async (id_cour, description_cour, date_update, duré, title_cour) => {
        const result = await Cours.query(
            'UPDATE "A9ra_brk".cours SET description_cour = $2, date_update = $3, duré = $4, title_cour = $5 WHERE id_cour = $1 RETURNING *',
            [id_cour, description_cour, date_update, duré, title_cour]
        );
        return result.rows[0];
    }


    

}

module.exports = Cours;
