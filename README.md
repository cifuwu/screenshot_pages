# 📷 PDF and Screenshot Pages Generator

#### This project presents an APP along with an API that allows generating a PDF or a Screenshot (image) of a web page provided via a URL.

## Installation and Execution

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Running with Docker (Production Only)

> [!NOTE]
> Make sure Docker is installed and running on your system before proceeding.

> [!WARNING]
> This Docker image is not compatible with ARM processors.

To run this project with Docker, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t pages-pdf-generator .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 3000:3000 pages-pdf-generator
    ```

If you prefer, you can run the project using Docker Compose:
    
    ```bash
    docker compose up -d --build
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## API

This project includes an API for generating PDFs and images. The available endpoints are:

### `GET /api/generate-pdf`

This endpoint receives a URL and generates a PDF of the provided web page.

#### Request Example

```bash
curl -X GET "http://localhost:3000/api/generate-pdf?url=https://www.google.com&name=page_google"
```

#### Parameters

- `url` (string): The URL of the web page you want to convert into a PDF.
- `name` (string): The name of the PDF file. The default name is `file`.

#### Response

The response will be a PDF file generated from the provided web page.

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="file.pdf"

..PDF content..
```

### `GET /api/generate-image`

This endpoint receives a URL and generates an image (capturing the full page) of the provided web page.

#### Request Example

```bash
curl -X GET "http://localhost:3000/api/generate-image?url=https://www.google.com&name=page_google"
```

#### Parameters

- `url` (string): The URL of the web page you want to convert into an image.
- `name` (string): The name of the image file. The default name is `image`.

#### Response

The response will be an image file generated from the provided web page.

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="image.png"

..image content..
```

### `GET /api/generate-screenshot`

This endpoint receives a URL and generates a screenshot (image) of the provided web page.

#### Request Example

```bash
curl -X GET "http://localhost:3000/api/generate-screenshot?url=https://www.google.com&name=page_google&width=1920&height=1080"
```

#### Parameters

- `url` (string): The URL of the web page you want to convert into an image.
- `name` (string): The name of the screenshot file. The default name is `screenshot`.
- `width` (int): The width in pixels of the screenshot (simulates a screen of this width).
- `height` (int): The height in pixels of the screenshot (simulates a screen of this height).

#### Response

The response will be an image file generated from the provided web page.

```http
HTTP/1.1 200 OK
Content-Type: image/png
Content-Disposition: attachment; filename="screenshot.png"

..image content..
```

