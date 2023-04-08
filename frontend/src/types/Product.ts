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
