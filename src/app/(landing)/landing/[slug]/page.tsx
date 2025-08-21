import { Metadata } from "next";

import Hold from "@/app/(landing)/_components/hold";

export const metadata: Metadata = {
  title: "Bí quyết đầu tư bất động sản sinh lời vượt trội năm 2025",
  description: "Bí quyết đầu tư bất động sản sinh lời vượt trội năm 2025",
};

export default async function Page() {
  return <Hold />;
}
