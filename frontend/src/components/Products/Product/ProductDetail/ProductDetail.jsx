import {
  Grid,
  Typography,
  Box,
  ButtonGroup,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles.js";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../../../actions/productAction.js";
import { useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { addToCart } from "../../../../actions/cartAction.js";
const ProductDetail = () => {
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product, qty));
    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);
  return (
    <div>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div>
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Added to Cart successfully!
            </Alert>
          </Snackbar>
          <h1>Product Details</h1>
          {console.log("id " + id)}
          {console.log(product)}
          <Grid container spacing={4}>
            <Grid item md={6} sm={12} container className={classes.root}>
              <img src={product.image}></img>
            </Grid>

            <Grid item md={6} sm={12} container>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                mb={2}
                alignItems="center"
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="h6" color="error">
                  ({product.numReviews} reviews)
                </Typography>
              </Box>
              <Typography variant="h4" color="error" gutterBottom>
                ${product.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {product.description}
              </Typography>
              <Box display="flex" flexDirection="row" alignItems="center">
                <ButtonGroup>
                  <Button
                    onClick={(e) => setQty(qty - 1)}
                    style={{
                      backgroundColor: "#e0e0e0",
                      border: "1px solid grey",
                    }}
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(+e.target.value)}
                    style={{
                      width: "40px",
                      border: "1px solid grey",
                      backgroundColor: "#e0e0e0",
                      textAlign: "center",
                    }}
                  ></input>
                  <Button
                    onClick={(e) => setQty(qty + 1)}
                    style={{
                      backgroundColor: "#e0e0e0",
                      border: "1px solid grey",
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Box ml={3}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#f73471", color: "white" }}
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </Box>
                <Box ml={3}>
                  <Button>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </Button>
                </Box>
              </Box>

              <Box
                style={{
                  width: "100%",
                  borderTop: "1px solid #e0e0e0",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></Box>

              <Grid container mt={5} spacing={5}>
                <Grid item style={{ fontSize: "20px" }}>
                  <b>Availability</b>
                </Grid>
                <Grid item style={{ fontSize: "20px" }}>
                  In stock
                </Grid>
              </Grid>
              <Grid container mt={5} spacing={5}>
                <Grid item style={{ fontSize: "20px" }}>
                  <b>Availability</b>
                </Grid>
                <Grid item style={{ fontSize: "20px" }}>
                  In stock
                </Grid>
              </Grid>
              <Grid container mt={5} spacing={5}>
                <Grid item style={{ fontSize: "20px" }}>
                  <b>Availability</b>
                </Grid>
                <Grid item style={{ fontSize: "20px" }}>
                  In stock
                </Grid>
              </Grid>
              <Grid container mt={5} spacing={5}>
                <Grid item style={{ fontSize: "20px" }}>
                  <b>Availability</b>
                </Grid>
                <Grid item style={{ fontSize: "20px" }}>
                  In stock
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
