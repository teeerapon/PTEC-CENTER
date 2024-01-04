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
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import config from '../../../../config';
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

export default function History_of_assets() {

  const [dataHistory, setDataHistory] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const [progress, setProgress] = React.useState();

  const list_useEffect = async () => {
    // POST request using axios with set headers
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
      setProgress(1)
    });
  }

  React.useEffect(() => {
    list_useEffect();
  }, []);

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
    {
      field: 'Price',
      headerName: 'ราคาทุน',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        data.branchid === 901 ? params.row.Price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 }) : 'ถูกจำกัดสิทธิ์'
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
    {
      field: 'ImagePath',
      headerName: 'Images 1',
      headerClassName: 'super-app-theme--header',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {

        const handleUploadFile_1 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_1 = new FormData();
            formData_1.append("file", e.target.files[0]);
            formData_1.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_1, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_1 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_1: image_1 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath'] = image_1
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })

          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath}>
              <img
                src={`${params.row.ImagePath}?w=248&fit=crop&auto=format`}
                srcSet={`${params.row.ImagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_1</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code}`}
                    component="label"
                  >
                    <input hidden type="file" name='file' onChange={(e) => handleUploadFile_1(e, params)} />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
    {
      field: 'ImagePath_2',
      headerName: 'Images 2',
      headerClassName: 'super-app-theme--header',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {

        const handleUploadFile_2 = async (e, params) => {
          e.preventDefault();

          const headers = {
            'Authorization': 'application/json; charset=utf-8',
            'Accept': 'application/json'
          };

          if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {

            const formData_2 = new FormData();
            formData_2.append("file", e.target.files[0]);
            formData_2.append("fileName", e.target.files[0].name);

            await Axios.post(config.http + "/check_files_NewNAC", formData_2, { headers })
              .then(async (res) => {
                const Code = params.row.Code
                const image_2 = 'http://vpnptec.dyndns.org:33080/NEW_NAC/' + res.data.attach[0].ATT + '.' + e.target.files[0].name.split('.').pop();

                const body = { Code: Code, image_2: image_2 }

                await Axios.post(config.http + "/FA_Control_Edit_EBook", body, { headers })
                  .then(async (res) => {
                    if (res.data) {
                      swal("แจ้งเตือน", 'เปลี่ยนแปลงรูปภาพที่ 1 สำเร็จ', "success", { buttons: false, timer: 2000 }).then((value) => {
                        dataHistory.forEach(function (x, index) {
                          if (x.Code === params.row.Code) {
                            const list = [...dataHistory]
                            list[index]['ImagePath_2'] = image_2
                            setDataHistory(list)
                          }
                        })
                      })
                    }
                  })
              })

          } else {
            swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error")
          }
        }

        return (
          <React.Fragment>
            <ImageListItem key={params.row.ImagePath_2}>
              <img
                src={`${params.row.ImagePath_2}?w=248&fit=crop&auto=format`}
                srcSet={`${params.row.ImagePath_2}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={params.row.Name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "http://vpnptec.dyndns.org:10280/OPS_Fileupload/ATT_230400022.jpg";
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: 'rgba(255, 255, 255, 1)' }}
                position="below"
                title={<span>&nbsp; &nbsp;{params.row.Code}_2</span>}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 1)' }}
                    aria-label={`info about ${params.row.Code}`}
                    component="label"
                  >
                    <input hidden type="file" name='file' onChange={(e) => handleUploadFile_2(e, params)} />
                    <FilePresentIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                }
              />
            </ImageListItem>
          </React.Fragment>
        )
      }
    },
  ];

  const permission_list = async () => {
    // POST request using axios with set headers
    const userCode = { userCode: data.UserCode }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    const bodyPermission = { Permission_TypeID: 1, userID: data.userid }
    const permission = await Axios.post(config.http + '/select_Permission_Menu_NAC', bodyPermission, { headers })
      .then(response => response.data.data.map((res) => res.Permission_MenuID));

    await Axios.post(config.http + '/store_FA_control_fetch_assets', userCode, { headers })
      .then(response => {
        if (permission.includes(5) === true) {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1))
        } else {
          setDataHistory(response.data.data.filter((res) => res.bac_status === 1 && res.OwnerID === data.UserCode))
        }
      });
  }

  React.useEffect(() => {
    permission_list();
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
        </Container>
      </Box>
    </React.Fragment>
  );
}