/* eslint-disable @typescript-eslint/no-explicit-any */
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

import BackToTopButton from "@/components/back-top-top-button";
import Logo from "@/components/layouts/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatInfo, formatMenu, getOneEntry } from "@/lib/utils";

const { Pages, Blocks } = getOneEntry();
export default async function Footer() {
  const [pagesInfo, footerBlock, infoBlock] = await Promise.all([
    Pages.getPages().catch(() => null),
    Blocks.getBlockByMarker("footer").catch(() => null),
    Blocks.getBlockByMarker("info").catch(() => null),
  ]);
  if (!pagesInfo || !footerBlock || !infoBlock) return null;
  const menu = pagesInfo.map((item: any) => formatMenu(item));
  const footer = {
    background:
      footerBlock.attributeValues.background.value[0]?.downloadLink ?? "",
  };
  const info = formatInfo(infoBlock);

  return (
    <React.Fragment>
      <footer
        style={{
          backgroundImage: `url(${footer.background})`,
        }}
        className="bg-center bg-cover bg-no-repeat relative before:absolute before:inset-0 before:bg-destructive/80"
      >
        <div className="relative z-10">
          <div className="w-[90vw] md:w-[80vw] mx-auto">
            <nav className="flex flex-wrap justify-center items-center py-5">
              {menu.map((item: any) => (
                <Button
                  key={item.url}
                  variant="link"
                  className="px-4 text-white w-full md:w-auto"
                >
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              ))}
            </nav>
            <Separator />
          </div>
          <div className="flex flex-col justify-center items-center space-y-10 text-center py-10 text-white text-sm">
            <div className="space-y-4">
              <div>Hotline: {info.phoneNumber}</div>
              <div>Email: {info.email}</div>
            </div>
            <Logo />
          </div>
        </div>
      </footer>
      <BackToTopButton />
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col space-y-4">
        {/* Điện thoại */}
        <Button
          asChild
          size="icon"
          className="rounded-full size-12 bg-blue-500 hover:bg-blue-600"
        >
          <a href={`tel:${info.phoneNumber}`} target="_blank">
            <Phone className="size-5 fill-white animate-ring" />
          </a>
        </Button>
        {/* Zalo */}
        <Button
          asChild
          size="icon"
          variant="outline"
          className="rounded-full size-12 bg-white text-blue-500 hover:text-blue-600 font-bold"
        >
          <a href={`https://zalo.me/${info.phoneNumber}`} target="_blank">
            Zalo
          </a>
        </Button>
      </div>
    </React.Fragment>
  );
}
