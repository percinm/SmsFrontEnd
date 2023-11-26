import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import { inputStyle } from '../Navbar/Switch';
import { useLanguage } from '../Navbar/LanguageContext';

const useStyles = makeStyles(() => ({
  Container: {
    display: "flex",
    alignItems: "center",
    minHeight: "75vh",
  }
}));

const PostWithoutAuth = async (body) => {
   var request = await fetch(`http://localhost:8080/directory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return request
};

function Save() {

  const { lang } = useLanguage();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleName = (value) => {
    setName(value);
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const handleButton = () => {
    if (!name || !phoneNumber) {
      alert(lang.alert1);
      return;
    }

    if (phoneNumber.length !== 10) {
      alert(lang.alert2);
      return;
    }

    PostWithoutAuth({
      name: name,
      phoneNumber: phoneNumber,
    })
      .then((res) => res.json())
      .then((data) => {
        // Sunucudan gelen cevaptaki "message" değerini al
        const messageFromServer = data.message;

        // "message" değerini alert olarak göster
        alert(messageFromServer);
      })
      .catch((err) => console.log("Error:", err));
    setName("");
    setPhoneNumber("");
  };

  return (
    <div className={classes.Container}>
      <FormControl>
        <InputLabel htmlFor="name" sx={{color: inputStyle.color}}>
          {name ? "" : lang.name}
        </InputLabel>
        <Input
          id="name"
          onChange={(i) => handleName(i.target.value)}
          value={name}
          sx={{color: inputStyle.color}}
        />
        <InputLabel htmlFor="phoneNumber" sx={{top: 88, color: inputStyle.color}}>
          {phoneNumber ? "" : lang.phoneNumber}
        </InputLabel>
        <Input
          id="phoneNumber"
          sx={{top: 40, color: inputStyle.color}}
          inputProps={{
          maxLength: 10,
          pattern: "[0-9]*" // Sadece rakam girişine izin verir
          }}
          onChange={(i) => {
            const inputValue = i.target.value;
            // Sadece rakam girişine izin ver
            if (!inputValue.match(/^[0-9]*$/)) {
              return;
            }
            handlePhoneNumber(inputValue);
          }}
          value={phoneNumber}
        />
        <Button
          variant="contained"
          style={{
          marginTop: 60,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
          }}
          onClick={handleButton}
        >
          {lang.register}
        </Button>
      </FormControl>
    </div>
  );
}

export default Save;
