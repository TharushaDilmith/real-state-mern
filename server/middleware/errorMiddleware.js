// Desc: Not found middleware for handling errors
const notFound = (req, res, next) => {
    //create error object
    const error = new Error(`Not found - ${req.originalUrl}`);
    //set status code
    res.status(404);
    //pass error to next middleware
    next(error);
}

// Desc: Error middleware for handling errors
const errorHandler = (err, req, res, next) => {
    //set status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    //set message
    let message = err.message;
    //check for cast error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.status(404);
        message = 'Resource not found';
    }
    //set status code
    res.status(statusCode);
    //send json response
    res.json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

//export middleware
export {
    notFound,
    errorHandler
}

