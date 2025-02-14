# 🚀 PDF Pages Generator

#### Este es un proyecto con la finalidad de presentar una API que genera un pdf de una página web proporcionada.

## Comenzando

Primero, instala las dependencias:

```bash
npm install
# o
yarn 
# o
pnpm install
# o
bun install
```
Luego, ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.


## Ejecutar con Docker (Sólo para producción)

Para ejecutar este proyecto con Docker, sigue estos pasos:

1. Construye la imagen Docker:

    ```bash
    docker build -t pages-pdf-generator
    ```

2. Ejecuta el contenedor Docker:

    ```
    docker run -p 3000:3000 pages-pdf-generator
    ```

Si lo prefieres, puedes ejecutar el proyecto con Docker Compose:
    
    docker compose up -d --build

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## API Generación de pdf

Este proyecto incluye una API para generar PDFs. El endpoint principal es:

### `GET /api/generate-pdf`

Este endpoint recibe una URL y genera un PDF de la página web proporcionada.

#### Ejemplo de solicitud

```bash
curl -X GET http://localhost:3000/api/generate-pdf?url=https://www.google.com/&name=page_google
```

#### Parámetros

- `url` (string): La URL de la página web que deseas convertir en PDF.

- `name` (string): Nombre del archivo pdf. Por defecto se llama file

#### Respuesta

La respuesta será un archivo PDF generado a partir de la página web proporcionada.

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="file.pdf"

...contenido del PDF...
```