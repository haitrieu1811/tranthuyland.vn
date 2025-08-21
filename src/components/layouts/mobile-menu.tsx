/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Menu, NotepadText, Phone } from "lucide-react";

import Logo from "@/components/layouts/logo";
import MobileMenuNavigation from "@/components/layouts/mobile-menu-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatInfo, formatMenu, getOneEntry } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const { Pages, Blocks } = getOneEntry();
export default async function MobileMenu() {
  const [pagesInfo, infoBlock] = await Promise.all([
    Pages.getPages(),
    Blocks.getBlockByMarker("info").catch(() => null),
  ]);
  if (!pagesInfo || !infoBlock) return null;
  const menu = pagesInfo.map((item: any) => formatMenu(item));
  const info = formatInfo(infoBlock);

  return (
    <div className="flex lg:hidden justify-between items-center p-4 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-auto">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex justify-center">
            <Logo />
          </div>
          <MobileMenuNavigation menu={menu} />
          <div className="p-4 space-y-4">
            <Link
              href={`tel:${info.phoneNumber}`}
              target="_blank"
              className="flex items-center space-x-2"
            >
              <Mail className="stroke-1 size-5" />
              <span className="text-sm font-medium">{info.email}</span>
            </Link>
            <Link
              href={`tel:${info.phoneNumber}`}
              target="_blank"
              className="flex items-center space-x-2"
            >
              <Phone className="stroke-1 size-5" />
              <span className="text-sm font-medium">{info.phoneNumber}</span>
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <Link
              href={info.youtube}
              target="_blank"
              className="size-8 rounded-full bg-destructive flex justify-center items-center"
            >
              <Image
                width={50}
                height={50}
                src={info.youtubeLogo}
                alt="YouTube Thumbnail"
                className="size-4 object-contain"
              />
            </Link>
            <Link
              href={info.facebook}
              target="_blank"
              className="size-8 rounded-full bg-destructive flex justify-center items-center"
            >
              <Image
                width={50}
                height={50}
                src={info.facebookLogo}
                alt="Facebook Thumbnail"
                className="size-4 object-contain"
              />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Logo />
      <Button
        size="icon"
        variant="destructive"
        className="rounded-full animate-bounce"
      >
        <NotepadText />
      </Button>
    </div>
  );
}
