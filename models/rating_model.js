const rating = require('../config/db');


const RatingModel = {

    // Ajouter une note
    addRating: async (id_user, id_course, rating) => {
        const result = await rating.query(
            'INSERT INTO "A9ra_brk".rating (id_user, id_course, rating) VALUES ($1, $2, $3) RETURNING *',
            [id_user, id_course, rating]
        );
        return result.rows[0];
    },
    // Récupérer une note spécifique par son ID
    getRatingById: async (id_user) => {
        const result = await rating.query(
            'SELECT * FROM "A9ra_brk".rating WHERE id_user = $1',
            [id_user]
        );
        return result.rows[0];
    },
    

}