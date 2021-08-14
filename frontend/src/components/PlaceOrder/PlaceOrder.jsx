import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link as changeURL, useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CartNav from "../CartNav/CartNav";

import { savePaymentMethod } from "../../actions/cartAction";
import { createOrder } from "../../actions/orderAction";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
const PlaceOrder = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    history.push("/signin");
  }
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [value, setValue] = useState("COD");
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  const subTotal =
    cartItems.length !== 0
      ? cartItems.map((item) => +item.price * +item.qty).reduce((a, b) => a + b)
      : 0;
  cart.itemsPrice = subTotal;
  const tax = (subTotal * 10) / 100;
  cart.taxPrice = +tax;
  cart.shippingPrice = 0;
  const total = tax + subTotal;
  cart.totalPrice = +total;
  if (cartItems.length === 0) {
  }
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const { paymentMethod } = useSelector((state) => state.cart);

  // handle CREATE ORDER
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );

  const handleOnContinue = () => {
    //console.log(cart);
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);

  // end handle create order
  return (
    <Box mt={5.5}>
      <CartNav current={4} />
      <Box ml={6} mr={6}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={9}>
            <Box marginBottom={3}>
              <Paper elevation={3} style={{ padding: "50px" }}>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "10px", color: "#f73471" }}
                >
                  SHIPPING
                </Typography>
                <Typography variant="h6">
                  Address: {shippingAddress.address}, {shippingAddress.ward},{" "}
                  {shippingAddress.district}, {shippingAddress.country},{" "}
                  {shippingAddress.city} city.
                </Typography>
              </Paper>
            </Box>
            <Box marginBottom={3}>
              <Paper elevation={3} style={{ padding: "50px" }}>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "5px", color: "#f73471" }}
                >
                  PAYMENT
                </Typography>
                <Typography variant="h6">Method: {paymentMethod}.</Typography>
              </Paper>
            </Box>
            <Box marginBottom={3}>
              <Paper elevation={3} style={{ padding: "50px" }}>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "5px", color: "#f73471" }}
                >
                  Order Items
                </Typography>
                {cartItems.map((item) => (
                  <Grid container>
                    <Grid item md={3}>
                      <img
                        src={item.image}
                        alt="hihi"
                        width="150px"
                        height="150px"
                      ></img>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="h5">{item.name}</Typography>
                    </Grid>
                    <Grid item md={5}>
                      <Typography variant="h5">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box p={2}>
                <Grid container>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h6">Subtotal:</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h6">${subTotal}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h6">Tax:</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h6">${tax}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h6">Shipping:</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h6">free</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Divider variant="middle"></Divider>
                </Box>
                <Grid container>
                  <Grid item xs="12" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">${total}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Button
                    component={changeURL}
                    to="/payment"
                    variant="outlined"
                    color="secondary"
                  >
                    Back To Shipping
                  </Button>
                  <Button
                    onClick={handleOnContinue}
                    variant="contained"
                    color="secondary"
                  >
                    Place Order
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* END RIGHT SIDE */}
        </Grid>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
