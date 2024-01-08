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
import { Outlet } from "react-router";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AppbarNAC from './Appbar'
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import CommentNAC from './Comments'


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

async function store_FA_control_comment(credentials) {
  return fetch(config.http + '/store_FA_control_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_SendMail(credentials) {
  // return fetch(config.http + '/store_FA_SendMail', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'Accept': 'application/json'
  //   },
  //   body: JSON.stringify(credentials)
  // })
  //   .then(data => data.json())
}

export default function FormsStart() {

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  dayjs.extend(utc);
  dayjs.extend(timezone);
  var dateNow = dayjs().utc().local()

  // Header column
  const header_1 = ['ประเภทการเปลี่ยนแปลง', 'หน่วยงานที่ส่งมอบ', 'หน่วยงานที่รับมอบ']

  // routes
  const data = JSON.parse(localStorage.getItem('data'));
  const permission_MenuID = JSON.parse(localStorage.getItem('permission_MenuID'));
  const queryString = window.location.search;
  const nac_code = queryString.split('?')[1]

  //dialog
  const [openDialogReply, setOpenDialogReply] = React.useState(false);
  const [commentReply, setCommentReply] = React.useState();
  const [drop_NAC_byDes, setDrop_NAC_byDes] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [description, setDescription] = React.useState();

  //Ddata Table
  const [users, setUsers] = React.useState([]);
  const [dataAssets, setDataAssets] = React.useState([]);
  const [sourceName, setSourceName] = React.useState();
  const [sourceLastName, setSourceLastName] = React.useState();
  const [approveData, setApproveData] = React.useState();
  const [counter, setCounter] = React.useState(0);

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

  const [sendHeader, setSendHeader] = React.useState([{
    usercode: data.UserCode,
    worktype: 3,
    // ผู้ส่ง
    source_Department: '',
    source_BU: '',
    source: '',
    nameSource: `${sourceName} ${sourceLastName}`,
    sourceDate: dateNow,
    source_description: '',
    // ผู้รับ
    des_Department: '',
    des_BU: '',
    des_delivery: '',
    nameDes: '',
    des_deliveryDate: '',
    des_description: '',
    sumPrice: '',
  }]);

  const result = serviceList.map(function (elt) {
    return (/^\d+\.\d+$/.test(elt.price) || /^\d+$/.test(elt.price)) ?
      parseFloat(elt.price) : parseFloat(elt.price);
  }).reduce(function (a, b) {
    return (a ? a : 0) + (b ? b : 0)
  })

  const handleAddRowDetails = () => {
    setServiceList([...serviceList, {
      dtl_id: 0,
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
    list[index]['dtl_id'] = -1;
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

    // ผู้้อนุมัติ + ผู้ตรวจสอบ
    await Axios.post(config.http + '/store_FA_control_execDocID', { user_source: sendHeader[0].source, nac_code: nac_code, }, config.headers)
      .then((res) => {
        setApproveData(res.data.data);
      })

    // กำหนด DTL
    await Axios.post(config.http + '/store_FA_control_select_dtl', { nac_code: nac_code }, config.headers)
      .then((res) => {
        setServiceList(res.data.data.map((resData) => {
          return {
            dtl_id: resData.nacdtl_id
            , assetsCode: resData.nacdtl_assetsCode
            , serialNo: resData.nacdtl_assetsSeria
            , name: resData.nacdtl_assetsName
            , price: resData.nacdtl_assetsPrice
            , asset_id: resData.nacdtl_id
            , OwnerCode: resData.OwnerCode
            , dtl: resData.nacdtl_assetsDtl
            , date_asset: dayjs(resData.nacdtl_date_asset).format('YYYY-MM-DD')
            , image_1: resData.nacdtl_image_1 ?? null
            , image_2: resData.nacdtl_image_2 ?? null
            , statusCheck: (!resData.success_id || resData.success_id === 0) ? 0 : resData.success_id
          };
        }))
      })

    // กำหนด DTL DRAFF
    await Axios.post(config.http + '/store_FA_control_select_dtl_draff', { nac_code: nac_code }, config.headers)
      .then((res) => {
        setServiceListChange(res.data.data)
      })

    // กำหนด Headers
    await Axios.post(config.http + '/store_FA_control_select_headers', { nac_code: nac_code }, config.headers)
      .then((res) => {
        const listHeader = [...sendHeader]
        listHeader[0]['source'] = res.data.data[0].source_userid
        listHeader[0]['source_department'] = res.data.data[0].source_dep_owner
        listHeader[0]['source_BU'] = res.data.data[0].source_bu_owner
        listHeader[0]['sumPrice'] = res.data.data[0].sum_price
        listHeader[0]['nameSource'] = res.data.data[0].source_name
        listHeader[0]['sourceDate'] = res.data.data[0].source_date
        listHeader[0]['source_description'] = res.data.data[0].source_remark
        listHeader[0]['des_department'] = res.data.data[0].des_dep_owner
        listHeader[0]['des_BU'] = res.data.data[0].des_bu_owner
        listHeader[0]['nameDes'] = res.data.data[0].des_name
        listHeader[0]['des_delivery'] = res.data.data[0].des_userid
        listHeader[0]['des_deliveryDate'] = res.data.data[0].des_date
        listHeader[0]['des_description'] = res.data.data[0].des_remark
        listHeader[0]['create_by'] = res.data.data[0].create_by
        listHeader[0]['verify_by_userid'] = res.data.data[0].verify_by_userid
        listHeader[0]['verify_date'] = res.data.data[0].verify_date
        listHeader[0]['source_approve'] = res.data.data[0].source_approve_userid
        listHeader[0]['source_approve_date'] = res.data.data[0].source_approve_date
        listHeader[0]['account_aprrove_id'] = res.data.data[0].account_aprrove_id
        listHeader[0]['finance_aprrove_id'] = res.data.data[0].finance_aprrove_id
        listHeader[0]['nac_code'] = res.data.data[0].nac_code
        listHeader[0]['nac_status'] = res.data.data[0].nac_status
        listHeader[0]['nac_type'] = res.data.data[0].nac_type
        listHeader[0]['source_date'] = res.data.data[0].source_date
        listHeader[0]['real_price'] = res.data.data[0].real_price
        listHeader[0]['realPrice_Date'] = res.data.data[0].realPrice_Date
        listHeader[0]['status_name'] = res.data.data[0].status_name
        setSendHeader(listHeader)
        setCounter(res.data.data[0].source_name ? 1 : 2)
        setSourceName(res.data.data[0].source_name ? res.data.data[0].source_name.split(' ')[0] : null)
        setSourceLastName(res.data.data[0].source_name ? res.data.data[0].source_name.split(' ')[1] : null)
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

  const handleUpdateNAC = async () => {
    await Axios.post(config.http + '/store_FA_control_updateStatus', sendHeader[0], config.headers)
      .then(async () => {
        await Axios.post(config.http + "/store_FA_control_update_DTLandHeaders", sendHeader[0], config.headers)
          .then(async (res) => {
            if (res.data.data) {
              for (let i = 0; i < serviceList.length; i++) {
                const detail_req = {
                  usercode: data.UserCode,
                  nac_code: res.data.data[0].nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                  nacdtl_row: i,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  nacdtl_assetsName: serviceList[i].name,
                  nacdtl_assetsSeria: serviceList[i].serialNo,
                  nacdtl_assetsDtl: serviceList[i].dtl,
                  nacdtl_assetsCount: serviceList[i].count,
                  nacdtl_assetsPrice: serviceList[i].price,
                  nacdtl_date_asset: serviceList[i].date_asset,
                  asset_id: serviceList[i].asset_id,
                  dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                }
                await Axios.post(config.http + '/store_FA_control_update_DTL', detail_req, config.headers)
                  .then(async (resII) => {
                    if (resII.data.data && resII.status === 200) {
                      swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                        const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                        window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                      });
                    }
                  })
              }
            }
          })
      })
  }

  const handleSubmit_To_Verify = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else {
      // รอใส่เงือนไข
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: approveData.filter((res) => res.limitamount < sendHeader[0].sumPrice)[0] ? 2 : 3,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].realPrice_Date,
        verify_by: sendHeader[0].verify_by,
        verify_date: sendHeader[0].verify_date,
        source_approve: sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                image_1: serviceList[i].image_1,
                image_2: null,
              }
              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (i + 1 === serviceList.length) {
                    await store_FA_SendMail({
                      nac_code
                    })
                    await store_FA_control_comment({
                      nac_code,
                      usercode: data.UserCode,
                      comment: 'ยืนยันรายการ',
                    })
                    swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                      const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                      window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                    });
                  }
                })
            }
          }
        })
    }
  }

  const handleSubmit_To_Approve = async () => {
    if (!sendHeader[0].source || !sourceName || !sourceLastName) {
      swal("แจ้งเตือน", 'กรุณาระบุ (ผู้ส่งมอบ/ชื่อ-นามสกุล ผู้ส่งมอบ)', "error")
    } else if ((serviceList.filter((res) => !res.assetsCode)[0]) !== undefined) {
      swal("แจ้งเตือน", 'กรุณาระบุข้อมูลทรัพย์สินให้ครบ', "error")
    } else if (approveData.filter((res) => res.approverid === data.UserCode && res.status === 1)[0]) {
      swal("แจ้งเตือน", `${data.UserCode} ทำรายการไปแล้ว`, "error")
    } else if (approveData.filter((res) => res.approverid === data.UserCode && res.status === 0)[0] || permission_MenuID.indexOf(10) > -1) {
      // รอใส่เงือนไข
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: 3,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].realPrice_Date,
        verify_by: data.UserCode,
        verify_date: dateNow,
        source_approve: sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data.data) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                image_1: serviceList[i].image_1,
                image_2: null,
              }
              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (i + 1 === serviceList.length) {
                    await store_FA_SendMail({
                      nac_code
                    })
                    await store_FA_control_comment({
                      nac_code,
                      usercode: data.UserCode,
                      comment: 'ตรวจสอบรายการ',
                    })
                    swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                      const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                      window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                    });
                  }
                })
            }
          }
        })
    } else {
      swal("แจ้งเตือน", `ถูกจำกัดสิทธิ์`, "error")
    }
  }

  const handle_approve_forms = async () => {
    if ((sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode && res.limitamount >= sendHeader[0].sumPrice)[0])
      || (sendHeader[0].nac_status === 3 && permission_MenuID.indexOf(10) > -1)) {
      const reqUpdateStatus = {
        usercode: data.UserCode,
        nac_code: nac_code,
        nac_status: 5,
        nac_type: sendHeader[0].nac_type,
        source: sendHeader[0].source,
        sourceDate: sendHeader[0].sourceDate,
        des_delivery: sendHeader[0].des_delivery,
        des_deliveryDate: sendHeader[0].des_deliveryDate ? sendHeader[0].des_deliveryDate : dateNow,
        des_approve: sendHeader[0].des_approve,
        des_approve_date: sendHeader[0].des_approve_date,
        real_price: sendHeader[0].real_price,
        realPrice_Date: sendHeader[0].nac_status === 12 ? dateNow : sendHeader[0].realPrice_Date,
        verify_by: sendHeader[0].verify_by_userid,
        verify_date: sendHeader[0].verify_date,
        source_approve: sendHeader[0].nac_status === 3 ? data.UserCode : sendHeader[0].source_approve,
        source_approve_date: sendHeader[0].nac_status === 3 ? dateNow : sendHeader[0].source_approve_date,
      }
      await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
        .then(async (res) => {
          if (res.data) {
            await store_FA_SendMail({
              nac_code
            })
            await store_FA_control_comment({
              nac_code,
              usercode: data.UserCode,
              comment: (sendHeader[0].nac_status === 3 && !sendHeader[0].real_price) ? 'อนุมัติรายการ' :
                (sendHeader[0].nac_status === 3 && sendHeader[0].real_price) ? 'อนุมัติรายการ' :
                  sendHeader[0].nac_status === 4 ? 'ตรวจสอบรายการทรัพย์สินแล้ว' :
                    sendHeader[0].nac_status === 5 || sendHeader[0].nac_status === 14 ? 'ปิดรายการ' : null,
            })

            if (res.data.data[0].nac_status === 6) {
              for (let i = 0; i < serviceList.length; i++) {
                const reqII = {
                  dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                  usercode: data.UserCode,
                  nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                  nacdtl_row: i,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  nacdtl_assetsName: serviceList[i].name,
                  nacdtl_assetsSeria: serviceList[i].serialNo,
                  nacdtl_assetsPrice: serviceList[i].price,
                  asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                  nacdtl_assetsDtl: serviceList[i].nacdtl_assetsDtl,
                  nacdtl_assetsCount: serviceList[i].nacdtl_assetsCount,
                  image_1: serviceList[i].image_1,
                  image_2: null,
                }

                await Axios.post(config.http + '/stroe_FA_control_DTL_ConfirmSuccess', {
                  nac_code,
                  usercode: data.UserCode,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  asset_id: serviceList[i].asset_id,
                  statusCheck: serviceList[i].statusCheck,
                }, config.headers)

                await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                  .then(async (resII) => {

                    await Axios.post(config.http + '/store_FA_control_upadate_table', {
                      nac_code,
                      usercode: data.UserCode,
                      nacdtl_assetsCode: serviceList[i].assetsCode,
                      asset_id: serviceList[i].asset_id,
                      nac_type: sendHeader[0].nac_type,
                      nac_status: res.data.data[0].nac_status,
                    }, config.headers)

                    if (i + 1 === serviceList.length) {
                      swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                        const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                        window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                      });
                    }
                  })
              }
            } else {
              for (let i = 0; i < serviceList.length; i++) {
                const reqII = {
                  dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                  usercode: data.UserCode,
                  nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                  nacdtl_row: i,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  nacdtl_assetsName: serviceList[i].name,
                  nacdtl_assetsSeria: serviceList[i].serialNo,
                  nacdtl_assetsPrice: serviceList[i].price,
                  asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                  nacdtl_assetsDtl: serviceList[i].nacdtl_assetsDtl,
                  nacdtl_assetsCount: serviceList[i].nacdtl_assetsCount,
                  image_1: serviceList[i].image_1,
                  image_2: null,
                }

                await Axios.post(config.http + '/stroe_FA_control_DTL_ConfirmSuccess', {
                  nac_code,
                  usercode: data.UserCode,
                  nacdtl_assetsCode: serviceList[i].assetsCode,
                  asset_id: serviceList[i].asset_id,
                  statusCheck: serviceList[i].statusCheck,
                }, config.headers)

                await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                  .then(async (resII) => {
                    if (i + 1 === serviceList.length) {
                      swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                        const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                        window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                      });
                    }
                  })
              }
            }
          }
        })
    } else {
      swal("แจ้งเตือน", `ถูกจำกัดสิทธิ์`, "error")
    }
  }

  const handleSubmit_Form = async () => {
    // if ((sendHeader[0].nac_status === 4 || sendHeader[0].nac_status === 14)
    //   && serviceList.filter((res) => res.statusCheck === 0
    //     || !res.image_1
    //   )[0]) {
    //   swal("แจ้งเตือน", `เลือก (ตรวจสอบ/รูปภาพ) ทรัพย์สิน`, "error")
    // } else {
    const reqUpdateStatus = {
      usercode: data.UserCode,
      nac_code: nac_code,
      nac_status: 6,
      nac_type: sendHeader[0].nac_type,
      source: sendHeader[0].source,
      sourceDate: sendHeader[0].sourceDate,
      des_delivery: sendHeader[0].des_delivery,
      des_deliveryDate: sendHeader[0].des_deliveryDate ? sendHeader[0].des_deliveryDate : dateNow,
      des_approve: sendHeader[0].des_approve,
      des_approve_date: sendHeader[0].des_approve_date,
      real_price: sendHeader[0].real_price,
      realPrice_Date: sendHeader[0].nac_status === 12 ? dateNow : sendHeader[0].realPrice_Date,
      verify_by: sendHeader[0].verify_by_userid,
      verify_date: sendHeader[0].verify_date,
      source_approve: sendHeader[0].nac_status === 3 ? data.UserCode : sendHeader[0].source_approve,
      source_approve_date: sendHeader[0].nac_status === 3 ? dateNow : sendHeader[0].source_approve_date,
    }
    await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
      .then(async (res) => {
        if (res.data) {
          await store_FA_SendMail({
            nac_code
          })
          await store_FA_control_comment({
            nac_code,
            usercode: data.UserCode,
            comment: (sendHeader[0].nac_status === 3 && !sendHeader[0].real_price) ? 'อนุมัติรายการ' :
              (sendHeader[0].nac_status === 3 && sendHeader[0].real_price) ? 'อนุมัติรายการ' :
                sendHeader[0].nac_status === 4 ? 'ตรวจสอบรายการทรัพย์สินแล้ว' :
                  sendHeader[0].nac_status === 5 || sendHeader[0].nac_status === 14 ? 'ปิดรายการ' : null,
          })

          if (res.data.data[0].nac_status === 6) {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                nacdtl_assetsDtl: serviceList[i].nacdtl_assetsDtl,
                nacdtl_assetsCount: serviceList[i].nacdtl_assetsCount,
                image_1: serviceList[i].image_1,
                image_2: null,
              }

              await Axios.post(config.http + '/stroe_FA_control_DTL_ConfirmSuccess', {
                nac_code,
                usercode: data.UserCode,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                asset_id: serviceList[i].asset_id,
                statusCheck: serviceList[i].statusCheck,
              }, config.headers)

              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {

                  await Axios.post(config.http + '/store_FA_control_upadate_table', {
                    nac_code,
                    usercode: data.UserCode,
                    nacdtl_assetsCode: serviceList[i].assetsCode,
                    asset_id: serviceList[i].asset_id,
                    nac_type: sendHeader[0].nac_type,
                    nac_status: res.data.data[0].nac_status,
                  }, config.headers)

                  if (i + 1 === serviceList.length) {
                    swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                      const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                      window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                    });
                  }
                })
            }
          } else {
            for (let i = 0; i < serviceList.length; i++) {
              const reqII = {
                dtl_id: !serviceList[i].dtl_id ? 0 : serviceList[i].dtl_id,
                usercode: data.UserCode,
                nac_code: nac_code, // ได้จาก Response ของ Store_FA_control_create_doc
                nacdtl_row: i,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                nacdtl_assetsName: serviceList[i].name,
                nacdtl_assetsSeria: serviceList[i].serialNo,
                nacdtl_assetsPrice: serviceList[i].price,
                asset_id: !serviceList[i].asset_id ? 0 : serviceList[i].asset_id,
                nacdtl_assetsDtl: serviceList[i].nacdtl_assetsDtl,
                nacdtl_assetsCount: serviceList[i].nacdtl_assetsCount,
                image_1: serviceList[i].image_1,
                image_2: null,
              }

              await Axios.post(config.http + '/stroe_FA_control_DTL_ConfirmSuccess', {
                nac_code,
                usercode: data.UserCode,
                nacdtl_assetsCode: serviceList[i].assetsCode,
                asset_id: serviceList[i].asset_id,
                statusCheck: serviceList[i].statusCheck,
              }, config.headers)

              await Axios.post(config.http + '/store_FA_control_update_DTL', reqII, config.headers)
                .then(async (resII) => {
                  if (i + 1 === serviceList.length) {
                    swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
                      const pathLink = resII.data.data[0].nac_code ? resII.data.data[0].nac_code : nac_code
                      window.location.href = '/NAC/ChangeAssets_2?' + pathLink
                    });
                  }
                })
            }
          }
        }
      })
    // }
  }

  const handleReply = async () => {
    const reqUpdateStatus = {
      usercode: data.UserCode,
      nac_code: nac_code,
      nac_status: 1,
      nac_type: sendHeader[0].nac_type,
      source: sendHeader[0].source,
      sourceDate: sendHeader[0].sourceDate,
      des_delivery: sendHeader[0].des_delivery,
      des_deliveryDate: sendHeader[0].des_deliveryDate,
      des_approve: sendHeader[0].des_approve,
      des_approve_date: sendHeader[0].des_approve_date,
      real_price: sendHeader[0].real_price,
      realPrice_Date: sendHeader[0].realPrice_Date,
      verify_by: null,
      verify_date: null,
      source_approve: null,
      source_approve_date: null,
    }
    await Axios.post(config.http + '/store_FA_control_updateStatus', reqUpdateStatus, config.headers)
      .then(async (res) => {
        if (res.data) {
          await store_FA_SendMail({
            nac_code
          })
          await store_FA_control_comment({
            nac_code,
            usercode: data.UserCode,
            comment: `ตีกลับรายการ "${commentReply}"`,
          })
          setOpenDialogReply(false);
          swal("แจ้งเตือน", 'อัปเดตรายการแล้ว', "success", { buttons: false, timer: 2000 }).then((value) => {
            const pathLink = res.data.data[0].nac_code ? res.data.data[0].nac_code : nac_code
            window.location.href = '/NAC/ChangeAssets_2?' + pathLink
          });
        }
      })
  }

  const handleChangeCommentReply = (event) => {
    event.preventDefault();
    setCommentReply(event.target.value)
  }

  const handleCloseDialogReply = () => {
    setOpenDialogReply(false);
  };

  const handleOpenDialogReply = () => {
    setOpenDialogReply(true);
  };

  const handleClose_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(false);
  };

  const handleOpen_drop_NAC_byDes = () => {
    setDrop_NAC_byDes(true);
  };

  const drop_NAC = async () => {
    await Axios.post(config.http + '/store_FA_control_drop_NAC', {
      usercode: data.UserCode,
      nac_code,
    }, config.headers)
      .then((res) => {
        if ('data' in res) {
          setDrop_NAC_byDes(false);
          swal("แจ้งเตือน", 'ทำการลบรายการ ' + nac_code + ' แล้ว', "success", { buttons: false, timer: 2000 })
            .then(() => {
              if ((permission_MenuID ? permission_MenuID.includes(2) : null) === true) {
                window.location.href = "/NAC/AdminStatus";
              } else {
                window.location.href = "/NAC/UserStatus";
              }
            });
        } else {
          swal("แจ้งเตือน", 'ไม่สามารถลบ ' + nac_code + ' ได้', "error")
        }
      })
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (users.length < 10 || dataAssets.length < 10) {
      List_Users();
    }
  })

  if ((!sendHeader[0].nac_code && nac_code)) {
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
  } else if (sendHeader[0].nac_type === '3' || sendHeader[0].nac_type === 3) {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppbarNAC
          nac_code={nac_code}
          nac_type={sendHeader[0].nac_type}
          sendHeader={sendHeader}
          approveData={approveData}
        />
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'baseline'
            }}
          >
            <Card
              style={{
                borderTopLeftRadius: '100%',
                borderBottomLeftRadius: '0%',
                'maxWidth': 'fit-content',
                'backgroundColor': sendHeader[0].nac_status === 1 ?
                  '#1E90FF' : sendHeader[0].nac_status === 2 ?
                    '#6495ED' : sendHeader[0].nac_status === 3 ?
                      '#FF69B4' : sendHeader[0].nac_status === 4 ?
                        '#00CED1' : sendHeader[0].nac_status === 5 ?
                          '#6A5ACD' : sendHeader[0].nac_status === 6 ?
                            '#008000' : sendHeader[0].nac_status === 7 ?
                              '#FFA500' : sendHeader[0].nac_status === 8 ?
                                '#F0E68C' : sendHeader[0].nac_status === 11 ?
                                  '#F4A460' : sendHeader[0].nac_status === 12 ?
                                    '#DDA0DD' : sendHeader[0].nac_status === 13 ?
                                      '#6A5ACD' : sendHeader[0].nac_status === 14 ?
                                        '#708090' : sendHeader[0].nac_status === 15 ?
                                          '#6A5ACD' : '#DC143C'
              }}
              sx={{ mt: { xs: 3, md: 6 }, p: { xs: 1 }, color: 'RGB(255,255,255)' }}
            >
              <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', ml: 5, mt: 1 }}>
                {sendHeader[0].status_name}
              </Typography>
            </Card>
          </Box>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, width: '100%', overflow: 'hidden' }}>
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
                <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }} >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold !important' }}>
                      {nac_code}
                    </Typography>
                  </Stack>
                </Paper>
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
                            autoHighlight
                            onChange={(e, newValue, reason) => {
                              if (!newValue || reason === 'clear') {
                                const listHeader = [...sendHeader]
                                listHeader[0]['source'] = ""
                                listHeader[0]['source_Department'] = ""
                                listHeader[0]['source_BU'] = ""
                                setSendHeader(listHeader)
                              } else if (users.filter((res) => res.UserCode === newValue)[0]) {
                                const listHeader = [...sendHeader]
                                listHeader[0]['source'] = newValue
                                listHeader[0]['source_Department'] = users.filter((res) => res.UserCode === newValue)[0].DepCode
                                listHeader[0]['source_BU'] = users.filter((res) => res.UserCode === newValue)[0].BranchID === 901 ? `Center` : `Oil`
                                setSendHeader(listHeader)
                              } else {
                                swal("แจ้งเตือน", "ไม่พบข้อมูล", "error")
                                  .then(() => {
                                    const listHeader = [...sendHeader]
                                    listHeader[0]['source'] = ""
                                    listHeader[0]['source_Department'] = ""
                                    listHeader[0]['source_BU'] = ""
                                    setSendHeader(listHeader)
                                  })
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
                          autoHighlight
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
                        ผู้ทำรายการ : [{data.UserCode}] {dayjs(sendHeader[0].source_date).format('YYYY-MM-DD')}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ผู้ตรวจสอบ : {sendHeader[0].verify_by_userid ? `[${sendHeader[0].verify_by_userid}]` : ''} {sendHeader[0].verify_date ? dayjs(sendHeader[0].verify_date).format('YYYY-MM-DD') : ''}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        ผู้อนุมัติ : {sendHeader[0].source_approve ? `[${sendHeader[0].source_approve}]` : ''} {sendHeader[0].source_approve_date ? dayjs(sendHeader[0].source_approve_date).format('YYYY-MM-DD') : ''}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography sx={{ fontWeight: 'bold !important' }}>
                        บัญชีตรวจสอบ : {sendHeader[0].account_aprrove_id ? `[${sendHeader[0].account_aprrove_id}]` : '-'}
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Grid container justifyContent='center' alignItems='center' sx={{ py: 2 }}>
              {(sendHeader[0].nac_status === 1 ||
                permission_MenuID.indexOf(16) >= 0
              ) ? (
                <Grid item>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleUpdateNAC}
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    Update
                  </Button>
                </Grid>
              ) : null}
              {(sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                (sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                ((sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 2 || sendHeader[0].nac_status === 5)
                  && permission_MenuID.indexOf(10) >= 0) ? (
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenDialogReply}
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    Reply
                  </Button>
                </Grid>
              ) : null}
              {sendHeader[0].nac_status === 1 ? (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleSubmit_To_Verify}
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    Submit
                  </Button>
                </Grid>
              ) : null}
              {(sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                (sendHeader[0].nac_status === 2 && permission_MenuID.indexOf(10) >= 0) ? (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleSubmit_To_Approve}
                    color="success"
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    Accept
                  </Button>
                </Grid>
              ) : null}
              {(sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                (sendHeader[0].nac_status === 4 && sendHeader[0].des_delivery === data.UserCode) ||
                (sendHeader[0].nac_status === 14 && sendHeader[0].des_delivery === data.UserCode) ||
                (sendHeader[0].nac_status === 5 && permission_MenuID.indexOf(11) >= 0) ||
                ((sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 4 || sendHeader[0].nac_status === 14 || sendHeader[0].nac_status === 5)
                  && permission_MenuID.indexOf(10) >= 0) ? (
                <Grid item>
                  <Button
                    variant="contained"
                    color={sendHeader[0].nac_status === 3 ? "success" : "primary"}
                    onClick={sendHeader[0].nac_status === 3 ? handle_approve_forms : handleSubmit_Form}
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    {sendHeader[0].nac_status === 4 ? `Submit` : `Accept`}
                  </Button>
                </Grid>
              )
                : null}
              {(sendHeader[0].nac_status === 3 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                (sendHeader[0].nac_status === 2 && approveData.filter((res) => res.approverid === data.UserCode)[0]) ||
                ((sendHeader[0].nac_status === 3 || sendHeader[0].nac_status === 2) && permission_MenuID.indexOf(10) >= 0) ? (
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpen_drop_NAC_byDes}
                    sx={{ fontSize: '1.2rem', fontWeight: 'bold !important', m: 1 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              )
                : null}
            </Grid>
          </Paper>
          <CommentNAC
            handleClickOpenDialog={handleClickOpenDialog}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            data={data}
            nac_code={nac_code}
            headers={sendHeader}
            description={description}
            setDescription={setDescription}
            setOpenDialog={setOpenDialog}
          />
        </Container>
        <Dialog open={openDialogReply} onClose={handleCloseDialogReply} >
          <DialogTitle>กรุณาระบุข้อความ/เหตุผล ที่ตีกลับเอกสาร</DialogTitle>
          <DialogContent sx={{ width: 500 }}>
            <TextField
              autoFocus
              margin="dense"
              id="link_document"
              label="ข้อความ"
              type="text"
              onChange={handleChangeCommentReply}
              fullWidth
              variant="standard"
              sx={{ pb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReply} variant='contained'>บันทึก</Button>
            <Button onClick={handleCloseDialogReply} variant='contained' color='error'>ยกเลิก</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={drop_NAC_byDes}
          onClose={handleClose_drop_NAC_byDes}
        >
          <DialogTitle id="alert-dialog-title">
            {"แจ้งเตือน"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              คุณต้องการที่จะยกเลิกรายการ {nac_code} ใช่หรือไม่
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={drop_NAC} variant='contained'>ใช่</Button>
            <Button onClick={handleClose_drop_NAC_byDes} variant='contained' color='error' autoFocus>
              ไม่ใช่
            </Button>
          </DialogActions>
        </Dialog>
        <Outlet />
      </React.Fragment >
    );
  } else if (counter === 2) {
    swal("แจ้งเตือน", '404 NOT FOUND THIS PAGE', "warning")
      .then(() => {
        window.location.href = `/NAC/HomePage_NAC`;
      })
  }
}