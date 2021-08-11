import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { register, signin } from "../../actions/userAction";
import { useHistory, useLocation, Link as LinkReact } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    gender: "",
  });

  const [passError, setPassError] = useState(false);
  const handleDataForm = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userSignin);
  const history = useHistory();
  //   const redirect = props.location.search
  //     ? props.location.search.split("=")[1]
  //     : "/";
  function changeGender(value) {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        break;
    }
  }

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      dataForm.password !== dataForm.confirmPassword ||
      dataForm.password === ""
    ) {
      setPassError(true);
    } else {
      setPassError(false);
      dispatch(
        register(
          dataForm.name,
          dataForm.email,
          dataForm.password,
          changeGender(dataForm.gender)
        )
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a free account
        </Typography>
        {loading && <CircularProgress style={{ marginTop: "10px" }} />}
        {error && (
          <Alert style={{ marginTop: "10px" }} severity="error">
            {error}
          </Alert>
        )}
        {passError && (
          <Alert style={{ marginTop: "10px" }} severity="error">
            Passwords don't match!!!
          </Alert>
        )}

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required="true"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={dataForm.name}
            autoComplete="name"
            autoFocus
            onChange={handleDataForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={dataForm.email}
            autoComplete="email"
            onChange={handleDataForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={dataForm.password}
            id="password"
            onChange={handleDataForm}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={dataForm.confirmPassword}
            id="confirmPassword"
            onChange={handleDataForm}
            autoComplete="current-password"
          />
          <FormControl component="fieldset" style={{ marginTop: "10px" }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={dataForm.gender}
              onChange={handleDataForm}
            >
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="true" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#f73471", color: "white" }}
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component={LinkReact}
                to={`/signin?redirect=${redirect}`}
                variant="body2"
              >
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
