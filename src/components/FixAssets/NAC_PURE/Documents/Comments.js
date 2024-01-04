import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import swal from 'sweetalert';
import { useNavigate } from "react-router";
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InputAdornment from '@mui/material/InputAdornment';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from "axios"
import DialogContentText from '@mui/material/DialogContentText';
import config from '../../../../config'

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

async function stroe_FA_control_Path(credentials) {
  return fetch(config.http + '/stroe_FA_control_Path', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function qureyNAC_comment(credentials) {
  return fetch(config.http + '/qureyNAC_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function qureyNAC_path(credentials) {
  return fetch(config.http + '/qureyNAC_path', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function OutlinedCard({ handleClickOpenDialog, openDialog, handleCloseDialog, data
  , nac_code, headers, description, setDescription, setOpenDialog }) {

  const [comment, setComment] = React.useState();
  const [commentFetch, setCommentFetch] = React.useState([]);
  const [path, setPath] = React.useState();
  const [pathFetch, setPathFetch] = React.useState([]);
  const navigate = useNavigate();
  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [path_Description, setPathDescription] = React.useState([{ linkpath_id: '', path_Description: '' }]);

  const handleClickOpen = async (e) => {
    setPathDescription([{ linkpath_id: e.currentTarget.id, path_Description: e.currentTarget.name }])
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delete_path = async (e) => {
    const body = { linkpath_id: path_Description[0].linkpath_id }
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    await Axios.post(config.http + "/FA_Control_Delete_PATH", body, { headers })
      .then((response) => {
        setOpen(false);
        setPathFetch(response.data.data)
      })
  }

  const handleUploadFile = async (e) => {
    if (['csv', 'xls', 'txt', 'ppt', 'doc', 'pdf', 'jpg', 'png', 'gif'].indexOf((e.target.files[0].name).split('.').pop()) > -1) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setPath(e.target.files[0].name)
    } else {
      swal("แจ้งเตือน", 'ไฟล์ประเภทนี้ไม่ได้รับอนุญาติให้ใช้งานในระบบ \nใช้ได้เฉพาะ .csv, .xls, .txt, .ppt, .doc, .pdf, .jpg, .png, .gif', "error").then((value) => {
        setFile(null)
        setFileName("")
        setDescription('')
        setPath('')
      })
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: (name.includes('PTEC')) === true ? `${name.split('C')[1]}` : `${name}`,
    };
  }

  const fetchComment = async () => {
    const responseFetch = await qureyNAC_comment({
      nac_code
    })
    if ('data' in responseFetch) {
      if (responseFetch.data.length !== 0) {
        setCommentFetch(responseFetch.data)
      }
    }

    const responsePath = await qureyNAC_path({
      nac_code
    })
    if ('data' in responsePath) {
      if (responsePath.data.length !== 0) {
        setPathFetch(responsePath.data)
      }
    }
  }

  const handleSubmitComment = async (e) => {
    if (!comment) {
      swal("แจ้งเตือน", 'กรุณาเติมข้อความ', "error").then((value) => {
        if (headers.nac_type === 1) {
          navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE')
        } else if (headers.nac_type === 2) {
          navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE')
        } else if (headers.nac_type === 3) {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        } else if (headers.nac_type === 4) {
          navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE')
        } else if (headers.nac_type === 5) {
          navigate('/NAC_ROW/NAC_SEALS_APPROVE')
        }
      });
    } else {
      const usercode = data.UserCode
      const responseComment = await store_FA_control_comment({
        nac_code,
        usercode,
        comment
      })
      setCommentFetch(responseComment.data)
      setComment(null)
      const elementScroll = document.getElementById('scroll-input')
      elementScroll.scrollTo(0, elementScroll.scrollHeight);
    }
  }

  const handleSubmitPath = async (e) => {
    if (!path || !description) {
      swal("แจ้งเตือน", 'กรุณาเติมข้อความ', "error").then((value) => {
        if (headers.nac_type === 1) {
          navigate('/NAC_ROW/NAC_CREATE_NEW_WAIT_APPROVE')
        } else if (headers.nac_type === 2) {
          navigate('/NAC_ROW/NAC_CREATE_WAIT_APPROVE')
        } else if (headers.nac_type === 3) {
          navigate('/NAC_ROW/NAC_CHANGE_WAIT_APPROVE')
        } else if (headers.nac_type === 4) {
          navigate('/NAC_ROW/NAC_DELETE_WAIT_APPROVE')
        } else if (headers.nac_type === 5) {
          navigate('/NAC_ROW/NAC_SEALS_APPROVE')
        }
      });
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };
      if (!file && path && description) {
        const usercode = data.UserCode
        const linkpath = path
        const responsePath = await stroe_FA_control_Path({
          nac_code,
          usercode,
          linkpath,
          description
        })
        if ('data' in responsePath) {
          setPathFetch(responsePath.data)
          setPath(null)
          setOpenDialog(false)
        }
      } else if (file && path && description) {
        try {
          await Axios.post(config.http + "/check_files", formData, { headers })
            .then(async (res) => {
              setFile(null)
              setFileName("")
              setDescription('')
              setPath('')
              const usercode = data.UserCode
              const linkpath = 'http://vpnptec.dyndns.org:33080/' + res.data.attach[0].ATT + '.' + path.split('.').pop();
              const responsePath = await stroe_FA_control_Path({
                nac_code,
                usercode,
                linkpath,
                description
              })
              if ('data' in responsePath) {
                setPathFetch(responsePath.data)
                setPath(null)
                setOpenDialog(false)
              }
            })
        } catch (ex) {
          swal("แจ้งเตือน", 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', "error").then((value) => {
            setFile(null)
            setFileName("")
            setDescription('')
            setPath('')
          })
        }
      }
    }
  }


  const handleChangePath = (event) => {
    event.preventDefault();
    setPath(event.target.value);
  };

  const handleChangeDescription = (event) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  const handleChangeComment = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  React.useEffect(() => {
    fetchComment();
    // 👇️ disable the rule for a single line

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <React.Fragment>
          <Grid
            container
            direction="row"
            spacing={5}
            alignItems="flex-start"
            sx={{ pb: 2, pt: 2 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
            >
              <Paper>
                <Card>
                  <CardHeader
                    title={(<Typography sx={{ fontSize: '1.2rem !important', fontWeight: 'bold' }}>เอกสารแนบ</Typography>)}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200]
                    }}
                  />
                  <Grid sx={{ pb: 1 }}></Grid>
                  {!pathFetch[0] ? null : (
                    <React.Fragment>
                      {pathFetch.map((res, index) => (
                        <React.Fragment>
                          <CardContent
                            cols={3}
                            sx={{ pl: 1, pr: 1, p: 0, m: 1 }}
                            style={{
                              'backgroundColor': 'rgb(232, 232, 232)',
                              borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                            }}
                          >
                            <Stack>
                              <ListItem
                                key={index}
                                secondaryAction={
                                  (res.userid === data.UserCode || data.UserCode === 'TPS') ? (
                                    <React.Fragment>
                                      <Tooltip title={res.linkpath}>
                                        <IconButton onClick={() => window.open(res.linkpath, "_blank")} edge="end" aria-label="comments">
                                          <FilePresentIcon />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title='delete path'>
                                        <IconButton onClick={handleClickOpen} id={res.linkpath_id} name={res.description} edge="end" aria-label="comments">
                                          <ClearIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </React.Fragment>
                                  ) :
                                    (
                                      <React.Fragment>
                                        <Tooltip title={res.linkpath}>
                                          <IconButton onClick={() => window.open(res.linkpath, "_blank")} edge="end" aria-label="comments">
                                            <FilePresentIcon />
                                          </IconButton>
                                        </Tooltip>
                                      </React.Fragment>
                                    )
                                }
                              >
                                <ListItemAvatar>
                                  <Avatar {...stringAvatar(res.userid)} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={<Typography sx={{ fontWeight: 'bold' }}>{res.userid}</Typography>}
                                  secondary={<Typography style={{ color: 'rgb(92,92,92)' }}>{res.description.includes('/') === true ? res.description.split('/')[res.description.split('/').length - 1] : res.description}</Typography>}
                                />
                              </ListItem>
                            </Stack>
                          </CardContent>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5 }}>
                    <Button
                      fullWidth
                      style={{ 'backgroundColor': 'rgb(0, 120, 255)' }}
                      onClick={handleClickOpenDialog}
                      startIcon={<ChatIcon style={{ 'color': 'white' }} />}
                    >
                      <Typography style={{ 'color': 'white' }}>แนบลิ้งเอกสาร</Typography>
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
            >
              <Paper>
                <Card>
                  <CardHeader
                    title={(<Typography sx={{ fontSize: '1.2rem !important', fontWeight: 'bold' }}>ช่องแสดงความคิดเห็น</Typography>)}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200],
                      mb: 1
                    }}
                  />
                  {commentFetch.map((res, index) => (
                    <React.Fragment>
                      <Stack
                        direction="row"
                        justifyContent={(res.userid === data.UserCode) ? 'flex-end' : 'flex-start'}
                        sx={{ m: 1 }}
                      >
                        <List
                          dense
                          style={{
                            'backgroundColor': (res.userid === data.UserCode) ? 'rgba(0, 120, 255,1)' : 'rgb(232, 232, 232)',
                            borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                          }}
                        >
                          <ListItem
                            key={index}
                            alignItems="flex-start"
                          >
                            <ListItemAvatar>
                              <Avatar {...stringAvatar(res.userid)} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ fontWeight: 'bold' }}
                                    style={{ color: (res.userid === data.UserCode) ? 'rgb(255,255,255)' : null }}>{`${res.userid} (${(res.create_date).split('T')[0]}  ${(res.create_date).split('T')[1].split('.')[0].split(':')[0]}:${(res.create_date).split('T')[1].split('.')[0].split(':')[1]})`}</Typography>
                                </React.Fragment>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography

                                    style={{ color: (res.userid === data.UserCode) ? 'rgb(255,255,255)' : 'rgb(92,92,92)' }}>{res.comment}</Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </List>
                      </Stack>
                    </React.Fragment>
                  ))}
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5, pb: 0 }}>
                    <Input
                      placeholder="Comment..."
                      fullWidth
                      sx={{ p: 0.5 }}
                      value={!comment ? '' : comment}
                      onChange={handleChangeComment}
                    />
                  </CardActions>
                  <CardActions titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{ p: 1.5 }}>
                    <Button
                      fullWidth
                      style={{ 'backgroundColor': !comment ? 'rgb(240, 240, 240)' : 'rgb(0, 120, 255)' }}
                      disabled={!comment ? true : false}
                      onClick={handleSubmitComment}
                      startIcon={<ChatIcon style={{ 'color': !comment ? 'rgb(200,200,200)' : 'white' }} />}
                    >
                      <Typography style={{ 'color': !comment ? 'rgb(200,200,200)' : 'white' }}>แสดงความคิดเห็น</Typography>
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      </React.Fragment>
      <Dialog open={openDialog} onClose={handleCloseDialog} >
        <DialogTitle>กรุณาแนบลิ้งเอกสาร</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            autoFocus
            margin="dense"
            id="link_document"
            type="text"
            value={path}
            onChange={handleChangePath}
            fullWidth
            variant="standard"
            sx={{ pb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton color="info" aria-label="upload picture" component="label">
                    <input hidden type="file" name='file' onChange={handleUploadFile} />
                    <CloudDownloadIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant='body' color='black'>
                    แนบลิ้งเอกสารที่นี่ :
                  </Typography>
                </InputAdornment>
              )
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="like_description"
            value={description}
            onChange={handleChangeDescription}
            type="text"
            fullWidth
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant='body' color='black'>
                    คำอธิบาย :
                  </Typography>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPath} variant='contained'>บันทึก</Button>
          <Button onClick={handleCloseDialog} variant='contained' color='error'>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          แจ้งเตือน
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            คุณต้องการที่จะลบรายการ ({path_Description[0].path_Description}) นี้ใช่หรือไม่ ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={delete_path} variant='contained'>ใช่</Button>
          <Button onClick={handleClose} autoFocus variant='contained' color='error'>
            ไม่ใช่
          </Button>
        </DialogActions>
      </Dialog>
      <hr></hr>
      <br />
    </React.Fragment >
  );
}