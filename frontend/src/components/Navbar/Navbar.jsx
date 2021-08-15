import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  MenuItem,
  Menu,
} from "@material-ui/core";
import useStyles from "./styles.js";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/userAction.js";
import { removeAllCartItems } from "../../actions/cartAction.js";
const Navbar = () => {
  const classes = useStyles();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signoutHandler = () => {
    dispatch(signout());
    dispatch(removeAllCartItems());
    history.push("/");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.nav} style={{ marginBottom: "100px" }}>
      <Toolbar>
        <Typography variant="h4">Fitnezz</Typography>
        <div className={classes.midNav}>
          <Link to="/">
            <Button className={classes.loginBtn}>Home</Button>
          </Link>

          <Button component={Link} to="/products" className={classes.loginBtn}>
            Products
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
            <Button onClick={handleMenu} className={classes.loginBtn}>
              <Avatar style={{ backgroundColor: " #f73471", color: "white" }}>
                {userInfo.name.charAt(0)}
              </Avatar>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ marginTop: "40px" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={signoutHandler}>Log out</MenuItem>
            </Menu>
            {/* <Button
                  component={Link}
                  to="#signout"
                  onClick={signoutHandler}
                  className={classes.loginBtn}
                >
                  logout
                </Button> */}
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
