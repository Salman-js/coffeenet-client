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
  MenuItem,
  Select,
} from '@mui/material';
import { VisibilityOff, Visibility, Login } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { register } from '../actions/auth';

function SignupForm({
  signupModalOpen,
  setSignupModalOpen,
  setLoginModalOpen,
  loading,
  errors,
  setChanged,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function onSubmit(e) {
    const date = new Date();
    e.preventDefault();
    const newUser = {
      fname,
      lname,
      type,
      email,
      password,
      date,
    };
    console.log(fname, lname, email, password, type, date);
    dispatch(register(newUser));
    setChanged(true);
    if (!Object.keys(errors).length) {
      setPassword('');
    }
  }
  return (
    <Modal open={signupModalOpen} onClose={() => setSignupModalOpen(false)}>
      <Slide direction='left' in={signupModalOpen}>
        <Grid className='modal-container'>
          <div className='w-full my-auto'>
            <form onSubmit={onSubmit}>
              <p className='h3 text-gray-700 text-center pb-3'>Sign Up</p>
              <Grid container className='my-auto' spacing={2}>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    className='w-full'
                    label='First Name'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    autoComplete='false'
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    className='w-full'
                    label='Last Name'
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    autoComplete='false'
                    InputProps={{ autoComplete: 'off' }}
                  />
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='select-label'>Account Type</InputLabel>
                    <Select
                      labelId='select-label'
                      id='simple-select'
                      value={type}
                      label='Account Type'
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value='users'>User</MenuItem>
                      <MenuItem value='financers'>Finance Officer</MenuItem>
                      <MenuItem value='documenters'>Document Officer</MenuItem>
                      <MenuItem value='warehousers'>Warehouser</MenuItem>
                      <MenuItem value='admins'>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <TextField
                    className='w-full'
                    type='email'
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='false'
                    InputProps={{ autoComplete: 'off' }}
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
                          <IconButton
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
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
                    disabled={
                      !fname.trim().length ||
                      !lname.trim().length ||
                      !type.trim().length ||
                      !email.trim().length ||
                      !password.trim().length
                    }
                  >
                    Sign Up
                  </LoadingButton>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <p className='h4 text-gray-700 text-center pb-2'>
                    Already have an account?
                  </p>
                  <Button
                    className='w-full'
                    sx={{
                      backgroundColor: '#7794d6',
                      color: 'white',
                    }}
                    variant='container'
                    onClick={() => {
                      setSignupModalOpen(false);
                      setLoginModalOpen(true);
                    }}
                  >
                    Login
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

export default SignupForm;
