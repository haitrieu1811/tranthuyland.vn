export type StrapiMedia = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type SuccessResponse<Data> = {
  data: Data;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
