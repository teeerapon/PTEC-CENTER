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
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import Axios from "axios";
import config from '../config';
import HomeIcon from '@mui/icons-material/Home';
import SvgIcon from '@mui/material/SvgIcon';
import ArticleIcon from '@mui/icons-material/Article';
import Grid from '@mui/material/Grid';

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

  const handleClickList = (e) => {
    if (window.location.pathname === '/SMB/StartForms' || window.location.pathname === '/SMB/FormUpdate') {
      window.location.href = '/SMB/ListForms'
    } else if (window.location.pathname === '/SMB/Payment') {
      window.location.href = '/SMB/ListWithdraw'
    } else if (
      window.location.pathname === '/NAC/AddAssets_1' ||
      window.location.pathname === '/NAC/ChangeAssets_1' ||
      window.location.pathname === '/NAC/TransferAssets_1' ||
      window.location.pathname === '/NAC/SealsAssets_1' ||
      window.location.pathname === '/NAC/DeleteAssets_1' ||
      window.location.pathname === '/NAC/AddAssets_2' ||
      window.location.pathname === '/NAC/ChangeAssets_2' ||
      window.location.pathname === '/NAC/TransferAssets_2' ||
      window.location.pathname === '/NAC/SealsAssets_2' ||
      window.location.pathname === '/NAC/DeleteAssets_2'
    ) {
      window.location.href = localStorage.getItem('list_satatusNAC');
    }
  };

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
              <Tooltip title="Menu on">
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
              </Tooltip>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <Box
                  elevation={0}
                  sx={{ width: '20rem !important' }}
                  role="presentation"
                >
                  <FireNav component="nav" disablePadding>
                    <ListItem component="div" disablePadding>
                      <ListItemButton
                        alignItems="center"
                        sx={{ py: 2.5 }}
                        onClick={() => navigate('/Home')}
                      >
                        <ListItemIcon>
                          <HomeIcon sx={{ fontSize: '1.2rem !important' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="HOME"
                          primaryTypographyProps={{
                            fontSize: '1rem !important',
                            fontWeight: 'medium',
                            lineHeight: '20px',
                          }}
                        />
                      </ListItemButton>
                      <Tooltip title="Menu Off">
                        <IconButton
                          size="large"
                          onClick={toggleDrawer(anchor, false)}
                          sx={{
                            '& svg': {
                              transition: '0.2s',
                              transform: 'translateX(0) rotate(0)',
                            },
                            '&:hover, &:focus': {
                              bgcolor: 'unset',
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
                          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  </FireNav>
                  <FireNav component="nav" disablePadding>
                    <Divider />
                    {menuMain.map((res, index) => (
                      <Box
                        sx={{
                          bgcolor: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(71, 98, 130, 0.2)' : null,
                          // py: (open && (menuState[0].systemid === res.systemid)) ? 2 : 0,
                        }}
                      >
                        <ListItemButton
                          alignItems="center"
                          onClick={(e) => handleMenuMain(e, res, index)}
                          sx={{
                            px: 3,
                            pt: 2.5,
                            pb: (open && (menuState[0].systemid === res.systemid)) ? 0 : 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(255,165,000,1)' : null,
                              mb: (open && (menuState[0].systemid === res.systemid)) ? 2.5 : 0
                            }}
                          >
                            <SvgIcon sx={{ fontSize: '1.2rem !important' }}>
                              <path d={res.emoji} />
                            </SvgIcon>
                          </ListItemIcon>
                          <ListItemText
                            primary={res.systemname}
                            primaryTypographyProps={{
                              fontSize: '1rem !important',
                              fontWeight: 'medium',
                              lineHeight: '20px',
                              mb: '2px',
                              color: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(255,165,000,1)' : null,
                            }}
                            secondary={res.secondaryname}
                            secondaryTypographyProps={{
                              noWrap: true,
                              fontSize: '0.8rem !important',
                              lineHeight: '16px',
                              color: (open && (menuState[0].systemid === res.systemid)) ? 'rgba(255,165,000,0.5)' : 'rgba(255,255,255,0.5)',
                              mb: (open && (menuState[0].systemid === res.systemid)) ? 2.5 : 0
                            }}
                            sx={{ my: 0 }}
                          />
                          <KeyboardArrowDown
                            sx={{
                              mr: -1,
                              opacity: (open && (menuState[0].systemid === res.systemid)) ? 1 : 0,
                              transform: (open && (menuState[0].systemid === res.systemid)) ? 'rotate(-180deg)' : 'rotate(0)',
                              transition: '0.2s',
                              mb: (open && (menuState[0].systemid === res.systemid)) ? 2.5 : 0
                            }}
                          />
                        </ListItemButton>
                        {(open && (menuState[0].systemid === res.systemid)) &&
                          menuState.map((resItem, itemIndex) => (
                            <Box>
                              <ListItemButton
                                key={resItem.primaryMenuName}
                                sx={{ py: 0, minHeight: 32 }}
                                onClick={(e) => {
                                  if (resItem.primaryTree === true) {
                                    handleMenuPrimary(e, resItem, itemIndex)
                                  } else {
                                    navigate(resItem.MenuPath)
                                  }
                                }}
                              >
                                <ListItemIcon>
                                  <CircleIcon sx={{ fontSize: '0.5rem !important' }} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={resItem.primaryMenuName}
                                  primaryTypographyProps={{
                                    fontSize: '0.9rem !important',
                                    fontWeight: 'medium',
                                  }}
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
                                      sx={{ py: 0, minHeight: 32 }}
                                      onClick={() => navigate(resItem.MenuPath)}
                                    >
                                      <ListItemIcon>
                                        <MenuIcon sx={{ fontSize: '0.5rem !important' }} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={resItem.secondaryMenuName}
                                        primaryTypographyProps={{ fontSize: '0.9rem !important', fontWeight: 'medium' }}
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={7} md={9}>
                <Button
                  sx={{ color: 'inherit', }}
                  uppercase={false}
                  onClick={() => window.location.href = '/Home'}
                >
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Home Page</Typography>
                </Button>
              </Grid>
              <Grid item xs={1} md={1}>
                <Box
                  alignItems="flex-end"
                  sx={{
                    display: (window.location.pathname === '/SMB/StartForms' ||
                      window.location.pathname === '/SMB/FormUpdate' ||
                      window.location.pathname === '/SMB/Payment' ||
                      window.location.pathname === '/NAC/AddAssets_1' ||
                      window.location.pathname === '/NAC/ChangeAssets_1' ||
                      window.location.pathname === '/NAC/TransferAssets_1' ||
                      window.location.pathname === '/NAC/SealsAssets_1' ||
                      window.location.pathname === '/NAC/DeleteAssets_1' ||
                      window.location.pathname === '/NAC/AddAssets_2' ||
                      window.location.pathname === '/NAC/ChangeAssets_2' ||
                      window.location.pathname === '/NAC/TransferAssets_2' ||
                      window.location.pathname === '/NAC/SealsAssets_2' ||
                      window.location.pathname === '/NAC/DeleteAssets_2') ? '' : 'none'
                  }}
                >
                  <IconButton onClick={handleClickList}>
                    <ArticleIcon sx={{ fontSize: '1.2rem !important' }} />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={4} md={2}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <div size="large" aria-label="account of current user" aria-controls="menu-appbar" >
                      <Typography
                        variant="h6"
                        component="React.Fragment"
                        sx={{ flexGrow: 1, pr: 2, display: { xs: 'none', md: 'flex' } }}
                        className='scaled-480px-Header'
                      >
                        <b>{data.name}</b>
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {auth &&
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
          }
        </Toolbar >
      </AppBar >
      <Outlet />
    </ThemeProvider >
  );
}
