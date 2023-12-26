import { create } from "zustand";
import { Category } from "../interfaces/product";
import api from "../config/axios";
import { AxiosResponse } from "axios";

interface CategoryState {
  categories: Category[];
  error: string;
  getCategories: () => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  error: "",
  getCategories: async () => {
    try {
      const res = await api.get<AxiosResponse<Category[]>>("/categories");
      set({ categories: res.data.data });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));

export default useCategoryStore;
