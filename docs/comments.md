# Comments

La ruta que comparten es http://localhost:8000/comments, y tiene las siguientes operaciones:

## POST /
Es una **Ruta protegida**

Crea un comentario y lo almacena en la base de datos. En caso de exito retorna un status **201 Created** junto con el objeto coment recien creado. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "answeredId": number | undefined,
    "postId": number,
    "content": string
}
```
Manejo de Errores:
- Si el cuerpo no es valido devolvera status **400 Bad Request**.
- Si el comentario al que se responde o el post no existen devolvera status **409 Conflict**.
- Si el comentario al que se responde no esta en el mismo post devolvera status **409 Conflict**

## PUT /:id
Es una **Ruta protegida**

Donde id es un numero entero positivo, actualiza un solo comentario con el id pasado. Devuelve un estado **200 OK**. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "content": string,
}
```
Manejo de errores:
- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el cuerpo no es valido devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El comentario no existe), devuelve **404 Not Found**.
- Si el id del usuario es distinto al id almacenado en el comentario (El usuario quiere actualizar un comentario que no le pertenece), devuelve **403 Forbidden**.


## DELETE /:id
Es una **Ruta protegida**

Donde id es un numero entero positivo, elimina un solo post con el id pasado. Devuelve un estado **200 OK**.

- Si el id no es un entero positivo devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El comentario no existe), devuelve **404 Not Found**.
- Si el id del usuario es distinto al id almacenado en el comentario (El usuario quiere eliminar un comentario que no le pertenece), devuelve **403 Forbidden**.

___
## Notas:
- Las rutas protegidas devuelven **401 Unauthorized** si no se le pasa el ACCESS_TOKEN o esta vencido.
- Las rutas protegidas tienen acceso al nombre de usuario e id del usuario, por lo que no es necesario pasarlo en el cuerpo de la petición u otros.