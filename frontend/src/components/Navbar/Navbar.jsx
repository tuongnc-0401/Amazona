import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@material-ui/core";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const classes = useStyles();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <AppBar className={classes.nav} style={{ marginBottom: "100px" }}>
      <Toolbar>
        <Typography variant="h4">Fitnezz</Typography>
        <div className={classes.midNav}>
          <Link to="/">
            <Button className={classes.loginBtn}>Home</Button>
          </Link>

          <Button component={Link} to="/product/1" className={classes.loginBtn}>
            Detail
          </Button>

          <Button className={classes.loginBtn}>Meals</Button>
          <Button className={classes.loginBtn}>Videos</Button>
        </div>
        <Link to="/cart">
          <IconButton>
            <Badge
              badgeContent={cartItems.length > 0 ? cartItems.length : 0}
              color="secondary"
            >
              <ShoppingCartIcon fontSize="large" style={{ color: "white" }} />
            </Badge>
          </IconButton>
        </Link>
        <Button className={classes.loginBtn}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
