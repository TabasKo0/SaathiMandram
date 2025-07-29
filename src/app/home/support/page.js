'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);  
    useEffect(() => {
      // Check if already loaded (could happen on fast connections)
      if (document.readyState === "complete") {
        setIsFullyLoaded(true);
      } else {
        window.addEventListener("load", () => {
          setIsFullyLoaded(true);
        });
      }
    }, []);
  
  return (
   <div
             
               className="relative z-10 min-h-screen  snap-start"
             >

       
               <main className="flex flex-col gap-[32px] items-center sm:items-start h-screen relative z-10">

<div className="flex items-center h-screen absolute justify-center w-full"> 
        {/* 📱 Phone Frame */}
        <div  className="relative bg-black overflow-show flex items-center justify-center w-[340px] h-[680px] border-[6px] border-green-900 rounded-[2rem] shadow-xl ">

          {/* 🏠 Back button at regular position */}
          <div className="absolute top-[0] left-[100px] w-32 h-1 bg-gray-600 rounded-md shadow-md z-2"></div>

          {/* 📷 Camera dot */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full z-2" ></div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-9 bg-black rounded-full z-1"></div>

          {/* 🔊 Volume buttons */}
          <div className="absolute right-[-10px] top-[200] w-1 h-12 bg-orange-400 rounded-xl"></div>
          <div className="absolute right-[-10px] top-[270] w-1 h-12 bg-orange-400 rounded-xl"></div>

          {/* 🔘 Power button */}
          <div className="absolute right-[-10px] top-[140px] w-1 h-12 bg-orange-400 rounded-xl"></div>

          {/* Inside phone screen */}
          <div className="w-[90%] h-[95%] bg-white/20 backdrop-blur-lg flex flex-col items-center justify-center gap-4 p-4  border-[1px] border-black-300 rounded-xl" >
            <button  onClick={() => {
          
          window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSd1nXFiXIPWl8RYfX8UVFvUJyWmBBIlB0U20gbeHF6jSjKc7A/viewform?usp=header";
        }} className="bg-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md rounded-lg p-3 justify-center flex items-center gap-2 w-[90%]">
              <Image
              unoptimized
                src="/gif1.gif"
                alt="gif1"
                width={80}
                height={80}
                className="rounded-full"
              />
              <p className="text-black">Form</p>
            </button>
            <button 
            onClick={() => {
              
              window.location.href = "tel:+918100364748";
            }}
            className="bg-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md rounded-lg p-3 flex items-center justify-center gap-2 w-[90%]">
              <p className="text-black">Call</p>
              <Image
              unoptimized
                src="/gif2.gif"
                alt="gif2"
                width={80}
                height={80}
                className="rounded-full"
              />
            </button>
            <button
            
            onClick={() => {
              
              window.location.href = "mailto:ventureacademy.contact@gmail.com";
            }}
            className="bg-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md rounded-lg p-3 justify-center flex items-center gap-2 w-[90%]">
              <Image
              unoptimized
                src="/gif3.gif"
                alt="gif3"
                width={80}
                height={80}
                className="rounded-full"
              />
              <p className="text-black">Email</p>
            </button>
            <button
            onClick={() => {
              
              window.location.href = "https://wa.me/918100364748";
            }}
            className="bg-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md rounded-lg p-3 justify-center flex items-center gap-2 w-[90%]">
              <p className="text-black">Whatsapp</p>
              <Image
              unoptimized
                src="/gif4.gif"
                alt="gif4"
                width={80}
                height={80}
                className="rounded-full"
              />
            </button>
          </div>
        </div></div>
      </main>
    </div> 
  );
}