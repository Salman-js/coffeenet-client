import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  MoreVert,
  PersonRounded,
  Logout,
  FolderCopy,
  AccountBalanceWallet,
} from '@mui/icons-material';
import AdminLoginForm from './adminLoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../actions/auth';
import FinancerLoginForm from './financerLoginForm';
import { emptyErrors } from '../actions/generalActions';
import DocmanagerLoginForm from './docmanagerLoginForm';

function TopNav() {
  const {
    user,
    admin,
    financer,
    docManager,
    isAuthenticated,
    isAdminAuthenticated,
    isFinancerAuthenticated,
    isDocmanagerAuthenticated,
    loading,
  } = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
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
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (errors?.financer) {
      toast.error('Invalid Email or Password', toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
    if (Object.keys(errors).length && !errors.admin && !errors.financer) {
      toast.error('Unknown error, please try again', {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors, dispatch]);
  return (
    <>
      {!isAuthenticated &&
      !isAdminAuthenticated &&
      !isFinancerAuthenticated &&
      !isDocmanagerAuthenticated ? (
        <NoLoggedNav loading={loading} errors={errors} />
      ) : isAdminAuthenticated && admin && Object.keys(admin).length ? (
        <AdminNav admin={admin} />
      ) : isAuthenticated && user && Object.keys(user).length ? (
        <UserNav user={user} />
      ) : isDocmanagerAuthenticated &&
        docManager &&
        Object.keys(docManager).length ? (
        <DocManagerNav docManager={docManager} />
      ) : (
        <NoLoggedNav loading={loading} errors={errors} />
      )}
    </>
  );
}

const NoLoggedNav = ({ errors, loading }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [financerModalOpen, setFinancerModalOpen] = useState(false);
  const [docmanagerModalOpen, setDocmanagerModalOpen] = useState(false);
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
            <MenuItem onClick={() => setDocmanagerModalOpen(true)}>
              <ListItemIcon>
                <FolderCopy sx={{ color: '#2d384e' }} fontSize='small' />
              </ListItemIcon>
              Doc. Officer Login
            </MenuItem>
            <MenuItem onClick={() => setFinancerModalOpen(true)}>
              <ListItemIcon>
                <AccountBalanceWallet
                  sx={{ color: '#2d384e' }}
                  fontSize='small'
                />
              </ListItemIcon>
              Financer Login
            </MenuItem>
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
      <DocmanagerLoginForm
        loading={loading}
        errors={errors}
        docmanagerModalOpen={docmanagerModalOpen}
        setDocmanagerModalOpen={setDocmanagerModalOpen}
      />
      <FinancerLoginForm
        loading={loading}
        errors={errors}
        financerModalOpen={financerModalOpen}
        setFinancerModalOpen={setFinancerModalOpen}
      />
      <ToastContainer />
    </>
  );
};

const AdminNav = ({ admin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [search, setSearch] = useState('');
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const showPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className='navbar'>
        <div className='nav-logo-container'>
          <img src='./assets/logo.png' width='50px' alt='' />
          {/* <div className='ml-6 my-auto'>
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
          </div> */}
        </div>
        <div className='nav-menu-container my-auto flex flex-row'>
          <p className='h6 text-gray-700 mx-6 mt-3'>Admin ID: {admin.id}</p>
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

const DocManagerNav = ({ docManager }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [search, setSearch] = useState('');
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
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
            <Avatar sx={{ width: 30, height: 30 }}>
              {docManager.fname.charAt(0)}
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
                  <Avatar>{docManager.fname.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={docManager.fname + ' ' + docManager.lname}
                  secondary={docManager.email}
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
  // const [search, setSearch] = useState('');
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
