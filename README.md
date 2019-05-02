![wallaviso](/static/img/favicon.png)
# [Wallaviso](http://www.wallaviso.com/)  

Instrucciones de instalación.

## Notas
Uso de python3.7, editar PipFile
> python_version = "3.7"
y usaremos el ejecutable python3.7 (en lugar de python3)

## Install

```bash
pipenv install
cp envExample .env
```

Config *.env*
 
## Database

```bash
rm -rf migrations

pipenv shell
python3 models.py db init
# se crea el dir. migrations
python3 models.py db migrate
# se crea database.sqlite
python3 models.py db upgrade
# actualiza? las tablas
python3 models.py init_data
# inicializa los datos
```

## Dependencias npm

```bash
npm install
```

## Run
 
```bash
pipenv shell
python3 app.py
```
