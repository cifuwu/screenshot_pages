import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Obtener los parámetros de la URL
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") || "https://www.cifu.app/";
  const name = searchParams.get("name") || "screenshot";
  
  const width = searchParams.get("width") || 1920;
  const height = searchParams.get("height") || 1080;

  console.log(`Taking screenshot of the page: ${url}`);

  try {
    let browser;
    if (process.env.APP_DOCKERIZED || false) {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    const page = await browser.newPage();
    
    // Establecer el tamaño de la ventana
    await page.setViewport({ width, height });

    // Navegar a la página especificada
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    // Capturar solo el área visible en un monitor con la resolución proporcionada
    const screenshotBuffer = await page.screenshot({
      clip: { x: 0, y: 0, width, height },
    });
    
    await browser.close();

    // Devolver la imagen como respuesta
    return new NextResponse(screenshotBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename=${name}.png`,
      },
    });
  } catch (error) {
    console.error('Screenshot generation error:', error);
    return new NextResponse("Error generating screenshot", { status: 500 });
  }
}
