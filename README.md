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
1. Renombrar .env.example a .env
1. Modificar el contenido de .env con los datos de la base de datos local, usuario y contraseña
1. Correr
```properties
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```