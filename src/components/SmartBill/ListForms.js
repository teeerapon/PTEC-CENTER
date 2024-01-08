/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Axios from "axios";
import config from '../../config'
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
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

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={3}
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function AddressForm() {

  const [rowHeader, setRowHeader] = React.useState();
  const data = JSON.parse(localStorage.getItem('data'));
  const permission = JSON.parse(localStorage.getItem('permission_MenuID'));

  const SelectHeaders = async () => {
    await Axios.get(config.http + '/SmartBill_SelectHeaders', config.headers)
      .then((res) => {
        if (permission.filter((res) => res === 19)[0]) {
          setRowHeader(res.data)
        } else if (permission.filter((res) => res === 18)[0]) {
          setRowHeader(res.data.filter((res) => parseInt(res.car_categaryid) === 3))
        } else {
          setRowHeader(res.data.filter((res) => res.usercode === data.UserCode))
        }
      })
  }

  React.useEffect(() => {
    SelectHeaders();
  }, [])

  const columns = [
    { field: 'sb_code', headerName: 'เลขที่ดำเนินการ', flex: 1, minWidth: 100 },
    { field: 'usercode', headerName: 'ผู้ทำรายการ', flex: 1, minWidth: 80 },
    { field: 'sb_name', headerName: 'Title', minWidth: 260, flex: 1 },
    { field: 'createdate', headerName: 'วันที่ทำรายการ', flex: 1, minWidth: 150 },
    { field: 'car_infocode', headerName: 'บะเทียนรถ', flex: 1 },
    { field: 'reamarks', headerName: 'สถานที่จอดหลังใช้', flex: 1 },
    {
      field: 'sb_status_name',
      headerName: 'สถานะ',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Typography variant="subtitle1" sx={{ color: params.row.sb_status_name === 1 ? 'red' : 'green' }} gutterBottom>
              {params.rowsb_status_name === 1 ? 'รอ Admin ตรวจสอบ' : 'ดำเนินการเสร็จสิ้น'}
            </Typography>
          </React.Fragment>
        );
      }
    },
    {
      field: 'action',
      headerName: 'action',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => window.location.href = `/SMB/FormUpdate?${params.row.sb_code}`} size="large">
                <ArticleIcon fontSize="inherit" color='primary' />
              </IconButton>
              {/* <IconButton size="large">
                <DeleteIcon fontSize="inherit" color='error' />
              </IconButton> */}
            </Stack>
          </React.Fragment>
        )
      }
    },
  ];

  if (rowHeader) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container component="main" maxWidth="xl" fixed sx={{ mb: 4 }}>
          <Box sx={{ py: 5 }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ py: 1 }}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      SelectHeaders();
                    } else {
                      setRowHeader(rowHeader.filter((res, index) => res.sb_code === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.sb_code).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="เลขที่ดำเนินการ" {...params} />}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ py: 1 }}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      SelectHeaders();
                    } else {
                      setRowHeader(rowHeader.filter((res, index) => res.usercode === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.usercode).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ผู้ทำรายการ" {...params} />}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ py: 1 }}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      SelectHeaders();
                    } else {
                      setRowHeader(rowHeader.filter((res, index) => res.sb_name === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.sb_name).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ชื่อหัวข้อ" {...params} />}
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  autoHighlight
                  disablePortal
                  id="combo-box-demo"
                  size='small'
                  sx={{ py: 1 }}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      SelectHeaders();
                    } else {
                      setRowHeader(rowHeader.filter((res, index) => res.car_infocode === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.car_infocode).filter(x => !!x)
                      .reduce((x, y) => x.includes(y) ? x : [...x, y], []) : []
                  }
                  renderInput={(params) => <TextField label="ทะเบียนรถ" {...params} />}
                />
              </Grid>
            </Grid>
            <DataGrid
              rows={rowHeader}
              columns={columns}
              getRowId={(res) => res.sb_id}
              getRowHeight={() => 'auto'}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
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
      </React.Fragment >
    );
  }
}