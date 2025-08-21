import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StickyBanner as StickyBannerRoot } from "@/components/ui/sticky-banner";
import apiRequests from "@/lib/apiRequests";

export async function StickyBanner() {
  const stickyBanner = await apiRequests.stickyBanner();

  if (!stickyBanner) return null;

  return (
    <StickyBannerRoot className="bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="mx-0 max-w-[90%]">
        <div className="flex space-x-4 items-center">
          <span className="text-white text-sm font-medium drop-shadow-md">
            {stickyBanner.title}
          </span>{" "}
          <Button asChild size="sm" variant="outline">
            <Link href={stickyBanner.actionUrl} target="_blank">
              {stickyBanner.actionName}
            </Link>
          </Button>
        </div>
      </div>
    </StickyBannerRoot>
  );
}
