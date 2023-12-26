import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Product } from "../interfaces/product";
import useCategoryStore from "../store/categoryStore";

type DetailDialogProps = {
  product: Product;
  open: boolean;
  handleClose: () => void;
  handleUpdate: (product: Product, id: string) => void;
};

export const DetailDialog = ({
  product,
  open,
  handleClose,
  handleUpdate,
}: DetailDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: "",
  });
  const categoryState = useCategoryStore();
  const validateForm = () => {
    return (
      formData.name ||
      formData.categoryId ||
      formData.price > 0 ||
      formData.quantity > 0
    );
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Detalle del Producto: {product.name}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ m: 1 }}
          fullWidth
          label="NOMBRE"
          variant="outlined"
          name="name"
          color={formData.name ? "success" : "error"}
          value={formData.name ? formData.name : product.name}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }))
          }
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-label">CATEGORIA</InputLabel>
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
          label="PRECIO"
          variant="outlined"
          name="price"
          value={formData.price ? formData.price : product.price}
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
          label="CANTIDAD"
          variant="outlined"
          name="quantity"
          value={formData.quantity ? formData.quantity : product.quantity}
          color={formData.quantity > 0 ? "success" : "error"}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.name]: Number(e.target.value),
            }))
          }
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleUpdate(formData, product.id!);
            setFormData({ name: "", categoryId: "", price: 0, quantity: 0 });
          }}
          autoFocus
          disabled={!validateForm()}
        >
          Modificar
        </Button>
        <Button
          onClick={() => {
            setFormData({ name: "", categoryId: "", price: 0, quantity: 0 });
            handleClose();
          }}
          autoFocus
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
