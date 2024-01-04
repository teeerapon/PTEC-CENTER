/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './components/SignIn'
import App from './components/App'
import Nav from './components/Nav'
import Permission_Pages from './components/Permission_Pages'

// SmartBill
import FormsStart from './components/SmartBill/FormsStart'
import Esg from './components/SmartBill/Esg'
import FormUpdate from './components/SmartBill/FormUpdate'
import ListForms from './components/SmartBill/ListForms'
import ListWithdraw from './components/SmartBill/ListWithdraw'
import Payment from './components/SmartBill/Payment'
import HomePage_NAC from './components/FixAssets/HomePage'

// FixAssets
import AssetsAll from './components/FixAssets/NAC_PURE/Assets/Assets_All.js'
import AssetBranch from './components/FixAssets/NAC_PURE/Assets/Assets_Branch.js'
import EbookAll from './components/FixAssets/NAC_PURE/Assets/eBook_main.js'
import EbookBranch from './components/FixAssets/NAC_PURE/Assets/eBook_branch.js'
import HistoryAssetsNAC from './components/FixAssets/NAC_PURE/Assets/history_of_assets.js'
import CountedLocation from './components/FixAssets/NAC_PURE/Reported/CountedLocation.js'
import CoubtedLocationII from './components/FixAssets/NAC_PURE/Reported/CoubtedLocationII.js'
import CountedAssets from './components/FixAssets/NAC_PURE/Reported/CountedAssets.js'
import CreatePeriod from './components/FixAssets/NAC_PURE/Period/CreatePeriod.js'
import EditPeriod from './components/FixAssets/NAC_PURE/Period/EditPeriod.js'
import AdminStatus from './components/FixAssets/NAC_PURE/StatusNAC/AdminStatus.js'
import UserStatus from './components/FixAssets/NAC_PURE/StatusNAC/UserStatus.js'
import AddAssets_1 from './components/FixAssets/NAC_PURE/Documents/AddAssets_1.js'
import AddAssets_2 from './components/FixAssets/NAC_PURE/Documents/AddAssets_2.js'
import TransferAssets_1 from './components/FixAssets/NAC_PURE/Documents/TransferAssets_1.js'
import TransferAssets_2 from './components/FixAssets/NAC_PURE/Documents/TransferAssets_2.js'
import DeleteAssets_1 from './components/FixAssets/NAC_PURE/Documents/DeleteAssets_1.js'
import DeleteAssets_2 from './components/FixAssets/NAC_PURE/Documents/DeleteAssets_2.js'
import SealsAssets_1 from './components/FixAssets/NAC_PURE/Documents/SealsAssets_1.js'
import SealsAssets_2 from './components/FixAssets/NAC_PURE/Documents/SealsAssets_2.js'
import ChangeAssets_1 from './components/FixAssets/NAC_PURE/Documents/ChangeAssets_1.js'
import ChangeAssets_2 from './components/FixAssets/NAC_PURE/Documents/ChangeAssets_2.js'

//AnimatePresence 
import AnimatePr from "./AnimatedPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <App />
        </AnimatePr>
      </div>
  },
  {
    path: "/Home",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <App />
        </AnimatePr>
      </div>
  },

  //NAC
  {
    path: "/NAC/HomePage_NAC",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <HomePage_NAC />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/AssetsAll",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <AssetsAll />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/AssetsBranch",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <AssetBranch />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/EbookBranch",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <EbookBranch />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/EbookAll",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <EbookAll />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/HistoryAssetsNAC",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <HistoryAssetsNAC />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/CountedLocation",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <CountedLocation />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/CoubtedLocationII",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <CoubtedLocationII />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/CountedAssets",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <CountedAssets />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/CreatePeriod",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <CreatePeriod />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/EditPeriod",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <EditPeriod />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/AdminStatus",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <AdminStatus />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/UserStatus",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <UserStatus />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/AddAssets_1",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <AddAssets_1 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/AddAssets_2",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <AddAssets_2 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/TransferAssets_1",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <TransferAssets_1 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/TransferAssets_2",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <TransferAssets_2 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/DeleteAssets_1",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <DeleteAssets_1 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/DeleteAssets_2",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <DeleteAssets_2 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/SealsAssets_1",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <SealsAssets_1 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/SealsAssets_2",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <SealsAssets_2 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/ChangeAssets_1",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <ChangeAssets_1 />
        </AnimatePr>
      </div>
  },
  {
    path: "/NAC/ChangeAssets_2",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <ChangeAssets_2 />
        </AnimatePr>
      </div>
  },
  //SmartBill
  {
    path: "/SMB/StartForms",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <FormsStart />
        </AnimatePr>
      </div>
  },
  {
    path: "/SMB/Esg",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <Esg />
        </AnimatePr>
      </div>
  },
  {
    path: "/SMB/FormUpdate",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <FormUpdate />
        </AnimatePr>
      </div>
  },
  {
    path: "/SMB/ListForms",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <ListForms />
        </AnimatePr>
      </div>
  },
  {
    path: "/SMB/ListWithdraw",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <ListWithdraw />
        </AnimatePr>
      </div>
  },
  {
    path: "/SMB/Payment",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <Payment />
        </AnimatePr>
      </div>
  },

  {
    path: "/Permission_Pages",
    element:
      <div className="App">
        <Nav />
        <AnimatePr>
          <Permission_Pages />
        </AnimatePr>
      </div>
  },
]);

const date_login = localStorage.getItem('date_login') ?? undefined;
const d = new Date();
const year = (d.getFullYear()).toString();
const month = ((d.getMonth()) + 101).toString().slice(-2);
const date = ((d.getDate()) + 100).toString().slice(-2);
const hours = ((d.getHours()) + 100).toString().slice(-2);
const mins = ((d.getMinutes()) + 100).toString().slice(-2);
const seconds = ((d.getSeconds()) + 100).toString().slice(-2);
const datenow = `${year + month + date + hours + mins + seconds}`
const token = localStorage.getItem('token');
const permission = JSON.parse(localStorage.getItem('permission_MenuID'));

if (!token || !date_login || ((datenow - date_login) > 120000) || !permission) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Login />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
