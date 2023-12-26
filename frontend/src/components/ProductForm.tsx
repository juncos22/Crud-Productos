import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import useCategoryStore from "../store/categoryStore";

type ProductFormProps = {
  onSave: (e: FormEvent<HTMLFormElement>, product: Product) => {};
};
export const ProductForm = ({ onSave }: ProductFormProps) => {
  const categoryState = useCategoryStore();
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    categoryId: "",
    quantity: 0,
  });
  const validateForm = () => {
    return (
      formData.name &&
      formData.categoryId &&
      formData.price > 0 &&
      formData.quantity > 0
    );
  };
  useEffect(() => {
    categoryState.getCategories();
  }, []);

  return (
    <Box
      component={"form"}
      sx={{
        mx: 2,
        py: 2,
        px: 3,
        width: "60%",
        bgcolor: "#4CAF50",
        opacity: 0.9,
        borderRadius: 3,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSave(e, formData);
        setFormData({ name: "", categoryId: "", price: 0, quantity: 0 });
      }}
    >
      <TextField
        sx={{ m: 1 }}
        fullWidth
        label="Nombre"
        variant="outlined"
        name="name"
        color={formData.name ? "success" : "error"}
        value={formData.name}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.categoryId}
          label="Categoria"
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              categoryId: e.target.value,
            }));
          }}
        >
          {categoryState.categories.map((c) => (
            <MenuItem key={c.id!} value={c.id!}>
              {c.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{ m: 1 }}
        fullWidth
        label="Precio"
        variant="outlined"
        name="price"
        value={formData.price}
        color={formData.price > 0 ? "success" : "error"}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: Number(e.target.value),
          }))
        }
        type="number"
      />
      <TextField
        sx={{ m: 1 }}
        fullWidth
        label="Cantidad"
        variant="outlined"
        name="quantity"
        value={formData.quantity}
        color={formData.quantity > 0 ? "success" : "error"}
        onChange={(e) =>
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: Number(e.target.value),
          }))
        }
        type="number"
      />
      <Button
        variant="contained"
        color="info"
        fullWidth
        type="submit"
        disabled={!validateForm()}
      >
        Guardar Producto
      </Button>
    </Box>
  );
};
