/* eslint-disable react-hooks/exhaustive-deps */
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import swal from 'sweetalert'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import GradeIcon from '@mui/icons-material/Grade';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import { orange } from '@mui/material/colors';
import Axios from "axios"
import config from '../../config'
import { Link } from 'react-router-dom'

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

export default function ButtonAppBar({ stateNav }) {
  const theme = useTheme();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const data = JSON.parse(localStorage.getItem('data'));
  const menus = {
    title: ['NAC CREATE', 'NAC STATUS', 'NAC PERIOD', 'ASSETS REPORT', 'BPC'],
  }
  const [state, setState] = React.useState({ left: stateNav.left, });
  const [openCollapse0, setOpenCollapse0] = React.useState(false);
  const [openCollapse1, setOpenCollapse1] = React.useState(false);
  const [openCollapse2, setOpenCollapse2] = React.useState(false);
  const [openCollapse3, setOpenCollapse3] = React.useState(false);
  const [openCollapse4, setOpenCollapse4] = React.useState(false);

  //permission
  const [permission_menuID, setPermission_menuID] = React.useState();

  const create_nac = [
    {
      label: 'เพิ่มบัญชีทรัพย์สิน',
      url: '/NAC/AddAssets_1',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(1) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'เปลี่ยนแปลงรายละเอียด',
      url: '/NAC/ChangeAssets_1',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(1) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'โยกย้ายทรัพย์สิน',
      url: '/NAC/TransferAssets_1'
    },
    {
      label: 'ขายทรัพย์สิน',
      url: '/NAC/SealsAssets_1'
    },
    {
      label: 'ตัดบัญชีทรัพย์สิน',
      url: '/NAC/DeleteAssets_1',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: data.branchid === 901 ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
  ]

  const nac_status = [
    {
      label: 'สถานะรายการ NAC',
      url: '/NAC/AdminStatus',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(2) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'สถานะรายการ NAC',
      url: '/NAC/UserStatus'
    },
  ]

  const period = [
    {
      label: 'เพิ่มรอบตรวจนับ',
      url: '/NAC/CreatePeriod',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(3) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'แก้ไขรอบตรวจนับ',
      url: '/NAC/EditPeriod',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(4) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
  ]

  const report = [
    {
      label: 'รายงานตรวจนับทรัพย์สิน',
      url: '/NAC/CountedAssets',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(7) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'ประวัติทรัพย์สิน NAC',
      url: '/NAC/HistoryAssetsNAC',
      adminPage: <FontDownloadIcon sx={{ fontSize: '0.65rem !important', color: orange[500] }} />,
      permission: (permission_menuID ? permission_menuID.includes(8) : null) === true ? 1 : 0,
      permission_branch: data.branchid === 901 ? 1 : 0
    },
    {
      label: 'E-Book NAC',
      url: data.branchid === 901 ? '/NAC/EbookAll' : '/NAC/EbookBranch',
    },
    {
      label: 'ทะเบียนทรัพย์สิน',
      url: data.branchid === 901 ? '/NAC/AssetsAll' : '/NAC/AssetsBranch',
    },
    {
      label: 'รายงานตรวจนับทรัพย์สิน',
      url: '/NAC/CountedLocation'
    },
  ]

  const bpc = [
    {
      label: 'E-Book BPC',
      url: '/BSAssetsMain'
    },
    {
      label: 'สถานะรายการทรัพย์สินผู้ร่วม',
      url: '/BpcStatus'
    },
    {
      label: 'ประวัติทรัพย์สินผู้ร่วม',
      url: '/TransectionList'
    },
  ]

  // Functions
  const handleClickCollapse = (e, index) => {
    if (index === 0) {
      setOpenCollapse0(!openCollapse0);
    } else if (index === 1) {
      setOpenCollapse1(!openCollapse1);
    } else if (index === 2) {
      setOpenCollapse2(!openCollapse2);
    } else if (index === 3) {
      setOpenCollapse3(!openCollapse3);
    } else if (index === 4) {
      setOpenCollapse4(!openCollapse4);
    }
  };

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

  const ListPermission = async () => {
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers })
      .then(response => {
        setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      });
  }

  React.useEffect(() => {
    ListPermission();
  }, []);

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
                <List>
                  <Link to={`/`} style={linkStyle}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MapsHomeWorkIcon />
                        </ListItemIcon>
                        <ListItemText primary={'HOME PAGE'} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </List>
                <Divider />
                <Box
                  sx={{ width: '20rem !important' }}
                  role="presentation"
                >
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    {menus.title.map((text, index) => (
                      <React.Fragment>
                        {(index === 0 && create_nac.filter((res) => res.permission !== 0 || res.permission_branch !== 0)[0]) ?
                          (
                            <React.Fragment>
                              <ListItemButton onClick={(e) => handleClickCollapse(e, index)}>
                                <ListItemIcon>
                                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {(openCollapse0 === true && index === 0) ? <ExpandLess /> :
                                  (openCollapse1 === true && index === 1) ? <ExpandLess /> :
                                    (openCollapse2 === true && index === 2) ? <ExpandLess /> :
                                      (openCollapse3 === true && index === 3) ? <ExpandLess /> :
                                        (openCollapse4 === true && index === 4) ? <ExpandLess /> :
                                          <ExpandMore />}
                              </ListItemButton>
                            </React.Fragment>
                          ) : (index === 1 && nac_status.filter((res) => res.permission !== 0 || res.permission_branch !== 0)[0]) ?
                            (
                              <React.Fragment>
                                <ListItemButton onClick={(e) => handleClickCollapse(e, index)}>
                                  <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                  </ListItemIcon>
                                  <ListItemText primary={text} />
                                  {(openCollapse0 === true && index === 0) ? <ExpandLess /> :
                                    (openCollapse1 === true && index === 1) ? <ExpandLess /> :
                                      (openCollapse2 === true && index === 2) ? <ExpandLess /> :
                                        (openCollapse3 === true && index === 3) ? <ExpandLess /> :
                                          (openCollapse4 === true && index === 4) ? <ExpandLess /> :
                                            <ExpandMore />}
                                </ListItemButton>
                              </React.Fragment>
                            ) : (index === 2 && period.filter((res) => res.permission !== 0 || res.permission_branch !== 0)[0]) ?
                              (
                                <React.Fragment>
                                  <ListItemButton onClick={(e) => handleClickCollapse(e, index)}>
                                    <ListItemIcon>
                                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                    {(openCollapse0 === true && index === 0) ? <ExpandLess /> :
                                      (openCollapse1 === true && index === 1) ? <ExpandLess /> :
                                        (openCollapse2 === true && index === 2) ? <ExpandLess /> :
                                          (openCollapse3 === true && index === 3) ? <ExpandLess /> :
                                            (openCollapse4 === true && index === 4) ? <ExpandLess /> :
                                              <ExpandMore />}
                                  </ListItemButton>
                                </React.Fragment>
                              ) : (index === 3 && report.filter((res) => res.permission !== 0 || res.permission_branch !== 0)[0]) ?
                                (
                                  <React.Fragment>
                                    <ListItemButton onClick={(e) => handleClickCollapse(e, index)}>
                                      <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                      </ListItemIcon>
                                      <ListItemText primary={text} />
                                      {(openCollapse0 === true && index === 0) ? <ExpandLess /> :
                                        (openCollapse1 === true && index === 1) ? <ExpandLess /> :
                                          (openCollapse2 === true && index === 2) ? <ExpandLess /> :
                                            (openCollapse3 === true && index === 3) ? <ExpandLess /> :
                                              (openCollapse4 === true && index === 4) ? <ExpandLess /> :
                                                <ExpandMore />}
                                    </ListItemButton>
                                  </React.Fragment>
                                ) : (index === 4 && bpc.filter((res) => res.permission !== 0 || res.permission_branch !== 0)[0]) ?
                                  (
                                    <React.Fragment>
                                      <ListItemButton onClick={(e) => handleClickCollapse(e, index)}>
                                        <ListItemIcon>
                                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {(openCollapse0 === true && index === 0) ? <ExpandLess /> :
                                          (openCollapse1 === true && index === 1) ? <ExpandLess /> :
                                            (openCollapse2 === true && index === 2) ? <ExpandLess /> :
                                              (openCollapse3 === true && index === 3) ? <ExpandLess /> :
                                                (openCollapse4 === true && index === 4) ? <ExpandLess /> :
                                                  <ExpandMore />}
                                      </ListItemButton>
                                    </React.Fragment>
                                  ) : null}
                        {index === 0 ? (
                          <Collapse in={openCollapse0} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {create_nac.map((resText, resIndex) => (
                                <React.Fragment>
                                  {(resText.permission_branch !== 0 || resText.permission !== 0) ? (
                                    <Link to={`${resText.url}`} style={linkStyle}>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                          <GradeIcon sx={{ fontSize: '0.65rem !important' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={resText.label} />
                                        {resText.adminPage ? resText.adminPage : null}
                                      </ListItemButton>
                                    </Link>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Collapse>
                        ) : index === 1 ? (
                          <Collapse in={openCollapse1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {nac_status.map((resText, resIndex) => (
                                <React.Fragment>
                                  {(resText.permission_branch !== 0 || resText.permission !== 0) ? (
                                    <Link to={`${resText.url}`} style={linkStyle}>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                          <GradeIcon sx={{ fontSize: '0.65rem !important' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={resText.label} />
                                        {resText.adminPage ? resText.adminPage : null}
                                      </ListItemButton>
                                    </Link>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Collapse>
                        ) : index === 2 ? (
                          <Collapse in={openCollapse2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {period.map((resText, resIndex) => (
                                <React.Fragment>
                                  {(resText.permission_branch !== 0 || resText.permission !== 0) ? (
                                    <Link to={`${resText.url}`} style={linkStyle}>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                          <GradeIcon sx={{ fontSize: '0.65rem !important' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={resText.label} />
                                        {resText.adminPage ? resText.adminPage : null}
                                      </ListItemButton>
                                    </Link>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Collapse>
                        ) : index === 3 ? (
                          <Collapse in={openCollapse3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {report.map((resText, resIndex) => (
                                <React.Fragment>
                                  {(resText.permission_branch !== 0 || resText.permission !== 0) ? (
                                    <Link to={`${resText.url}`} style={linkStyle}>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                          <GradeIcon sx={{ fontSize: '0.65rem !important' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={resText.label} />
                                        {resText.adminPage ? resText.adminPage : null}
                                      </ListItemButton>
                                    </Link>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Collapse>
                        ) : index === 4 ? (
                          <Collapse in={openCollapse4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {bpc.map((resText, resIndex) => (
                                <React.Fragment>
                                  {(resText.permission_branch !== 0 || resText.permission !== 0) ? (
                                    <Link Link to={`${resText.url}`} style={linkStyle}>
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                          <GradeIcon sx={{ fontSize: '0.65rem !important' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={resText.label} />
                                        {resText.adminPage ? resText.adminPage : null}
                                      </ListItemButton>
                                    </Link>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Collapse>
                        ) : null}
                      </React.Fragment>
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