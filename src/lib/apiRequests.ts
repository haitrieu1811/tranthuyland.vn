import http from "@/lib/http";
import { City } from "@/types/cities.types";
import { Post } from "@/types/posts.types";
import { Product } from "@/types/products.types";
import {
  HomePage,
  Info,
  Logo,
  Navigation,
  StickyBanner,
} from "@/types/single.types";

type Filter = [string, string, string | null];

const apiRequests = {
  async info() {
    const data = await http.get<Info>("/info?populate=socials.image");
    return data?.data;
  },

  async navigation() {
    const data = await http.get<Navigation>("/navigation?populate=*");
    return data?.data;
  },

  async homePage() {
    const data = await http.get<HomePage>(
      "/home-page?populate=hero.slogans&populate=hero.image&populate=service.services.image"
    );
    return data?.data;
  },

  async stickyBanner() {
    const data = await http.get<StickyBanner>("/sticky-banner");
    return data?.data;
  },

  async logo() {
    const data = await http.get<Logo>(
      "/logo?populate=lightLogo.image&populate=darkLogo.image"
    );
    return data?.data;
  },

  async cities() {
    const data = await http.get<City[]>("/cities?populate=*&sort[0]=order:asc");
    return data;
  },

  async products({ limit, filters }: { limit?: number; filters?: Filter[] }) {
    let queryString = "";
    if (limit) queryString += `&pagination[limit]=${limit}`;
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter[2]) {
          queryString += `&filters[${filter[0]}][${filter[1]}]=${filter[2]}`;
        }
      });
    }
    const data = await http.get<Product[]>(
      `/products?populate=city&populate=thumbnail${queryString}`
    );
    return data;
  },

  async product(documentID: string) {
    const data = await http.get<Product>(`/products/${documentID}?populate=*`);
    return data?.data;
  },

  async posts({ limit, filters }: { limit?: number; filters?: Filter[] }) {
    let queryString = "";
    if (limit) queryString += `&pagination[limit]=${limit}`;
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter[2]) {
          queryString += `&filters[${filter[0]}][${filter[1]}]=${filter[2]}`;
        }
      });
    }
    const data = await http.get<Post[]>(`/posts?populate=*${queryString}`);
    return data;
  },

  async post(documentID: string) {
    const data = await http.get<Post>(`/posts/${documentID}?populate=*`);
    return data?.data;
  },
};

export default apiRequests;
