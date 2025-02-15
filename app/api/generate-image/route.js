import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  }

  // Obtener los parámetros de la URL
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") || "https://www.cifu.app/";
  const name = searchParams.get("name") || "image";

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

    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();
    
    // Establecer el tamaño de la ventana
    await page.setViewport({ width: width + 100, height });

    // Navegar a la página especificada
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    // Capturar la pantalla
    const screenshotBuffer = await page.screenshot({
      fullPage: true, // Captura toda la página
    });
    
    await browser.close();

    // Devolver la imagen como respuesta
    return new NextResponse(screenshotBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename=${name}.png`,
      },
    });
  } catch (error) {
    console.error('Screenshot generation error:', error);
    return new NextResponse("Error generating screenshot", { status: 500, headers: corsHeaders });
  }
}
