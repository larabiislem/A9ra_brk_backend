const examen = require('../db');

const ExamenModel = {

    addExamen: async (id_examen, title_exam, description_exam, url_exam) => {
        const result = await examen.query(
            'INSERT INTO "A9ra_brk".examen (id_examen, title_exam, description_exam, url_exam) VALUES ($1, $2, $3, $4) RETURNING *',
            [id_examen, title_exam, description_exam, url_exam]
        );
        return result.rows[0];
    },
    getAllExamen: async () => {
        const result = await examen.query('SELECT * FROM "A9ra_brk".examen');
        return result.rows;
    },
    deleteExamen: async (id_examen) => {
        const result = await examen.query('DELETE FROM "A9ra_brk".examen WHERE id_examen = $1 RETURNING *', [id_examen]);
        return result.rows[0];
    },
    getExamenById: async (id_examen) => {
        const result = await examen.query('SELECT * FROM "A9ra_brk".examen WHERE id_examen = $1', [id_examen]);
        return result.rows[0];
    },
   getExaminuser: async (id_user, id_examen) => {
    const result = await client.query(
        'INSERT INTO "A9ra_brk".user_examen (id_user, id_examen) VALUES ($1, $2) RETURNING *',
        [id_user, id_examen]
    );
    return result.rows[0];
},
}
    
module.exports = ExamenModel;







   