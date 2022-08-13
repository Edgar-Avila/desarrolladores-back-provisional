# Auth

La ruta que comparten es http://localhost:8000/users, y tiene las siguientes operaciones:

## POST /register 
Registra a un nuevo usuario y lo almacena en la base de datos. Recibe un cuerpo con:
```ts
{
    "username": string,
    "password": string
}
```
Devuelve un status **201 Created** junto con un json `{message: "New user ${username} created"}`.

Manejo de errores:
- Si no se pasa username o password retorna **400 Bad Requiest**
- Si el nombre de usuario ya existe retorna **409 Conflict**

## POST /login
Hace login de un usuario. Retorna el access token como json y el refresh token como cookie jwt.

Manejo de Errores:
- Si no se pasa username o password retorna **400 Bad Requiest**
- Si el usuario no existe retorna **401 Unauthorized**
- Si la contraseña es incorrecta retorna **401 Unauthorized**

## POST /refresh
Retorna un nuevo access token como json si el refresh token es aun valido.

Manejo de Errores:
- Si no se encuentra el refresh token en la cookie retorna **401 Unauthorized**
- Si el refresh token no es valido, esta vencido, no esta en la base de datos o no coincide con el del usuario retorna **403 Forbidden**

## POST /logout
Realiza la operacion de logout para un usuario. Retorna **200 OK**

Manejo de errores:
- Si el refresh token no se encuentra en la cookie, si el refresh token no es valido o esta vencido, si el refresh token no esta en la base de datos, o si el refresh token no coincide con el de la base de datos retorna **204 No Content**
