import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLanguage } from './LanguageContext';
import { useState } from 'react';

const langItems = ['TR', 'GB', 'ES', 'JP'];

export default function LanguageSelect() {
  const storedLanguage = localStorage.getItem("language");
  const { lang, changeLanguage } = useLanguage(storedLanguage || "tr");
  const [dil, setdil] = useState(storedLanguage || "tr");

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
    setdil(event.target.value);
  };

  useEffect(() => {
    // Sayfa yenilendiğinde, localStorage'dan dil seçimini al ve güncelle
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      changeLanguage(storedLanguage);
      setdil(storedLanguage);
    }
  }, [changeLanguage]);

  return (
    <Box sx={{ backgroundColor: '#1976d2'}}>
      <FormControl>
        <Select 
          sx={{color: 'white'}}
          labelId="demo-lang-select-label"
          id="demo-lang-select"
          value={dil}
          onChange={handleLanguageChange}
        >
          {langItems.map((item) => (
            <MenuItem key={item} value={item.toLowerCase()}>
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${item.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${item.toLowerCase()}.png`}
                alt=""
              />
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
