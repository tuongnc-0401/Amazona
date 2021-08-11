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
import { Link as LinkReact } from "react-router-dom";

const Shipping = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    country: "",
  });
  const handleDataForm = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(dataForm);
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
                      <Typography variant="h5">$ 1.000</Typography>
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
                      <Typography variant="h5">$ 1.000</Typography>
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
                      <Typography variant="h5">$ 1.000</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: "5px" }}>
                  <Grid item xs="6" container justifyContent="flex-start">
                    <Grid item>
                      <Typography variant="h5">Total</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs="6" container justifyContent="flex-end">
                    <Grid item>
                      <Typography variant="h5">$ 1.000</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Divider variant="middle"></Divider>
                </Box>
                <Button
                  //   component={LinkReact}
                  //   to="/signin?redirect=shipping"
                  variant="contained"
                  color="secondary"
                  style={{ width: "100%" }}
                  onClick={handleSubmit}
                >
                  Process to payment
                </Button>
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
