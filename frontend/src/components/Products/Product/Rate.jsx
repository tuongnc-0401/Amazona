import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const Rate = ({ rating, numSold }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box component="div">
        <Rating name="readOnly " value={rating} precision={0.5} readOnly />
      </Box>
      <Box component="div">
        <Typography component="body2">| {numSold} sold</Typography>
      </Box>
    </Box>
  );
};

export default Rate;
