/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import InputAdornment from '@mui/material/InputAdornment';
import logoPure from '../../image/Picture1.png'
import config from '../../../../config'
import { NumericFormat } from 'react-number-format';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import swal from 'sweetalert';
import { Outlet, useNavigate } from "react-router";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AppbarNAC from './Appbar'


const textAlignDisabled = { textAlign: 'center', color: 'rgb(0,0,0)' }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
    padding: '0.5rem',
    border: '1px solid',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    padding: '1rem',
    overflow: 'hidden',
    border: '1px solid',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
    color: theme.palette.common.black,
    padding: 0,
    border: '1px solid',
  },
}));


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
      decimalScale={2}
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormsStart() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  dayjs.extend(utc);
  dayjs.extend(timezone);
  var dateNow = dayjs().utc().local()

  // Header column
  const header_1 = ['ประเภทการเปลี่ยนแปลง', 'หน่วยงานที่ส่งมอบ', 'หน่วยงานที่รับมอบ']

  //Ddata Table
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [dataAssets, setDataAssets] = React.useState([]);
  const [sourceName, setSourceName] = React.useState();
  const [sourceLastName, setSourceLastName] = React.useState();

  const [serviceList, setServiceList] = React.useState([{
    dtl_id: '',
    assetsCode: '',
    serialNo: '',
    name: '',
    date_asset: '',
    price: '',
    priceSeals: '',
    profit: '',
    Details: '',
    asset_id: '',
    BranchID: '',
    OwnerCode: '',
  }]);

  const [serviceListChange, setServiceListChange] = React.useState([{
    Code: '',
    Name: '',
    Details: '',
    count: '',
    SerialNo: '',
    Price: '',
    priceSeals: '',
    profit: '',
    CreateDate: '',
    BranchID: '',
    OwnerCode: '',
  }]);

  const [sendHeader, setSendHeader] = React.useState([{
    usercode: data.UserCode,
    worktype: 3,
    // ผู้รับ
    source_Department: null,
    source_BU: null,
    source: null,
    nameSource: `${sourceName} ${sourceLastName}`,
    sourceDate: dateNow,
    source_description: null,
    // ผู้รับ
    des_Department: null,
    des_BU: null,
    des_delivery: null,
    nameDes: null,
    des_deliveryDate: null,
    des_description: null,
    sumPrice: null,
  }]);

  const result = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ?
      parseFloat(elt.price) : parseFloat(elt.price);
  }).reduce(function (a, b) {
    return (a ? a : 0) + (b ? b : 0)
  })

  const handleAddRowDetails = () => {
    setServiceList([...serviceList, {
      dtl_id: '',
      assetsCode: '',
      serialNo: '',
      name: '',
      date_asset: '',
      price: '',
      priceSeals: '',
      profit: '',
      Details: '',
      asset_id: '',
      BranchID: '',
      OwnerCode: '',
    }])

    setServiceListChange([...serviceListChange, {
      Code: '',
      Name: '',
      Details: '',
      count: '',
      SerialNo: '',
      Price: '',
      priceSeals: '',
      profit: '',
      CreateDate: '',
      BranchID: '',
      OwnerCode: '',
    }])
  }

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (e, index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    setServiceListChange(list);
  };

  const List_Users = async () => {
    // รับข้อมูล รหัสทรัพย์สินทั้งหมด
    await Axios.post(config.http + '/AssetsAll_Control', { BranchID: data.branchid }, config.headers)
      .then((res) => {
        if (data.branchid === 901 && data.DepCode !== '101ITO') {
          setDataAssets(res.data.data.filter((datain) => datain.Position === data.DepCode))
        }
        setDataAssets(res.data.data)
      })

    // รับข้อมูล Users
    await Axios.get(config.http + '/getsUserForAssetsControl', config.headers)
      .then((res) => {
        setUsers(res.data.data)
      })
  }

  const handleServiceChangeHeader = async (e, newValue, reason, index) => {
    const nacdtl_assetsCode = { nacdtl_assetsCode: newValue }

    if (newValue && (reason !== 'clear')) {
      await Axios.post(config.http + '/store_FA_control_CheckAssetCode_Process', nacdtl_assetsCode, config.headers)
        .then(async (res) => {
          if (res.data.data[0].checkProcess === 'false' || serviceList.filter((res) => res.assetsCode === newValue)[0]) {
            swal("แจ้งเตือน", 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ NAC', "error")
              .then(() => {
                const list = [...serviceList];
                list.splice(index, 1);
                setServiceList(list);
                setServiceListChange(list);
              })
          } else {
            const list = [...serviceList];
            list[index]['assetsCode'] = dataAssets.filter((res) => res.Code === newValue)[0].Code
            list[index]['name'] = dataAssets.filter((res) => res.Code === newValue)[0].Name
            list[index]['dtl'] = dataAssets.filter((res) => res.Code === newValue)[0].Details
            list[index]['count'] = 1
            list[index]['serialNo'] = dataAssets.filter((res) => res.Code === newValue)[0].SerialNo
            list[index]['price'] = dataAssets.filter((res) => res.Code === newValue)[0].Price
            list[index]['priceSeals'] = 0
            list[index]['profit'] = 0
            list[index]['date_asset'] = dayjs(dataAssets.filter((res) => res.Code === newValue)[0].CreateDate).format('YYYY-MM-DD')
            list[index]['BranchID'] = dataAssets.filter((res) => res.Code === newValue)[0].BranchID
            list[index]['OwnerCode'] = dataAssets.filter((res) => res.Code === newValue)[0].OwnerCode
            setServiceList(list);

            const listChange = [...serviceListChange];
            listChange[index] = dataAssets.filter((res) => res.Code === newValue)[0]
            setServiceListChange(listChange)
          }
        })
    } else {
      const list = [...serviceList];
      list[index]['name'] = ''
      list[index]['dtl'] = ''
      list[index]['count'] = ''
      list[index]['serialNo'] = ''
      list[index]['price'] = ''
      list[index]['bookValue'] = ''
      list[index]['priceSeals'] =
        list[index]['profit'] = ''
      list[index]['date_asset'] = ''
      list[index]['BranchID'] = ''
      list[index]['OwnerCode'] = ''
      setServiceList(list);

      const listChange = [...serviceListChange];
      listChange[index]['Code'] = ''
      listChange[index]['Name'] = ''
      listChange[index]['Details'] = ''
      listChange[index]['count'] = ''
      listChange[index]['SerialNo'] = ''
      listChange[index]['Price'] = ''
      listChange[index]['priceSeals'] =
        listChange[index]['profit'] = ''
      listChange[index]['CreateDate'] = ''
      listChange[index]['BranchID'] = ''
      listChange[index]['OwnerCode'] = ''
      setServiceListChange(listChange)
    }
  };

  const handleSubmit = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุผู้ส่งมอบ', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else {
      const sendReq = sendHeader[0]
      await Axios.post(config.http + '/store_FA_control_create_doc', sendReq, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (var i = 0; i < serviceList.length; i++) {
              const detail_req = {
                nac_code: res.data.data[0].nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsDtl: serviceList[i].dtl,
                nacdtl_assetsCount: serviceList[i].count,
                nacdtl_assetsPrice: serviceList[i].price,
                nacdtl_date_asset: serviceList[i].date_asset,
              }
              await Axios.post(config.http + '/store_FA_control_creat_Detail', detail_req, config.headers)
                .then(async (resII) => {
                  if (resII.data.data) {
                    const detail_reqII = {
                      usercode: data.UserCode,
                      nac_code: res.data.data[0].nac_code,
                      nac_type: sendHeader[0].worktype,
                      nacdtl_bookV: serviceList[i].bookValue,
                      nacdtl_PriceSeals: serviceList[i].priceSeals,
                      nacdtl_profit: serviceList[i].profit,
                      asset_id: resII.data.data[i].nacdtl_id,
                      nac_status: 1,
                      nacdtl_assetsCode: serviceList[i].assetsCode
                    }
                    await Axios.post(config.http + '/store_FA_control_updateDTL_seals', detail_reqII, config.headers)
                      .then((resIII) => {
                        if ((i + 1) === serviceList.length) {
                          localStorage.setItem('NacCode', JSON.stringify({ nac_code: res.data.data[0].nac_code, nac_status: 1 }));
                          navigate('/NAC/ChangeAssets_2?' + res.data.data[0].nac_code)
                        }
                      })
                  }
                })
            }
          }
        })
    }
  };

  React.useEffect(() => {
    if (users.length < 10 || dataAssets.length < 10) {
      List_Users();
    }
  })

  if (users.length < 10 || dataAssets.length < 10) {
    return (
      <React.Fragment>
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <CircularProgress disableShrink color="inherit" />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '2rem !important', fontWeight: 'bold' }} color="inherit" >
                Loading...
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppbarNAC
          nac_type={sendHeader[0].worktype}
          sendHeader={sendHeader}
        />
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, width: '100%', overflow: 'hidden' }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={2}>
                <img style={{ maxWidth: '10rem', maxHeight: '1rem !important' }} className="class-nac-image" src={logoPure} loading="lazy" />
              </Grid>
              <Grid item xs={8}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold !important' }}>
                    PURE THAI ENERGY CO.,LTD.
                  </Typography>
                  <Typography className='class-nac-forms'>
                    เปลี่ยนแปลงรายการทรัพย์สินถาวร (Notice of Asset Change - NAC)
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={2}>
                <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }} />
              </Grid>
            </Grid>
            <Box sx={{ pt: 3 }}>
              <Typography color='error'>
                * กรุณากรอกข้อมูลสำหรับเปลี่ยนแปลงรายละเอียดบัญชีทรัพย์สิน
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small" sx={{ minHeight: '19rem', minWidth: 1000 }}>
                <TableHead >
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        {header_1[0]}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: '35%' }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        {header_1[1]}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: '35%' }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        {header_1[2]}
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important', fontSize: '1.5rem !important' }}>
                        เปลี่ยนแปลงรายละเอียดบัญชีทรัพย์สิน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: 'bold !important' }}>
                            DepCode.
                          </Typography>
                          <TextField
                            disabled
                            inputProps={{ style: textAlignDisabled }}
                            value={sendHeader[0].source_Department}
                            name='source_Dep'
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ fontWeight: 'bold !important' }}>
                            BU.
                          </Typography>
                          <TextField
                            disabled
                            inputProps={{ style: textAlignDisabled }}
                            value={sendHeader[0].source_BU}
                            name='source_BU'
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ pt: 2 }}>
                          <Autocomplete
                            freeSolo
                            name='source_UserCode'
                            size="small"
                            disableClearable={true}
                            value={sendHeader[0].source}
                            options={users.filter((res) => res.DepID === data.depid).map((option) => option.UserCode)}
                            onChange={(e, newValue, reason) => {
                              if (!newValue || reason === 'clear') {
                                const listHeader = [...sendHeader]
                                listHeader[0]['source'] = null
                                listHeader[0]['source_Department'] = null
                                listHeader[0]['source_BU'] = null
                                setSendHeader(listHeader)
                              } else {
                                const listHeader = [...sendHeader]
                                listHeader[0]['source'] = newValue
                                listHeader[0]['source_Department'] = users.filter((res) => res.UserCode === newValue)[0].DepCode
                                listHeader[0]['source_BU'] = users.filter((res) => res.UserCode === newValue)[0].BranchID === 901 ? `Center` : `Oil`
                                setSendHeader(listHeader)
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography color="black" >
                                        ผู้ส่งมอบ :
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            name='source_firstName'
                            value={sourceName}
                            onChange={(e) => {
                              const list = [...sendHeader]
                              list[0].nameSource = `${e.target.value} ${sourceLastName ? sourceLastName : ''}`
                              setSourceName(e.target.value);
                              setSendHeader(list)
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black" >
                                    ชื่อจริง :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            variant="standard"
                            name='source_lastName'
                            value={sourceLastName}
                            onChange={(e) => {
                              const list = [...sendHeader]
                              list[0].nameSource = `${sourceName ? sourceName : ''} ${e.target.value}`
                              setSourceLastName(e.target.value);
                              setSendHeader(list)
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black" >
                                    นามสกุล :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              format="YYYY-MM-DD"
                              name="source_Date"
                              sx={{ width: '100%' }}
                              timezone="UTC"
                              value={sendHeader[0].sourceDate ? dayjs(sendHeader[0].sourceDate) : null}
                              onChange={(newValue) => {
                                const listHeader = [...sendHeader]
                                listHeader[0]['sourceDate'] = dayjs(newValue).format('YYYY-MM-DD HH:mm')
                                setSendHeader(listHeader)
                              }}
                              ampm={false}
                              label='วันที่ส่งมอบ'
                              slotProps={{
                                textField: { variant: 'standard' },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="standard"
                            name='source_description'
                            value={sendHeader[0].source_description}
                            onChange={(e) => {
                              const listHeader = [...sendHeader]
                              listHeader[0]['source_description'] = e.target.value
                              setSendHeader(listHeader)
                            }}
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="black" >
                                    หมายเหตุ :
                                  </Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important', fontSize: '1.5rem !important' }}>
                        None
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Table size="small" sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center" sx={{ width: "18%", }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        รหัสทรัพย์สิน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ maxWidth: "10%", }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        Serial No.
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ maxWidth: "15%", }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ชื่อทรัพย์สิน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ maxWidth: "10%", }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        วันที่ขึ้นทะเบียน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ maxWidth: "10%", }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        Owner
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        สถานะทรัพย์สิน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ maxWidth: '12%' }}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ต้นทุน
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ maxWidth: '5%' }}>
                      <IconButton
                        color='primary'
                        onClick={handleAddRowDetails}
                      >
                        <AddBoxIcon />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                {serviceList.map((res, index) => (
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center" style={{ maxWidth: '18%' }}>
                        <Autocomplete
                          freeSolo
                          name='assetsCode'
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          value={res.assetsCode}
                          options={dataAssets.map((option) => option.Code)}
                          onChange={(e, newValue, reason) => handleServiceChangeHeader(e, newValue, reason, index)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              InputProps={{
                                ...params.InputProps,
                              }}
                            />
                          )}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].SerialNo ?? ''}
                        </Typography>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          name="serialNo"
                          multiline
                          onChange={(e) => handleServiceChange(e, index)}
                          value={res.serialNo ?? ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].Name}
                        </Typography>
                        <TextField
                          fullWidth
                          key={index}
                          name="name"
                          multiline
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          onChange={(e) => handleServiceChange(e, index)}
                          value={res.name ?? ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].CreateDate ? dayjs(serviceListChange[index].CreateDate).format('YYYY-MM-DD') : ''}
                        </Typography>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          name="date_asset"
                          onChange={(e) => handleServiceChange(e, index)}
                          value={!res.date_asset ? '' : res.date_asset}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].OwnerCode ?? ''}
                        </Typography>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          name="OwnerCode"
                          onChange={(e) => handleServiceChange(e, index)}
                          value={res.OwnerCode ?? ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].Details ?? ''}
                        </Typography>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          name="dtl"
                          onChange={(e) => handleServiceChange(e, index)}
                          value={res.dtl ?? ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography sx={{ fontWeight: 'bold !important' }}>
                          {serviceListChange[index].Price ? Intl.NumberFormat().format(serviceListChange[index].Price) : ''}
                        </Typography>
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          key={index}
                          name="price"
                          type={data.branchid === 901 ? "text" : "password"}
                          InputProps={{
                            inputComponent: NumericFormatCustom,
                          }}
                          onChange={(e) => handleServiceChange(e, index)}
                          inputProps={{ min: 0, style: { textAlign: 'right' } }}
                          value={res.price ?? ''}
                          variant="standard"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {serviceList.length !== 0 && (
                          <IconButton
                            size="large"
                            aria-label="delete"
                            color="error"
                            onClick={serviceList.length === 1 ? false : (e) => handleServiceRemove(e, index)}
                          >
                            <DeleteForeverIcon fontSize="inherit" />
                          </IconButton>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                ))}
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="start" colSpan={6}>
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        รวมทั้งหมด
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      <TextField
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          }
                        }}
                        disabled
                        type={data.branchid === 901 ? "text" : "password"}
                        InputProps={{
                          disableUnderline: true,
                          inputComponent: NumericFormatCustom,
                        }}
                        inputProps={{ min: 0, style: { textAlign: 'right', fontWeight: 'bold' } }}
                        value={!result ? '' : result}
                        variant="standard"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Table size="small" sx={{ minWidth: 1000 }}>
                <TableHead >
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ผู้ทำรายการ : {data.UserCode} {dateNow.format('YYYY-MM-DD')}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ผู้ตรวจสอบ :
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ผู้อนุมัติ :
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        บัญชีตรวจสอบ :
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Grid container justifyContent='center' alignItems='center' sx={{ py: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                endIcon={<BorderColorRoundedIcon />}
                sx={{ m: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </Container>
        <Outlet />
      </React.Fragment >
    );
  }

}