const Abonement = require('../config/db');

const AbonementModel = {
    addabonemnt: async (id_abonne, id_abonnement) => {
        const result = await Abonement.query(
            'INSERT INTO "A9ra_brk".abonement (id_abonne, id_abonnement) VALUES ($1, $2) RETURNING *',
            [id_abonne, id_abonnement]
        );
        return result.rows[0];
    },
    getAllAbonements: async () => {
        const result = await Abonement.query('SELECT * FROM "A9ra_brk".abonement');
        return result.rows;
    },
    deleteAbonement: async (id_abonne) => {
        const result = await Abonement.query('DELETE FROM "A9ra_brk".abonement WHERE id_abonne = $1 RETURNING *', [id_abonne]);
        return result.rows[0];
    },


}
        
    