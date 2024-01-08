/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
import { Outlet, useNavigate } from "react-router";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Axios from "axios"
import config from '../../../../config.js'
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const theme = createTheme();

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const steps = ['กรอกข้อมูล', 'ตรวจสอบข้อมูล', 'เสร็จสิ้น'];

async function PeriodCreate(credentials) {
  return fetch(config.http + '/craete_period', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Checkout() {
  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();
  const [showResults, setShowResults] = React.useState(false)
  const [valueDateTime1, setValueDateTime1] = React.useState(dayjs()) //dayjs()
  const [valueDateTime2, setValueDateTime2] = React.useState(dayjs()) //dayjs()
  const [valueDescription, setValueDescription] = React.useState()
  const [brachID1, setBrachID1] = React.useState()
  const [activeStep] = React.useState(0);
  const checkUserWeb = localStorage.getItem('sucurity');

  const [PositionName, setPositionName] = React.useState([]);
  const [topic, setTopic] = React.useState();
  const [PositionAPIName, setPositionAPIName] = React.useState([]);
  const [branchName, setBranchName] = React.useState([]);
  const [branchAPIName, setBranchAPIName] = React.useState([]);
  const [userGroupAPI, setUserGroupAPI] = React.useState([]); //DepCode
  const [userGroup, setUserGroup] = React.useState([]); //DepCode
  const [userGroupCenterAPI, setUserGroupCenterAPI] = React.useState([]); //DepCode
  const [userGroupCenter, setUserGroupCenter] = React.useState([]); //DepCode
  const [topicBranch, setTopicBranch] = React.useState();

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleChangeTopicBranch = (event) => {
    setTopicBranch(event.target.value);
  };


  const handleDescription = (newValue) => {
    setValueDescription(newValue.target.value);
  };

  const toggleCheckbox = (event) => {

    setBrachID1(event.target.value)

    if (event.target.value === '1') {
      setTopic(null)
      setPositionName([])
      setShowResults(event.target.value)
    } else if (event.target.value === '2') {
      setTopicBranch(null);
      setBranchName([])
      setShowResults(event.target.value)
    }
  }

  const handleDateTime1 = (newValue) => {
    setValueDateTime1(newValue.toLocaleString("sv-SE"));
  };

  const handleDateTime2 = (newValue) => {
    setValueDateTime2(newValue.toLocaleString("sv-SE"));
  };

  const handleNext = async () => {

    let keyID = (Math.random() + 1).toString(36).substring(7);

    if (topicBranch === 0 && !topic && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 0
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        keyID
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสำหรับ CO แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/NAC/EditPeriod')
        });
      }

    } else if (topicBranch === 1 && !topic && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = branchName.map((res) => res.branchid).join(`, `)
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        keyID
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${branchName.map((res) => res.branchid).join(', ')} แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/NAC/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 0 && valueDescription) {

      const BeginDate = valueDateTime1
      const EndDate = valueDateTime2
      const BranchID = 901
      const Description = `${valueDescription}`
      const usercode = data.UserCode
      const response = await PeriodCreate({
        BeginDate,
        EndDate,
        BranchID,
        Description,
        usercode,
        keyID,
      });
      if (response.data[0]) {
        swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา HO แล้ว`, "success", {
          buttons: false,
          timer: 1500,
        }).then((value) => {
          navigate('/NAC/EditPeriod')
        });
      }

    } else if (!topicBranch && topic === 1 && valueDescription) {

      for (let i = 0; i < userGroupCenter.length; i++) {
        const BeginDate = valueDateTime1
        const EndDate = valueDateTime2
        const BranchID = 901
        const Description = `${valueDescription} ${userGroupCenter[i].UserCode}`
        const usercode = data.UserCode
        const personID = userGroupCenter[i].UserCode
        await PeriodCreate({
          BeginDate,
          EndDate,
          BranchID,
          Description,
          usercode,
          personID,
          keyID,
        });
        if ((i + 1) === userGroupCenter.length) {
          swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${userGroupCenter.map((res) => res.UserCode).join(', ')} แล้ว`, "success", {
            buttons: false,
            timer: 1500,
          }).then((value) => {
            navigate('/NAC/EditPeriod')
          });
        }
      }

    } else if (!topicBranch && topic === 2 && valueDescription) {

      for (let i = 0; i < PositionName.length; i++) {
        const BeginDate = valueDateTime1
        const EndDate = valueDateTime2
        const BranchID = 901
        const Description = `${valueDescription} ${PositionName[i].depcode}`
        const usercode = data.UserCode
        const depcode = PositionName[i].depcode
        await PeriodCreate({
          BeginDate,
          EndDate,
          BranchID,
          Description,
          usercode,
          depcode,
          keyID,
        });
        if ((i + 1) === PositionName.length) {
          swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${PositionName.map((res) => res.depcode).join(', ')} แล้ว`, "success", {
            buttons: false,
            timer: 1500,
          }).then((value) => {
            navigate('/NAC/EditPeriod')
          });
        }
      }

    } else if (!topicBranch && topic === 3 && valueDescription) {

      for (let i = 0; i < userGroup.length; i++) {
        const BeginDate = valueDateTime1
        const EndDate = valueDateTime2
        const BranchID = 901
        const Description = `${valueDescription} ${userGroup[i].UserCode}`
        const usercode = data.UserCode
        const personID = userGroup[i].UserCode
        await PeriodCreate({
          BeginDate,
          EndDate,
          BranchID,
          Description,
          usercode,
          personID,
          keyID,
        });
        if ((i + 1) === userGroup.length) {
          swal("แจ้งเตือน", `เปิดรอบตรวจนับสาขา ${userGroup.map((res) => res.UserCode).join(', ')} แล้ว`, "success", {
            buttons: false,
            timer: 1500,
          }).then((value) => {
            navigate('/NAC/EditPeriod')
          });
        }
      }

    } else {
      swal("แจ้งเตือน", "กรูณาระบุข้อมูลให้ครบถ้วน", "warning")
    }
  };

  React.useEffect(() => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    const body = {
      "branchid": data.branchid
    }

    Axios.get(config.http + `/users`, { headers }).then((res) => {
      setUserGroupAPI((res.data).filter((res) => res.BranchID === 901 && res.UserType !== 'CENTER'));
      setUserGroupCenterAPI((res.data).filter((res) => res.BranchID === 901 && res.UserType === 'CENTER'));
    })

    Axios.post(config.http + '/Department_List', body, { headers })
      .then(response => {
        var newArray = (response.data.data).filter((res) => res.depid > 14);
        setPositionAPIName(newArray)
      });

    Axios.get(config.http + '/Branch_ListAll', { headers })
      .then(response => {
        setBranchAPIName((response.data.data).filter((res) => res.branchid <= 120 ||
          res.branchid === 1000001 || res.branchid === 1000002 || res.branchid === 1000003 || res.branchid === 1000004
        ));
      });

  }, []);

  if (checkUserWeb === 'null') {
    window.location.href = '/NAC_MAIN';
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
            <Typography variant="h5" className="scaled-logo-Header" color="inherit" >
              เพิ่มรอบตรวจนับ
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <React.Fragment>
              <center>
                <Typography component="h1" variant="h5" align="center">
                  <b>PURE THAI ENERGY CO.,LTD.</b>
                </Typography>
                <Typography component="h1" variant="h6" align="center">
                  ขั้นตอนการกรอกข้อมูล
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 5, pb: 5 }} className="col-md-10">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </center>
              <React.Fragment>
                <Typography variant="body1" gutterBottom>
                  *กรุณากรอกข้อมูลให้ครบถ้วน
                </Typography>
                <Grid container spacing={3} className='pt-5'>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="fulltName"
                      name="fulltName"
                      label="ชื่อผู้เปิดรอบบันทึก"
                      value={data.name}
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={3}>
                      <Alert variant="outlined" severity="error">
                        <Typography variant="body" color='error' >
                          ข้อควรระวัง ไม่สามารถลงเวลาซ้ำกันได้
                        </Typography>
                      </Alert>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          format="YYYY-MM-DD HH:mm"
                          name="sb_operationid_startdate"
                          label={`วันที่และเวลาเริ่มต้น`}
                          sx={{ width: '100%' }}
                          value={valueDateTime1}
                          onChange={handleDateTime1}
                          ampm={false}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          format="YYYY-MM-DD HH:mm"
                          name="sb_operationid_startdate"
                          label={`วันที่และเวลาเริ่มต้น`}
                          sx={{ width: '100%' }}
                          value={valueDateTime2}
                          onChange={handleDateTime2}
                          ampm={false}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={3}>
                      <TextField
                        required
                        id="discription"
                        name="discription"
                        label='คำอธิบาย'
                        onChange={handleDescription}
                        value={valueDescription}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Radio
                        color="secondary"
                        id="0"
                        value={1}
                        onChange={toggleCheckbox}
                        checked={brachID1 === '1' ? true : false} />}
                      label="CO"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Radio
                        color="secondary"
                        id="0"
                        value={2}
                        onChange={toggleCheckbox}
                        checked={brachID1 === '2' ? true : false} />}
                      label="HO"
                    />
                  </Grid>
                  {showResults === '1' ?
                    <>
                      <Grid item xs={12} sm={12} mt={2}>
                        <p className='text-danger'>*หมายเหตุ กรุณาเลือกสาขา</p>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">เลือกคำตอบ</InputLabel>
                            <Select
                              value={topicBranch}
                              onChange={handleChangeTopicBranch}
                              fullWidth
                              input={<OutlinedInput label="เลือกแผนก" />}
                            >
                              <MenuItem value={0}>ALL</MenuItem>
                              <MenuItem value={1}>SELECT BRANCH</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      {topicBranch === 1 ? (
                        <Grid item xs={12} sm={12}>
                          <Autocomplete
                            autoHighlight
                            multiple
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={branchAPIName}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                              setBranchName(newValue);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="เลือกแผนก" placeholder="Favorites" />
                            )}
                          />
                        </Grid>
                      ) : null}
                    </>
                    : null
                  }
                  {showResults === '2' ?
                    <>
                      <Grid item xs={12} sm={12} mt={2}>
                        <p className='text-danger'>*หมายเหตุ กรุณาเลือกคำตอบ</p>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">เลือกคำตอบ</InputLabel>
                            <Select
                              value={topic}
                              onChange={handleChangeTopic}
                              fullWidth
                              input={<OutlinedInput label="เลือกแผนก" />}
                            >
                              <MenuItem value={0}>ALL</MenuItem>
                              <MenuItem value={1}>CENTER</MenuItem>
                              <MenuItem value={2}>DEPRTMENTS</MenuItem>
                              <MenuItem value={3}>PERSON</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      {topic === 1 ? (
                        <Grid item xs={12} sm={12}>
                          <Autocomplete
                            autoHighlight
                            multiple
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={userGroupCenterAPI}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.UserCode}
                            onChange={(event, newValue) => {
                              setUserGroupCenter(newValue);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.UserCode}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="เลือกบุคคล" placeholder="Favorites" />
                            )}
                          />
                        </Grid>
                      ) : null}
                      {topic === 2 ? (
                        <Grid item xs={12} sm={12}>
                          <Autocomplete
                            autoHighlight
                            multiple
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={PositionAPIName}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.depcode}
                            onChange={(event, newValue) => {
                              setPositionName(newValue);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.depcode}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="เลือกแผนก" placeholder="Favorites" />
                            )}
                          />
                        </Grid>
                      ) : null}
                      {topic === 3 ? (
                        <Grid item xs={12} sm={12}>
                          <Autocomplete
                            autoHighlight
                            multiple
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={userGroupAPI}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.UserCode}
                            onChange={(event, newValue) => {
                              setUserGroup(newValue);
                            }}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.UserCode}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField {...params} label="เลือกบุคคล" placeholder="Favorites" />
                            )}
                          />
                        </Grid>
                      ) : null}
                    </>
                    : null
                  }
                </Grid>
              </React.Fragment>
              <React.Fragment>
                <React.Fragment>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Submit
                    </Button>
                  </Box>
                </React.Fragment>
              </React.Fragment>
            </React.Fragment >
          </Paper>
        </Container>
        <Outlet />
      </ThemeProvider>
    );
  }
}