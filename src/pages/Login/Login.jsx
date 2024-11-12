
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginFinal() {
  const navigate = useNavigate();
  const [userNumber, setUserNumber] = useState();
  const [parol, setParol] = useState();
  function loginSumbit(e) {
    e.preventDefault();
    // Auth  Login post
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        phone_number: userNumber,
        password: parol
      })
    }).then((response) => response.json())
      .then((natija) => {
        if (natija?.success) {
          toast.success(natija?.message)
          localStorage.setItem("tokenbek", natija?.data?.tokens?.accessToken?.token)
          console.log(natija?.data?.tokens?.accessToken?.token)
          navigate("/")
        } else {
          toast.error(natija?.message)
        }
      })
  }
  return (
    <main className='loginpage'>
      <ToastContainer />
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Hush kelibsiz!</b>
          </Typography>
        </div>
        <FormControl>
          <FormLabel>Login</FormLabel>
          <Input
            onChange={(e) => { setUserNumber(e?.target?.value) }}
            name="email"
            type="email"
            placeholder="Login"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={(e) => { setParol(e?.target?.value) }}
            name="password"
            type="password"
            placeholder="password"
          />
        </FormControl>
        <Button
          onClick={loginSumbit}
          sx={{ mt: 2 }}>Kirish</Button>
      </Sheet>
    </main>
  );
}
