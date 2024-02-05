/* eslint-disable react-hooks/exhaustive-deps */
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Axios from "axios"
import { Outlet, useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import config from '../../../../config'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  textAlign: 'start',
  color: '#ffffff',
}));

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

const other = {
  autoHeight: true,
  showCellVerticalBorder: true,
  showColumnVerticalBorder: true,
  rowSelection: false,
  pageSizeOptions: false,
  checkboxSelection: false,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport
        csvOptions={{
          fileName: 'ListForms',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

async function store_FA_control_drop_NAC(credentials) {
  return fetch(config.http + '/store_FA_control_drop_NAC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function History_of_assets() {

  const [selectNAC, setSelectNAC] = React.useState();
  const [progress, setProgress] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const checkUserWeb = localStorage.getItem('sucurity');
  const [getNac_Code, setGetNac_Code] = React.useState();
  const [newPage_value, setNewPage_value] = React.useState(0);
  const [filterNAC, setFilterNAC] = React.useState({ "nac_code": '', "name": '', "source_userid": '', "des_userid": '', "status_name": '' })
  const [selectFilterNAC, setSelectFilterNAC] = React.useState();
  const permission_MenuID = JSON.parse(localStorage.getItem('permission_MenuID'));


  const nacStatusName = [
    'ไม่ผ่านการอนุมัติ'
    , 'รอยืนยันรายการ'
    , 'รอตรวจสอบ'
    , 'รออนุมัติ'
    , 'ปลายทางตรวจรับ'
    , 'รอปิดรายการ'
    , 'ดำเนินการเสร็จสิ้น'
    , 'ตีกลับเอกสาร'
    , 'ไม่พบทรัพย์สิน'
    , 'รอกรอก Book Value'
    , 'กรอกราคาขายจริง'
    , 'รอปิดรายการ'
    , 'ได้รับทรัพย์สินไม่ครบ'
    , 'บัญชีตรวจสอบ'
    , 'ยกเลิกรายการแล้ว'
  ]

  const nacHeaders = [
    'เพิ่มบัญชีทรัพย์สินถาวร'
    , 'โยกย้ายทรัพย์สิน'
    , 'ขายทรัพย์สิน'
    , 'ตัดจากบัญชีทรัพย์สินถาวร'
    , 'เปลี่ยนแปลงรายละเอียดทรัพย์สิน'
  ]

  const filteringNAC_Code = async (e, newValue, reason, index) => {
    const NAC_Code = newValue

    var filter = {
      nac_code: NAC_Code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);


    if (JSON.stringify(check) === '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Headers = async (e, newValue, reason, index) => {
    const NAC_Headers = newValue

    var filter = {
      nac_code: filterNAC.nac_code
      , name: NAC_Headers
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) === '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_statusName = async (e, newValue, reason, index) => {
    const NAC_statusName = newValue

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: filterNAC.des_userid
      , status_name: NAC_statusName
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) === '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Source_userid = async (e, newValue, reason, index) => {
    const NAC_Source_userid = newValue

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: NAC_Source_userid
      , des_userid: filterNAC.des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) === '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const filteringNAC_Des_userid = async (e, newValue, reason, index) => {
    const NAC_Des_userid = newValue

    var filter = {
      nac_code: filterNAC.nac_code
      , name: filterNAC.name
      , source_userid: filterNAC.source_userid
      , des_userid: NAC_Des_userid
      , status_name: filterNAC.status_name
    }

    setFilterNAC(filter);

    localStorage.setItem('filterNAC', JSON.stringify(filter));

    const check = JSON.parse(JSON.stringify(filter),
      (key, value) => value === null || value === '' ? undefined : value);

    if (JSON.stringify(check) === '{}') {
      setSelectNAC(selectFilterNAC)
    } else {
      // POST request using axios with set headers
      const usercode = { usercode: data.UserCode }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };

      await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
        if (error.toJSON().message === 'Request failed with status code 400') {
          setProgress(1)
        }
      }).then(response => {
        setSelectNAC((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      });
    }
  }

  const change_page_NacOperation = (newPage) => {
    localStorage.setItem('pagination', JSON.stringify(newPage));
    setNewPage_value(newPage)
  }

  const filterModelChange = (newFilterModel) => {
    localStorage.setItem('filter_model', JSON.stringify(newFilterModel));
  }

  const listUseEffect = async () => {
    // POST request using axios with set headers
    const usercode = { usercode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_select_NAC_approve', usercode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.status === 200) {
        setSelectFilterNAC(response.data.data)
        setProgress(1)
        const check = JSON.parse(localStorage.getItem('filterNAC_user'),
          (key, value) => value === null || value === '' ? undefined : value);
        if (JSON.stringify(check) === '{}' || !JSON.stringify(check)) {
          setSelectNAC(response.data.data ?? [])
        } else {
          setFilterNAC(check)
          setSelectNAC((response.data.data).filter(function (item) {
            for (var key in check) {
              if (item[key] === undefined || item[key] !== check[key])
                return false;
            }
            return true;
          }))
        }
      }
    });
  }

  React.useEffect(() => {
    listUseEffect();
  }, []);

  const handleClickOpen = (event, params) => {
    event.preventDefault();
    setOpen(true);
    setGetNac_Code(params.row.nac_code);
  };

  const handleClose = (event, open) => {
    setOpen(false);
  };

  const handleEditClick = (event, params) => {
    event.preventDefault();
    localStorage.setItem('pagination_user', newPage_value);
    localStorage.removeItem("pagination");
    localStorage.setItem('NacCode', JSON.stringify({ nac_code: params.row.nac_code, nac_status: params.row.nac_status }));
    if (params.row.workflowtypeid === 1) {
      navigate('/NAC/AddAssets_2?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 2) {
      navigate('/NAC/TransferAssets_2?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 3) {
      navigate('/NAC/ChangeAssets_2?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 4) {
      navigate('/NAC/DeleteAssets_2?' + params.row.nac_code)
    } else if (params.row.workflowtypeid === 5) {
      navigate('/NAC/SealsAssets_2?' + params.row.nac_code)
    } else {
      navigate('/NAC/HomePage_NAC')
    }
    localStorage.setItem('list_satatusNAC', '/NAC/AdminStatus');
  };

  const handleDrop_NAC = async () => {
    const usercode = data.UserCode
    const nac_code = !getNac_Code ? '' : getNac_Code;
    const response = await store_FA_control_drop_NAC({
      usercode,
      nac_code,
    });
    if ('data' in response) {
      swal("แจ้งเตือน", 'ทำการลบรายการ ' + response.data[0].nac_code + ' แล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
        if ((permission_MenuID ? permission_MenuID.includes(2) : null) === true) {
          window.location.href = "/NAC/AdminStatus";
        }
      });
    } else {
      swal("แจ้งเตือน", 'ไม่สามารถลบ ' + response.data[0].nac_code + ' ได้', "error")
    }
    setOpen(false);
  }

  const columns = [
    {
      field: 'nac_code',
      headerName: 'เลขที่เอกสาร',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Stack direction="row" spacing={2}>
              <Stack>
                {params.row.nac_code}
              </Stack>
              <Stack>
                {
                  params.row.source_approve_userid || params.row.verify_by_userid || params.row.nac_status === 3 ?
                    <CheckCircleIcon fontSize="small" color={params.row.source_approve_userid ? "success" : "primary"} />
                    : params.row.nac_status === 2 ?
                      <ErrorIcon fontSize="small" color="warning" />
                      : null
                }
              </Stack>
            </Stack>
          </React.Fragment>
        )
      }
    },
    { field: 'name', headerName: 'หัวข้อรายการ', headerClassName: 'super-app-theme--header', minWidth: 230, flex: 1 },
    {
      field: 'create_date',
      headerName: 'วันที่สร้างเอกสาร',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.create_date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.create_date.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'source_userid',
      headerName: 'ผู้ส่ง',
      headerClassName: 'super-app-theme--header',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {!params.row.source_userid ?
              '-'
              :
              <React.Fragment>
                {params.row.source_userid}
              </React.Fragment>
            }
          </React.Fragment>
        )
      }
    },
    {
      field: 'des_userid',
      headerName: 'ผู้รับ',
      headerClassName: 'super-app-theme--header',
      minWidth: 120,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {!params.row.des_userid ?
              '-'
              :
              <React.Fragment>
                {params.row.des_userid}
              </React.Fragment>
            }
          </React.Fragment>
        )
      }
    },
    {
      field: 'status_name',
      headerName: 'สถานะรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 160,
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Item
              style={{
                //'maxWidth': 'fit-content',
                borderRadius: '100px',
                width: '100%',
                textAlign: 'center',
                'backgroundColor': params.row.nac_status === 1 ?
                  '#1E90FF' : params.row.nac_status === 2 ?
                    '#6495ED' : params.row.nac_status === 3 ?
                      '#FF69B4' : params.row.nac_status === 4 ?
                        '#00CED1' : params.row.nac_status === 5 ?
                          '#6A5ACD' : params.row.nac_status === 6 ?
                            '#008000' : params.row.nac_status === 7 ?
                              '#FFA500' : params.row.nac_status === 8 ?
                                '#F0E68C' : params.row.nac_status === 11 ?
                                  '#F4A460' : params.row.nac_status === 12 ?
                                    '#DDA0DD' : params.row.nac_status === 13 ?
                                      '#6A5ACD' : params.row.nac_status === 14 ?
                                        '#708090' : params.row.nac_status === 15 ?
                                          '#6A5ACD' : '#DC143C'
              }}
            >
              {params.row.status_name}
            </Item>
          </React.Fragment>
        );
      },
    },
    {
      field: 'userid_approver',
      headerName: 'ผู้ตรวจสอบ/อนุมัติ',
      headerClassName: 'super-app-theme--header',
      align: 'center',
      headerAlign: 'center',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {
              (params.row.nac_status === 4 || params.row.nac_status === 14) ?
                params.row.des_userid : (params.row.nac_status === 12) ? params.row.source_userid : params.row.userid_approver
            }
          </React.Fragment>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header',
      width: 160,
      disableExport: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Grid container rowSpacing={1}>
              <React.Fragment>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={(event) => handleEditClick(event, params)}
                    sx={{ p: { xs: 1, md: 1 } }}
                  >
                    <ArticleIcon />
                  </Button>
                </Grid>
              </React.Fragment>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  disabled={(checkUserWeb === 'admin' && params.row.nac_status !== 17) && (checkUserWeb === 'admin' && params.row.nac_status !== 6) ? false : true}
                  onClick={(event) => handleClickOpen(event, params)}
                  sx={{ p: { xs: 1, md: 1 } }}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h5" className="scaled-logo-Header" color="inherit" >
            สถานะรายการ NAC
          </Typography>
        </Toolbar>
      </AppBar>
      {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 1, sm: 2 }}
          >
            <Grid item xs>
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filterNAC.nac_code}
                onChange={(e, newValue, reason) => filteringNAC_Code(e, newValue, reason)}
                options={selectNAC ? selectNAC.map((res) => res.nac_code) : []}
                renderInput={(params) => <TextField label="เลขที่ NAC" {...params} />}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filterNAC.name}
                onChange={(e, newValue, reason) => filteringNAC_Headers(e, newValue, reason)}
                options={nacHeaders}
                renderInput={(params) => <TextField label="หัวข้อรายการ" {...params} />}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filterNAC.source_userid}
                onChange={(e, newValue, reason) => filteringNAC_Source_userid(e, newValue, reason)}
                options={
                  selectNAC ? selectNAC.map((res) => res.source_userid).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="ผู้ส่งมอบ" {...params} />}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filterNAC.des_userid}
                onChange={(e, newValue, reason) => filteringNAC_Des_userid(e, newValue, reason)}
                options={
                  selectNAC ? selectNAC.map((res) => res.des_userid).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="ผู้รับมอบ" {...params} />}
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filterNAC.status_name}
                onChange={(e, newValue, reason) => filteringNAC_statusName(e, newValue, reason)}
                options={nacStatusName.reduce((x, y) => x.includes(y) ? x : [...x, y], [])}
                renderInput={(params) => <TextField label="สถานะ" {...params} />}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              p: 1,
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Stack direction="row" spacing={2}>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                <ErrorIcon fontSize="small" color="warning" />รอตรวจสอบ
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                <CheckCircleIcon fontSize="small" color="primary" />ผ่านการตรวจสอบแล้ว
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                <CheckCircleIcon fontSize="small" color="success" />ผ่านการอุนมัติแล้ว
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ py: 2 }}>
            <DataGrid
              rows={selectNAC ? selectNAC : []}
              columns={columns}
              getRowId={(selectNAC) => selectNAC.nac_code}
              initialState={{
                ...data.initialState,
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                filter: {
                  filterModel: JSON.parse(localStorage.getItem('filter_model'))
                },
              }}
              onPaginationModelChange={(newPage) => change_page_NacOperation(newPage)}
              onFilterModelChange={(newFilterModel) => filterModelChange(newFilterModel)}
              getRowHeight={() => 'auto'}
              sx={{
                '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                  py: '0.25rem',
                },
                '--DataGrid-overlayHeight': '300px'
              }}
              slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              {...other}
            />
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"แจ้งเตือน"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ท่านแน่ใจที่จะลบรายการ {!getNac_Code ? '' : getNac_Code} ใช่หรือไม่
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                onClick={handleDrop_NAC}
              >ใช่
              </Button>
              <Button
                variant="contained"
                sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                color='error'
                onClick={handleClose}
                autoFocus
              >
                ไม่
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
      <Outlet />
    </React.Fragment >
  );
}