"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationLink } from "@/types/single.types";

export default function HeaderNavigation({
  links,
}: {
  links: NavigationLink[];
}) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center">
      {links.map((link) => (
        <Button
          key={link.id}
          variant="link"
          className={cn("px-4", {
            "text-destructive pointer-events-none":
              link.slug.replace("/", "") === pathname.replace("/", ""),
          })}
        >
          <Link href={link.slug.startsWith("/") ? link.slug : "/" + link.slug}>
            {link.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
