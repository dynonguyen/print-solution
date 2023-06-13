export interface ProductInfo {
  label: string;
  value: string;
}

export interface ProductOption {
  optionType: string;
  label: string;
  values?: string[];
}

export interface Product {
  _id: string;
  uuid: string;
  categoryId: string;
  name: string;
  photo: string;
  price: number;
  unit: string;
  infos?: ProductInfo[];
  options?: ProductOption[];
  htmlDesc?: string;
  numOfViews?: number;
  numOfFavorites?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  __typename?: "Product" | undefined;
  _id: string;
  uuid: string;
  photo: string;
  name: string;
  price: number;
  unit: string;
  isHidden: boolean;
  category?: {
    __typename?: "Category" | undefined;
    name: string;
  } | null | undefined;
}

export const CUSTOM_PRODUCT: IProduct = {
  _id: 'custom',
  uuid: "custom",
  category: {
    name: 'custom'
  },
  name: 'In ấn thông thường',
  photo: 'public/product/documents.webp',
  price: 0,
  unit: 'tờ',
  isHidden: false
  // infos: [{ label: 'In trắng đen', value: 'normal' }, { label: 'In màu', value: 'colors' }],
  // createdAt: new Date(1686476744),
  // updatedAt: new Date(1686476744)
}
