import { BlocksContent } from "@strapi/blocks-react-renderer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatMoneyToWords = (amount: number): string => {
  if (amount === 0) return "0";

  const ty = Math.floor(amount / 1_000_000_000);
  const million = Math.floor((amount % 1_000_000_000) / 1_000_000);
  const thousand = Math.floor((amount % 1_000_000) / 1_000);

  let result = "";

  if (ty > 0) {
    result += ty + " tỷ";
    if (million > 0) result += " " + million + " triệu";
    else if (thousand > 0) result += " " + thousand + " nghìn";
  } else if (million > 0) {
    result += million + " triệu";
    if (thousand > 0) result += " " + thousand + " nghìn";
  } else if (thousand > 0) {
    result += thousand + " nghìn";
  } else {
    result = amount.toString();
  }

  return result.trim();
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
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const getFullMediaURL = (url: string) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_BASE_URL}${url}`;
};

export const getPlainTextFromBlocksContent = (blocksContent: BlocksContent) => {
  let result = "";
  const paragraphs = blocksContent?.filter(
    (block) => block.type === "paragraph"
  );
  paragraphs?.forEach((block) => {
    result +=
      block.children[0].type === "text" ? block.children[0].text + "\n" : "";
  });
  return result;
};
