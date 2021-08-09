import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Link,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./styles";
import Alert from "@material-ui/lab/Alert";
import { Link as goBackCart } from "react-router-dom";
import {
  updateCartItems,
  removeCartItems,
  removeAllCartItems,
} from "../../actions/cartAction";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
const Cart = () => {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const [cartItems, setCartItems] = useState(cartItemsOld);
  const navBar = ["1. Cart", "2. Detail", "3. Payment", "4. Review"];
  const [countButton, setCountButton] = useState(0);
  const [reload, setReload] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [removeItem, setRemoveItem] = useState(null);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const dispatch = useDispatch();

  // DIALOG
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYesButton = () => {
    // if(removeItem === "all"){
    //   dispatch(removeAllCartItems);
    // }
    removeItem?.name
      ? dispatch(removeCartItems(removeItem))
      : dispatch(removeAllCartItems());
    handleClose();
  };

  function AlertDialogSlide() {
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Do you want to delete ${
              removeItem?.name ? removeItem.name : "all"
            }?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">
              No
            </Button>
            <Button
              onClick={handleYesButton}
              variant="contained"
              style={{ backgroundColor: "#f73471", color: "white" }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  // END DIALOG

  if (cartItems.length === 0) {
    return (
      <Box mt={3} m={3}>
        <Alert severity="error">
          Your Cart is Empty!{" "}
          <Link component={goBackCart} to="/">
            Go back the product
          </Link>
        </Alert>
      </Box>
    );
  } else {
    return (
      <Box mt={3}>
        {console.log("Return")}
        {/* DIALOG */}
        <AlertDialogSlide></AlertDialogSlide>;{/* DIALOG */}
        {/* ALERT QUANTITY ) */}
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="warning">
            Quantity is not equal 0
          </Alert>
        </Snackbar>
        {/* END ALERT QUANTITY ) */}
        <Grid container>
          <Grid item sm={12} md={8}>
            <Box
              display="flex"
              mb={5}
              alignItems="center"
              justifyContent="center"
            >
              {navBar.map((name, index) => (
                <>
                  <Button
                    variant="contained"
                    className={
                      index === 3
                        ? classes.disabledButton
                        : countButton >= index
                        ? classes.buttonNavActive
                        : classes.buttonNav
                    }
                    size="small"
                    onClick={() => {
                      index < 3 && setCountButton(index);
                    }}
                  >
                    {name}
                  </Button>
                  {index < 3 && (
                    <Box
                      className={
                        countButton > index ? classes.lineActive : classes.line
                      }
                    ></Box>
                  )}
                </>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box ml={6} mr={6}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={9}>
              <Box marginBottom={3}>
                <Paper elevation={3}>
                  <Box>
                    <Grid container alignItems="center">
                      <Grid item xs="2"></Grid>
                      <Grid item xs="2" container justifyContent="center">
                        <Grid item>
                          <Typography
                            variant="h6"
                            style={{ color: "deepPink" }}
                          >
                            Name
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs="2" container justifyContent="center">
                        <Grid item mx="auto">
                          <Typography
                            variant="h6"
                            style={{ color: "deepPink" }}
                          >
                            Unit Price
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs="3" container justifyContent="center">
                        <Grid item mx="auto">
                          <Typography
                            variant="h6"
                            style={{ color: "deepPink" }}
                          >
                            Quantity
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs="2" container justifyContent="center">
                        <Grid item mx="auto">
                          <Typography
                            variant="h6"
                            style={{ color: "deepPink" }}
                          >
                            Total Price
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs="1" container justifyContent="center">
                        <Grid item mx="auto">
                          <Tooltip title="Remove all items">
                            <IconButton
                              aria-label="delete"
                              // onClick={() => dispatch(removeAllCartItems())}
                              onClick={() => {
                                handleClickOpen();
                                setRemoveItem("all");
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
              {/* LIST ALL ITEMS IN CART */}
              {cartItems.map((item) => (
                <Box marginBottom={3}>
                  <Paper elevation={3}>
                    <Box p={2}>
                      <Grid container alignItems="center">
                        <Grid item xs="2">
                          <img
                            src={item.image}
                            alt="hihi"
                            width="150px"
                            height="150px"
                          ></img>
                        </Grid>
                        <Grid item xs="2" container justifyContent="center">
                          <Grid item>
                            <Typography variant="h5">{item.name}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs="2" container justifyContent="center">
                          <Grid item mx="auto">
                            <Typography variant="h5">${item.price}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs="3" container justifyContent="center">
                          <Grid item mx="auto">
                            <ButtonGroup>
                              <Button
                                onClick={(e) => {
                                  if (item.qty > 1) {
                                    dispatch(
                                      updateCartItems(item, +item.qty - 1)
                                    );
                                  }
                                }}
                                style={{
                                  border: "1px solid pink",
                                  fontSize: "20px",
                                }}
                              >
                                -
                              </Button>
                              <input
                                className={classes.input}
                                type="number"
                                name="qty"
                                min="0"
                                value={item.qty}
                                onBlur={(e) => {
                                  if (+e.target.value === 0) {
                                    dispatch(updateCartItems(item, 1));
                                    setOpenAlert(true);
                                  } else {
                                    dispatch(
                                      updateCartItems(item, e.target.value)
                                    );
                                  }
                                }}
                                onChange={(e) => {
                                  dispatch(
                                    updateCartItems(item, e.target.value)
                                  );
                                }}
                                style={{
                                  width: "40px",
                                  border: "1px solid pink",
                                  fontSize: "20px",

                                  textAlign: "center",
                                }}
                              ></input>
                              <Button
                                onClick={(e) =>
                                  dispatch(updateCartItems(item, +item.qty + 1))
                                }
                                style={{
                                  border: "1px solid pink",
                                  fontSize: "20px",
                                }}
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                        <Grid item xs="2" container justifyContent="center">
                          <Grid item mx="auto">
                            <Typography variant="h5">
                              ${item.price * item.qty}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs="1" container justifyContent="center">
                          <Grid item mx="auto">
                            <IconButton
                              onClick={() => {
                                setRemoveItem(item);
                                handleClickOpen();
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Grid>

            {/* RIGHT SIDE TOTAL PRICE */}
            <Grid item xs={12} sm={3}>
              <Paper>
                <Box p={2}>
                  <Grid container>
                    <Grid item xs="6" container justifyContent="flex-start">
                      <Grid item>
                        <Typography variant="h5">Total</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs="6" container justifyContent="flex-end">
                      <Grid item>
                        <Typography variant="h5">
                          $
                          {cartItems
                            .map((item) => +item.price * +item.qty)
                            .reduce((a, b) => a + b)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box my={2}>
                    <Divider variant="middle"></Divider>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                  >
                    CHECK OUT
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* END RIGHT SIDE */}
          </Grid>
        </Box>
      </Box>
    );
  }
};

export default Cart;
