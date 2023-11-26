import React from 'react';
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UseSwitchesCustom from './Switch'
import LanguageSelect from './LanguageSelect'
import { useLanguage } from './LanguageContext';

const navItems = ['Save', 'Directory', 'History', 'Chart'];

function Navbar() {

  const { lang } = useLanguage();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ marginRight: 'auto' }}
          >
            <Link  to={`/`} style={{ textDecoration: 'none', color: 'white', cursor: 'default' }}>
              Messenger
            </Link>
          </Typography>
            {navItems.map((item) => (
              <Button key={item}
              sx={{
              backgroundColor:"#203240",
              marginRight: "5px",
              boxShadow : "none",
              '&:hover': {
                backgroundColor: '#203240'
              }
              }}>
                <Link  to={`/${item}`} style={{ textDecoration: 'none', color: 'white' }}>
                {lang[`navbar.${item.toLowerCase()}`]}
                  </Link>
              </Button>
            ))}
          <UseSwitchesCustom/>
          <LanguageSelect/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
