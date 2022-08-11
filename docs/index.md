# Documentacion

La api rest esta dividida en varias partes

## Posts

Los posts vienen de la siguiente forma:
```ts
{
    "PostID": number,
    "ImageUrl": string,
    "Title": string,
    "Content": string,
    "UserID": number,
    "LanguageID": number
}
```

La ruta que comparten es http://localhost:8000/posts, y tiene las siguientes operaciones:

### GET /
Obtiene todos los posts de la base de datos. Devuelve un array de objetos post.

### GET /:id
Donde id es un numero, obtiene un solo post con el id pasado. Devuelve un objeto post.

Manejo de Errores:
- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El post no existe), devuelve **404 Not Found**.

### POST /
Es una **Ruta protegida**

Crea un post y lo almacena en la base de datos. En caso de exito retorna un status **201 Created** junto con el objeto post recien creado. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "title": string,
    "content": string,
    "imageUrl": string | undefined,
    "languageId": number | undefined
}
```
Manejo de Errores:
- Si el cuerpo no es valido devolvera status **400 Bad Request**.
- Si el lenguaje que se quiere asignar no existe devolvera status **409 Conflict**.

### PUT /:id
Es una **Ruta protegida**

Donde id es un numero entero positivo, actualiza un solo post con el id pasado. Devuelve un estado **200 OK**. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "title": string,
    "content": string,
    "imageUrl": string | undefined,
    "languageId": number | undefined
}
```
Manejo de errores:
- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el cuerpo no es valido devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El post no existe), devuelve **404 Not Found**.
- Si el id del usuario es distinto al id almacenado en el post (El usuario quiere actualizar un post que no le pertenece), devuelve **403 Forbidden**.
- Si el lenguaje que se quiere asignar no existe devolvera status **409 Conflict**.

### DELETE /:id
Es una **Ruta protegida**

Donde id es un numero entero positivo, elimina un solo post con el id pasado. Devuelve un estado **200 OK**.

- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El post no existe), devuelve **404 Not Found**.
- Si el id del usuario es distinto al id almacenado en el post (El usuario quiere eliminar un post que no le pertenece), devuelve **403 Forbidden**.

___
## Notas:
- Las rutas protegidas devuelven **401 Unauthorized** si no se le pasa el ACCESS_TOKEN o esta vencido.
- Las rutas protegidas tienen acceso al nombre de usuario e id del usuario, por lo que no es necesario pasarlo en el cuerpo de la petición u otros.