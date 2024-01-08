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
import Axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

export default function History_of_assets() {
  const [dataHistory, setDataHistory] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [progress, setProgress] = React.useState();
  const [filter, setFilter] = React.useState({ "nacdtl_assetsCode": '', "name": '', "source_approve_userid": '', "update_date": '', "nac_code": '' })


  const filter_Code = async (e, newValue, reason) => {

    var filterJSON = {
      nacdtl_assetsCode: newValue
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateBy = async (e, newValue, reason) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: newValue
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_TabCode = async (e, newValue, reason) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: newValue
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_CreateDate = async (e, newValue, reason) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: filter.name
      , source_approve_userid: filter.source_approve_userid
      , update_date: newValue
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
      }
    });
  }

  const filter_Name = async (e, newValue, reason) => {

    var filterJSON = {
      nacdtl_assetsCode: filter.nacdtl_assetsCode
      , name: newValue
      , source_approve_userid: filter.source_approve_userid
      , update_date: filter.update_date
      , nac_code: filter.nac_code
    }

    setFilter(filterJSON);

    const check = JSON.parse(JSON.stringify(filterJSON),
      (key, value) => value === null || value === '' ? undefined : value);

    // POST request using axios with set headers
    const body = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      if (response.data) {
        setProgress(1)
        setDataHistory((response.data.data).filter(function (item) {
          for (var key in check) {
            if (item[key] === undefined || item[key] !== check[key])
              return false;
          }
          return true;
        }))
        setProgress(1)
      }
    });
  }

  const columns = [
    { field: 'nacdtl_assetsCode', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'nacdtl_assetsName', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    {
      field: 'nacdtl_assetsPrice',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.nacdtl_assetsPrice.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) || ''}`,
    },
    { field: 'nac_code', headerName: 'เลขที่ NAC', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'หัวข้อรายการ', headerClassName: 'super-app-theme--header', minWidth: 200, flex: 1 },
    { field: 'create_by', headerName: 'ผู้ทำรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    { field: 'source_approve_userid', headerName: 'ผู้อนุมัติ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    { field: 'account_aprrove_id', headerName: 'ผู้ปิดรายการ', headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', minWidth: 100, flex: 1 },
    {
      field: 'update_date',
      headerName: 'วันที่ปิดรายการ',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.update_date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.update_date.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
  ];

  const listHistory = async () => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/store_FA_control_HistorysAssets', userCode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setDataHistory(response.data.data)
      setProgress(1)
    });
  }

  React.useEffect(() => {
    listHistory();
  }, []);


  if (checkUserWeb === 'null') {
    window.location.href = '/NAC/HomePage_NAC';
  } else {
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
            <Typography variant="h5" color="inherit" >
              ประวัติทรัพย์สินที่ดำเนินการเสร็จสิ้น
            </Typography>
          </Toolbar>
        </AppBar>
        {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filter.nacdtl_assetsCode}
                onChange={(e, newValue, reason) => filter_Code(e, newValue, reason)}
                options={
                  dataHistory ? dataHistory.map((res) => res.nacdtl_assetsCode).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="รหัสทรัพย์สิน" {...params} />}
              />
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filter.name}
                onChange={(e, newValue, reason) => filter_Name(e, newValue, reason)}
                options={
                  dataHistory ? dataHistory.map((res) => res.name).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="ชื่อหัวข้อ" {...params} />}
              />
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filter.source_approve_userid}
                onChange={(e, newValue, reason) => filter_CreateBy(e, newValue, reason)}
                options={
                  dataHistory ? dataHistory.map((res) => res.source_approve_userid).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="ผู้อนุมัติรายการ" {...params} />}
              />
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filter.update_date}
                onChange={(e, newValue, reason) => filter_CreateDate(e, newValue, reason)}
                options={
                  dataHistory ? dataHistory.map((res) => res.update_date).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="วันที่ปิดรายการ" {...params} />}
              />
              <Autocomplete
                autoHighlight
                disablePortal
                id="combo-box-demo"
                size='small'
                sx={{ flexGrow: 1, padding: 1 }}
                value={filter.nac_code}
                onChange={(e, newValue, reason) => filter_TabCode(e, newValue, reason)}
                options={
                  dataHistory ? dataHistory.map((res) => res.nac_code).filter(x => !!x)
                    .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                }
                renderInput={(params) => <TextField label="เลขที่ NAC" {...params} />}
              />
            </Stack>
            <Box sx={{ py: 2 }}>
              <DataGrid
                rows={dataHistory ?? []}
                columns={columns}
                getRowId={(dataHistory) => dataHistory.nacdtl_id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
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
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}