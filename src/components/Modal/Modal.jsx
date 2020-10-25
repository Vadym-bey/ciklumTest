import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useSelector, useDispatch } from "react-redux";
import { closenModal, restoreCurrentArticle } from "../../redux/actions/articlesActions";

const Modal = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector(state => state.articles);
  const { openDialog } = dialogState;

  const handleCloseDialog = () => {
    dispatch(restoreCurrentArticle());
    dispatch(closenModal());
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to restore this article ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
