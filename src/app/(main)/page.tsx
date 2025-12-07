import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import HomeCarousel from "@/components/home-carousel";
import HomeLocation from "@/components/home-location";
import ProductItem from "@/components/product-item";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import apiRequests from "@/lib/apiRequests";
import {
  cn,
  generateNameId,
  getFullMediaURL,
  getPlainTextFromBlocksContent,
} from "@/lib/utils";

export const metadata: Metadata = {
  title: "Trang chủ | Trần Thủy Land",
};

export default async function HomePage() {
  const [cities, products, posts, homePage] = await Promise.all([
    apiRequests.cities(),
    apiRequests.products({
      limit: 6,
      filters: [["isFeatured", "$eq", "true"]],
    }),
    apiRequests.posts({
      limit: 4,
    }),
    apiRequests.homePage(),
  ]);

  if (!homePage || !cities || !products || !posts) return null;

  return (
    <div>
      <HomeCarousel />
      <div className="container space-y-20 mt-4">
        {/* Tìm kiếm */}
        <Search cities={cities.data} />
        {/* Dịch vụ */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="tracking-tight font-semibold text-2xl">
              {homePage.service.title}
            </h2>
            {homePage.service.description && (
              <p>{homePage.service.description}</p>
            )}
          </div>
          <div className="grid grid-cols-12 gap-4">
            {homePage.service.services.map((service) => {
              const isHasSlug = !!service.slug;
              return (
                <Link
                  key={service.name}
                  href={service.slug ? service.slug : "#"}
                  className={cn(
                    "col-span-12 md:col-span-6 lg:col-span-4 border-3 rounded-md flex flex-row md:flex-col justify-center items-center text-center p-10 space-y-8 space-x-6 md:space-x-0",
                    {
                      "duration-150 hover:border-destructive hover:cursor-pointer hover:bg-destructive/5":
                        isHasSlug,
                      "pointer-events-none": !isHasSlug,
                    }
                  )}
                >
                  <Image
                    width={service.image.width}
                    height={service.image.height}
                    src={getFullMediaURL(service.image.url)}
                    alt={service.image.name}
                    className="size-18 object-contain shrink-0"
                  />
                  <div className="space-y-6">
                    <div className="font-semibold text-2xl">{service.name}</div>
                    {isHasSlug && (
                      <div className="text-destructive font-semibold">
                        Tìm hiểu thêm
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* BĐS theo thành phố */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-8">
            <HomeLocation
              url={`/san-pham?cityId=${cities.data[0].documentId}`}
              title={cities.data[0].name}
              image={getFullMediaURL(cities.data[0].thumbnail.url)}
            />
          </div>
          <div className="col-span-6 md:col-span-4">
            <HomeLocation
              url={`/san-pham?cityId=${cities.data[1].documentId}`}
              title={cities.data[1].name}
              image={getFullMediaURL(cities.data[1].thumbnail.url)}
            />
          </div>
          <div className="col-span-6 md:col-span-4">
            <HomeLocation
              url={`/san-pham?cityId=${cities.data[2].documentId}`}
              title={cities.data[2].name}
              image={getFullMediaURL(cities.data[2].thumbnail.url)}
            />
          </div>
          <div className="col-span-6 md:col-span-4">
            <HomeLocation
              url={`/san-pham?cityId=${cities.data[3].documentId}`}
              title={cities.data[3].name}
              image={getFullMediaURL(cities.data[3].thumbnail.url)}
            />
          </div>
        </div>
        {/* BĐS nổi bật */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="tracking-tight font-semibold text-2xl">
              Bất động sản nổi bật
            </h2>
            <Button variant="link" size="sm">
              <Link href="/san-pham" className="text-destructive">
                Xem tất cả
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {products.data.map((product) => (
              <div key={product.id} className="col-span-6 lg:col-span-4">
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>
        {/* Bài viết mới nhất */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="tracking-tight font-semibold text-2xl">
              Bài viết mới nhất
            </h2>
            <Button variant="link" size="sm">
              <Link
                href="/bai-viet"
                className="text-sm font-semibold text-destructive"
              >
                Xem tất cả
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {/* Bài viết lớn */}
            <div className="col-span-12 lg:col-span-6">
              <div className="group">
                <Link
                  href={`bai-viet/${generateNameId({
                    name: posts.data[0]?.title,
                    id: posts.data[0]?.documentId,
                  })}`}
                  className="overflow-hidden block relative"
                >
                  <Image
                    src={getFullMediaURL(posts.data[0]?.thumbnail.url)}
                    alt={posts.data[0]?.title}
                    width={300}
                    height={200}
                    className="object-cover w-full aspect-video rounded-t-lg group-hover:scale-150 duration-500"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-destructive/20 rounded-lg duration-200 size-10 group-hover:size-full opacity-0 group-hover:opacity-100" />
                </Link>
                <div className="p-4 rounded-b-lg bg-muted space-y-2">
                  <Link
                    href={`bai-viet/${generateNameId({
                      name: posts.data[0]?.title,
                      id: posts.data[0]?.documentId,
                    })}`}
                    className="font-semibold block line-clamp-2 duration-150 group-hover:text-destructive"
                  >
                    {posts.data[0]?.title}
                  </Link>
                  <p className="text-muted-foreground text-sm text-justify line-clamp-3 leading-relaxed">
                    {getPlainTextFromBlocksContent(posts.data[0].content)}
                  </p>
                </div>
              </div>
            </div>
            {/* 4 bài viết nhỏ */}
            <div className="col-span-12 lg:col-span-6 space-y-4">
              {posts.data.slice(1, 4).map((post) => (
                <div key={post.id} className="flex flex-col lg:flex-row group">
                  <Link
                    href={`bai-viet/${generateNameId({
                      name: post.title,
                      id: post.documentId,
                    })}`}
                    className="basis-1/3 block relative overflow-hidden"
                  >
                    <Image
                      src={getFullMediaURL(post.thumbnail.url)}
                      alt={post.title}
                      width={post.thumbnail.width}
                      height={post.thumbnail.height}
                      className="object-cover w-full aspect-video rounded-t-lg lg:rounded-l-lg lg:rounded-t-none group-hover:scale-120 duration-500"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-destructive/20 rounded-lg duration-200 size-10 group-hover:size-full opacity-0 group-hover:opacity-100" />
                  </Link>
                  <div className="flex-1 bg-muted p-4 rounded-b-lg lg:rounded-r-lg">
                    <Link
                      href={`bai-viet/${generateNameId({
                        name: post.title,
                        id: post.documentId,
                      })}`}
                      className="font-semibold line-clamp-2 flex-1 duration-150 group-hover:text-destructive"
                    >
                      {post.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
