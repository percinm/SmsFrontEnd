import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Textarea from '@mui/joy/Textarea';
import { selectedPhoneNumbers } from './Contact';
import { useNavigate } from 'react-router-dom';
import { inputStyle } from '../Navbar/Switch';
import { useLanguage } from '../Navbar/LanguageContext';
import Typography from '@mui/joy/Typography';

const PostWithoutAuth = async (body) => {
  var request = await fetch(`https://www.postaguvercini.com/api_json/v1/Sms/Send_1_N`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(body),
   });

   return request
};

const PostToApi = async (body) => {
  var request = await fetch(`http://localhost:8080/messages`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(body),
   });

   return request
};

function Form() {

  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expireDate, setExpireDate] = useState (new Date());
  const updateCurrentDate = () => {
    setCurrentDate(new Date());
    setExpireDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}${month}${day} ${hours}:${minutes}`;
  };

  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 250) {
      setText(inputText);
    }
  };

  const handleSendClick = async () => {
    if (!text) {
      alert(lang.alertmsg);
      return;
    }
    if (selectedPhoneNumbers.length === 0) {
      alert(lang.alertrcv);
      return;
    }
    updateCurrentDate();

    PostWithoutAuth( {
      Message: text,
      Receivers: selectedPhoneNumbers,
      SendDate: formatDate2(currentDate),
      ExpireDate: formatDate2(expireDate),
      Username: '*****',
      Password: '*****'
    })
    .then((res) => res.json())
    .then(async (data) => {
      const { StatusCode, StatusDescription } = await data;

      PostToApi({
        text: text,
        receiver: selectedPhoneNumbers,
        sendDate: formatDate(currentDate),
        statusCode: StatusCode,
        description: StatusDescription
      });
    })
    .catch((err) => console.log("Error:", err));
    navigate('/History')
  };

  const handleDeleteClick = () => {
    setText('')
  };

  return (
      <Card style={inputStyle} sx={{marginTop: 2}}>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Textarea
            placeholder= {lang.message}
            sx={{ '--Textarea-focused': 1,  }}
            id="outlined-basic"
            variant="outlined"
            maxRows={4}
            inputprops={{ maxLength: 250, }}
            endDecorator={
              text && (
                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                {text.length}/250
              </Typography>
              )
            }
            fullwidth='true'
            value={text}
            onChange={handleInputChange}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" 
              startIcon={<DeleteIcon />}
              style={{ marginTop: '25px', marginRight: "25px", marginLeft: "25px" }}
              onClick={handleDeleteClick}
              >
                {lang.delete}
              </Button>
              <Button variant="contained" 
              endIcon={<SendIcon />} 
              style={{ marginTop: '25px', marginRight: "25px", marginLeft: "25px" }}
              onClick={handleSendClick}
              >
                {lang.send}
              </Button>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
  );
}

export default Form;
