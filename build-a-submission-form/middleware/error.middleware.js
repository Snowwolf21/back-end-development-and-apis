const notFoundHandler = (req, res, next) => {
   const error = new Error(`Resource not found: ${req.originalUrl}`);
   error.status = 404;
   next(error);
};

const finalErrorHandler = (err, req, res, next) => {
   const statusCode = err.status || 500;
   res.status(statusCode).json({
        
            error:true,
           message: statusCode === 500 ? 
            'Internal Server Error (Check Server Logs)' : err.message,
           status: statusCode || 500
       
   });
};

export { notFoundHandler, finalErrorHandler };