import { type Metadata } from "next";

import PageTitle from "@/components/page-title";
import ProductItem from "@/components/product-item";
import apiRequests from "@/lib/apiRequests";

export const metadata: Metadata = {
  title: "Trần Thủy Land | Sản phẩm",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae quam nesciunt molestias consequatur tempora totam, voluptatibus id ipsa vero sapiente rem alias, repellat nam atque, possimus voluptates dicta dolorem facilis?",
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const _searchParams = await searchParams;
  const name =
    typeof _searchParams.name !== "string" ? null : _searchParams.name;
  const cityId =
    typeof _searchParams.cityId !== "string" ? null : _searchParams.cityId;
  const products = await apiRequests.products({
    filters: [
      ["name", "$contains", name],
      ["city", "documentId", cityId],
    ],
  });

  if (!products) return null;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Sản phẩm"
        description={`Hiện có ${products.meta.pagination?.total ?? 0} sản phẩm`}
      />
      <div className="container">
        {(products.meta.pagination?.total ?? 0) > 0 && (
          <div className="grid grid-cols-12 gap-4">
            {products.data.map((product) => (
              <div
                key={product.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
