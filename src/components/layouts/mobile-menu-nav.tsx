"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationLink } from "@/types/single.types";

export default function MobileMenuNavigation({
  links,
}: {
  links: NavigationLink[];
}) {
  const pathname = usePathname();
  return (
    <div>
      {links.map((link) => (
        <Button
          asChild
          key={link.slug}
          variant="ghost"
          className={cn("w-full justify-start rounded-none", {
            "text-destructive pointer-events-none":
              link.slug.replace("/", "") === pathname.replace("/", ""),
          })}
        >
          <Link
            href={link.slug.startsWith("/") ? link.slug : "/" + link.slug}
            className="border-b"
          >
            {link.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
