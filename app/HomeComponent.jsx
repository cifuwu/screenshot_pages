'use client'
import { useState } from "react";
import { toast } from "sonner";


const isValidUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const isMissingProtocol = (urlString) => {
  return !/^https?:\/\//i.test(urlString);
};


const endpoints = {
  "PDF": "/api/generate-pdf",
  "Image": "/api/generate-image",
  "Screenshot": "/api/generate-screenshot",
}



export default function HomeComponent() {
  const [option, setOption] = useState("PDF");
  const [isLoading, setisLoading] = useState(false);


  const handleDownload = async (e) => {
    e.preventDefault();
    if(isLoading) return;

    setisLoading(true);
    try {
      const url = e.target.url.value;
      const name = "page";

      if (!isValidUrl(url)) {
        if (isMissingProtocol(url)) {
          toast.error("URL is missing http or https");
        } else {
          toast.error("Invalid URL");
        }
        setisLoading(false);
        return;
      }

      const response = await fetch(`${endpoints[option]}?url=${url}&name=${name}`);

      if (!response.ok){
        setisLoading(false);
        toast.error("Error generating screenshot");
        return
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name}.${option==='PDF' ? 'pdf' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File downloaded successfully!");

    } catch (error) {
      setisLoading(false);
      toast.error("Error generating screenshot");
      console.error("Error downloading screenshot:", error);
      return
    }
    setisLoading(false);
  };



  return (
    <main className="min-h-screen flex flex-col justify-center mx-3"> 

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">Hello my beautiful people ❤️</h2>
      <p className="text-gray-600 text-sm text-center font-medium max-w-sm mx-auto my-2">Select one of the options to generate a PDF, an image or a screenshot.</p>
      
      <div className="flex flex-wrap justify-center items-center gap-2 mx-auto mb-4 mt-10">
        <button 
          className={`w-32 border border-gray-800 rounded-md py-1.5 px-4 text-gray-800 font-medium ${option==='PDF' ? 'bg-gray-800 text-white' : 'hover:bg-gray-300'} transition-colors`}
          onClick={() => setOption("PDF")}
          >
          PDF
        </button>
        <button 
          className={`w-32 border border-gray-800 rounded-md py-1.5 px-4 text-gray-800 font-medium ${option==='Image' ? 'bg-gray-800 text-white' : 'hover:bg-gray-300'} transition-colors`}
          onClick={() => setOption("Image")}
          >
          Image
        </button>
        <button 
          className={`w-32 border border-gray-800 rounded-md py-1.5 px-4 text-gray-800 font-medium ${option==='Screenshot' ? 'bg-gray-800 text-white' : 'hover:bg-gray-300'} transition-colors`}
          onClick={() => setOption("Screenshot")}
          >
          Screenshot
        </button>
      </div>

      <form onSubmit={handleDownload} className="mx-auto my-2 max-w-xs w-full">

        <div className="w-full">
          <label htmlFor="url" className="block mb-1 text-sm font-medium text-gray-700 ">Page URL</label>
          <input 
            type="text" 
            id="url" 
            name="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Page URL" 
            required 
            />
        </div>

        <div className="mx-auto w-max">
          <button disabled={isLoading} className="w-64 disabled:cursor-wait bg-gray-700 hover:bg-gray-800 transition-colors text-white font-medium text-sm rounded-lg py-2 mt-2">
            {isLoading ? "Loading..." : "Generate"}
          </button>
        </div>

      </form>

    </main>
  )
}
