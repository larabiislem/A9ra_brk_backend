// error.js
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class DatabaseError extends AppError {
    constructor(error) {
        super(error.message, 400);
        this.code = error.code;
        this.constraint = error.constraint;
        this.detail = error.detail;
    }
}

// Nouveau wrapper pour erreurs SQL
const handleDBErrors = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (error.code && error.code.startsWith('23')) {
                return next(new DatabaseError(error));
            }
            next(error);
        }
    };
};

module.exports = {
    AppError,
    catchAsync,
    DatabaseError,
    handleDBErrors // Exportez le nouveau wrapper
};