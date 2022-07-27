import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  InputAdornment,
  OutlinedInput,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  ListItemIcon,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { MoreVert, PersonRounded, Close, Logout } from '@mui/icons-material';
import AdminLoginForm from './adminLoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../actions/auth';

function TopNav() {
  const { user, admin, isAuthenticated, isAdminAuthenticated, loading } =
    useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    };
    if (errors?.admin) {
      toast.error('Invalid Email or Password', toastOptions);
    }
  }, [errors]);
  return (
    <>
      {!isAuthenticated && !isAdminAuthenticated ? (
        <NoLoggedNav loading={loading} errors={errors} />
      ) : isAdminAuthenticated && admin && Object.keys(admin).length ? (
        <AdminNav admin={admin} />
      ) : isAuthenticated && user && Object.keys(user).length ? (
        <UserNav user={user} />
      ) : (
        <NoLoggedNav loading={loading} errors={errors} />
      )}
    </>
  );
}

const NoLoggedNav = ({ errors, loading }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const showPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className='navbar'>
        <div className='nav-logo-container'>
          <img src='./assets/logo.png' width='50px' alt='' />
        </div>
        <div className='nav-menu-container my-auto'>
          <IconButton size='small' onClick={showPopOver}>
            <MoreVert size='small' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                color: '#2d384e',
                bgcolor: '#e2dfdf',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: '#e2dfdf',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => setLoginModalOpen(true)}>
              <ListItemIcon>
                <PersonRounded sx={{ color: '#2d384e' }} fontSize='small' />
              </ListItemIcon>
              Admin Login
            </MenuItem>
          </Menu>
        </div>
      </div>
      <AdminLoginForm
        loading={loading}
        errors={errors}
        loginModalOpen={loginModalOpen}
        setLoginModalOpen={setLoginModalOpen}
      />
      <ToastContainer />
    </>
  );
};

const AdminNav = ({ admin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const showPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className='navbar'>
        <div className='nav-logo-container flex flex-row my-auto'>
          <div className='my-auto mt-2'>
            <img src='./assets/logo.png' width='50px' alt='' />
          </div>
          <div className='ml-6 my-auto'>
            <FormControl className='w-full'>
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search'
                className='h-10 bg-white'
                endAdornment={
                  <InputAdornment>
                    {search.trim().length ? (
                      <IconButton onClick={() => setSearch('')}>
                        <Close />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className='nav-menu-container my-auto'>
          <IconButton size='small' onClick={showPopOver}>
            <Avatar sx={{ width: 30, height: 30 }}>
              {admin.fname.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                color: '#2d384e',
                bgcolor: '#ffffff',
                '& .MuiAvatar-root': {},
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 14,
                  right: -5,
                  width: 10,
                  height: 10,
                  bgcolor: '#fffdfd',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'middle' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar>{admin.fname.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={admin.fname + ' ' + admin.lname}
                  secondary={admin.email}
                />
              </ListItem>
            </MenuItem>
            <MenuItem
              className='text-red-400 px-4 py-2'
              onClick={() => dispatch(logout())}
            >
              <ListItemIcon>
                <Logout sx={{ color: '#eb7563' }} fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};
const UserNav = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const showPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className='navbar'>
        <div className='nav-logo-container flex flex-row my-auto'>
          <div className='my-auto mt-2'>
            <img src='./assets/logo.png' width='50px' alt='' />
          </div>
          <div className='ml-6 my-auto'>
            <FormControl className='w-full'>
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search'
                className='h-10 bg-white'
                endAdornment={
                  <InputAdornment>
                    {search.trim().length ? (
                      <IconButton onClick={() => setSearch('')}>
                        <Close />
                      </IconButton>
                    ) : null}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className='nav-menu-container my-auto'>
          <IconButton size='small' onClick={showPopOver}>
            <Avatar sx={{ width: 30, height: 30 }}>
              {user.fname.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                color: '#2d384e',
                bgcolor: '#ffffff',
                '& .MuiAvatar-root': {},
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 14,
                  right: -5,
                  width: 10,
                  height: 10,
                  bgcolor: '#fffdfd',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'middle' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <MenuItem>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar>{user.fname.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.fname + ' ' + user.lname}
                  secondary={user.email}
                />
              </ListItem>
            </MenuItem>
            <MenuItem
              className='text-red-400 px-4 py-2'
              onClick={() => dispatch(logout())}
            >
              <ListItemIcon>
                <Logout sx={{ color: '#eb7563' }} fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};
export default TopNav;
