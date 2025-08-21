import { Mail, Menu, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ContactButton from "@/components/contact-button";
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
import apiRequests from "@/lib/apiRequests";
import { getFullMediaURL } from "@/lib/utils";

export default async function MobileMenu() {
  const [navigation, info] = await Promise.all([
    apiRequests.navigation(),
    apiRequests.info(),
  ]);

  if (!navigation || !info) return null;

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
          <MobileMenuNavigation links={navigation.links} />
          <div className="p-4 space-y-4">
            {info.email && (
              <Link
                href={`tel:${info.email}`}
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Mail className="stroke-1 size-5" />
                <span className="text-sm font-medium">{info.email}</span>
              </Link>
            )}
            {info.hotline && (
              <Link
                href={`tel:${info.hotline}`}
                target="_blank"
                className="flex items-center space-x-2"
              >
                <Phone className="stroke-1 size-5" />
                <span className="text-sm font-medium">{info.hotline}</span>
              </Link>
            )}
          </div>
          {info.socials.length > 0 && (
            <div className="flex justify-center items-center space-x-2">
              {info.socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  className="size-8 rounded-full bg-destructive flex justify-center items-center"
                >
                  <Image
                    width={social.image.formats.small.width}
                    height={social.image.formats.small.height}
                    src={getFullMediaURL(social.image.formats.small.url)}
                    alt={social.name}
                    className="size-4 object-contain"
                  />
                </Link>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
      <Logo />
      <ContactButton />
    </div>
  );
}
