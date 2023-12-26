export interface Category {
  id?: string;
  type: string;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  categoryId: string;
  category?: Category;
}
