import { create } from "zustand";
import api from "../config/axios";
import { Product } from "../interfaces/product";

interface ProductState {
  products: Product[];
  product: Product;
  error: string;
  success: string;
  loading: boolean;
  getAllProducts: () => void;
  getProduct: (id: string) => void;
  updateProduct: (product: Product, id: string) => void;
  deleteProduct: (id: string) => void;
  saveProduct: (product: Product) => void;
  findProduct: (param: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: {
    name: "",
    categoryId: "",
    category: { type: "" },
    price: 0,
    quantity: 0,
  },
  error: "",
  success: "",
  loading: false,
  getAllProducts: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/products");
      console.log(res.data);
      if (res.data.error) {
        set({ error: res.data.error });
      } else {
        set({ products: res.data.data });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
      });
    } finally {
      set({ loading: false });
    }
  },
  getProduct: async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      if (res.data.error) {
        set({ error: res.data.error });
      } else {
        set({ product: res.data.data });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  updateProduct: async (product, id) => {
    try {
      const res = await api.put(`/products/${id}`, product);
      if (!res.data.error) {
        set({ success: res.data.data });
      } else {
        set({ error: res.data.error });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
      });
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);
      if (!res.data.error) {
        set({ success: res.data.data });
      } else {
        set({ error: res.data.error });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
      });
    }
  },
  saveProduct: async (product) => {
    try {
      const res = await api.post("/products", product);
      if (!res.data.error) {
        set({ success: res.data.data });
      } else {
        set({ error: res.data.error });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
      });
    }
  },
  findProduct: async (param: string) => {
    try {
      set({ loading: true });
      const res = await api.get(`/products?param=${param}`);
      console.log(res.data);
      if (res.data.error) {
        set({ error: res.data.error });
      } else {
        set({ products: res.data.data });
      }
    } catch (error: any) {
      console.log(error);
      set({
        error: error.message,
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
