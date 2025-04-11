const { AppError, DatabaseError } = require('../controller/error');

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        // Mode développement - affiche tous les détails
        const response = {
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        };

        // Ajoute les détails SQL si disponible
        if (err.code) {
            response.sqlError = {
                code: err.code,
                constraint: err.constraint,
                detail: err.detail
            };
        }

        res.status(err.statusCode).json(response);

    } else {
        // Mode production - format adapté pour Postman
        if (err.isOperational) {
            const response = {
                status: err.status,
                message: err.message
            };

            // Inclut les infos SQL pour les DatabaseError
            if (err instanceof DatabaseError) {
                response.sqlError = {
                    code: err.code,
                    constraint: err.constraint,
                    hint: "Violation de contrainte base de données"
                };
            }

            res.status(err.statusCode).json(response);
        } else {
            console.error('ERROR 💥', err);
            
            // Format spécial pour les erreurs PostgreSQL non opérationnelles
            if (err.code) {
                res.status(400).json({
                    status: 'error',
                    message: 'Erreur de base de données',
                    sqlError: {
                        code: err.code,
                        constraint: err.constraint,
                        detail: err.detail
                    }
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'Something went very wrong!'
                });
            }
        }
    }
};

module.exports = globalErrorHandler;