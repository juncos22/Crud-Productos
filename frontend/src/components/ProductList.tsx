import { Grid, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { Product } from "../interfaces/product";

type ProductListProps = {
  products: Product[];
  onDelete: (id: string) => void;
  onSelectProduct: (id: string) => void;
};
export const ProductList = ({
  products,
  onDelete,
  onSelectProduct,
}: ProductListProps) => {
  return (
    <div>
      <Typography variant={"h5"} sx={{ my: 2 }} color={"text.secondary"}>
        Lista de productos
      </Typography>
      <Grid
        container
        alignItems={"center"}
        spacing={2}
        display={"flex"}
        direction={"row"}
        flexWrap={"wrap"}
      >
        {products.map((p, i) => (
          <Grid key={i} item md={6}>
            <ProductCard
              id={p.id!}
              name={p.name}
              category={p.category?.type!}
              price={p.price}
              onDelete={onDelete}
              onSelectProduct={onSelectProduct}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
