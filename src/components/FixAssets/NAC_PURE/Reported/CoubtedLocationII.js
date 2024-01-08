import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Axios from "axios"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import NativeSelect from '@mui/material/NativeSelect';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import NoteAdd from '@mui/icons-material/NoteAdd';
import Snackbar from '@mui/material/Snackbar';
import config from '../../../../config'
import DialogContentText from '@mui/material/DialogContentText';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import swal from 'sweetalert';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.white,
  },
  // hide last border
}));

const filterOptions2 = createFilterOptions({
  stringify: (option) => option.UserCode,
});

async function Store_FA_control_create_doc(credentials) {
  return fetch(config.http + '/store_FA_control_create_doc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function AutoDeapartMent(credentials) {
  return fetch(config.http + '/AutoDeapartMent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Store_FA_control_Create_from_reported(credentials) {
  return fetch(config.http + '/Store_FA_control_Create_from_reported', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function store_FA_control_CheckAssetCode_Process(credentials) {
  return fetch(config.http + '/store_FA_control_CheckAssetCode_Process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported(credentials) {
  return fetch(config.http + '/testGetBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported2(credentials) {
  return fetch(config.http + '/getAssetbyUserBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function Reported3(credentials) {
  return fetch(config.http + '/wrongBranch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Reported_of_assets() {
  const [reported_of_assets, setReported_of_assets] = React.useState(JSON.parse(localStorage.getItem('Allaseets')));
  const data = JSON.parse(localStorage.getItem('data'));
  const [status_all] = React.useState(['none', 'สภาพดี', 'ชำรุดรอซ่อม', 'รอตัดขาย', 'รอตัดชำรุด', 'QR Code ไม่สมบูรณ์ (สภาพดี)', 'QR Code ไม่สมบูรณ์ (ชำรุดรอซ่อม)', 'QR Code ไม่สมบูรณ์ (รอตัดขาย)', 'QR Code ไม่สมบูรณ์ (รอตัดชำรุด)']);
  const [valueOfIndex, setValueOfIndex] = React.useState([]);

  // ใช้สำหรับสร้างเวลาปัจจุบัน
  const d = new Date();
  const year = (d.getFullYear()).toString();
  const month = ((d.getMonth()) + 101).toString().slice(-2);
  const date = ((d.getDate()) + 100).toString().slice(-2);
  const hours = ((d.getHours()) + 100).toString().slice(-2);
  const mins = ((d.getMinutes()) + 100).toString().slice(-2);
  const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
  const datenow = `${year}-${month}-${date}T${hours}:${mins}:${seconds}.000Z`;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const dataDepID = data.depid
  const [UserForAssetsControl, setUserForAssetsControl] = React.useState([]);
  const [users_pureDep, setUsers_pureDep] = React.useState([]);
  const [nameSource, setNmaeSource] = React.useState();
  const [nameDes, setNmaeDes] = React.useState();

  const [des_Department, setDes_Department] = React.useState();
  const [des_BU, setDes_BU] = React.useState();
  const [des_delivery, setDes_delivery] = React.useState();
  const [source_Department, setSource_Department] = React.useState(data.branchid === 901 ? null : data.DepCode);
  const [source_BU, setSource_BU] = React.useState(data.branchid === 901 ? null : 'Oil');
  const [source, setSource] = React.useState(data.branchid === 901 ? null : data.UserCode);
  const [source_Description, setSource_Description] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [valueAlert, setValueAlert] = React.useState(false);
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
        if (error.response) {
          setOpenDialog(false);
          swal("แจ้งเตือน", `หมดเวลาแล้ว`, "error").then((res) => {
            reported_of_assets.forEach(function (x, index) {
              if (x.Code === dialogComment.Code) {
                const list = [...reported_of_assets]
                list[index]['comment'] = ''
                setReported_of_assets(list)
                setOpenDialog(false);
              }
            })
          })
        }
      }).then((res) => {
        reported_of_assets.forEach(function (x, index) {
          if (x.Code === dialogComment.Code) {
            const list = [...reported_of_assets]
            list[index]['comment'] = dialogComment.comment
            setReported_of_assets(list)
            setOpenDialog(false);
          }
        })
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
      depCode: params.row.DepCodeMain,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleClick_Value = async (newSelectionModel) => {
    const nacdtl_assetsCode = newSelectionModel[newSelectionModel.length - 1]
    const responseCheckAssetCode_Process = await store_FA_control_CheckAssetCode_Process({
      nacdtl_assetsCode
    })
    if (responseCheckAssetCode_Process.data[0].checkProcess === 'false') {
      const alert_value = 'ทรัพย์สินนี้กำลังอยู่ในระหว่างการทำรายการ'
      setAlert(true);
      setValueAlert(alert_value)
    } else {
      setValueOfIndex(newSelectionModel);
    }
  }

  const fetchUserForAssetsControl = async () => {
    const { data } = await Axios.get(
      config.http + "/getsUserForAssetsControl"
    );
    const UserForAssetsControl = data;
    const users_pure = []
    for (let i = 0; i < UserForAssetsControl.data.length; i++) {
      if (UserForAssetsControl.data[i].DepID === dataDepID) {
        users_pure[i] = UserForAssetsControl.data[i]
      }
    }
    setUsers_pureDep(users_pure)
    setUserForAssetsControl(UserForAssetsControl.data);
  };

  const handleReloadingPage = async () => {
    const RoundID = reported_of_assets ? reported_of_assets[0].RoundID : null;;
    const BranchID = reported_of_assets ? reported_of_assets[0].BranchID : null;
    const UserBranch = data.branchid;
    const response = await Reported({
      RoundID,
      BranchID,
      UserBranch
    });
    const response2 = await Reported2({
      RoundID,
      BranchID,
      UserBranch
    })
    const response3 = await Reported3({
      UserBranch,
      BranchID,
      RoundID
    })
    if ('data' in response || 'data' in response2 || 'data' in response3) {
      if ((reported_of_assets ? reported_of_assets[0].BranchID : null) === 901) {
        const array1 = response2.filter((res) => res.DepCodeMain === data.DepCode)
        const array2 = response3.filter((res) => res.DepCodeMain === data.DepCode)
        const array3 = (response.data).filter((res) => res.DepCodeMain === data.DepCode)
        localStorage.setItem('Allaseets', JSON.stringify((array1).concat(array2, array3)));
        setReported_of_assets((array1).concat(array2, array3))
      } else {
        localStorage.setItem('Allaseets', JSON.stringify((response2).concat(response3, response.data)));
        setReported_of_assets((response2).concat(response3, response.data))
      }
    }
  }

  React.useEffect(() => {
    handleReloadingPage();
    fetchUserForAssetsControl();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSource_Department = (event) => {
    event.preventDefault();
    if (data.branchid !== 901) {
      setSource_Department(data.DepCode);
    } else {
      setSource_Department(event.target.value);
    }
  };

  const handleChangeSource_BU = (event) => {
    event.preventDefault();
    if (data.branchid !== 901) {
      setSource_BU('Oil');
    } else {
      setSource_BU(event.target.value);
    }
  };

  const handleChangeSource_Description = (event) => {
    event.preventDefault();
    setSource_Description(event.target.value);
  };

  const handleAutoSource_DeapartMent = async (e, newValue, reason) => {
    const UserCode = newValue
    const response = await AutoDeapartMent({
      UserCode
    });
    setSource(UserCode)
    if (!UserCode) {
      setSource_Department('')
      setSource_BU('')
      setNmaeSource('')
    } else {
      if (response.data[0].BranchID !== 901) {
        setSource_Department(response.data[0].DepCode)
        setSource_BU('Oil')
      } else {
        setSource_Department(response.data[0].DepCode)
        setSource_BU('Center')
      }
    }
  };

  const handleChangeSource_Name = (event) => {
    event.preventDefault();
    setNmaeSource(event.target.value);
  };

  //Des
  const handleChangeDes_Department = (event) => {
    event.preventDefault();
    setDes_Department(event.target.value);
  };

  const handleDes_ChangeBU = (event) => {
    event.preventDefault();
    setDes_BU(event.target.value);
  };

  const handleChangeDes_delivery2 = (event) => {
    event.preventDefault();
    setDes_delivery(event.target.value);
  };

  const handleAutoDes_DeapartMent = async (e, newValue, reason) => {
    const UserCode = newValue
    const response = await AutoDeapartMent({
      UserCode
    });
    setDes_delivery(UserCode)
    if (!UserCode) {
      setDes_Department('')
      setDes_BU('')
      setNmaeDes('')
    } else {
      if (response.data[0].BranchID !== 901) {
        setDes_Department(response.data[0].DepCode)
        setDes_BU('Oil')
      } else {
        setDes_Department(response.data[0].DepCode)
        setDes_BU('Center')
      }
    }
  };

  const handleChangeDes_Name = (event) => {
    event.preventDefault();
    setNmaeDes(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      if (data.branchid === 901) {
        setValue(0)
        setOpen(false);
        setDes_Department(null)
        setDes_BU(null)
        setDes_delivery(null)
        setSource_Department(null)
        setNmaeDes('')
        setSource_BU(null)
        setSource(null)
        setNmaeSource('')
      } else {
        setValue(0)
        setOpen(false);
        setDes_Department(null)
        setDes_BU(null)
        setDes_delivery(null)
        setNmaeDes('')
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // สำหรับหาค่า Index ของ UserCode of Auto Complete
  let resultIndex = []
  for (let i = 0; i < UserForAssetsControl.length; i++) {
    resultIndex[i] = UserForAssetsControl[i].UserCode;
  }
  resultIndex = [resultIndex]

  const handleCreate_NAC = async () => {
    if (value !== 2 || value !== '2') {
      if (!source || !source_Department || !source_BU || !nameSource) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
          !nameSource ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (value === 0 || value === '0' || !value) {
        const alert_value = 'กรุณาเลือกประเภทรายการ'
        setAlert(true);
        setValueAlert(alert_value)
      }
      else {
        const usercode = data.UserCode
        const worktype = value
        const sumPrice = null
        const des_deliveryDate = null
        const des_Description = null
        const sourceDate = datenow
        // const navigate_type = (value === 2 || value === '2') ? '/NAC_ROW/NAC_CREATE_WAIT_APPROVE?' :
        //   (value === 3 || value === '3') ? '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE?' :
        //     (value === 4 || value === '4') ? '/NAC_ROW/NAC_DELETE_WAIT_APPROVE?' :
        //       '/NAC_ROW/NAC_SEALS_APPROVE?'
        const response = await Store_FA_control_create_doc({
          usercode,
          worktype,
          des_Department,
          des_BU,
          des_delivery,
          nameDes,
          des_deliveryDate,
          source_Department,
          source_BU,
          source,
          nameSource,
          sourceDate,
          des_Description,
          source_Description,
          sumPrice,
        });
        if ('data' in response) {
          for (let i = 0; i < valueOfIndex.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = valueOfIndex[i]
            await Store_FA_control_Create_from_reported({
              usercode,
              nac_code,
              nacdtl_row,
              nacdtl_assetsCode,
            });
          }
          localStorage.setItem('NacCode', JSON.stringify({ nac_code: response.data[0].nac_code, nac_status: 1 }));
          // window.location.href = navigate_type + response.data[0].nac_code
        }
      }
    } else {
      if (!source || !source_Department || !source_BU || !nameSource) {
        const alert_value = !source ? 'กรุณากรอกข้อมูลผู้ส่ง' : !source_Department ? 'กรุณากรอกข้อมูลแผนกของผู้ส่ง' :
          !nameSource ? 'กรุณาลงชื่อผู้ส่งมอบ' : 'กรุณากรอกวันที่ของผู้ส่ง'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (!des_Department || !des_BU || !des_delivery) {
        const alert_value = !des_delivery ? 'กรุณากรอกข้อมูลผู้รับ' : !des_Department ? 'กรุณากรอกข้อมูลแผนกของผู้รับ' : 'กรุณากรอกวันที่ของผู้รับ'
        setAlert(true);
        setValueAlert(alert_value)
      } else if (value === 0 || value === '0' || !value) {
        const alert_value = 'กรุณาเลือกประเภทรายการ'
        setAlert(true);
        setValueAlert(alert_value)
      }
      else {
        const usercode = data.UserCode
        const worktype = value
        const sumPrice = null
        const des_deliveryDate = null
        const des_Description = null
        const sourceDate = datenow
        // const navigate_type = (value === 2 || value === '2') ? '/NAC_ROW/NAC_CREATE_WAIT_APPROVE/' :
        //   (value === 3 || value === '3') ? '/NAC_ROW/NAC_CHANGE_WAIT_APPROVE/' :
        //     (value === 4 || value === '4') ? '/NAC_ROW/NAC_DELETE_WAIT_APPROVE/' :
        //       '/NAC_ROW/NAC_SEALS_APPROVE/'
        const response = await Store_FA_control_create_doc({
          usercode,
          worktype,
          des_Department,
          des_BU,
          des_delivery,
          nameDes,
          des_deliveryDate,
          source_Department,
          source_BU,
          source,
          nameSource,
          sourceDate,
          des_Description,
          source_Description,
          sumPrice,
        });
        if ('data' in response) {
          for (let i = 0; i < valueOfIndex.length; i++) {
            const nac_code = response.data[0].nac_code // ได้จาก Response ของ Store_FA_control_create_doc
            const nacdtl_row = i
            const nacdtl_assetsCode = valueOfIndex[i]
            await Store_FA_control_Create_from_reported({
              usercode,
              nac_code,
              nacdtl_row,
              nacdtl_assetsCode,
            });
          }
          localStorage.setItem('NacCode', JSON.stringify({ nac_code: response.data[0].nac_code, nac_status: 1 }));
          // window.location.href = navigate_type + response.data[0].nac_code
        }
      }
    }
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  };

  const columns = [
    { field: 'Code', headerName: 'รหัสทรัพย์สิน', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'Name', headerName: 'ชื่อ', headerClassName: 'super-app-theme--header', minWidth: 130, flex: 1 },
    { field: 'OwnerID', headerName: 'ผู้ถือครอง', headerClassName: 'super-app-theme--header', minWidth: 100, flex: 1, headerAlign: 'center', align: 'center', },
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
                  {params.row.Date.split('T')[0] || ''}
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
                  {params.row.EndDate_Success.split('T')[0] || ''}
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
      field: 'Details',
      headerName: 'สถานะล่าสุด',
      headerClassName: 'super-app-theme--header',
      minWidth: 130,
      flex: 1,
      valueGetter: (params) =>
        `${params.row.Details || ''}`,
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
            {data.branchid === 901 ?
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
              </React.Fragment > :
              <React.Fragment>
                <Typography variant='body2'>
                  {params.row.Reference || ''}
                </Typography>
              </React.Fragment >}
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

  return (
    <React.Fragment>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar align="center" open={alert} autoHideDuration={4500} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
            {valueAlert}
          </Alert>
        </Snackbar>
      </Stack>
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
          <Typography variant="h5" color="inherit" className='font-vsm'>
            {data.branchid === 901 ? `รายการการตรวจนับทรัพย์ HO (${data.DepCode})` : !reported_of_assets ? 'Loading...' :
              `รายการการตรวจนับทรัพย์สินทั้งหมดของสาขาที่ ${reported_of_assets[0].BranchID}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Container maxWidth="1000px" sx={{ pt: 3, pb: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs>
              <Card
                style={{
                  'flex': 1,
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                    รวมทรัพย์สินที่ตรวจนับแล้ว
                  </Typography>
                  <Typography variant="h5" component="div" style={{ color: 'green' }} className='font-vsm font-md-sm'>
                    <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'ตรวจนับแล้ว') }).length} รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card
                style={{
                  'flex': 1,
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                    รวมทรัพย์สินที่คงเหลือ
                  </Typography>
                  <Typography variant="h5" component="div" style={{ color: 'red' }} className='font-vsm font-md-sm'>
                    <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'ยังไม่ได้ตรวจนับ') }).length} รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card
                style={{
                  'flex': 1,
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                    ทรัพย์สินสาขาอื่น ๆ
                  </Typography>
                  <Typography variant="h5" component="div" style={{ color: 'orange' }} className='font-vsm font-md-sm'>
                    <b>{reported_of_assets.filter(function (el) { return (el.remarker === 'ต่างสาขา') }).length} รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card
                style={{
                  'flex': 1,
                  'border-radius': '10px',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='hide-sm font-md-sm'>
                    ทรัพย์สินทั้งหมด
                  </Typography>
                  <Typography variant="h5" component="div" style={{ color: 'blue' }} className='font-vsm font-md-sm'>
                    <b>{reported_of_assets.length} รายการ</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            spacing={2}
            sx={{ mt: 3, mb: 1 }}
          >
            <Button variant='contained' disabled={valueOfIndex.length > 0 ? false : true} onClick={handleClickOpen} startIcon={<NoteAdd />}>New NAC</Button>
          </Stack>
          <Box sx={{ py: 2 }}>
            <DataGrid
              rows={reported_of_assets}
              columns={columns}
              getRowId={(res) => res.Code}
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
              disableSelectionOnClick
              onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
              checkboxSelection
              selectionModel={valueOfIndex}
              keepNonExistentRowsSelected
              {...other}
            />
          </Box>
          {/* <Box
              sx={{
                height: 683,
                width: '100%',
              }}
            >
              <StripedDataGrid
                sx={{
                  pl: 2,
                  pr: 2,
                  pt: 2,
                  boxShadow: 1,
                  [`& .${gridClasses.cell}`]: {
                    py: 1,
                  },
                }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{ toolbar: { csvOptions: { utf8WithBom: true } } }}
                rows={reported_of_assets}
                columns={columns}
                getRowId={(reported_of_assets) => reported_of_assets.Code}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                disableColumnMenu
                autoHeight
                getRowHeight={() => 'auto'}
                disableSelectionOnClick
                {...other}
                onSelectionModelChange={(newSelectionModel) => handleClick_Value(newSelectionModel)}
                checkboxSelection
                selectionModel={valueOfIndex}
                keepNonExistentRowsSelected
              />
            </Box> */}
        </Container>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <Stack
            sx={{ mt: 3, p: 2, pb: 0 }}
            direction="row"
            justifyContent="flex-start"
            spacing={2}
          >
            <DialogTitle className='font-vsm'>กรุณาเลือกประเภทรายการ</DialogTitle>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel className='font-vsm' variant="standard" htmlFor="demo-dialog-native"></InputLabel>
              <NativeSelect
                defaultValue={[]}
                onChange={handleChange}
                className='font-vsm'
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>None</option>
                <option value={2}>โยกย้ายทรัพย์สิน</option>
                {/* <option value={3}>เปลี่ยนแปลงรายละเอียดทรัพย์สิน</option> */}
                <option value={5}>ขายทรัพย์สิน</option>
                {/* <option value={4}>ตัดจากบัญชีทรัพย์สิน</option> */}
              </NativeSelect>
            </FormControl>
          </Stack>
          {(value === 0 || value === '0' || !value) ? null
            : (value === 2 || value === '2') ?
              (
                <React.Fragment>
                  <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      <Table aria-label="customized table" style={{ width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่ส่งมอบ</StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่รับมอบ</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <React.Fragment>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <React.Fragment>
                                  <Grid container>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        Department
                                      </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        BU
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={1}
                                    sx={{ pt: 1, pb: 1 }}
                                  >
                                    <TextField
                                      required
                                      fullWidth
                                      disabled
                                      name='source_Department'
                                      onChange={handleChangeSource_Department}
                                      value={source_Department}
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                      variant="standard"
                                    />
                                    <TextField
                                      required
                                      fullWidth
                                      disabled
                                      onChange={handleChangeSource_BU}
                                      name='source_Department'
                                      value={source_BU}
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                      variant="standard"
                                    />
                                  </Stack>
                                  {data.branchid === 901 ? (
                                    <React.Fragment>
                                      <Autocomplete
                                        freeSolo
                                        name='source'
                                        id='source'
                                        size="small"
                                        options={users_pureDep}
                                        getOptionLabel={(option) => option.UserCode}
                                        filterOptions={filterOptions2}
                                        autoHighlight
                                        onChange={(e, newValue, reason) => handleAutoSource_DeapartMent(e, newValue, reason)}
                                        renderInput={(params) => (
                                          <React.Fragment>
                                            <TextField
                                              {...params}
                                              variant="standard"
                                              label='ผู้ส่งมอบ'
                                              error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                              fullWidth
                                              autoComplete="family-name"
                                              sx={{ pt: 1 }}
                                            />
                                          </React.Fragment>
                                        )}
                                      />
                                      <TextField
                                        variant="standard"
                                        fullWidth
                                        autoComplete="family-name"
                                        error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                        onChange={handleChangeSource_Name}
                                        value={nameSource}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Typography color="black">
                                                ลงชื่อผู้ส่งมอบ :
                                              </Typography>
                                            </InputAdornment>
                                          ),
                                        }}
                                        sx={{ pt: 1 }}
                                      />
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <TextField
                                        required
                                        fullWidth
                                        name='source'
                                        id='source'
                                        label='ผู้ส่งมอบ'
                                        error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                        value={source}
                                        sx={{ pt: 1 }}
                                        variant="standard"
                                      />
                                      <TextField
                                        variant="standard"
                                        fullWidth
                                        autoComplete="family-name"
                                        error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                        onChange={handleChangeSource_Name}
                                        value={nameSource}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Typography color="black">
                                                ลงชื่อผู้ส่งมอบ :
                                              </Typography>
                                            </InputAdornment>
                                          ),
                                        }}
                                        sx={{ pt: 1 }}
                                      />
                                    </React.Fragment>
                                  )}
                                  <TextField
                                    required
                                    fullWidth
                                    onChange={handleChangeSource_Description}
                                    value={source_Description}
                                    name='source_Description'
                                    sx={{ pt: 1 }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black" className='font-vsm-sm'>
                                            หมายเหตุ :
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    variant="standard"
                                  />
                                </React.Fragment>
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <React.Fragment>
                                  <Grid container>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        Department
                                      </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        BU
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      divider={<Divider orientation="vertical" flexItem />}
                                      sx={{ pt: 1, pb: 1 }}
                                    >
                                      <TextField
                                        required
                                        fullWidth
                                        disabled
                                        align="center"
                                        name='des_Department'
                                        variant="standard"
                                        value={des_Department}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                        onChange={handleChangeDes_Department}
                                      />
                                      <TextField
                                        required
                                        align='center'
                                        name='des_BU'
                                        fullWidth
                                        disabled
                                        variant="standard"
                                        value={des_BU}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                        onChange={handleDes_ChangeBU}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Autocomplete
                                      autoHighlight
                                      freeSolo
                                      name='des_delivery'
                                      id='delivery'
                                      options={UserForAssetsControl}
                                      getOptionLabel={(option) => option.UserCode}
                                      filterOptions={filterOptions2}
                                      //value={des_delivery[resultIndex[0].indexOf(des_delivery)]}
                                      onChange={(e, newValue, reason) => handleAutoDes_DeapartMent(e, newValue, reason)}
                                      renderInput={(params) => (
                                        <React.Fragment>
                                          <TextField
                                            fullWidth
                                            autoComplete="family-name"
                                            onChange={handleChangeDes_delivery2}
                                            value={des_delivery}
                                            sx={{ pt: 1 }}
                                            variant="standard"
                                            label='ผู้รับมอบ'
                                            error={valueAlert === 'กรุณากรอกข้อมูลผู้รับ' ? true : false}
                                            {...params}
                                          />
                                        </React.Fragment>
                                      )}
                                    />
                                    <TextField
                                      variant="standard"
                                      fullWidth
                                      autoComplete="family-name"
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                      onChange={handleChangeDes_Name}
                                      value={nameDes}
                                      error={valueAlert === 'กรุณาลงชื่อผู้รับมอบ' ? true : false}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography color="black">
                                              ลงชื่อผู้รับมอบ :
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                      sx={{ pt: 1 }}
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      disabled
                                      value='none'
                                      name='des_Description'
                                      sx={{ pt: 1 }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Typography color="black" className='font-vsm-sm'>
                                              หมายเหตุ :
                                            </Typography>
                                          </InputAdornment>
                                        ),
                                      }}
                                      variant="standard"
                                    />
                                  </Grid>
                                </React.Fragment>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </React.Fragment>
                      </Table>
                    </Box>
                  </DialogContent>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      <Table aria-label="customized table" style={{ width: '100%' }}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่ส่งมอบ</StyledTableCell>
                            <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa", width: '30%' }} className='font-vsm-sm'>หน่วยงานที่รับมอบ</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <React.Fragment>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <React.Fragment>
                                  <Grid container>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        Department
                                      </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                      <Typography align='center' color="inherit" className='font-vsm-sm'>
                                        BU
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={1}
                                    sx={{ pt: 1, pb: 1 }}
                                  >
                                    <TextField
                                      required
                                      fullWidth
                                      disabled
                                      name='source_Department'
                                      onChange={handleChangeSource_Department}
                                      value={source_Department}
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                      variant="standard"
                                    />
                                    <TextField
                                      required
                                      fullWidth
                                      disabled
                                      onChange={handleChangeSource_BU}
                                      name='source_Department'
                                      value={source_BU}
                                      inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)', textAlign: 'center' } }}
                                      variant="standard"
                                    />
                                  </Stack>
                                  {data.branchid === 901 ? (
                                    <React.Fragment>
                                      <Autocomplete
                                        autoHighlight
                                        freeSolo
                                        name='source'
                                        id='source'
                                        size="small"
                                        options={users_pureDep}
                                        getOptionLabel={(option) => option.UserCode}
                                        filterOptions={filterOptions2}
                                        //value={UserForAssetsControl[resultIndex[0].indexOf(source)]}
                                        onChange={(e, newValue, reason) => handleAutoSource_DeapartMent(e, newValue, reason)}
                                        renderInput={(params) => (
                                          <React.Fragment>
                                            <TextField
                                              {...params}
                                              variant="standard"
                                              label='ผู้ส่งมอบ'
                                              fullWidth
                                              error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                              autoComplete="family-name"
                                              sx={{ pt: 1 }}
                                            />
                                          </React.Fragment>
                                        )}
                                      />
                                      <TextField
                                        variant="standard"
                                        fullWidth
                                        autoComplete="family-name"
                                        error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                        onChange={handleChangeSource_Name}
                                        value={nameSource}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Typography color="black">
                                                ลงชื่อผู้ส่งมอบ :
                                              </Typography>
                                            </InputAdornment>
                                          ),
                                        }}
                                        sx={{ pt: 1 }}
                                      />
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <TextField
                                        required
                                        fullWidth
                                        name='source'
                                        id='source'
                                        label='ผู้ส่งมอบ'
                                        error={valueAlert === 'กรุณากรอกข้อมูลผู้ส่ง' ? true : false}
                                        value={source}
                                        sx={{ pt: 1 }}
                                        variant="standard"
                                      />
                                      <TextField
                                        variant="standard"
                                        fullWidth
                                        autoComplete="family-name"
                                        error={valueAlert === 'กรุณาลงชื่อผู้ส่งมอบ' ? true : false}
                                        inputProps={{ style: { '-webkit-text-fill-color': 'rgba(0,0,0,1)' } }}
                                        onChange={handleChangeSource_Name}
                                        value={nameSource}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Typography color="black">
                                                ลงชื่อผู้ส่งมอบ :
                                              </Typography>
                                            </InputAdornment>
                                          ),
                                        }}
                                        sx={{ pt: 1 }}
                                      />
                                    </React.Fragment>
                                  )}
                                  <TextField
                                    required
                                    fullWidth
                                    onChange={handleChangeSource_Description}
                                    value={source_Description}
                                    name='source_Description'
                                    sx={{ pt: 1 }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <Typography color="black" className='font-vsm-sm'>
                                            หมายเหตุ :
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    variant="standard"
                                  />
                                </React.Fragment>
                              </StyledTableCell>
                              <StyledTableCell align="center" style={{ "borderWidth": "0.5px", 'borderColor': "#aaaaaa" }}>
                                <FormGroup>
                                  <center>
                                    <Typography variant='h4' color='#AAAAAA'>
                                      none
                                    </Typography>
                                  </center>
                                </FormGroup>
                              </StyledTableCell>
                            </StyledTableRow>
                          </TableBody>
                        </React.Fragment>
                      </Table>
                    </Box>
                  </DialogContent>
                </React.Fragment>
              )}
          <DialogActions>
            <Button variant="contained" onClick={handleCreate_NAC}>ต่อไป</Button>
            <Button variant="contained" color='error' onClick={handleClose}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>
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
      </Box>
    </React.Fragment>
  );
}