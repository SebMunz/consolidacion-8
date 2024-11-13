const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  const { title, cue, description } = req.body;

  Bootcamp.create({ title, cue, description })
    .then(bootcamp => res.status(201).json(bootcamp))
    .catch(err => res.status(500).json({ message: `Error al crear el bootcamp: ${err.message}` }));
};

// Agregar un Usuario al Bootcamp
exports.addUser = (req, res) => {
  const { bootcampId, userId } = req.body;

  Bootcamp.findByPk(bootcampId)
    .then(bootcamp => {
      if (!bootcamp) {
        return res.status(404).json({ message: "Bootcamp no encontrado" });
      }
      return User.findByPk(userId).then(user => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        bootcamp.addUser(user);
        res.json({ message: `Usuario id=${user.id} agregado al bootcamp id=${bootcamp.id}` });
      });
    })
    .catch(err => res.status(500).json({ message: `Error al agregar Usuario al Bootcamp: ${err.message}` }));
};

// Obtener bootcamp por id 
exports.findById = (req, res) => {
  Bootcamp.findByPk(req.params.id, {
    include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName"], through: { attributes: [] } }],
  })
    .then(bootcamp => {
      if (!bootcamp) return res.status(404).json({ message: "Bootcamp no encontrado" });
      res.json(bootcamp);
    })
    .catch(err => res.status(500).json({ message: `Error al obtener el bootcamp: ${err.message}` }));
};

// Obtener todos los Bootcamps incluyendo sus Usuarios
exports.findAll = (req, res) => {
  Bootcamp.findAll({
    include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName"], through: { attributes: [] } }],
  })
    .then(bootcamps => res.json(bootcamps))
    .catch(err => res.status(500).json({ message: `Error al buscar los bootcamps: ${err.message}` }));
};
