import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Avatar,
} from "@material-ui/core";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userAction.js";
const Navbar = () => {
  const classes = useStyles();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
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
        {userInfo ? (
          <div>
            <Button component={Link} to="/" className={classes.loginBtn}>
              <Avatar style={{ backgroundColor: " #f73471", color: "white" }}>
                {userInfo.name.charAt(0)}
              </Avatar>
            </Button>
            <Button
              component={Link}
              to="#signout"
              onClick={signoutHandler}
              className={classes.loginBtn}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/signin" className={classes.loginBtn}>
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
