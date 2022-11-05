export interface ItemData {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  created_by: string;
  updatedAt: Date;
  updated_by: string;
  isActive: boolean;
}

export interface IAddItemData {
  title: string;
  description: string;
}

export interface IUpdateItemData {
  title?: string;
  description?: string;
  status?: string;
  isActive?: boolean;
}
