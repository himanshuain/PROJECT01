"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Sparkles() {
  return (
    <div className="h-[30rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Anime Lookout
      </h1> */}
      <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-center relative z-20 bg-gradient-to-r from-blue-500 via-red-300 to-purple-500 text-transparent bg-clip-text ">
        Scanimè
      </div>

      <div className="w-full max-w-[40rem] h-40 relative mx-auto">
        {/* Gradients */}
        <div className="absolute inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
        <div className="absolute inset-x-5 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        <div className="absolute inset-x-10 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
        <div className="absolute inset-x-10 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
