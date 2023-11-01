
## Inicializando el proyecto

```sh
touch server.js README.md .env .env.example .gitignore && mkdir controllers models middlewares data routers public &
& npm init -y && npm i express express-validator mongoose multer cors && npm i nodemon dotenv -D
```

## Uso del proyecto 

1. Bajar el .zip (GitHub o Drive)
2. Copiar el .env.example
3. Renombrarlo a .env
4. Agregar el puerto PORT=8080
5. npm i
6. npm run dev

## Hacer el backup de mi DB local y llevarlo a la remota

Posicionarnos en el directorio donde queremos hacer el dump

```sh
mongodump --db bc_ecommerce
```

Hacemos el restore del dump local en la DB remota

```sh
mongorestore --uri "mongodb+srv://bootcamp.agir0cm.mongodb.net/" --username hbianchimano --nsInclude bc_ecommerce.* dump/
```