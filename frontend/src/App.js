import './App.css';
import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField as Input,
} from "@mui/material";
import { CalendarToday, CreditCard } from "@mui/icons-material";


export const paySchema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required"),
  expiryDate: yup
    .string()
    .required("Expiry date is required")
    .test("valid-month", "Invalid month", function (value) {
      if (!value) {
        return false;
      }

      const [month] = value.split("/").map((item) => parseInt(item, 10));

      return month >= 1 && month <= 12;
    })
    .test(
      "is-future-date",
      "Expiry date must be in the future",
      function (value) {
        if (!value) {
          return false;
        }

        const currentDate = new Date();
        const [month, year] = value
          .split("/")
          .map((item) => parseInt(item, 10));

        // Adding 1 to the month because JavaScript months are zero-indexed
        const expiryDate = new Date(year + 2000, month, 1);

        return expiryDate > currentDate;
      }
    ),
  name: yup.string().required("Name is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]{3,4}$/, "Invalid CVV")
    .required("CVV is required"),
});

const PaymentForm = () => {
  const [isValid, setIsValid] = React.useState(true);
  // Formik hook and form submission logic
  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: paySchema,
    onSubmit: async (values) => {
      // hard-coded url for dev API server only! Remove in prod.
      const response = await fetch('http://localhost:8000/cards/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setIsValid(data.result);
    },
  });

  const formatCardNumber = (value) => {
      return value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    };
    
  const formatExpiryDate = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Limit to four numeric characters
    const formattedValue = numericValue.slice(0, 4);

    // Add the '/' separator after the first two characters
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + " / " + formattedValue.slice(2);
    } else {
      return formattedValue;
    }
  };


  return (
    <Box
        sx={{
          background: "var(--light-grey)",
          py: 5,
          px: { xs: 2, md: 7 },
          maxWidth: "32rem",
          margin: "0 auto",
          my: 5,
          borderRadius: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            className="fw-500 text-center"
            sx={{ pb: 3 }}
          >
            Pay with card
          </Typography>
          <Box sx={{ pb: 3 }} className="flex justify-content-between">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="credit"
                name="radio-buttons-group"
                sx={{
                  ".Mui-checked": {
                    color: "var(--main-color) !important",
                  },
                  span: {
                    fontWeight: "500",
                  },
                }}
              >
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit or Debit Card"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ pb: 2 }}>
                    <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                      Cardholder Name
                    </InputLabel>
                    <Input
                      fullWidth
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      placeholder="e.g John Doe"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box>
                    <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                      Card Number
                    </InputLabel>
                    <Input
                      fullWidth
                      id="cardNumber"
                      name="cardNumber"
                      value={formatCardNumber(formik.values.cardNumber)}
                      onChange={(e) => {
                        e.target.value = formatCardNumber(e.target.value);
                        formik.handleChange(e);
                      }}
                      error={
                        formik.touched.cardNumber &&
                        Boolean(formik.errors.cardNumber)
                      }
                      helperText={
                        formik.touched.cardNumber && formik.errors.cardNumber
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          paddingLeft: "8px",
                        },
                      }}
                      inputProps={{ maxLength: 19 }}
                      placeholder="1234 1234 1234 1234"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton edge="end">
                              <CreditCard className="main-color" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                    Expiry Date
                  </InputLabel>
                  <Input
                    variant="outlined"
                    fullWidth
                    id="expiryDate"
                    name="expiryDate"
                    value={formik.values.expiryDate}
                    onChange={(e) => {
                      e.target.value = formatExpiryDate(e.target.value);
                      formik.handleChange(e);
                    }}
                    error={
                      formik.touched.expiryDate &&
                      Boolean(formik.errors.expiryDate)
                    }
                    helperText={
                      formik.touched.expiryDate && formik.errors.expiryDate
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarToday
                            sx={{ color: "#ABABAB", width: "1rem" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel sx={{ py: 0.5, color: "#49454F" }}>
                    CVV
                  </InputLabel>
                  <Input
                    variant="outlined"
                    fullWidth
                    id="cvv"
                    name="cvv"
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                    helperText={formik.touched.cvv && formik.errors.cvv}
                    inputProps={{ maxLength: 4 }}
                    placeholder="e.g 1234"
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color={!isValid ? "error": "primary" }
                type="submit"
                sx={{
                  width: "100%",
                  mt: 4,
                  py: 1.3,
                  fontWeight: "500",
                }}
                className="normal-text"
              >
               {isValid ? "Paid" : "Pay Now"} 
              </Button>
            </form>
            <Box>{!isValid && formik.touched.cardNumber && <div>Invalid card number!</div>}</Box>
          </Box>
        </Box>
      </Box>
  );
};

export default PaymentForm;
