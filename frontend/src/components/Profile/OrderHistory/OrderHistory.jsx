import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link as LinkReact } from "react-router-dom";

import { listOrderMine } from "../../../actions/orderAction";
import ProfileNav from "../ProfileNav";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./styles";
const OrderHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.orderMineList
  );

  useEffect(() => {
    dispatch(listOrderMine());
  }, []);
  return (
    <Box mt={5.5}>
      <Box ml={6} mr={6}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <ProfileNav current={3}></ProfileNav>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box marginBottom={3}>
              <Paper elevation={3} style={{ padding: "30px" }}>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "10px", color: "#f73471" }}
                >
                  Order History
                </Typography>
                {loading ? (
                  <CircularProgress></CircularProgress>
                ) : error ? (
                  <Alert style={{ marginTop: "10px" }} severity="error"></Alert>
                ) : (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">DATE</TableCell>
                          <TableCell align="right">TOTAL</TableCell>
                          <TableCell align="right">PAID</TableCell>
                          <TableCell align="right">DELIVERED</TableCell>
                          <TableCell align="right">ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell component="th" scope="order">
                              {order._id}
                            </TableCell>
                            <TableCell align="right">
                              {order.createdAt.substring(0, 10)}
                            </TableCell>
                            <TableCell align="right">
                              {order.totalPrice}
                            </TableCell>
                            <TableCell align="right">
                              {order.isPaid
                                ? order.paidAt.substring(0, 10)
                                : "No"}
                            </TableCell>
                            <TableCell align="right">
                              {order.isDelivered
                                ? order.deliveredAt.substring(0, 10)
                                : "No"}
                            </TableCell>

                            <TableCell align="right">
                              <Button
                                component={LinkReact}
                                to={`/order/${order._id}`}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderHistory;
