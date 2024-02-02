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
import { Link } from 'react-router-dom'
import Nav_NAC from './FixAssets/Nav_NAC'
import Nav_SB from './SmartBill/Nav_SB'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GarageIcon from '@mui/icons-material/Garage';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';

const linkStyle = {
  textDecoration: "none",
  color: 'inherit',
};

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
  const data = JSON.parse(localStorage.getItem('data'));
  const menus = {
    title: ['NAC', 'SMB', 'NTI'],
    path: ['/NAC/HomePage_NAC', '/SMB/StartForms', '/NTI'],
    icon: [<MonetizationOnIcon />, <GarageIcon />, <OilBarrelIcon />]
  }
  const [state, setState] = React.useState({ left: false, });

  // Functions
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
        localStorage.removeItem("token");
        localStorage.removeItem("data");
        localStorage.removeItem("permission_MenuID");
        localStorage.removeItem("permission");
        localStorage.removeItem("Allaseets");
        localStorage.removeItem("aseetsCounted");
        localStorage.removeItem("assetsWrong");
        localStorage.removeItem("DataCreatePeriod");
        localStorage.removeItem("NacCode");
        localStorage.removeItem("pagination");
        localStorage.removeItem("pagination_user");
        localStorage.removeItem("filterModel");
        localStorage.removeItem("filterModel_user");
        localStorage.removeItem("filterNAC");
        localStorage.removeItem("filterNAC_user");
        window.location.href = '/'
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  if (window.location.href.split('/').filter((res) => res === 'SMB')[0]) {
    return (
      <Nav_SB stateNav={state} />
    );
  } else if (window.location.href.split('/').filter((res) => res === 'NAC')[0]) {
    return (
      <Nav_NAC stateNav={state} />
    );
  } else {
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
                    <List>
                      {menus.title.map((text, index) => (
                        <Link to={`${menus.path[index]}`} style={linkStyle}>
                          <ListItem key={text} disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                {menus.icon[index]}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                    <Divider />
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
      </ThemeProvider >
    );
  }
}
