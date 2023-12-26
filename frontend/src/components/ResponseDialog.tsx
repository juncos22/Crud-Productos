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

type ResponseDialogProps = {
  error: string;
  title: string;
  message: string;
  open: boolean;
  isConfirm: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};
export const ResponseDialog = ({
  error,
  title,
  message,
  open,
  isConfirm,
  handleClose,
  handleDelete,
}: ResponseDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText color={error ? "red" : "green"}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isConfirm && (
          <Button onClick={handleDelete} autoFocus>
            Si
          </Button>
        )}
        <Button onClick={handleClose} autoFocus>
          {isConfirm ? "Cancelar" : "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
