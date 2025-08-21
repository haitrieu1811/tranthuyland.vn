"use client";

import { motion } from "motion/react";

import ColourfulText from "@/components/ui/colourful-text";
import { Slogan } from "@/types/single.types";
import React from "react";

export function Hero({ image, slogans }: { image: string; slogans: Slogan[] }) {
  return (
    <div className="h-[50vh] w-full flex items-center justify-center relative overflow-hidden bg-black">
      <motion.img
        src={image}
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        {slogans.map((slogan) => (
          <React.Fragment key={slogan.id}>
            {slogan.normalText} <ColourfulText text={slogan.highlightText} />{" "}
            <br />
          </React.Fragment>
        ))}
      </h1>
    </div>
  );
}
