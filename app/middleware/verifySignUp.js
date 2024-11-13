const db = require("../models");
const User = db.users;

const duplicacionEmail = async (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "El correo electronico ya esta registrado"
            });
        } else {
            next();
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

module.exports = {
    duplicacionEmail: (req, res, next) => {
        duplicacionEmail(req, res, next);
    }
}