const { authJwt, verifySignUp } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = (app) => {
  // Registro de un nuevo usuario
  app.post("/api/signup", [verifySignUp.checkDuplicateEmail], userController.createUser);

  // Inicio de sesión
  app.post("/api/signin", userController.signIn);

  // Obtener todos los usuarios y sus bootcamps (requiere token)
  app.get("/api/user", [authJwt.verifyToken], userController.findAll);

  // Obtener un usuario específico por ID (requiere token)
  app.get("/api/user/:id", [authJwt.verifyToken], userController.findUserById);

  // Actualizar un usuario por ID (requiere token)
  app.put("/api/user/:id", [authJwt.verifyToken], userController.updateUserById);

  // Eliminar un usuario por ID (requiere token)
  app.delete("/api/user/:id", [authJwt.verifyToken], userController.deleteUserById);
};
