/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from "react-router";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import swal from 'sweetalert'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import CircleIcon from '@mui/icons-material/Circle';
import Axios from "axios";
import config from '../config'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const data = JSON.parse(localStorage.getItem('data'));

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: 'rgba(234,234,234,1)',
      fontSize: `14px`,
      color: 'rgba(0,0,0,1)'
    },
    children: (name.includes('PTEC')) === true ? `${name.split('C')[1]}` : `${name}`,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ButtonAppBar() {
  const theme = useTheme();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openPrimary, setOpenPrimary] = React.useState(false);
  const [state, setState] = React.useState({ left: false, });
  const [menuLaunchingMenu, setMenuLaunchingMenu] = React.useState([]);
  const [menuState, setMenuState] = React.useState([]);
  const [menuStateII, setMenuStateII] = React.useState([]);
  const [menuMain, setMenuMain] = React.useState([]);
  const navigate = useNavigate();

  // Functions
  const handleMenuMain = (e, res, index) => {
    const uniKeys = menuLaunchingMenu.filter((item) => item.systemid === res.systemid);
    const uniKeysII = [...new Map(uniKeys.map(item => [item['primaryMenuName'], item])).values()]
    if (menuState.length === 0 || uniKeysII[0].systemid === menuState[0].systemid) {
      setMenuState(uniKeysII);
      setOpen(!open);
    } else {
      setOpen(true);
      setMenuState(uniKeysII);
    }
  }

  const handleMenuPrimary = (e, resItem, itemIndex) => {
    const uniKeysI = menuLaunchingMenu.filter((item) => item.systemid === resItem.systemid);
    const uniKeysII = uniKeysI.filter((item) => item.primaryMenuID === resItem.primaryMenuID);
    const uniKeysIII = [...new Map(uniKeysII.map(item => [item['secondaryMenuName'], item])).values()]
    if (menuStateII.length === 0 || uniKeysIII[0].primaryMenuID === menuStateII[0].primaryMenuID) {
      setOpenPrimary(!openPrimary);
      setMenuStateII(uniKeysIII);
    } else {
      setOpenPrimary(true);
      setMenuStateII(uniKeysIII);
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    swal("ออกจากระบบสำเร็จ", "คุณได้ออกจากระบบแล้ว", "success", {
      buttons: false,
      timer: 1500,
    })
      .then(() => {
        localStorage.clear();
        window.location.href = '/'
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const reactJS_LaunchingMenu = async () => {
    await Axios.post(config.http + '/ReactJS_LaunchingMenu', { userid: data.userid }, config.headers)
      .then((res) => {
        const uniKeys = [...new Map(res.data.data.map(item => [item['systemname'], item])).values()];
        setMenuMain(uniKeys);
        setMenuLaunchingMenu(res.data.data)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    reactJS_LaunchingMenu();
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <AppBar position="flex">
        <Toolbar>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(anchor, true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <DrawerHeader>
                  <IconButton onClick={toggleDrawer(anchor, false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <Box
                  sx={{ width: '20rem !important' }}
                  role="presentation"
                >
                  <FireNav component="nav" disablePadding>
                    <ListItem component="div" disablePadding>
                      <ListItemButton sx={{ height: 56 }} component="a" href="#customized-list">
                        <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                        <ListItemText
                          sx={{ my: 0 }}
                          primary="ReactJS"
                          primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                          }}
                        />
                      </ListItemButton>
                      <Tooltip title="Project Settings">
                        <IconButton
                          size="large"
                          sx={{
                            '& svg': {
                              color: 'rgba(255,255,255,0.8)',
                              transition: '0.2s',
                              transform: 'translateX(0) rotate(0)',
                            },
                            '&:hover, &:focus': {
                              bgcolor: 'unset',
                              '& svg:first-of-type': {
                                transform: 'translateX(-4px) rotate(-20deg)',
                              },
                              '& svg:last-of-type': {
                                right: 0,
                                opacity: 1,
                              },
                            },
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              height: '80%',
                              display: 'block',
                              left: 0,
                              width: '1px',
                              bgcolor: 'divider',
                            },
                          }}
                        >
                          <Settings />
                          <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                    <Divider />
                    <ListItemButton
                      sx={{ height: 56 }}
                      component="a"
                      href="#customized-list"
                      onClick={() => navigate('/Home')}
                    >
                      <ListItemIcon sx={{ fontSize: 20 }}>🏠</ListItemIcon>
                      <ListItemText
                        primary="HomePage Overview"
                        primaryTypographyProps={{
                          fontSize: 20,
                          fontWeight: 'medium',
                          letterSpacing: 0,
                        }}
                      />
                    </ListItemButton>
                    <Divider />
                    {menuMain.map((res, index) => (
                      <Box
                        sx={{
                          bgcolor: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(71, 98, 130, 0.2)' : null,
                          // py: (open && (menuState[0].systemid === res.systemid)) ? 2 : 0,
                        }}
                      >
                        <ListItemButton
                          alignItems="flex-start"
                          onClick={(e) => handleMenuMain(e, res, index)}
                          sx={{
                            px: 3,
                            pt: 2.5,
                            pb: (open && (menuState[0].systemid === res.systemid)) ? 0 : 2.5,
                            '&:hover, &:focus': { '& svg': { opacity: (open && (menuState[0].systemid === res.systemid)) ? 1 : 0 } },
                          }}
                        >
                          <ListItemText
                            primary={res.systemname}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: 'medium',
                              lineHeight: '20px',
                              mb: '2px',
                            }}
                            secondary={res.secondaryname}
                            secondaryTypographyProps={{
                              noWrap: true,
                              fontSize: 12,
                              lineHeight: '16px',
                              color: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                            }}
                            sx={{ my: 0 }}
                          />
                          <KeyboardArrowDown
                            sx={{
                              mr: -1,
                              opacity: 0,
                              transform: (open && (menuState[0].systemid === res.systemid)) ? 'rotate(-180deg)' : 'rotate(0)',
                              transition: '0.2s',
                            }}
                          />
                        </ListItemButton>
                        {(open && (menuState[0].systemid === res.systemid)) &&
                          menuState.map((resItem, itemIndex) => (
                            <Box>
                              <ListItemButton
                                key={resItem.primaryMenuName}
                                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                onClick={(e) => {
                                  if (resItem.primaryTree === true) {
                                    handleMenuPrimary(e, resItem, itemIndex)
                                  } else {
                                    navigate(resItem.MenuPath)
                                  }
                                }}
                              >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                  <CircleIcon sx={{ fontSize: '0.5rem !important' }} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={resItem.primaryMenuName}
                                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                />
                                <KeyboardArrowDown
                                  sx={{
                                    mr: -1,
                                    opacity: 0,
                                    transform: (openPrimary && (menuStateII[0].primaryMenuID === resItem.primaryMenuID)) ? 'rotate(-180deg)' : 'rotate(0)',
                                    transition: '0.2s',
                                  }}
                                />
                              </ListItemButton>
                              {(openPrimary && (menuStateII[0].primaryMenuID === resItem.primaryMenuID) && (resItem.primaryTree === true)) &&
                                menuStateII.map((resItem, itemIndex) => (
                                  <Box sx={{ pl: 3 }}>
                                    <ListItemButton
                                      key={resItem.secondaryMenuName}
                                      sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                      onClick={() => navigate(resItem.MenuPath)}
                                    >
                                      <ListItemIcon sx={{ color: 'inherit' }}>
                                        <CheckBoxOutlineBlankIcon sx={{ fontSize: '0.5rem !important' }} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={resItem.secondaryMenuName}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                      />
                                      <KeyboardArrowDown
                                        sx={{
                                          mr: -1,
                                          opacity: 0,
                                          transform: (openPrimary && (menuStateII[0].primaryMenuID === resItem.primaryMenuID)) ? 'rotate(-180deg)' : 'rotate(0)',
                                          transition: '0.2s',
                                        }}
                                      />
                                    </ListItemButton>
                                  </Box>
                                ))}
                            </Box>
                          ))}
                      </Box>
                    ))}
                  </FireNav>
                </Box>
              </Drawer>
            </React.Fragment>
          ))}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{ color: 'inherit', }}
              uppercase={false}
              onClick={() => window.location.href = '/Home'}
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Home Page</Typography>
            </Button>
          </Box>
          <div size="large" aria-label="account of current user" aria-controls="menu-appbar" >
            <Typography variant="h6" component="React.Fragment" sx={{ flexGrow: 1, pr: 2 }} className='scaled-480px-Header' >
              <b>{data.name}</b>
            </Typography>
          </div>
          {auth && (
            <React.Fragment>
              <Box sx={{ flexGrow: 0 }}>
                <ThemeProvider
                  theme={createTheme({
                    components: {
                      MuiListItemButton: {
                        defaultProps: {
                          disableTouchRipple: true,
                        },
                      },
                    },
                    palette: {
                      mode: 'dark',
                      primary: {
                        main: '#1976d2',
                      },
                    },
                  })}
                >
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar className='scaled-logo-TableContent scaled-480px-TableContent' sx={{ width: 18, height: 18 }}{...stringAvatar(data.UserCode)} />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem disabled={data.DepCode === '101ITO' ? false : true} onClick={() => window.location.href = '/Permission_Pages'}>
                      <ListItemIcon sx={{ minWidth: '15% !important', pr: 1 }}>
                        <ManageAccountsIcon />
                      </ListItemIcon>
                      <ListItemText>Permission</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: '15% !important', pr: 1 }}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText>Log Out</ListItemText>
                    </MenuItem>
                  </Menu>
                </ThemeProvider>
              </Box>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </ThemeProvider >
  );
}
