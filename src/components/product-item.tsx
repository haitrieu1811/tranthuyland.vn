import Image from "next/image";
import Link from "next/link";

import {
  formatLargeNumber,
  generateNameId,
  getFullMediaURL,
} from "@/lib/utils";
import { Product } from "@/types/products.types";

export default function ProductItem({ product }: { product: Product }) {
  const href = `/san-pham/${generateNameId({
    name: product.name,
    id: product.documentId,
  })}`;
  return (
    <div className="group rounded-lg overflow-hidden">
      <Link href={href}>
        <Image
          width={product.thumbnail.width}
          height={product.thumbnail.height}
          src={getFullMediaURL(product.thumbnail.url)}
          alt={product.name}
          className="w-full aspect-video object-cover"
        />
      </Link>
      <div className="space-y-2 p-4 bg-muted">
        <Link
          href={href}
          className="font-semibold line-clamp-2 hover:text-destructive duration-150 group-hover:text-destructive"
        >
          {product.name}
        </Link>
        {product.city && (
          <div className="text-muted-foreground text-sm line-clamp-1">
            {product.city.name}
          </div>
        )}
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-destructive">
            {formatLargeNumber(Number(product.price))}
          </div>
          {product.acreage && (
            <div className="text-sm">
              {product.acreage}m<sup>2</sup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
