/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import HomeLocation from "@/components/home-location";
import ProductItem from "@/components/product-item";
import { Button } from "@/components/ui/button";
import { formatProduct, getOneEntry } from "@/lib/utils";

export const metadata: Metadata = {
  title: "tranthuyland",
};

const { Pages, Products } = getOneEntry();
export default async function HomePage() {
  const [pageInfo, productsInfo] = await Promise.all([
    Pages.getPageByUrl("home").catch(() => null),
    Products.getProductsByPageUrl("san-pham").catch(() => null),
  ]);
  if (!pageInfo || !productsInfo) return notFound();
  const products = productsInfo.items.map((item: any) => formatProduct(item));
  const pageData: {
    banner: string;
    slogan: string;
    services: {
      title: string;
      image: string;
    }[];
    locations: {
      title: string;
      image: string;
    }[];
  } = {
    banner: pageInfo.attributeValues.banner.value[0]?.downloadLink,
    slogan: pageInfo.attributeValues.slogan.value,
    services: [
      {
        image:
          pageInfo.attributeValues["service-1-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["service-1-title"].value,
      },
      {
        image:
          pageInfo.attributeValues["service-2-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["service-2-title"].value,
      },
      {
        image:
          pageInfo.attributeValues["service-3-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["service-3-title"].value,
      },
    ],
    locations: [
      {
        image:
          pageInfo.attributeValues["location-1-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["location-1-title"].value,
      },
      {
        image:
          pageInfo.attributeValues["location-2-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["location-2-title"].value,
      },
      {
        image:
          pageInfo.attributeValues["location-3-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["location-3-title"].value,
      },
      {
        image:
          pageInfo.attributeValues["location-4-image"].value[0]?.downloadLink,
        title: pageInfo.attributeValues["location-4-title"].value,
      },
    ],
  };

  return (
    <div className="space-y-10">
      <div
        style={{
          backgroundImage: `url(${pageData.banner})`,
        }}
        className="py-50 px-4 relative bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-destructive/80 flex flex-col justify-center items-center space-y-10 p-4">
          <h1 className="text-3xl font-black text-center text-white uppercase">
            {pageData.slogan}
          </h1>
          <div className="flex flex-wrap items-stretch space-y-3 lg:space-y-0 lg:space-x-3 bg-muted/30 rounded-md p-4">
            <input
              placeholder="Nhập dự án bạn quan tâm"
              className="border h-10 md:h-14 px-5 bg-white rounded-md w-full md:w-[500px]"
            />
            <Button className="h-10 md:h-full md:w-auto px-10">Tìm kiếm</Button>
          </div>
        </div>
      </div>
      <div className="w-[90vw] md:w-[80vw] mx-auto space-y-10">
        {/* Dịch vụ */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="tracking-tight font-semibold text-2xl">
              Dịch vụ của chúng tôi
            </h2>
            <p>
              Trần Thủy Land bất động sản cung cấp dịch vụ Bất động sản Uy Tín,
              Gia Tăng Giá Trị Tài Chính cho bạn.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-4">
            {pageData.services.map((service) => (
              <div
                key={service.title}
                className="col-span-12 md:col-span-6 lg:col-span-4 border-3 rounded-md flex flex-col justify-center items-center text-center p-10 space-y-8 duration-150 hover:border-destructive hover:cursor-pointer hover:bg-destructive/5"
              >
                <Image
                  width={200}
                  height={200}
                  src={service.image}
                  alt={service.title}
                  className="size-18 object-contain"
                />
                <span className="font-semibold text-2xl">{service.title}</span>
                <div className="text-destructive font-semibold">
                  Tìm hiểu thêm
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* BĐS theo thành phố */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <HomeLocation data={pageData.locations[0]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <HomeLocation data={pageData.locations[1]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <HomeLocation data={pageData.locations[2]} />
          </div>
          <div className="col-span-12 md:col-span-4">
            <HomeLocation data={pageData.locations[3]} />
          </div>
        </div>
        {/* Nổi bật */}
        <div className="space-y-4">
          <h2 className="text-center tracking-tight text-2xl font-semibold">
            Bất động sản nổi bật
          </h2>
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
          <div className="flex justify-center">
            <Button asChild variant="link" className="text-destructive">
              <Link href="/san-pham">Xem tất cả</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
