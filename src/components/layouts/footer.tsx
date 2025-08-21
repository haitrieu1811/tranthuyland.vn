import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import BackToTopButton from "@/components/back-top-top-button";
import FooterContact from "@/components/layouts/footer-contact";
import Logo from "@/components/layouts/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import apiRequests from "@/lib/apiRequests";
import { getFullMediaURL } from "@/lib/utils";

export default async function Footer() {
  const [info, navigation] = await Promise.all([
    apiRequests.info(),
    apiRequests.navigation(),
  ]);

  if (!info || !navigation) return null;

  return (
    <React.Fragment>
      <div className="bg-muted py-10 mt-10">
        <div className="container">
          <FooterContact />
        </div>
      </div>
      <footer className="bg-center bg-cover bg-no-repeat relative before:absolute before:inset-0 before:bg-destructive">
        <div className="relative z-10">
          <div className="container">
            <nav className="flex flex-wrap justify-center items-center py-5">
              {navigation.links?.map((link) => (
                <Button
                  key={link.id}
                  variant="link"
                  className="px-4 text-white w-full md:w-auto"
                >
                  <Link href={link.slug}>{link.name}</Link>
                </Button>
              ))}
            </nav>
            <Separator />
          </div>
          <div className="flex flex-col justify-center items-center space-y-10 text-center py-10 text-white text-sm">
            <div className="space-y-4">
              {info.hotline && <div>Hotline: {info.hotline}</div>}
              {info.email && <div>Email: {info.email}</div>}
              {info.socials.length > 0 && (
                <div className="flex items-center justify-center space-x-4">
                  {info.socials.map((social) => (
                    <Link key={social.id} href={social.url} target="_blank">
                      <Image
                        src={getFullMediaURL(social.image.formats.small.url)}
                        alt={social.name}
                        width={social.image.formats.small.width}
                        height={social.image.formats.small.height}
                        className="w-6 object-contain"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Logo variants="dark" />
          </div>
        </div>
      </footer>
      <BackToTopButton />
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-4">
        {/* Điện thoại */}
        {info.hotline && (
          <Button
            asChild
            size="icon"
            className="rounded-full size-12 bg-blue-500 hover:bg-blue-600"
          >
            <a href={`tel:${info.hotline}`} target="_blank">
              <Phone className="size-5 fill-white animate-ring" />
            </a>
          </Button>
        )}
        {/* Zalo */}
        {info.zalo && (
          <Button
            asChild
            size="icon"
            variant="outline"
            className="rounded-full size-12 bg-white text-blue-500 hover:text-blue-600 font-bold"
          >
            <a href={`https://zalo.me/${info.zalo}`} target="_blank">
              Zalo
            </a>
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}
