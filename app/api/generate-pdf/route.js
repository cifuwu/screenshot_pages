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
  const name = searchParams.get("name") || "file"; 

  console.log(`Generating pdf of the page: ${url}`);

  try{
    let browser;
    if(process.env.APP_DOCKERIZED || false){
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: 'new',
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
    else{
      browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });  
    }

    const page = await browser.newPage();

    // Navegar a la página donde se renderiza el componente
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    // Obtener el tamaño de la página
    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();

    // Generar PDF en memoria
    const pdfBuffer = await page.pdf({
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      pageRanges: '1',
    });
    await browser.close();

    // Devolver el PDF como respuesta
    return new NextResponse(pdfBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${name}.pdf`,
      },
    });

  }
  catch (error) {
    console.error('PDF generation error:', error);
    return new NextResponse("Error generating PDF", { status: 500, headers: corsHeaders });
  }
}