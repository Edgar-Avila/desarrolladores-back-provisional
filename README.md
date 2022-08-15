#  Desarrolladores Back Provisional

Backend provisional para la aplicación de desarrolladores.


## Iniciar Local
### Requisitos
- Node.js v14.17.0 o mayor
- SQL Server

### Pasos
1. Clonar el repositorio
1. Correr
```properties
cd desarrolladores-back-provisional
npm install
```
1. Copiar el contenido .env.example a un archivo .env
1. Modificar el contenido de .env con los datos de la base de datos local, usuario, contraseña, token secrets y puerto
1. Correr
```properties
npx prisma migrate dev
npx prisma generate
npm run dev
```
