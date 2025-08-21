import Image from "next/image";
import Link from "next/link";

import { formatLargeNumber, generateNameId } from "@/lib/utils";
import { ProductItem as ProductItemType } from "@/types/products.types";

export default function ProductItem({ product }: { product: ProductItemType }) {
  return (
    <div className="space-y-2">
      <Link
        href={generateNameId({
          name: product.title,
          id: product.id,
        })}
        className="block"
      >
        <Image
          width={500}
          height={500}
          src={product.thumbnail}
          alt={product.title}
          className="w-full aspect-video object-cover rounded-t-md"
        />
      </Link>
      <div className="space-y-2 bg-background p-4 rounded-b-md border-b border-x">
        <Link
          href={generateNameId({
            name: product.title,
            id: product.id,
          })}
          className="font-medium line-clamp-2 hover:text-destructive duration-150"
        >
          {product.title}
        </Link>
        <div className="text-muted-foreground text-sm line-clamp-1">
          {product.address}
        </div>
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-destructive text-lg">
            {formatLargeNumber(product.price)}
          </div>
          <div>
            {product.acreage}m<sup>2</sup>
          </div>
        </div>
      </div>
    </div>
  );
}
