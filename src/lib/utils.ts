import { BlocksContent } from "@strapi/blocks-react-renderer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
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
