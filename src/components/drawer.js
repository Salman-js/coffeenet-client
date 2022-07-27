import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Slide,
  ListItem,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  PersonRounded,
  Speed,
  Description,
  ChevronRight,
  ChevronLeft,
  MapsHomeWork,
  Grass,
  LocalCafe,
  DirectionsCar,
  MonetizationOn,
  Email,
  ExpandMore,
  ManageAccounts,
  People,
  PriceCheck,
  HourglassTop,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getActiveAccs, getPendingAccs } from '../actions/adminActions';

const drawerWidth = 200;

function MainDrawer() {
  const { user, admin, isAuthenticated, isAdminAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [drawerIn, setDrawerIn] = useState(false);
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (isAuthenticated || isAdminAuthenticated) {
      setDrawerIn(true);
    } else {
      setDrawerIn(false);
    }
  }, [isAuthenticated, isAdminAuthenticated]);
  return (
    <>
      {!isAuthenticated &&
      !isAdminAuthenticated ? null : isAdminAuthenticated &&
        admin &&
        Object.keys(admin).length ? (
        <AdminDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
      ) : isAuthenticated && user && Object.keys(user).length ? (
        <UserDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
      ) : null}
    </>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transform: 'translateY(0%)',
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const UserDrawer = ({ drawerIn, open, setOpen }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Slide direction='right' in={drawerIn}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            {open ? (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <ChevronRight />
              </IconButton>
            )}
          </DrawerHeader>
          <Divider />
          <List>
            <Link to='/dashboard-admin'>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Speed />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Dashboard'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Description />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Samples'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <MapsHomeWork />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Office Materials'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Grass />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary='Sites' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Vehicles'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <MonetizationOn />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Petty Cash'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Email />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary='DHL' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </Slide>
  );
};

const AdminDrawer = ({ drawerIn, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getActiveAccs());
    dispatch(getPendingAccs());
  }, []);
  return (
    <Slide direction='right' in={drawerIn}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant='permanent' open={open}>
          <DrawerHeader>
            {open ? (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeft />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <ChevronRight />
              </IconButton>
            )}
          </DrawerHeader>
          <Divider />
          <List>
            <Link to='/dashboard-admin'>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Speed />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Dashboard'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Accordion
                sx={{
                  minWidth: 0,
                  mr: open ? 'auto' : 6,
                  justifyContent: 'center',
                }}
                className='p-0 shadow-none w-full bg-slate-400'
              >
                <AccordionSummary
                  sx={{
                    display: open ? '' : 'block',
                  }}
                  expandIcon={open ? <ExpandMore /> : null}
                  className='p-0 w-full'
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <People />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ opacity: open ? 1 : 0 }}
                      primary='Accounts'
                    />
                  </ListItemButton>
                </AccordionSummary>
                <AccordionDetails className='p-0 bg-slate-300'>
                  <Link to='/pending-accounts'>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <ManageAccounts />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ opacity: open ? 1 : 0 }}
                          primary='Pending Accounts'
                          primaryTypographyProps={{
                            fontSize: 13,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/active-accounts'>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <PersonRounded />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ opacity: open ? 1 : 0 }}
                          primary='Active Accounts'
                          primaryTypographyProps={{
                            fontSize: 13,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Description />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Samples'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <MapsHomeWork />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Office Materials'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Grass />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary='Sites' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LocalCafe />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Cupping'
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Vehicles'
                />
              </ListItemButton>
            </ListItem>
            <Accordion
              sx={{
                minWidth: 0,
                mr: open ? 'auto' : 6,
                justifyContent: 'center',
              }}
              className='p-0 shadow-none w-full h-fit'
            >
              <AccordionSummary
                sx={{
                  display: open ? '' : 'block',
                }}
                expandIcon={open ? <ExpandMore /> : null}
                className='p-0 w-full h-fit'
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <MonetizationOn />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Petty Cash'
                  />
                </ListItemButton>
              </AccordionSummary>
              <AccordionDetails className='p-0 bg-slate-300'>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <PriceCheck />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ opacity: open ? 1 : 0 }}
                      primary='Approved Requests'
                      primaryTypographyProps={{
                        fontSize: 13,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <HourglassTop />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ opacity: open ? 1 : 0 }}
                      primary='Pending Requests'
                      primaryTypographyProps={{
                        fontSize: 13,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Email />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary='DHL' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </Slide>
  );
};
export default MainDrawer;
