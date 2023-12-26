import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

type ConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};
export const ConfirmDialog = ({
  open,
  handleClose,
  handleDelete,
}: ConfirmDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Eliminar Producto</DialogTitle>
      <DialogContent>
        <DialogContentText color={"red"}>
          Esta seguro de eliminar el producto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleDelete()} autoFocus>
          Si
        </Button>
        <Button onClick={handleClose} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
