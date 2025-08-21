/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeaderNavigation({ menu }: { menu: any }) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center">
      {menu.map((item: any) => (
        <Button
          key={item.url}
          variant="link"
          className={cn("px-4", {
            "text-destructive pointer-events-none": item.url === pathname,
          })}
        >
          <Link href={item.url}>{item.title}</Link>
        </Button>
      ))}
    </nav>
  );
}
