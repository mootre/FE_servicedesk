"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { userlogin } from "../api/user/user";
import { signIn } from "next-auth/react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© Practika Co., Ltd."}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export const COOKIE_NAME = "OurSiteJWT";

export default function SignInSide() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const payload = {
        _username: data.get("username"),
        _password: data.get("password"),
      };
      try{
        //const rs = await userlogin(payload);
        signIn("credentials",{
          username: data.get("username"),
          password: data.get("password"),
          redirect: true,
          callbackUrl:'/'
        })

      /*const  rs = await axios.post("/api/login", payload);
  
      alert(JSON.stringify(rs));*/

      

     // sessionStorage.setItem("key",rs.access_token);

     /*const serializedCookie = serialize("JWTCookie", _data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 1,
      });
    console.log("Serialized Cookie:", _data);

      /*const successResponse = new Response(JSON.stringify({ message: "Authenticated!" }), {
        status: 200,
        headers: {"Set-Cookie": serializedCookie},
      });
  
      return  successResponse;*/
      //return _data
    }catch(error){
      console.error("Error during form submission:", error);
    
      // Return an error response
      const errorResponse = new Response(JSON.stringify({ error: "Failed to authenticate." }), {
        status: 500,
      });
      return errorResponse;
      
    }
    
    /*(async () => {
      try {
        const seralized = serialize(COOKIE_NAME, data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 1,
        });
        const msg = {
          message: "Authenticated!",
        };
    
        console.log("Serialized Cookie:", JSON.stringify(seralized));
        return new Response(null, {
          headers: { "Set-Cookie": seralized },
        });
      } catch (error) {
        return error;
      }
    })(); */ 
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
