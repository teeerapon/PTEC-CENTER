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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';
import config from '../../../../config'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
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

export default function Reported_of_assets() {

  const [selectMenu, setSelectMenu] = React.useState();
  const [reported_of_assets, setReported_of_assets] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const checkUserWeb = localStorage.getItem('sucurity');
  const [status_all] = React.useState(['none', 'สภาพดี', 'ชำรุดรอซ่อม', 'รอตัดขาย', 'รอตัดชำรุด', 'QR Code ไม่สมบูรณ์ (สภาพดี)', 'QR Code ไม่สมบูรณ์ (ชำรุดรอซ่อม)', 'QR Code ไม่สมบูรณ์ (รอตัดขาย)', 'QR Code ไม่สมบูรณ์ (รอตัดชำรุด)']);
  const [progress, setProgress] = React.useState();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogComment, setDialogComment] = React.useState({ Code: '', BranchID: '', RoundID: '', UserID: '', comment: '', personID: '', depCode: '' });

  const handleSumbitComment = async () => {
    const body = dialogComment
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.put(config.http + '/updateReference', body, { headers })
      .catch(function (error) {
        reported_of_assets.forEach(function (x, index) {
          if (x.Code === dialogComment.Code) {
            const list = [...reported_of_assets]
            list[index]['comment'] = dialogComment.comment
            setReported_of_assets(list)
            setOpenDialog(false);
          }
        })
        //   if (error.response) {
        //     setOpenDialog(false);
        //     swal("แจ้งเตือน", `หมดเวลาแล้ว`, "error").then((res) => {
        //       reported_of_assets.forEach(function (x, index) {
        //         if (x.Code === dialogComment.Code) {
        //           const list = [...reported_of_assets]
        //           list[index]['comment'] = ''
        //           setReported_of_assets(list)
        //           setOpenDialog(false);
        //         }
        //       })
        //     })
        //   }
        // }).then((res) => {
        //   reported_of_assets.forEach(function (x, index) {
        //     if (x.Code === dialogComment.Code) {
        //       const list = [...reported_of_assets]
        //       list[index]['comment'] = dialogComment.comment
        //       setReported_of_assets(list)
        //       setOpenDialog(false);
        //     }
        //   })
      })
  };

  const handleChangeComment = (e) => {
    setDialogComment({
      Code: dialogComment.Code,
      BranchID: dialogComment.BranchID,
      RoundID: dialogComment.RoundID,
      UserID: data.userid,
      comment: e.target.value,
      personID: dialogComment.personID,
      depCode: dialogComment.depCode,
    })
  };

  const handleClickOpenDialog = (event, params) => {
    setOpenDialog(true);
    setDialogComment({
      Code: params.row.Code,
      BranchID: params.row.BranchID,
      RoundID: params.row.RoundID,
      UserID: params.row.UserID,
      comment: params.row.comment,
      personID: params.row.personID,
      depCode: params.row.DepCode,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
    {
      field: 'Position',
      headerName: 'Location NAC',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        params.row.Position,
    },
    {
      field: 'Date',
      headerName: 'วันที่ตรวจนับ',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.Date ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.Date || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'EndDate_Success',
      headerName: 'วันที่ทำ NAC ล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 170,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            {params.row.EndDate_Success ?
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <CalendarMonthIcon />
                <Typography variant='body2'>
                  {params.row.EndDate_Success || ''}
                </Typography>
              </Stack>
              : null}
          </React.Fragment>
        )
      }
    },
    {
      field: 'UserID',
      headerName: 'ผู้ตรวจนับ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.UserID || ''}`,
    },
    {
      field: 'detail',
      headerName: 'สถานะล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.detail || ''}`,
    },
    {
      field: 'Reference',
      headerName: 'สถานะครั้งนี้',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {

        const handleChange_select = async (event, params) => {
          const body = {
            Reference: event.target.value,
            UserID: data.userid,
            Code: params.row.Code,
            RoundID: params.row.RoundID,
            choice: 1
          }

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };
          await Axios.put(config.http + '/updateReference', body, { headers })

          reported_of_assets.forEach(function (x, index) {
            if (x.RowID === params.row.RowID) {
              const list = [...reported_of_assets]
              list[index]['Reference'] = event.target.value
              list[index]['remarker'] = event.target.value === 'none' ? 'ยังไม่ได้ตรวจนับ' :
                list[index]['remarker'] = event.target.value !== 'none' && data.UserCode === params.row.OwnerID ? 'ตรวจนับแล้ว' :
                  'ต่างสาขา'
              setReported_of_assets(list)
            }
          })

        };

        return (
          <React.Fragment>
            <FormControl fullWidth size="small">
              <Select
                label={false}
                value={!params.row.Reference ? 'none' : params.row.Reference}
                onChange={(event) => handleChange_select(event, params)}
              >
                {status_all.map((status) => (<MenuItem value={status}>{status}</MenuItem>))}
              </Select>
            </FormControl>
          </React.Fragment >
        )
      }
    },
    {
      field: 'comment',
      headerName: 'comment',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <ListItem
            button
            divider
            aria-haspopup="true"
            id={params.row.comment}
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            onClick={(event) => handleClickOpenDialog(event, params)}
          >
            <ListItemText primary={params.row.comment} />
          </ListItem>
        )
      }
    },
    {
      field: 'remarker',
      headerName: 'ผลการตรวจนับ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <Item
            style={{
              //'maxWidth': 'fit-content',
              borderRadius: '100px',
              width: '100%',
              textAlign: 'center',
              'backgroundColor': params.row.remarker === 'ตรวจนับแล้ว' ? '#008000' :
                params.row.remarker === 'ยังไม่ได้ตรวจนับ' ? '#DC143C' : ' #FFA500'
            }}
          >
            {params.row.remarker}
          </Item>
        )
      }
    },
  ];

  const reportedAllDescription = async () => {
    // POST request using axios with set headers
    const Description = { Description: '' }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_Report_All_Counted_by_Description', Description, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setSelectMenu((response.data.data).filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.Description === value.Description
        ))
      ))
      setProgress(1)
    });
  }

  React.useEffect(() => {
    reportedAllDescription();
  }, []);

  const handleChange = async (event) => {
    setProgress(0)
    const Description = { Description: event.target.innerText }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + '/FA_Control_Report_All_Counted_by_Description', Description, { headers }).catch(function (error) {
      if (error.toJSON().message === 'Request failed with status code 400') {
        setProgress(1)
      }
    }).then(response => {
      setReported_of_assets(response.data.data)
      setProgress(1)
    });
  };

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
              รายงานการตรวจนับทั้งหมด
            </Typography>
          </Toolbar>
        </AppBar>
        {progress !== 1 ? <React.Fragment><Box sx={{ width: '100%' }}><LinearProgress /></Box></React.Fragment> : null}
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={!selectMenu ? [] : selectMenu.map((option) => option.Description)}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ค้นหาคำอธิบาย"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
            <Box sx={{ py: 2 }}>
              <DataGrid
                rows={reported_of_assets ?? []}
                columns={columns}
                getRowId={(res) => res.RowID}
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
        <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            <DialogContentText>
              {dialogComment.Code}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              onChange={handleChangeComment}
              value={dialogComment.comment}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSumbitComment} variant='contained'>Submit</Button>
            <Button onClick={handleCloseDialog} variant='contained' color="error">Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}