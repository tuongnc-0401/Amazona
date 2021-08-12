import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CartNav from "../CartNav/CartNav";
import { Link as LinkReact, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartAction";
import Alert from "@material-ui/lab/Alert";

const Shipping = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [dataForm, setDataForm] = useState(shippingAddress);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { cartItems } = useSelector((state) => state.cart);
  if (!userInfo) {
    history.push("/signin");
  }

  if (cartItems.length === 0) {
    history.push("/cart");
  }
  const subTotal =
    cartItems.length !== 0
      ? cartItems.map((item) => +item.price * +item.qty).reduce((a, b) => a + b)
      : 0;
  const tax = (subTotal * 10) / 100;
  const totalPrice = tax + subTotal;
  const handleDataForm = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  // Check ERROR FORM
  const [errorForm, setErrorForm] = useState({});
  const handleValidation = () => {
    let error = {};
    let formIsValid = true;
    // check Name
    if (!dataForm.name) {
      formIsValid = false;
      error.name = "Name cannot be empty";
    } else {
      if (!dataForm.name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        error.name = "Only letter";
      }
    }

    // check Phone number
    if (!dataForm.phone) {
      formIsValid = false;
      error.phone = "Phone cannot be empty";
    } else {
      if (!dataForm.phone.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        error.phone = "Phone number is invalid";
      }
    }

    // check Email
    if (!dataForm.email) {
      formIsValid = false;
      error.email = "Email cannot be empty";
    } else {
      let lastAtPos = dataForm.email.lastIndexOf("@");
      let lastDotPos = dataForm.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          dataForm.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          dataForm.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        error.email = "Email is not valid";
      }
    }
    // check address
    if (!dataForm.address) {
      formIsValid = false;
      error.address = "Address cannot be empty";
    }

    if (!dataForm.ward) {
      formIsValid = false;
      error.ward = "Ward cannot be empty";
    }

    if (!dataForm.district) {
      formIsValid = false;
      error.district = "District cannot be empty";
    }

    if (!dataForm.country) {
      formIsValid = false;
      error.country = "Country cannot be empty";
    }

    if (!dataForm.city) {
      formIsValid = false;
      error.city = "City cannot be empty";
    }

    setErrorForm(error);
    return formIsValid;
  };
  // END CHECK ERROR FROM

  const handleSubmit = () => {
    if (handleValidation()) {
      dispatch(saveShippingAddress(dataForm));
      history.push("/payment");
    }
  };

  return (
    <Box mt={5.5}>
      <CartNav current={2} />
      <Box ml={6} mr={6}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={9}>
            <Box marginBottom={3}>
              <Paper elevation={3}>
                <Box p={3}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Typography
                        variant="h4"
                        style={{ color: "#f73471" }}
                        gutterBottom
                      >
                        Shipping details
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoFocus
                        value={dataForm.name}
                        onChange={handleDataForm}
                      />
                      {errorForm?.name && (
                        <Alert severity="warning">{errorForm.name}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Phone number"
                        fullWidth
                        value={dataForm.phone}
                        onChange={handleDataForm}
                      />
                      {errorForm?.phone && (
                        <Alert severity="warning">{errorForm.phone}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="email"
                        fullWidth
                        value={dataForm.email}
                        onChange={handleDataForm}
                      />
                      {errorForm?.email && (
                        <Alert severity="warning">{errorForm.email}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        value={dataForm.address}
                        onChange={handleDataForm}
                      />
                      {errorForm?.address && (
                        <Alert severity="warning">{errorForm.address}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="ward"
                        name="ward"
                        label="Ward"
                        fullWidth
                        value={dataForm.ward}
                        onChange={handleDataForm}
                      />
                      {errorForm?.ward && (
                        <Alert severity="warning">{errorForm.ward}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="district"
                        name="district"
                        label="District"
                        fullWidth
                        value={dataForm.district}
                        onChange={handleDataForm}
                      />
                      {errorForm?.district && (
                        <Alert severity="warning">{errorForm.district}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={dataForm.city}
                        onChange={handleDataForm}
                      />
                      {errorForm?.city && (
                        <Alert severity="warning">{errorForm.city}</Alert>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        value={dataForm.country}
                        onChange={handleDataForm}
                      />
                      {errorForm?.country && (
                        <Alert severity="warning">{errorForm.country}</Alert>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} sm={3}>
            <Paper>
              <Box p={2}>
                <Grid container>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h5">SubTotal</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">$ {subTotal}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "5px" }}>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h5">Tax</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">$ {tax}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: "5px" }}>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h5">Shipping</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">Freeship</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Divider variant="middle"></Divider>
                </Box>
                <Grid container style={{ marginTop: "5px" }}>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h5">Total</Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">$ {totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container style={{ marginTop: "10px" }}>
                  <Grid item xs="6" container justifyContent="center">
                    <Grid item>
                      <Button
                        component={LinkReact}
                        to="/cart"
                        variant="outlined"
                        color="secondary"
                        style={{ width: "100%" }}
                      >
                        Back to cart
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="center">
                    <Grid item>
                      <Button
                        //   component={LinkReact}
                        //   to="/signin?redirect=shipping"
                        variant="contained"
                        color="secondary"
                        style={{ width: "100%" }}
                        onClick={handleSubmit}
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* END RIGHT SIDE */}
      </Box>
    </Box>
  );
};

export default Shipping;
