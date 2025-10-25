import Image from "next/image";
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
      className="block rounded-lg overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-destructive/30 z-10 -translate-y-full group-hover:translate-y-0 duration-500" />
      <Image
        width={500}
        height={500}
        src={image}
        alt={title}
        className="w-full h-[240px] object-cover group-hover:scale-150 duration-500"
      />
      <div className="absolute inset-0 z-[11] p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </Link>
  );
}
