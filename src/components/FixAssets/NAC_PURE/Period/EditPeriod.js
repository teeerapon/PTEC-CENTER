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
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import swal from 'sweetalert';

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

async function EditPeriodData_Update(credentials) {
  return fetch(config.http + '/update_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function DeletePeriodData(credentials) {
  return fetch(config.http + '/delete_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function History_of_assets() {



  const [dataBranchID_Main, setDataBranchID_Main] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [open, setOpen] = React.useState(false);
  const [openII, setOpenII] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState({
    PeriodID: '',
    BeginDate: '',
    EndDate: '',
    Description: '',
    BranchID: '',
    Code: ''
  });
  const [progress, setProgress] = React.useState();

  const handleClickOpen = (event, params) => {
    setOpen(true);
    const FromValues = {
      PeriodID: params.row.PeriodID,
      BeginDate: params.row.BeginDate,
      EndDate: params.row.EndDate,
      Description: params.row.Description,
      BranchID: params.row.BranchID,
      Code: params.row.Code,
    }

    setEditFormData(FromValues);
  };

  const handleClickOpenII = (event, params) => {
    setOpenII(true);
    const FromValues = {
      PeriodID: params.row.PeriodID,
      BeginDate: params.row.BeginDate,
      EndDate: params.row.EndDate,
      Description: params.row.Description,
      BranchID: params.row.BranchID,
      Code: params.row.Code,
    }

    setEditFormData(FromValues);
  };

  const handleCloseII = () => {
    setOpenII(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'Description', headerName: 'คำอธิบาย', headerClassName: 'super-app-theme--header', minWidth: 170, flex: 1 },
    {
      field: 'BranchID',
      headerName: 'หน่วยงาน',
      headerClassName: 'super-app-theme--header',
      width: 100,
      valueGetter: (params) =>
        params.row.BranchID === 901 ? "HO" : "CO",
    },
    {
      field: 'personID',
      headerName: 'Location NAC',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      width: 130,
      valueGetter: (params) =>
        params.row.BranchID === 901 && params.row.personID && params.row.DepCode ?
          params.row.personID :
          params.row.BranchID === 901 && params.row.DepCode && !params.row.personID ?
            params.row.DepCode :
            params.row.BranchID !== 901 && !params.row.DepCode && !params.row.personID ?
              params.row.Code : ''

    },
    {
      field: 'BeginDate',
      headerName: 'วันที่เริ่มต้น',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 170,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.BeginDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.BeginDate}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'EndDate',
      headerName: 'วันที่สิ้นสุด',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 170,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.EndDate ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.EndDate.toLocaleString("sv-SE")}
                </Typography>
              </Stack>
              : null}
          </React.Fragment >
        )
      }
    },
    {
      field: 'status',
      headerName: 'สถานะการใช้งาน',
      headerClassName: 'super-app-theme--header',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant='body2' style={{ 'color': dayjs() >= params.row.BeginDate && dayjs() <= params.row.EndDate ? 'green' : 'red' }}>
              {dayjs() >= params.row.BeginDate && dayjs() <= params.row.EndDate ? 'อยู่ระหว่างเปิดใช้งาน' : 'ปิดการใช้งานแล้ว'}
            </Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      disableClickEventBubbling: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={(event) => handleClickOpen(event, params)}
                >
                  <ArticleIcon />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(event) => handleClickOpenII(event, params)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      }
    },
  ];

  React.useEffect(() => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    Axios.post(config.http + '/get_branch_period', userCode, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setDataBranchID_Main(response.data.data)
      setProgress(1)
    });
  }, []);

  const handleSubmit_Update = async () => {
    const PeriodID = editFormData.PeriodID;
    const BeginDate = editFormData.BeginDate;
    const EndDate = editFormData.EndDate;
    const Description = editFormData.Description;
    const BranchID = editFormData.BranchID;
    const response = await EditPeriodData_Update({
      PeriodID,
      BeginDate,
      EndDate,
      Description,
      BranchID,
    });
    if (response.message !== 'ไม่สามารถแก้ไขได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      if (response['data'] !== 'มีการเปิดช่วงเวลาทับกัน') {
        swal("แจ้งเตือน", response.message, "success", { buttons: false, timer: 2000 })
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      } else {
        swal("แจ้งเตือน", response['data'], "error")
          .then((value) => {
            window.location.href = "/EditPeriod";
          });
      }
    } else {
      swal("แจ้งเตือน", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
    setOpen(false);
  }

  const handleSubmit_Delete = async e => {
    e.preventDefault();
    const PeriodID = editFormData.PeriodID;
    const BranchID = editFormData.BranchID;
    const response = await DeletePeriodData({
      PeriodID,
      BranchID,
    });
    if (response.message !== 'ไม่สามารถลบได้ เนื่องจากมีการตรวจนับทรัพย์สิน') {
      swal("แจ้งเตือน", 'รอบตรวจนับทรัพย์สินถูกลบแล้ว', "success", { buttons: false, timer: 2000 })
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    } else {
      swal("แจ้งเตือน", response.message, "error")
        .then((value) => {
          window.location.href = "/EditPeriod";
        });
    }
    setOpenII(false);
  }

  const handleChangeBeginDate = (newValue) => {
    const FromValues = {
      PeriodID: editFormData.PeriodID,
      BeginDate: newValue.toLocaleString("sv-SE"),
      EndDate: editFormData.EndDate,
      Description: editFormData.Description,
      BranchID: editFormData.BranchID,
      Code: editFormData.Code,
    }
    setEditFormData(FromValues);
  };

  const handleChangeEndDate = (newValue) => {
    const FromValues = {
      PeriodID: editFormData.PeriodID,
      BeginDate: editFormData.BeginDate,
      EndDate: newValue.toLocaleString("sv-SE"),
      Description: editFormData.Description,
      BranchID: editFormData.BranchID,
      Code: editFormData.Code,
    }
    setEditFormData(FromValues);
  };

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
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
              สถานะรอบตรวจนับทั้งหมด
            </Typography>
          </Toolbar>
        </AppBar>
        {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px">
            <Box sx={{ py: 2 }}>
              <Alert variant="outlined" severity="error" sx={{ my: 1 }}>
                <Typography variant="body" color='error'>
                  ข้อควรระวัง ไม่สามารถลงเวลาซ้ำกันได้
                </Typography>
              </Alert>
              <DataGrid
                rows={dataBranchID_Main ?? []}
                columns={columns}
                getRowId={(dataBranchID_Main) => dataBranchID_Main.PeriodID}
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
              <DialogTitle id="alert-dialog-title">
                {editFormData.Code}
              </DialogTitle>
              <DialogContent>
                <TextField
                  id="standard-basic"
                  value={editFormData.Description}
                  onChange={(e) => setEditFormData({
                    PeriodID: editFormData.PeriodID,
                    BeginDate: editFormData.BeginDate,
                    EndDate: editFormData.EndDate,
                    Description: e.target.value,
                    BranchID: editFormData.BranchID,
                    Code: editFormData.Code,
                  })}
                  variant="standard"
                  sx={{ pb: 3 }}
                  fullWidth
                />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        format="YYYY-MM-DD HH:mm"
                        name="sb_operationid_startdate"
                        label={`วันที่และเวลาเริ่มต้น`}
                        sx={{ width: '100%' }}
                        value={editFormData.BeginDate}
                        onChange={handleChangeBeginDate}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        format="YYYY-MM-DD HH:mm"
                        name="sb_operationid_startdate"
                        label={`วันที่และเวลาเริ่มต้น`}
                        sx={{ width: '100%' }}
                        value={editFormData.EndDate}
                        onChange={handleChangeEndDate}
                        ampm={false}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit_Update} variant='contained'>Submit</Button>
                <Button onClick={handleClose} variant='contained' color='error' autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openII}
              onClose={handleCloseII}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"แจ้งเตือน"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ท่านแน่ใจที่จะลบรอบตรวจนับทรัพย์สินของ {editFormData.Code === 'CO' ? 'HO' : editFormData.Code} ใช่หรือไม่ ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={handleSubmit_Delete}
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                >ใช่
                </Button>
                <Button
                  variant="contained"
                  color='error'
                  sx={{ p: 0.8, pb: 0.5, pt: 0.5 }}
                  onClick={handleCloseII} autoFocus
                >
                  ไม่
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}