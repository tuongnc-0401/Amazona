import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Link as changeURL, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../../actions/orderAction";
import { Alert } from "@material-ui/lab";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [id, dispatch]);
  console.log(order);
  return loading ? (
    <CircularProgress></CircularProgress>
  ) : error ? (
    <Alert severity="error">addsf</Alert>
  ) : (
    <Box mt={5.5}>
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
                  Address: {order.shippingAddress.address},{" "}
                  {order.shippingAddress.ward}, {order.shippingAddress.district}
                  , {order.shippingAddress.country},{" "}
                  {order.shippingAddress.city} city.
                </Typography>
                <Box mt={2}>
                  {order.isDelivered ? (
                    <Alert severity="success">
                      Delivered {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert severity="info">Not Delivered</Alert>
                  )}
                </Box>
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
                <Typography variant="h6">
                  Method: {order.paymentMethod}.
                </Typography>
                <Box mt={2}>
                  {order.isPaid ? (
                    <Alert severity="success">Paid {order.paidAt}</Alert>
                  ) : (
                    <Alert severity="info">Not Paid</Alert>
                  )}
                </Box>
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
                {order.orderItems.map((item) => (
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
                      <Typography variant="h6">${order.itemsPrice}</Typography>
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
                      <Typography variant="h6">${order.taxPrice}</Typography>
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
                      <Typography variant="h5">${order.totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Button
                    component={changeURL}
                    to={"/orderhistory"}
                    variant="contained"
                    color="secondary"
                  >
                    Back to Order history
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

export default OrderDetails;
