import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { inputStyle } from '../Navbar/Switch';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const selectedPhoneNumbers = [];

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    margin: 16
  }
}));

function Contact(props) {
  const { name, phoneNumber, recordTime } = props;
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      // Eğer işaretleniyorsa, phoneNumber'ı ekleyin
      selectedPhoneNumbers.push(phoneNumber);
      console.log(selectedPhoneNumbers)
    } else {
      // Eğer işaret kaldırılıyorsa, phoneNumber'ı çıkarın
      const index = selectedPhoneNumbers.indexOf(phoneNumber);
      if (index !== -1) {
        selectedPhoneNumbers.splice(index, 1);
        console.log(selectedPhoneNumbers)
      }
    }
  };

  return (
    <Card className={classes.root} style={inputStyle}>
      <CardHeader 
      title={name}  
      subheaderTypographyProps={inputStyle}
      subheader={phoneNumber} />
      <CardContent>
        <Typography variant="body2" style={inputStyle}>
          {recordTime}
        </Typography>
        <Checkbox
          {...label}
          checked={isChecked}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 },
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },}}
          onChange={handleCheckboxChange}
        />
      </CardContent>
    </Card>
  );
}

export { Contact };
