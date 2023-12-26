import Layout from "../components/Layout";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { FormEvent, useEffect, useState } from "react";
import useProductStore from "../store/productStore";
import { ResponseDialog } from "../components/ResponseDialog";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { DetailDialog } from "../components/DetailDialog";
import { Product } from "../interfaces/product";

export default function Index() {
  const productState = useProductStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [productId, setProductId] = useState("");
  //   const [productDetail, setProductDetail] = useState({
  //     name: "",
  //     category: "",
  //     price: "",
  //     quantity: "",
  //   });

  useEffect(() => {
    productState.getAllProducts();
  }, []);
  const saveProduct = async (
    e: FormEvent<HTMLFormElement>,
    formData: Product
  ) => {
    e.preventDefault();
    await productState.saveProduct(formData);
    setOpenDialog(true);
    await productState.getAllProducts();
  };
  const closeDialog = () => {
    setOpenDialog(false);
    setIsConfirm(false);
    setIsDetail(false);
  };
  const deleteProduct = (id: string) => {
    console.log("Product Id:", id);
    setProductId(id);
    setIsConfirm(!isConfirm);
    setOpenDialog(!openDialog);
  };
  const selectDetail = async (id: string) => {
    await productState.getProduct(id);
    setIsDetail(true);
    // setProductDetail((prev) => ({
    //   ...prev,
    //   name: productState.product.name,
    //   category: productState.product.category,
    //   price: productState.product.price,
    //   quantity: productState.product.quantity,
    // }));
  };
  const handleUpdate = async (product: Product, id: string) => {
    console.log("Updated Product:", product);
    await productState.updateProduct(product, id);
    closeDialog();
    setOpenDialog(true);
    await productState.getAllProducts();
  };
  const handleDelete = async () => {
    await productState.deleteProduct(productId);
    setIsConfirm(false);
    setOpenDialog(true);
    await productState.getAllProducts();
  };
  return (
    <Layout>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <Grid item md={6}>
          {productState.loading && !productState.error ? (
            <Box sx={{ width: "80%" }}>
              <LinearProgress color="info" />
            </Box>
          ) : !productState.loading &&
            !productState.error &&
            productState.products.length > 0 ? (
            <ProductList
              products={productState.products}
              onDelete={deleteProduct}
              onSelectProduct={selectDetail}
            />
          ) : productState.products.length === 0 ? (
            <Box sx={{ width: "80%", textAlign: "center", m: "auto" }}>
              <Typography variant="h5" color={"indigo"}>
                No hay productos registrados
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "80%" }}>
              <Typography variant="h5" color={"red"}>
                {productState.error}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item md={6}>
          <ProductForm onSave={saveProduct} />
        </Grid>
        <ResponseDialog
          error={productState.error}
          title={
            productState.error
              ? "Error al realizar la operacion"
              : "Operacion realizada con exito"
          }
          message={
            productState.error ? productState.error : productState.success
          }
          open={openDialog}
          isConfirm={isConfirm}
          handleClose={closeDialog}
          handleDelete={handleDelete}
        />
        <ConfirmDialog
          open={isConfirm}
          handleClose={closeDialog}
          handleDelete={handleDelete}
        />
        {productState.product && (
          <DetailDialog
            open={isDetail}
            handleClose={closeDialog}
            product={productState.product}
            handleUpdate={handleUpdate}
          />
        )}
      </Grid>
    </Layout>
  );
}
