const  abonemnt = require("../models/abonement_model"); 

const { catchAsync, AppError, handleDBErrors } = require("./error");


const AbonementController = {
    addAbonement: catchAsync(async (req, res, next) => {
        const { id_abonne, id_abonnement} = req.body;
        const newAbonement = await abonemnt.addabonemnt(id_abonne, id_abonnement);

        
        
    })