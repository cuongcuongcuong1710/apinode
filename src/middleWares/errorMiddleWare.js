export const errorHandle = function(err, req, res, next){
    const message = err.message;
    const status = err.status;
    const name = err.name;
    res.status(status).json({
        name,
        status,
        message
    })
}