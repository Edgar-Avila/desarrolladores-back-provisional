# Likes

## POST /
Es una **Ruta protegida**

Crea un like. Retorna **201 Created**. Los datos que recibe en el cuerpo de la peticion son:
```ts
{
    "postId": number,
}
```
Manejo de Errores:
- Si el postId no es un entero positivo, devolvera status **400 Bad Request**.
- Si el post que no existe devolvera status **409 Conflict**.

## DELETE /
Es una **Ruta protegida**

Donde id es un numero entero positivo, elimina un solo like. Devuelve un estado **200 OK**.
```ts
{
    "postId": number,
}
```

- Si el postId no es un entero positivo devolvera status **400 Bad Request**.
- Si el id no existe en la base de datos (El like no existe), devuelve **404 Not Found**.

___
## Notas:
- Las rutas protegidas devuelven **401 Unauthorized** si no se le pasa el ACCESS_TOKEN o esta vencido.
- Las rutas protegidas tienen acceso al nombre de usuario e id del usuario, por lo que no es necesario pasarlo en el cuerpo de la petición u otros.