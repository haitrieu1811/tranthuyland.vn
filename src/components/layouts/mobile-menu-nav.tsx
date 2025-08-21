/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MobileMenuNavigation({ menu }: { menu: any }) {
  const pathname = usePathname();
  return (
    <div>
      {menu.map((item: any) => (
        <Button
          asChild
          key={item.url}
          variant="ghost"
          className={cn("w-full justify-start rounded-none", {
            "text-destructive pointer-events-none": item.url === pathname,
          })}
        >
          <Link href={item.url} className="border-b">
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
