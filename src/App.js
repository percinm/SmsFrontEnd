import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Directory from './Components/Directory/Directory';
import Save from './Components/Save/Save'
import History from './Components/History/History';
import { makeStyles } from "@mui/styles";
import clsx from 'clsx';
import { isDarkMode } from './Components/Navbar/Switch';
import { LanguageProvider } from './Components/Navbar/LanguageContext';
import Chart from './Components/Chart/Chart'
import Selected from './Components/Chart/Selected'

const useStyles = makeStyles(() => ({
  Container: {
    backgroundColor: "#cfe8fc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    zIndex: 1000,
    paddingTop: "64px",
    position: "fixed",
    top:0,
    left: 0,
    width:"100%",
    height: "100%",
    overflow: "auto"
  },
  darkModeContainer: {
    backgroundColor: "#203240",
  },
}));

function App() {

  const classes = useStyles();

  return (
    <LanguageProvider>
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className={clsx(classes.Container, isDarkMode && classes.darkModeContainer)}>
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="directory" element={<Directory />} />
            <Route path="save" element={<Save />} />
            <Route path="history" element={<History />} />
            <Route path="chart" element={<Chart />} />
            <Route path="chart/:id" element={<Selected />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    </LanguageProvider>
  );
}

export default App;
