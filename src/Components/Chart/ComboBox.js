import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useNavigate  } from 'react-router-dom';
import { useLanguage } from '../Navbar/LanguageContext';
import { inputStyle } from '../Navbar/Switch';

export default function ComboBox() {
  const { lang } = useLanguage();
  const [contactList, setContactList] = useState([]);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  const refreshDirectory = () => {
    fetch("http://localhost:8080/directory")
      .then((res) => res.json())
      .then(
        (result) => {
          setContactList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleContactChange = (event, newValue) => {
    setValue(newValue);
    if (newValue && newValue.id) {
      navigate(`/chart/${newValue.id}`);
    }
  };

  useEffect(() => {
    refreshDirectory();
  }, []);

  return (
    <Autocomplete
      placeholder={lang.select}
      value={value}
      onChange={handleContactChange}
      options={contactList}
      getOptionLabel={(contact) => contact.name}
      style={inputStyle}
      sx={{ width: 250 }}
    />
  );
}
