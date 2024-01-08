import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios"
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import config from '../config'
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const theme = createTheme();

const ODD_OPACITY = 0.2;

const other = {
  showCellRightBorder: true,
  showColumnRightBorder: true,
};

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  '.css-1knaqv7-MuiButtonBase-root-MuiButton-root': {
    color: 'rgba(0, 0, 0, 1)',
  },
  '.css-f3jnds-MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255,1)',
  },
  '.css-1s0hp0k-MuiDataGrid-columnHeadersInner': {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 255, 255, 1)',
    '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
      color: 'rgba(255, 255, 255, 1)',
      display: 'none'
    },
    '.css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
      color: 'rgba(255, 255, 255,1)'
    },
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[100],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export default function Permission_NAC() {

  const data = JSON.parse(localStorage.getItem('data'));
  const [menu, setMenu] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [menuActive, setMenuActive] = React.useState([]);
  const [selectUser, setSelectUser] = React.useState();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setActive_User = async (event, params) => {
    const body = { admin: data.UserCode, UserCode: selectUser, menuid: params.row.menuid, id: event.target.id }
    const bodyII = { Permission_TypeID: 1, UserCode: selectUser }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + "/Fix_Assets_Control_UPDATE_Permission", body, { headers })
      .then(async response => {
        if (response.data.data) {
          await Axios.post(config.http + "/Select_Permission_Menu_NAC", bodyII, { headers })
            .then(response => {
              if (response.data.data) {
                setMenuActive((response.data.data).map((res) => res.menuid))
                setSelectUser(selectUser)
              } else {
                setMenuActive(null)
              }
            })
        } else {
          swal("แจ้งเตือน", 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', "error")
        }
      })

  }

  async function fetchData() {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const { data } = await Axios.get(config.http + "/getsUserForAssetsControl")
    await Axios.post(config.http + "/Permission_Menu_NAC", {}, { headers })
      .then(response => setMenu(response.data.data))

    setUser(data.data);
  }

  React.useEffect(() => {
    fetchData()
  }, []);

  const columns_I = [
    {
      field: 'menu_name',
      headerName: 'ข้อความ',
      headerClassName: 'super-app-theme--header',
      minWidth: 250,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant="body1" gutterBottom>
              {params.row.menu_name}
            </Typography>
          </React.Fragment>
        )
      }
    },
    {
      field: 'Permission',
      headerName: 'สิทธิ์',
      headerClassName: 'super-app-theme--header',
      minWidth: 220,
      flex: 1,
      disableExport: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  id={(menuActive.findIndex((res) => res === params.row.menuid) < 0) ? 0 : 1}
                  checked={(menuActive.findIndex((res) => res === params.row.menuid) < 0) ? false : true}
                  onChange={(event) => setActive_User(event, params)}
                />
              }
              label={(menuActive.findIndex((res) => res === params.row.menuid) < 0) ? 'ไม่ได้ใช้งาน' : 'กำลังใช้งาน'}
            />
          </React.Fragment>
        );
      }
    },
  ]

  const selectValue = async (e) => {
    const UserCode = e.target.innerText
    const body = { Permission_TypeID: 1, UserCode: UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + "/Select_Permission_Menu_NAC", body, { headers })
      .then(response => {
        if (response.data.data) {
          setMenuActive((response.data.data).map((res) => res.menuid))
          setSelectUser(e.target.innerText)
        } else {
          setMenuActive(null)
        }
      })

  }

  if (data.DepCode === ('101ITO' || 'ITO')) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg" sx={{ pt: 3, pb: 3 }}>
          <Autocomplete
                     autoHighlight
            freeSolo
            sx={{ pb: 2 }}
            size="small"
            options={user}
            getOptionLabel={(option) => option.UserCode}
            filterOptions={filterOptions2}
            onChange={selectValue}
            renderInput={(params) =>
              <TextField
                fullWidth
                size="small"
                label='รหัสพนักงาน'
                {...params}
              />}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="ระบบอนุมัติ" {...a11yProps(0)} />
                <Tab label="ระบบแสดงเมนูทรัพย์สิน NAC" {...a11yProps(1)} />
                <Tab label="ระบบแสดงเมนูทรัพย์สินผู้ร่วม" {...a11yProps(2)} />
                <Tab label="ระบบ Smart Project" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box sx={{ width: '100%' }}>
                <StripedDataGrid
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                  }}
                  rows={menu.filter((res) => res.menutypeid === 1)}
                  columns={columns_I}
                  getRowId={(res) => res.menuid}
                  disableColumnMenu
                  autoHeight
                  // getRowHeight={() => 'auto'}
                  density='compact'
                  pageSize={menu.length}
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Box sx={{ width: '100%' }}>
                <StripedDataGrid
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                  }}
                  rows={menu.filter((res) => res.menutypeid === 2)}
                  columns={columns_I}
                  getRowId={(res) => res.menuid}
                  disableColumnMenu
                  autoHeight
                  density='compact'
                  pageSize={menu.length}
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Box sx={{ width: '100%' }}>
                <StripedDataGrid
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                  }}
                  rows={menu.filter((res) => res.menutypeid === 3)}
                  columns={columns_I}
                  getRowId={(res) => res.menuid}
                  disableColumnMenu
                  autoHeight
                  density='compact'
                  pageSize={menu.length}
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Box sx={{ width: '100%' }}>
                <StripedDataGrid
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 2,
                    boxShadow: 1,
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                  }}
                  rows={menu.filter((res) => res.menutypeid === 4)}
                  columns={columns_I}
                  getRowId={(res) => res.menuid}
                  disableColumnMenu
                  autoHeight
                  density='compact'
                  pageSize={menu.length}
                  disableSelectionOnClick
                  {...other}
                //checkboxSelection
                />
              </Box>
            </CustomTabPanel>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    swal("แจ้งเตือน", 'ไม่มีสิทธิ์ในรายการนี้', "error").then((value) => {
      window.location.href = '/DATA_CENTER';
    })
  }
}