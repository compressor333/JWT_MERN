const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    console.log(statusCode)
    res.status(statusCode)
    console.log(err.message)
    res.json({
        error: err.message
    })
}

module.exports = {
    errorHandler
}