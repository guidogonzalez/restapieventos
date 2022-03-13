const jwt = require('jsonwebtoken')

const autenticar = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decodificar = jwt.verify(token, 'sessionToken')

        req.usuario = decodificar
        next()

    } catch(error) {
        if (error.name == "TokenExpiredError") {
            res.status(401).json({
                codigo: "ERAUT001",
                mensaje: "Token expirado."
            })
        } else {
            res.status(409).json({
                codigo: "ERAUT002",
                mensaje: 'La autenticación ha fallado.'
            })
        }
    }
}

module.exports = autenticar