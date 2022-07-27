import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
  Modal,
  Slide,
} from '@mui/material';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { login } from '../actions/auth';

function LoginForm({
  loginModalOpen,
  setSignupModalOpen,
  setLoginModalOpen,
  loading,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      email,
      password,
    };
    dispatch(login(newLogin));
    if (!Object.keys(errors)) {
      setEmail('');
      setPassword('');
      setLoginModalOpen(false);
    }
  }
  return (
    <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
      <Slide direction='left' in={loginModalOpen}>
        <Grid className='modal-container'>
          <div className='w-full my-auto'>
            <p className='h3 text-gray-700 text-center pb-3'>Login</p>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
                  <TextField
                    className='w-full'
                    type='email'
                    value={email}
                    autoComplete='false'
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                  />
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <FormControl className='w-full' variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? 'text' : 'password'}
                      label='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          {showPassword ? (
                            <IconButton onClick={() => setShowPassword(false)}>
                              <VisibilityOff />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => setShowPassword(true)}>
                              <Visibility />
                            </IconButton>
                          )}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <LoadingButton
                    type='submit'
                    className='w-full'
                    loading={loading}
                    loadingPosition='start'
                    startIcon={<Login />}
                    sx={{
                      backgroundColor: '#7794d6',
                      color: 'white',
                    }}
                    variant='contained'
                    disabled={!email.trim().length || !password.trim().length}
                  >
                    Login
                  </LoadingButton>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <p className='h4 text-gray-700 text-center pb-2'>
                    Don't have an account?
                  </p>
                  <Button
                    className='w-full'
                    sx={{
                      backgroundColor: '#7794d6',
                      color: 'white',
                    }}
                    variant='container'
                    onClick={() => {
                      setLoginModalOpen(false);
                      setSignupModalOpen(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Slide>
    </Modal>
  );
}

export default LoginForm;
