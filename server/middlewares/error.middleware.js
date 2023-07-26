const errorMiddleware = (error, req, res, next) => {
    req.statusCode = req.statusCode || 500;
    req.message = req.message || "Something went Wrong";

    return res.status(req.statusCode).json({
        success: false,
        message: req.message,
        stack: error.stack
    })
}

export default errorMiddleware;