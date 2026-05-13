const createError = ({ status = 500, message = 'Something went wrong' }) => {
    
    const error = new Error(message);
    error.status = status;

    return error;
}

export default {
    createError,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORTBIDDEN: 403,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNPROCESSABLE: 422,
    GENERAL_ERROR: 500,
}