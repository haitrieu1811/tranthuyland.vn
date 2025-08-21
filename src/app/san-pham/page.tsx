/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductItem from "@/components/product-item";
import { formatProduct, getOneEntry } from "@/lib/utils";
import { notFound } from "next/navigation";

const { Products } = getOneEntry();
export default async function ProductPage() {
  const productsInfo = await Products.getProductsByPageUrl("san-pham").catch(
    () => null
  );
  if (!productsInfo) return notFound();
  const products = productsInfo.items.map((item: any) => formatProduct(item));

  return (
    <div className="space-y-4 pt-4 pb-10">
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Sản phẩm
      </h1>
      <div className="w-[90vw] md:w-[80vw] mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
