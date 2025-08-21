import { PhoneNumberType } from "@/constants/enum";
import { StrapiMedia } from "@/types/utils.types";

export type Logo = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  lightLogo: {
    id: number;
    url: string;
    image: StrapiMedia;
  };
  darkLogo: {
    id: number;
    url: string;
    image: StrapiMedia;
  };
};

export type Slogan = {
  id: number;
  normalText: string;
  highlightText: string;
};

type HomePageHero = {
  id: number;
  slogans: Slogan[];
  image: StrapiMedia;
};

export type HomePage = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hero: HomePageHero;
  service: Service;
};

export type StickyBanner = {
  id: number;
  documentId: string;
  title: string;
  actionUrl: string;
  actionName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type NavigationLink = {
  id: number;
  name: string;
  slug: string;
};

export type Navigation = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  links: NavigationLink[];
};

export type ServiceItem = {
  id: number;
  name: string;
  slug: null | string;
  image: StrapiMedia;
};

export type Service = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string | null;
  services: ServiceItem[];
};

export type PhoneNumber = {
  id: number;
  phoneNumber: string;
  type: PhoneNumberType;
};

export type Social = {
  id: number;
  name: string;
  url: string;
  image: StrapiMedia;
};

export type Info = {
  id: number;
  documentId: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  email: string | null;
  socials: Social[];
  phoneNumbers: PhoneNumber[];
  hotline: string | null;
  zalo: string | null;
};
