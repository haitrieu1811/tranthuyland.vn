import Image from "next/image";
import Link from "next/link";

import apiRequests from "@/lib/apiRequests";
import { getFullMediaURL } from "@/lib/utils";

export default async function Logo({
  variants = "light",
}: {
  variants?: "light" | "dark";
}) {
  const logo = await apiRequests.logo();

  if (!logo) return null;

  const logoImage =
    variants === "light" ? logo.lightLogo.image.url : logo.darkLogo.image.url;

  return (
    <Link href={"/"}>
      <Image
        width={200}
        height={200}
        src={getFullMediaURL(logoImage)}
        alt="Logo"
        className="w-26 object-contain"
      />
    </Link>
  );
}
