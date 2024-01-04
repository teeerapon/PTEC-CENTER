import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const theme = createTheme();

export default function Nac_Main({ nac_code, nac_type, approveData, sendHeader }) {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ mt: 4, p: { xs: 2, md: 3 } }}>
            {nac_code && approveData ? (
              <React.Fragment>
                <Table>
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Typography>
                      ผู้มีสิทธิอนุมัติเอกสารฉบับนี้ :
                    </Typography>
                    {approveData.filter((res) => res.limitamount >= sendHeader[0].sumPrice && sendHeader[0].nac_type !== 1).map((resMap) => (
                      <Typography style={{ 'color': resMap.status === 1 ? 'blue' : 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                        {
                          resMap.workflowlevel === 1 ? `(AM: ${resMap.approverid})` :
                            resMap.workflowlevel === 2 ? `(SM: ${resMap.approverid})` :
                              resMap.workflowlevel === 3 ? `(DM: ${resMap.approverid})` :
                                resMap.workflowlevel === 4 ? `(FM: ${resMap.approverid})` :
                                  resMap.workflowlevel === 5 ? `(MD: ${resMap.approverid})`
                                    : null}
                      </Typography>
                    ))}
                  </Stack>
                  <hr />
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Typography>
                      ผู้มีสิทธิตรวจสอบเอกสารฉบับนี้ :
                    </Typography>
                    {approveData.filter((res) => res.limitamount < sendHeader[0].sumPrice && sendHeader[0].nac_type !== 1).map((resMap) => (
                      <Typography style={{ 'color': resMap.status === 1 ? 'blue' : 'black', fontSize: '1rem', fontWeight: 'bold' }}>
                        {
                          resMap.workflowlevel === 0 ? `(ตรวจสอบ BV: ${resMap.approverid})` :
                            resMap.workflowlevel === 1 ? `(AM: ${resMap.approverid})` :
                              resMap.workflowlevel === 2 ? `(SM: ${resMap.approverid})` :
                                resMap.workflowlevel === 3 ? `(DM: ${resMap.approverid})` :
                                  resMap.workflowlevel === 4 ? `(FM: ${resMap.approverid})` :
                                    resMap.workflowlevel === 5 ? `(MD: ${resMap.approverid})`
                                      : null}
                      </Typography>
                    ))}
                  </Stack>
                </Table>
              </React.Fragment>
            ) : null}
          </Paper>
        </Container>
      </ThemeProvider>
      <Outlet />
    </React.Fragment >
  );
}