import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SearchField } from "./SearchField";
import useProductStore from "../store/productStore";

export const Navbar = () => {
  const productState = useProductStore();
  const handleSearch = async (param: string) => {
    if (param) {
      await productState.findProduct(param);
    } else {
      await productState.getAllProducts();
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD de Productos
          </Typography>
          <Box sx={{ ml: "auto", width: "25%", mr: "5%" }}>
            <SearchField onSearch={handleSearch} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
