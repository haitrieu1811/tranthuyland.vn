import { normalizePath } from "@/lib/utils";
import { SuccessResponse } from "@/types/utils.types";

const http = {
  async get<Response>(url: string, options?: RequestInit) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/${normalizePath(url)}`,
      {
        cache: "no-cache",
        ...options,
      }
    );
    if (res.ok) {
      const data: SuccessResponse<Response> = await res.json();
      return data;
    }
  },

  async post(url: string, body: object, options?: RequestInit) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/${normalizePath(url)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        ...options,
      }
    );
    return res;
  },
};

export default http;
