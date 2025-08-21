import NextTopLoader from "nextjs-toploader";
import React from "react";

import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { StickyBanner } from "@/components/sticky-banner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <NextTopLoader
        shadow={false}
        showSpinner={false}
        height={2}
        color="#ff0000"
      />
      <StickyBanner />
      <Header />
      <main className="pb-4">{children}</main>
      <Footer />
    </React.Fragment>
  );
}
