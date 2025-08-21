import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatInfo, getOneEntry } from "@/lib/utils";

const { Blocks } = getOneEntry();
export default async function Logo() {
  const infoBlock = await Blocks.getBlockByMarker("info").catch(() => null);
  if (!infoBlock) return notFound();
  const info = formatInfo(infoBlock);

  return (
    <Link href={"/"}>
      <Image
        width={200}
        height={200}
        src={info.logo}
        alt={info.projectName}
        className="w-30 object-contain"
      />
    </Link>
  );
}
