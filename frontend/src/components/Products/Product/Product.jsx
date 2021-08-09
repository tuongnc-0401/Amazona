import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import Rate from "./Rate";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card>
      <CardHeader
        title={product.name}
        style={{ color: "#f73471" }}
      ></CardHeader>
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={product.image}
      ></CardMedia>
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
         */}

        <Rate rating={product.rating} numSold={product.sold}></Rate>
      </CardContent>
      <CardActions>
        <Typography variant="h6">{product.price}</Typography>
        <Button
          style={{
            backgroundColor: "#f73471",
            marginLeft: "auto",
            color: "white",
          }}
          component={Link}
          to={`/product/${product._id}`}
        >
          Add to Card
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
