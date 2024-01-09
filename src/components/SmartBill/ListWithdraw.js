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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
  const [deleteRow, setDeleteRow] = React.useState({
    id: ''
  });
  const data = JSON.parse(localStorage.getItem('data'));
  const [deleteRowDilog, setDeleteRowDilog] = React.useState(false);

  const openDeleteRowDilog = (e, params) => {
    setDeleteRow(params)
    setDeleteRowDilog(true)
  }

  const closeDeleteRowDilog = (e, params) => {
    setDeleteRow({
      id: ''
    })
    setDeleteRowDilog(false)
  }

  const deleteRowSWB = async () => {
    const sbw_SelectAllForms = { sbw_code: deleteRow.id }
    await Axios.post(config.http + '/SmartBill_Withdraw_Delete', sbw_SelectAllForms, config.headers)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          SelectHeaders();
          setDeleteRowDilog(false)
        }
      });
  }

  const SelectHeaders = async () => {
    const sbw_SelectAllForms = { sbw_code: '' }
    await Axios.post(config.http + '/SmartBill_Withdraw_SelectAllForms', sbw_SelectAllForms, config.headers)
      .then((response) => {
        response.data[0] = localStorage.getItem('sbw_code') ? response.data[0].filter((res) => res.sbw_code === localStorage.getItem('sbw_code')) : response.data[0]
        response.data[0] = localStorage.getItem('ownercode') ? response.data[0].filter((res) => res.ownercode === localStorage.getItem('ownercode')) : response.data[0]
        response.data[0] = localStorage.getItem('car_infocode') ? response.data[0].filter((res) => res.car_infocode === localStorage.getItem('car_infocode')) : response.data[0]

        const permission = JSON.parse(localStorage.getItem('permission_MenuID'));
        if (response.data[0] && permission.filter((res) => res === 19)[0]) {
          setRowHeader(response.data[0]);
        } else {
          setRowHeader(response.data[0].filter((res) => res.ownercode === data.UserCode));
        }
      });
  }

  React.useEffect(() => {
    SelectHeaders();
  }, [])

  const columns = [
    { field: 'sbw_code', headerName: 'เลขที่ดำเนินการ', flex: 1, minWidth: 100 },
    { field: 'ownercode', headerName: 'ผู้ทำรายการ', flex: 1, minWidth: 80 },
    { field: 'createdate', headerName: 'วันที่ทำรายการ', flex: 1, minWidth: 150 },
    { field: 'car_infocode', headerName: 'บะเทียนรถ', flex: 1, minWidth: 120 },
    { field: 'car_band', headerName: 'ยี่ห้อ', flex: 1, minWidth: 100 },
    { field: 'car_tier', headerName: 'ชื่อรุ่น', flex: 1, minWidth: 200 },
    {
      field: 'lock_status',
      headerName: 'status',
      flex: 1,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Box sx={{ color: params.row.lock_status === true ? 'green' : 'grey' }}>
              {params.row.lock_status === true ? 'Lock' : 'None'}
            </Box>
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
              <IconButton onClick={() => window.location.href = `/SMB/Payment?${params.row.sbw_code}`} size="large">
                <ArticleIcon fontSize="inherit" color='primary' />
              </IconButton>
              <IconButton size="large" onClick={(e) => openDeleteRowDilog(e, params)}>
                <DeleteIcon fontSize="inherit" color='error' />
              </IconButton>
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
                  value={localStorage.getItem('sbw_code') ?? ''}
                  sx={{ py: 1 }}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      localStorage.setItem('sbw_code', '');
                      SelectHeaders();
                    } else {
                      localStorage.setItem('sbw_code', newInputValue);
                      setRowHeader(rowHeader.filter((res, index) => res.sbw_code === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.sbw_code).filter(x => !!x)
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
                  value={localStorage.getItem('ownercode') ?? ''}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      localStorage.setItem('ownercode', '');
                      SelectHeaders();
                    } else {
                      localStorage.setItem('ownercode', newInputValue);
                      setRowHeader(rowHeader.filter((res, index) => res.ownercode === newInputValue))
                    }
                  }}
                  options={
                    rowHeader ? rowHeader.map((res) => res.ownercode).filter(x => !!x)
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
                  value={localStorage.getItem('car_infocode') ?? ''}
                  onChange={(e, newInputValue, reason) => {
                    if (reason === 'clear') {
                      localStorage.setItem('car_infocode', '');
                      SelectHeaders();
                    } else {
                      localStorage.setItem('car_infocode', newInputValue);
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
              getRowId={(res) => res.sbw_code}
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
        <BootstrapDialog
          onClose={closeDeleteRowDilog}
          aria-labelledby="customized-dialog-title"
          open={deleteRowDilog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {deleteRow.id ? `ต้องการลบรายการ ${deleteRow.id} ใช่หรือไม่` : ''}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeDeleteRowDilog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                {deleteRow.id ? `กดปุ่มยืนยันเพื่อลบรายการ [${deleteRow.id}]` : ''}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={deleteRowSWB}>
              ยืนยัน
            </Button>
            <Button autoFocus onClick={closeDeleteRowDilog} color="error">
              ยกเลิก
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment >
    );
  }
}