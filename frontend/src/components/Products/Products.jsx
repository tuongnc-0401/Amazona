import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../actions/productAction";

const Products = () => {
  const endPoint = "http://localhost:5000";
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct());
  }, []);
  return (
    <div>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Container maxWidth="lg" style={{ marginTop: "10px" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            {products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <Product product={product}></Product>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Products;
