import errorHelper from '../helpers/error_helper.js';

const {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORTBIDDEN,
    CONFLICT,
    NOT_FOUND,
    UNPROCESSABLE,
    GENERAL_ERROR,
} = errorHelper;


const unauthorized = (err, req, res, next) => {

    if(err.status !== UNAUTHORIZED) return next;

    res.status(UNAUTHORIZED).send({
        ok: false,
        message: err.message || 'Unauthorized',
        errors: [err]
    });
}


const fortbidden = (err, req, res, next) => {

    if(err.status !== FORTBIDDEN) return next;

    res.status(FORTBIDDEN).send({
        ok: false,
        message: err.message || 'Fortbidden',
        errors: [err]
    });
}


const conflict = (err, req, res, next) => {

    if(err.status !== CONFLICT) return next;

    res.status(CONFLICT).send({
        ok: false,
        message: err.message || 'CONFLICT',
        errors: [err]
    });
}


const badRequest = (err, req, res, next) => {

    if(err.status !== BAD_REQUEST) return next;

    res.status(BAD_REQUEST).send({
        ok: false,
        message: err.message || 'BAD_REQUEST',
        errors: [err]
    });
}


const unprocessable = (err, req, res, next) => {

    if(err.status !== UNPROCESSABLE) return next;

    res.status(UNPROCESSABLE).send({
        ok: false,
        message: err.message || 'UNPROCESSABLE',
        errors: [err]
    });
}


const notFound = (err, req, res, next) => {

    if(err.status !== NOT_FOUND) return next;

    res.status(NOT_FOUND).send({
        ok: false,
        message: err.message || 'The requested resource could not be found',
    });
}


const genericError = (err, req, res, next) => {

    if(err.status !== GENERAL_ERROR) return next;

    res.status(GENERAL_ERROR).send({
        ok: false,
        message: err.message || 'Internal Server Error',
        errors: [err]
    });
}


const catchAll = (err, req, res, next) => {

    res.status(NOT_FOUND).send({
        ok: false,
        message: err.message || 'The requested resource could not be found',
    });
}


const exportable = {
    unauthorized,
    unprocessable,
    badRequest,
    notFound, 
    genericError,
    conflict,
    fortbidden,
    catchAll
}


const all = Object.keys(exportable).map( key => exportable[key]);

export default {
    ...exportable,
    all
}