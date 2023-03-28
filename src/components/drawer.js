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
  DirectionsBoat,
  LocalShipping,
  Sell,
  BrandingWatermark,
  FileOpen,
  ScaleOutlined,
  CurrencyExchangeOutlined,
  PriceChangeOutlined,
  PaidOutlined,
  ArchiveOutlined,
  DiamondOutlined,
  WarehouseOutlined,
  PriceCheckOutlined,
  RequestQuoteOutlined,
  LocalAtmOutlined,
  AddShoppingCartOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getActiveAccs, getPendingAccs } from '../actions/adminActions';

const drawerWidth = 200;

function MainDrawer() {
  const {
    user,
    admin,
    docManager,
    financer,
    isAuthenticated,
    isAdminAuthenticated,
    isFinancerAuthenticated,
    isDocmanagerAuthenticated,
  } = useSelector((state) => state.auth);
  const [drawerIn, setDrawerIn] = useState(false);
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    if (
      isAuthenticated ||
      isAdminAuthenticated ||
      isFinancerAuthenticated ||
      isDocmanagerAuthenticated
    ) {
      setDrawerIn(true);
    } else {
      setDrawerIn(false);
    }
  }, [
    isAuthenticated,
    isAdminAuthenticated,
    isFinancerAuthenticated,
    isDocmanagerAuthenticated,
  ]);
  return (
    <>
      {!isAuthenticated &&
      !isAdminAuthenticated &&
      !isFinancerAuthenticated &&
      !isDocmanagerAuthenticated ? null : isAdminAuthenticated &&
        admin &&
        Object.keys(admin).length ? (
        <AdminDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
      ) : isAuthenticated && user && Object.keys(user).length ? (
        <UserDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
      ) : isDocmanagerAuthenticated &&
        docManager &&
        Object.keys(docManager).length ? (
        <DocManagerDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
      ) : isFinancerAuthenticated &&
        financer &&
        Object.keys(financer).length ? (
        <FinancerDrawer drawerIn={drawerIn} open={open} setOpen={setOpen} />
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
            <Link to='/dashboard'>
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
            <Link to='/user-samples'>
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
            </Link>
            <Link to='/user-om'>
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
            </Link>
            <Link to='/user-sites'>
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
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Sites'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/user-vehicles'>
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
            </Link>
            <Link to='/user-pcr'>
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
            </Link>
            <Link to='/user-dhl'>
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
            </Link>
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
  }, [dispatch]);
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
            <Link to='/admin-samples'>
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
            </Link>
            <Link to='/admin-om'>
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
            </Link>
            <Link to='/admin-sites'>
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
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Sites'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/admin-cupping'>
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
                <Link to='/approved-pcr'>
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
                </Link>
                <Link to='/pending-pcr'>
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
                </Link>
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

const DocManagerDrawer = ({ drawerIn, open, setOpen }) => {
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
            <Link to='/doc-dashboard'>
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
            <Link to='/invoices'>
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
                    primary='Invoices'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/shipping-instructions'>
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
                    <DirectionsBoat />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Shipment'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/packing-lists'>
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
                    <LocalShipping />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Packing Lists'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/way-bills'>
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
                    <Sell />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Way Bills'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/certificates'>
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
                    <BrandingWatermark />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Inland Cert.'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/shipper-declerations'>
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
                    <FileOpen />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Shippers Dec.'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/weight-notes'>
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
                    <ScaleOutlined />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Weight Notes'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </Slide>
  );
};

const FinancerDrawer = ({ drawerIn, open, setOpen }) => {
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
            <Link to='/doc-dashboard'>
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
                      <CurrencyExchangeOutlined />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ opacity: open ? 1 : 0 }}
                      primary='Expense'
                    />
                  </ListItemButton>
                </AccordionSummary>
                <AccordionDetails className='p-0 bg-slate-300'>
                  <Link to='/expenses'>
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
                          <RequestQuoteOutlined />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ opacity: open ? 1 : 0 }}
                          primary='Expenses List'
                          primaryTypographyProps={{
                            fontSize: 13,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link to='/new-expense'>
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
                          <PriceCheckOutlined />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ opacity: open ? 1 : 0 }}
                          primary='Add Expense'
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
            <Link to='/expense'>
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
                    <PriceChangeOutlined />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Revenue'
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
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
                    px: 1.7,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <PaidOutlined />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary='Cost/Purchase'
                  />
                </ListItemButton>
              </AccordionSummary>
              <AccordionDetails className='p-0 bg-slate-300'>
                <Link to='/purchases'>
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
                        <LocalAtmOutlined />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ opacity: open ? 1 : 0 }}
                        primary='Purchases List'
                        primaryTypographyProps={{
                          fontSize: 13,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to='/new-cost'>
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
                        <AddShoppingCartOutlined />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ opacity: open ? 1 : 0 }}
                        primary='New Purchase'
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
          <Link to='/inventory'>
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
                  <ArchiveOutlined />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Inventory'
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/asset'>
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
                  <DiamondOutlined />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }} primary='Asset' />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to='/warehouse'>
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
                  <WarehouseOutlined />
                </ListItemIcon>
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary='Warehouse'
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
        </Drawer>
      </Box>
    </Slide>
  );
};
export default MainDrawer;
