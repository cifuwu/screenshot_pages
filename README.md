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

## API

Este proyecto incluye una API para generar PDFs e imágenes. Los endpoint son:

### `GET /api/generate-pdf`

Este endpoint recibe una URL y genera un PDF de la página web proporcionada.

#### Ejemplo de solicitud

```bash
curl -X GET http://localhost:3000/api/generate-pdf?url=https://www.google.com&name=page_google
```

#### Parámetros

- `url` (string): La URL de la página web que deseas convertir en PDF.

- `name` (string): Nombre del archivo pdf. Por defecto se llama file.

#### Respuesta

La respuesta será un archivo PDF generado a partir de la página web proporcionada.

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="file.pdf"

..contenido del PDF..
```



### `GET /api/generate-image`

Este endpoint recibe una URL y genera un Imagen (mostrando la página completa) de la página web proporcionada.

#### Ejemplo de solicitud

```bash
curl -X GET http://localhost:3000/api/generate-image?url=https://www.google.com&name=page_google
```

#### Parámetros

- `url` (string): La URL de la página web que deseas convertir en una imagen.

- `name` (string): Nombre del archivo image. Por defecto se llama image.

#### Respuesta

La respuesta será un archivo Image generado a partir de la página web proporcionada.

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="image.png"

..contenido de la imagen..
```




### `GET /api/generate-screenshot`

Este endpoint recibe una URL y genera un Screenshot (image) de la página web proporcionada.

#### Ejemplo de solicitud

```bash
curl -X GET http://localhost:3000/api/generate-screenshot?url=https://www.google.com&name=page_google&width=1920&height=1080
```

#### Parámetros

- `url` (string): La URL de la página web que deseas convertir en una imagen.

- `name` (string): Nombre del archivo image. Por defecto se llama screenshot.

- `width` (int): Ancho en pixeles de la captura de pantalla (simulará una pantalla de ese ancho).

- `height` (int): Alto en pixeles de la captura de pantalla (simulará una pantalla de esa altura).

#### Respuesta

La respuesta será un archivo Image generado a partir de la página web proporcionada.

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="screenshot.png"

..contenido de la imagen..
```