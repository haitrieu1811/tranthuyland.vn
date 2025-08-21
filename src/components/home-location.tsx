import Link from "next/link";
import React from "react";

export default function HomeLocation({
  title,
  image,
  url,
}: {
  title: string;
  image: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="block w-full h-[200px] rounded-md overflow-hidden bg-cover bg-center relative"
    >
      <div className="absolute inset-0 p-6 pb-24 hover:cursor-pointer before:absolute before:inset-0 before:bg-black/20 hover:before:bg-destructive/40 before:duration-150">
        <div className="relative z-10">
          <div className="font-semibold text-xl text-white">{title}</div>
        </div>
      </div>
    </Link>
  );
}
