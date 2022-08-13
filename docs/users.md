# Users

Los usuarios vienen de la siguiente forma:
```ts
{
    "UserID": number,
    "Username": string,
    "ProfilePictureUrl": string | undefined,
}
```

La ruta que comparten es http://localhost:8000/users, y tiene las siguientes operaciones:

## GET /
Obtiene todos los usuarios de la base de datos. Devuelve un array de objetos user.

## GET /:id
Donde id es un numero, obtiene un solo user con el id pasado. Devuelve un objeto user.

Manejo de Errores:
- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El post no existe), devuelve **404 Not Found**.

## PUT /
Es una **Ruta protegida**

Actualiza un solo usuario. Devuelve un estado **200 OK**. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "username": string,
    "password": string,
}
```
Manejo de errores:
- Si el cuerpo no es valido devolvera status **400 Bad Request**.
- Si el nombre de usuario ya existe devolvera status **409 Conflict**.

## DELETE /
Es una **Ruta protegida**

Elimina un solo usuario. Devuelve un estado **200 OK**.

## GET /top-contributors/:number
Donde number es un entero positivo. Devuelve un arreglo de usuarios con hasta **number** usuarios modificados con un campo adicional **PostCount**

Manejo de Errores:

- Si el numero no es un entero positivo devolvera status **400 Bad Request**.

___
## Notas:
- Las rutas protegidas devuelven **401 Unauthorized** si no se le pasa el ACCESS_TOKEN o esta vencido.
- Las rutas protegidas tienen acceso al id del usuario, por lo que no es necesario pasarlo en el cuerpo de la petición u otros.
- Los usuarios en la Base de Datos contienen tambien los campos siguientes, que no se retornan en las peticiones por seguridad:
```ts
{
    "Password": string,
    "RefreshToken": string
}
```