/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotepadText } from "lucide-react";
import React from "react";

import Logo from "@/components/layouts/logo";
import MobileMenu from "@/components/layouts/mobile-menu";
import HeaderNavigation from "@/components/layouts/navigation";
import { Button } from "@/components/ui/button";
import { formatMenu, getOneEntry } from "@/lib/utils";

const { Pages } = getOneEntry();
export default async function Header() {
  const pagesInfo = await Pages.getPages();
  const menu = pagesInfo.map((item: any) => formatMenu(item));
  if (!menu) return null;

  return (
    <div className="sticky top-0 z-50 bg-background">
      <header className="border-b hidden lg:block">
        <div className="w-[90vw] md:w-[80vw] mx-auto bg-background flex justify-between items-center space-x-10 py-4">
          <Logo />
          <HeaderNavigation menu={menu} />
          <Button variant="destructive" className="rounded-full animate-bounce">
            <NotepadText />
            Ký gửi ngay
          </Button>
        </div>
      </header>
      <MobileMenu />
    </div>
  );
}
