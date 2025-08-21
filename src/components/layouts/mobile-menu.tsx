/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, NotepadText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatMenu, getOneEntry } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/components/layouts/logo";

const { Pages } = getOneEntry();
export default async function MobileMenu() {
  const pagesInfo = await Pages.getPages();
  const menu = pagesInfo.map((item: any) => formatMenu(item));
  if (!menu) return null;
  return (
    <div className="flex lg:hidden justify-between items-center p-4 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            {menu.map((item: any) => (
              <Link
                key={item.url}
                href={item.url}
                className="block p-4 border-b"
              >
                {item.title}
              </Link>
            ))}
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
