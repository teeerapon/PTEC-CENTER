/* eslint-disable jsx-a11y/alt-text */
import logoPure from './FixAssets/image/Picture1.png';
import '../App.css';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <header className="App-header">
      <img className="App-logo-nac" src={logoPure} loading="lazy" />
      <Typography sx={{ mt: 3, fontSize: '1.5rem !important', fontWeight: 'bold' }} gutterBottom>
        {'(PURE THAI ENERGY CO.,LTD)'}
      </Typography>
      <Typography sx={{ mb: 2, fontSize: '1.25rem !important', fontWeight: '500' }} gutterBottom>
        {'ยินดีต้อนรับสู่เว็บไซต์ เพียวพลังงานไทย จำกัด'}
      </Typography>
      <a
        className="App-link"
        href="https://www.purethai.co.th/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Purethai
      </a>
    </header>
  );
}

export default App;
