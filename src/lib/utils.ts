/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { defineOneEntry } from "oneentry";
import { twMerge } from "tailwind-merge";

import { ProductItem } from "@/types/products.types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getOneEntry = () => {
  return defineOneEntry(process.env.ONEENTRY_DOMAIN as string, {
    token: process.env.ONEENTRY_TOKEN,
  });
};

export const formatProduct = (product: any): ProductItem => {
  return {
    id: product.id,
    title: product.attributeValues.title.value,
    thumbnail: product.attributeValues.thumbnail.value.downloadLink,
    photos: product.attributeValues.photos.value?.map(
      (item: { downloadLink: any }) => item.downloadLink
    ),
    price: product.attributeValues.price.value,
    acreage: product.attributeValues.acreage.value,
    address: product.attributeValues.address.value,
    totalBedrooms: product.attributeValues.totalbedrooms.value,
    totalToilets: product.attributeValues.totaltoilets.value,
    description: product.attributeValues.description.value[0]?.htmlValue ?? "",
  };
};

export const formatMenu = (
  menu: any
): {
  url: string;
  title: string;
} => {
  return {
    url: menu.pageUrl === "home" ? "/" : "/" + menu.pageUrl,
    title: menu.localizeInfos.menuTitle,
  };
};

export const formatInfo = (
  info: any
): {
  phoneNumber: string;
  email: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  zalo: string;
  projectName: string;
  logo: string;
} => {
  return {
    projectName: info.attributeValues["project-name"].value,
    phoneNumber: info.attributeValues["phone-number"].value,
    email: info.attributeValues.email.value,
    facebook: info.attributeValues.facebook.value,
    tiktok: info.attributeValues.tiktok.value,
    youtube: info.attributeValues.youtube.value,
    zalo: info.attributeValues.zalo.value,
    logo: info.attributeValues.logo.value[0]?.downloadLink,
  };
};

export const formatLargeNumber = (value: number): string => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Giá trị đầu vào phải là một số hợp lệ");
  }

  const absValue = Math.abs(value);

  if (absValue >= 1000000000000) {
    // Nghìn tỷ
    const trillionValue = value / 1000000000000;
    const formatter = new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(trillionValue)} nghìn tỷ`;
  } else if (absValue >= 1000000000) {
    // Tỷ
    const billionValue = value / 1000000000;
    const formatter = new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(billionValue)} tỷ`;
  } else if (absValue >= 1000000) {
    // Triệu
    const millionValue = value / 1000000;
    const formatter = new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(millionValue)} triệu`;
  } else {
    // Dưới triệu - giữ nguyên định dạng
    const formatter = new Intl.NumberFormat("vi-VN");
    return formatter.format(value);
  }
};

const removeSpecialCharacter = (text: string): string => {
  text = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  text = text.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return text;
};

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return (
    "/san-pham/" + removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`
  );
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};
