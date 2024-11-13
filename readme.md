# Migración a API REST y seguridad.

Proyecto trae una estructura sencilla con datos codeados en duro, se debe migrar a API REST y entregar seguridad con jsonwebtoken.

No logré completarlo por falta de tiempo.

[x] Instalación de dependencias: `npm i express jsonwebtoken body-parser pg pg-hstore sequelize cors bcryptjs 

[x] Creada estructura necesaria para migración:
- auth.config.js
- middlewares
  - auth.js
  - verifySignUp.js
  - index.js
  - routes

[x] Creada lógica de authenticación en auth.config
[x] Creada lógica de verificación de JWT en auth.js
[x] Creada validación de email en verifySignUp

[x] Exportar middlewares a través de index.js

[x] Modificado server.js para usar cors, json, express y las rutas

[x] Crear rutas en routes
[ ] Verificar nombres en controladores

[x] Modificado controladores para que respondan a JSON

 #to-do comprometo a terminarlo con las pruebas correspondientes