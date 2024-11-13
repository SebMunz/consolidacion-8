const bcrypt = require("bcryptjs");
const db = require('../models');
const User = db.users;
const Bootcamp = db.bootcamps;

// Crear y guardar un nuevo usuario
exports.createUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const user = { firstName, lastName, email, password: bcrypt.hashSync(password) };

  User.create(user)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ message: `Error al crear el usuario: ${err.message}` }));
};

// Obtener los bootcamps de un usuario
exports.findUserById = (req, res) => {
  User.findByPk(req.params.id, {
    include: [{ model: Bootcamp, as: "bootcamps", attributes: ["id", "title"], through: { attributes: [] } }],
  })
    .then(user => {
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    })
    .catch(err => res.status(500).json({ message: `Error al obtener los usuarios: ${err.message}` }));
};

// Obtener todos los Usuarios incluyendo sus Bootcamps
exports.findAll = (req, res) => {
  User.findAll({
    include: [{ model: Bootcamp, as: "bootcamps", attributes: ["id", "title"], through: { attributes: [] } }],
  })
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: `Error al buscar usuarios: ${err.message}` }));
};

// Actualizar un usuario por ID
exports.updateUserById = (req, res) => {
  const { firstName, lastName } = req.body;

  User.update({ firstName, lastName }, { where: { id: req.params.id } })
    .then(num => {
      if (num == 1) res.json({ message: "Usuario actualizado correctamente" });
      else res.status(404).json({ message: `No se pudo actualizar el usuario con id=${req.params.id}` });
    })
    .catch(err => res.status(500).json({ message: `Error al actualizar el usuario: ${err.message}` }));
};

// Eliminar un usuario por ID
exports.deleteUserById = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(num => {
      if (num == 1) res.json({ message: "Usuario eliminado correctamente" });
      else res.status(404).json({ message: `No se pudo eliminar el usuario con id=${req.params.id}` });
    })
    .catch(err => res.status(500).json({ message: `Error al eliminar el usuario: ${err.message}` }));
};
