import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import SignupForm from '../components/signupForm';
import LoginForm from '../components/loginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emptyRegUser } from '../actions/auth';
import { emptyErrors } from '../actions/generalActions';

function MainLanding() {
  const {
    isAuthenticated,
    isAdminAuthenticated,
    isFinancerAuthenticated,
    isDocmanagerAuthenticated,
    loading,
  } = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const { regUser } = useSelector((state) => state.register);
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    if (isAdminAuthenticated) {
      navigate('/dashboard-admin');
    }
    if (isFinancerAuthenticated) {
      navigate('/financer-dashboard');
    }
    if (isDocmanagerAuthenticated) {
      navigate('/doc-dashboard');
    }
  }, [
    isAuthenticated,
    isAdminAuthenticated,
    isFinancerAuthenticated,
    isDocmanagerAuthenticated,
    navigate,
  ]);
  useEffect(() => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    };
    const toastLightOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    };
    if (errors.user || errors.password) {
      toast.error('Invalid Email or Password', toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (errors.checkemail) {
      toast.error('There Is Already An Account With That Email', toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (errors.unknown) {
      toast.error('Unknown Error, Please Try Again', toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (errors.pending) {
      toast.warning(
        'This Account Is Currently Being Reviewed',
        toastLightOptions
      );
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (changed && regUser) {
      toast.success(
        'Regsitered Successfully. Your Account Will Be Reviewed',
        toastLightOptions
      );
      setTimeout(() => {
        dispatch(emptyRegUser());
      }, 6000);
    }
  }, [errors, regUser, changed, dispatch]);
  return (
    <>
      <Grid container className='main-landing-container'>
        <div className='main-landing-content'>
          <div
            item
            className='w-full lg:w-1/2 md:w2/3 transition-all'
            color='inherit'
          >
            <p className='h1 font-extrabold text-7xl'>CoffeeNet Trading</p>
          </div>
          <div item className='w-full lg:w-1/2 md:w-2/3 my-8 transition-all'>
            <Typography variant='h5' color='inherit'>
              Welcome to the CoffeeNet ERP system. Login with your credentials
              or click on Get Started to create your account.
            </Typography>
          </div>
          <Grid container lg={5} xs={12}>
            <Grid
              item
              className='flex justify-start p-3 sm:p-0 text-gray-700'
              lg={6}
              xs={12}
            >
              <Button
                variant='outlined'
                className='w-full h-12'
                color='inherit'
                endIcon={<ArrowForward />}
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Button>
            </Grid>
            <Grid item className='flex justify-start p-3 sm:p-0' lg={6} xs={12}>
              <Button
                variant='contained'
                className='w-full h-12'
                sx={{
                  backgroundColor: '#403d3d',
                  '&:hover': {
                    backgroundColor: '#545151',
                  },
                }}
                endIcon={<ArrowForward />}
                onClick={() => setSignupModalOpen(true)}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <SignupForm
        signupModalOpen={signupModalOpen}
        setSignupModalOpen={setSignupModalOpen}
        setLoginModalOpen={setLoginModalOpen}
        loading={loading}
        errors={errors}
        setChanged={setChanged}
      />
      <LoginForm
        setChanged={setChanged}
        changed={changed}
        loading={loading}
        errors={errors}
        loginModalOpen={loginModalOpen}
        setSignupModalOpen={setSignupModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
      <ToastContainer />
    </>
  );
}

export default MainLanding;
