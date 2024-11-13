const { authJwt } = require("../middleware");
const bootcampController = require("../controllers/bootcamp.controller");

module.exports = (app) => {
  // Crear un nuevo bootcamp (requiere token)
  app.post("/api/bootcamp", [authJwt.verifyToken], bootcampController.createBootcamp);

  // Asignar un usuario a un bootcamp (requiere token)
  app.post("/api/bootcamp/adduser", [authJwt.verifyToken], bootcampController.addUser);

  // Obtener un bootcamp específico por ID, incluyendo sus usuarios (requiere token)
  app.get("/api/bootcamp/:id", [authJwt.verifyToken], bootcampController.findById);

  // Listar todos los bootcamps (acceso público)
  app.get("/api/bootcamp", bootcampController.findAll);
};
