export interface Order {
  id: number;
  displayId: string;
  status: string;
  tel?: string;
  email?: string;
  name?: string;
  address: string;
  details: string;
  category: string;
  product: string;
  files?: UploadFile[];
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadFile {
  name: string;
  base64: string;
  totalPage: number | null;
}
