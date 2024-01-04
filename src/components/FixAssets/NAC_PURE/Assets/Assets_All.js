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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import * as XLSX from 'xlsx';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ fontSize: 100 }} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" component="div">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



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
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState();
  const [name, setName] = React.useState();
  const [serialNo, setSerialNo] = React.useState();
  const [create_Date, setCeate_Date] = React.useState(null);
  const [price, setPrice] = React.useState();
  const [details, setDetails] = React.useState();
  const [branchID, setBranchID] = React.useState();
  const [dataFile, setDataFile] = React.useState();
  const [field, setField] = React.useState()
  const [openXlsx, setOpenXlsx] = React.useState(false);
  const [nameExcel, setNameExcel] = React.useState()
  const [permission_menuID, setPermission_menuID] = React.useState();
  const [progress, setProgress] = React.useState();
  const [arraySubmit, setArraySubmit] = React.useState()
  const [asset_group, setAsset_group] = React.useState()
  const [group_name, setGroup_name] = React.useState()
  const [ownerCode, setOwnerCode] = React.useState()
  const [position, setPosition] = React.useState()

  const listPermission = async () => {
    const body = { Permission_TypeID: 1, userID: data.userid }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/select_Permission_Menu_NAC', body, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setPermission_menuID(response.data.data.map((res) => res.Permission_MenuID))
      setProgress(1)
    });
  }

  const fileSelected = (event) => {
    event.preventDefault();
    event.stopPropagation();
    var files = event.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary', cellText: false, cellDates: true });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const columnsHeader = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd/mm/yyyy', rawNumbers: false });
      const dataParse = XLSX.utils.sheet_to_json(ws, { range: 1, header: columnsHeader[0], raw: false, dateNF: 'dd/mm/yyyy' });
      const col = columnsHeader[0]
      let arrayField = []

      for (let i = 0; i < col.length; i++) {
        if (col[i] === 'BranchID' || col[i] === 'Price' || col[i] === 'Position') {
          arrayField[i] = {
            field: col[i],
            width: 80,
          }
        } else if (col[i] === 'Code' || col[i] === 'Name' || col[i] === 'Asset_group' || col[i] === 'Group_name') {
          arrayField[i] = {
            field: col[i],
            width: 160,
          }
        } else if (col[i] === 'CreateDate' || col[i] === 'OwnerCode') {
          arrayField[i] = {
            field: col[i],
            width: 120,
          }
        } else {
          arrayField[i] = {
            field: col[i],
            flex: 1,
          }
        }
      }
      if (columnsHeader[0].indexOf('Code') >= 0) {
        setField(arrayField)
        setDataFile(dataParse)
        setOpenXlsx(true)
        setNameExcel(f.name)
      } else {
        swal("แจ้งเตือน", 'ไม่พบหัวข้อรหัสทรัพย์สิน (Code !)', "error")
      }
    };
    reader.readAsBinaryString(f)
  }

  const handleCloseXlsx = () => {
    setOpenXlsx(false);
  };

  const handleSubmitXlsx = async () => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (
      field[0].field === 'Code' &&
      field[1].field === 'Name' &&
      field[2].field === 'OwnerCode' &&
      field[3].field === 'Asset_group' &&
      field[4].field === 'Group_name' &&
      field[5].field === 'BranchID' &&
      field[6].field === 'SerialNo' &&
      field[7].field === 'Price' &&
      field[8].field === 'CreateDate' &&
      field[9].field === 'CreateBy' &&
      field[10].field === 'Position' &&
      field[11].field === 'Details'
    ) {
      await Axios.post(config.http + '/FA_Control_BPC_Running_NO', data, { headers })
        .then(async (resTAB) => {
          for (let i = 0; i < dataFile.length; i++) {
            const body = {
              UserCode: data.UserCode
              , Code: dataFile[i].Code
              , Name: dataFile[i].Name
              , OwnerCode: dataFile[i].OwnerCode
              , Asset_group: dataFile[i].Asset_group
              , Group_name: dataFile[i].Group_name
              , BranchID: dataFile[i].BranchID
              , SerialNo: dataFile[i].SerialNo
              , Price: dataFile[i].Price
              , CreateDate: dataFile[i].CreateDate
              , CreateBy: dataFile[i].CreateBy
              , Position: dataFile[i].Position
              , Details: dataFile[i].Details
              , keyID: resTAB.data[0].TAB
            }
            await Axios.post(config.http + '/FA_Control_New_Assets_Xlsx', body, { headers })
              .then((response) => {
                if (response.data[0].res) {
                  setOpenXlsx(false)
                  setOpen(false);
                  setCode(null)
                  setName(null)
                  setSerialNo(null)
                  setPrice(null)
                  setDetails(null)
                  setCeate_Date(null)
                  swal("แจ้งเตือน", response.data[0].res, "error")
                } else {
                  setArraySubmit((i / (dataFile.length - 1)) * 100);
                  if (i === (dataFile.length - 1)) {
                    const body = { count: dataFile.length, keyID: resTAB.data[0].TAB }
                    Axios.post(config.http + '/FA_Control_import_dataXLSX_toAssets', body, { headers })
                      .then((response) => {
                        if (response.data[0].response === 'ทำรายการสำเร็จ') {
                          swal("แจ้งเตือน", response.data[0].response, "success", { buttons: false, timer: 2000 }).then((value) => {
                            setOpenXlsx(false)
                            setOpen(false);
                            setCode(null)
                            setName(null)
                            setSerialNo(null)
                            setPrice(null)
                            setDetails(null)
                            setCeate_Date(null)
                            window.location.href = '/NAC/AssetsAll';
                          })
                        } else if (response.data[0].response) {
                          setOpenXlsx(false)
                          swal("แจ้งเตือน", response.data[0].response, "error")
                        } else {
                          setOpenXlsx(false)
                          swal("แจ้งเตือน", response.data, "error")
                        }
                      })
                  }
                }
              })
          }
        })
    } else {
      swal("แจ้งเตือน", 'ข้อมูล (Columns) ไม่ถูกต้อง กรุณาตรวจสอบ', "error")
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit_Add = async () => {
    const body = {
      UserCode: data.UserCode,
      Code: code,
      Name: name,
      Asset_group: asset_group,
      Group_name: group_name,
      OwnerCode: ownerCode,
      Position: position,
      BranchID: branchID,
      Details: details,
      SerialNo: serialNo,
      Price: price,
      Create_Date: create_Date
    }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (!code) {
      swal("แจ้งเตือน", 'กรุณากรอกรหัสทรัพย์สินให้ถูกต้อง', "error")
    } else if (!name) {
      swal("แจ้งเตือน", 'กรุณากรอกชื่อทรัพย์สินให้ถูกต้อง', "error")
    } else if (!branchID || branchID < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกสาขาให้ถูกต้อง', "error")
    } else if (!price || price < 1) {
      swal("แจ้งเตือน", 'กรุณากรอกราคาให้ถูกต้อง', "error")
    } else {
      await Axios.post(config.http + '/FA_Control_New_Assets', body, { headers })
        .then(response => {
          if (response.data !== undefined) {
            const userCode = { userCode: data.UserCode }
            const headers = {
              'Authorization': 'application/json; charset=utf-8',
              'Accept': 'application/json'
            };
            swal("แจ้งเตือน", `เพิ่มทรัพย์สินสำเร็จ`, "success", { buttons: false, timer: 2000 }).then((value) => {
              const bodyPermission = { Permission_TypeID: 1, userID: data.userid }
              const permission = Axios.post(config.http + '/select_Permission_Menu_NAC', bodyPermission, { headers })
                .then(response => response.data.data.map((res) => res.Permission_MenuID));
              Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
                .then(response => {
                  if (permission.includes(5) === true) {
                    setDataHistory(response.data.data.filter((res) => res.bac_status === 1))
                  } else {
                    setDataHistory(response.data.data.filter((res) => res.bac_status === 1 && res.OwnerID === data.UserCode))
                  }
                  setOpen(false);
                });
            })
          }
        });
    }

  };

  const handleChange_Code = (event) => {
    setCode(event.target.value)
  }
  const handleChange_Name = (event) => {
    setName(event.target.value)
  }
  const handleChange_SerialNo = (event) => {
    setSerialNo(event.target.value)
  }
  const handleChange_Price = (event) => {
    setPrice(event.target.value)
  }
  const handleChange_Details = (event) => {
    setDetails(event.target.value)
  }
  const handleChange_Ceate_Date = (newValue) => {
    setCeate_Date(!newValue.toISOString().split('T')[0] ? null : newValue.toISOString().split('T')[0])
  }
  const handleChange_BranchID = (event) => {
    setBranchID(event.target.value)
  }

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'SerialNo', headerName: 'SerialNo', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        params.row.Position,
    },
    { field: 'Asset_group', headerName: 'Asset_group', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Group_name', headerName: 'Group_name', headerClassName: 'super-app-theme--header', minWidth: 150, flex: 1 },
    { field: 'Details', headerName: 'รายละเอียด', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1 },
    {
      field: 'Price',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        data.branchid === 901 ? params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) : 'ถูกจำกัดสิทธิ์'
      // `${(params.row.BranchID === 901) ? (params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })) : 'ถูกปิดเนื่องจากสิทธิ์'}`,
    },
    {
      field: 'CreateDate',
      headerName: 'วันที่ขึ้นทะเบียน',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.CreateDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.CreateDate.split('T')[0] || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
  ];

  const listUseEffect = async () => {
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const bodyPermission = { Permission_TypeID: 1, userID: data.userid }
    const permissionAssets = await Axios.post(config.http + '/select_Permission_Menu_NAC', bodyPermission, { headers })
      .then(response => response.data.data.map((res) => res.Permission_MenuID));
    await Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
      .then(response => {
        if (permissionAssets.includes(5) === true) {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1))
        } else {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1 && res.OwnerID === data.UserCode))
        }
      });
  }

  React.useEffect(() => {
    listPermission();
    listUseEffect();
  }, []);

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
            ทรัพย์สินทั้งหมด
          </Typography>
        </Toolbar>
      </AppBar>
      {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button variant="contained" disabled={(permission_menuID ? permission_menuID.includes(6) : null) === true ? false : true} color='success' component="label">
                Upload XLSX
                <input hidden multiple type="file" onChange={fileSelected} />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color='success' disabled={(permission_menuID ? permission_menuID.includes(6) : null) === true ? false : true} onClick={handleClickOpen}>
                เพิ่มทรัพย์สิน
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ py: 2 }}>
            <DataGrid
              rows={dataHistory ?? []}
              columns={columns}
              getRowId={(dataHistory) => dataHistory.AssetID}
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>
              <b>{"กรุณากรอกข้อมูลให้ครบถ้วน"}</b>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box component="form" noValidate sx={{ mt: 4, width: 300, }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="Code"
                        value={code}
                        onChange={(event) => handleChange_Code(event)}
                        required
                        fullWidth
                        label="รหัสทรัพย์สิน"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="Name"
                        value={name}
                        onChange={(event) => handleChange_Name(event)}
                        required
                        fullWidth
                        label="ชื่อ"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="branchID"
                        value={branchID}
                        onChange={(event) => handleChange_BranchID(event)}
                        required
                        fullWidth
                        type='number'
                        label="สาขา"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="Asset_group"
                        value={asset_group}
                        onChange={(event) => setAsset_group(event.target.value)}
                        required
                        fullWidth
                        label="Asset Group"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="group_name"
                        value={group_name}
                        onChange={(event) => setGroup_name(event.target.value)}
                        required
                        fullWidth
                        label="Group_name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="OwerCode"
                        name="OwerCode"
                        value={ownerCode}
                        onChange={(event) => setOwnerCode(event.target.value)}
                        required
                        fullWidth
                        label="OwerCode"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="Position"
                        name="Position"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                        required
                        fullWidth
                        label="Position"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          format="YYYY-MM-DD HH:mm"
                          label={`วันที่ขึ้นทะเบียน`}
                          sx={{ width: '100%' }}
                          value={create_Date}
                          onChange={handleChange_Ceate_Date}
                          ampm={false}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="SerialNo"
                        value={serialNo}
                        onChange={(event) => handleChange_SerialNo(event)}
                        fullWidth
                        label="SerialNo"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="Details"
                        value={details}
                        onChange={(event) => handleChange_Details(event)}
                        fullWidth
                        label="รายะลเอียดทรัพย์สิน"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        size="small"
                        autoComplete="given-name"
                        name="Price"
                        value={price}
                        onChange={(event) => handleChange_Price(event)}
                        required
                        fullWidth
                        type='number'
                        label="ราคาทุน"
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit_Add} variant="contained">Submit</Button>
              <Button onClick={handleClose} autoFocus variant="contained" color="error">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullWidth
            maxWidth='lg'
            open={openXlsx}
            onClose={handleCloseXlsx}
          >
            {
              !arraySubmit ?
                <React.Fragment>
                  <DialogTitle>
                    ต้องการอัปโหลดไฟล์ {nameExcel} ไปที่ข้อมูลหลักใช่หรือไม่ ?
                  </DialogTitle>
                </React.Fragment>
                :
                <React.Fragment>
                  <DialogTitle>
                    กำลังอัปโหลดข้อมูล กรุณาอย่าปิดหน้าจอนี้ !!
                  </DialogTitle>
                </React.Fragment>
            }
            <DialogContent>
              {
                !arraySubmit ?
                  <React.Fragment>
                    <Box sx={{ py: 5 }}>
                      <DataGrid
                        rows={dataFile}
                        columns={columns}
                        getRowId={(row) => row?.Code}
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
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Box
                      sx={{
                        mt: 10,
                        mb: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgressWithLabel value={arraySubmit} />
                    </Box>
                  </React.Fragment>
              }
            </DialogContent>
            {
              !arraySubmit ?
                <React.Fragment>
                  <DialogActions>
                    <Button onClick={handleSubmitXlsx} variant='contained'>Submit</Button>
                    <Button onClick={handleCloseXlsx} variant='contained' color='error' autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </React.Fragment>
                : null
            }
          </Dialog>
        </Container>
      </Box>
    </React.Fragment>
  );
}