import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  category: string;
  onDelete: (id: string) => void;
  onSelectProduct: (id: string) => void;
};
export const ProductCard = ({
  id,
  name,
  price,
  category,
  onDelete,
  onSelectProduct,
}: ProductCardProps) => {
  return (
    <Card variant={"elevation"} color={"4e342e"} sx={{ width: "100%" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"/thumbnail.png"}
        title={"product"}
      />
      <CardContent>
        <Typography variant={"h5"} gutterBottom>
          {name}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          {category}
        </Typography>
        <Typography variant={"body1"} gutterBottom>
          ${price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ width: 120 }}
          size="small"
          variant="outlined"
          onClick={() => onSelectProduct(id)}
        >
          Detalles
        </Button>
        <Button
          sx={{ width: 120 }}
          size="small"
          variant="outlined"
          color="warning"
          onClick={() => onDelete(id)}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};
