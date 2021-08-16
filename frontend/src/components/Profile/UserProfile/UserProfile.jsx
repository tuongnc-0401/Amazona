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
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../../actions/userAction";
import ProfileNav from "../ProfileNav";
import useStyles from "./styles";
const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleDataForm = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  // function changeGender(value) {
  //     switch (value) {
  //         case "true":
  //             return true
  //         case "false":
  //             return false
  //         default:
  //             break;
  //     }
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!user && userInfo) {
      dispatch(detailsUser(userInfo._id));
    } else if (user) {
      let gender1 = user.gender ? "true" : "false";
      setDataForm({
        ...user,
        gender: gender1,
        password: "",
        confirmPassword: "",
      });
    }
  }, [dispatch, user, userInfo]);

  return (
    <Box mt={5.5}>
      <Box ml={6} mr={6}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <ProfileNav current={1}></ProfileNav>
          </Grid>

          {loading ? (
            <CircularProgress color="secondary" />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid item xs={12} md={9}>
              <Box marginBottom={3}>
                <Paper elevation={3} style={{ padding: "30px" }}>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "10px", color: "#f73471" }}
                  >
                    Account Information
                  </Typography>
                  <form noValidate onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      label="Name"
                      value={dataForm.name}
                      id="name"
                      autoFocus
                      onChange={handleDataForm}
                      autoComplete="name"
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
                    <FormControl
                      style={{ marginTop: "10px" }}
                      component="fieldset"
                    >
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
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Male"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.pink}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </form>
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
