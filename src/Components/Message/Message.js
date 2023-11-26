import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Receiver from './Receiver';
import { inputStyle } from '../Navbar/Switch';
import { useLanguage } from '../Navbar/LanguageContext';

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    margin: 16
  },
  recordText: {
    marginTop: '8px',
    textAlign: 'right'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function formatDateToText(inputDate) {
  const parts = inputDate.split(" ");
  const datePart = parts[0];
  const timePart = parts[1];

  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

function Message(props) {

  const { lang } = useLanguage();
  const { id, text, description, statusCode, sendDate } = props;
  const classes = useStyles();
  const [receiverList, setReceiverList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const refreshReceivers = () => {
    fetch(`http://localhost:8080/messages/${id}`)
    .then(res => res.json())
    .then(
        (result) => {
            setReceiverList(result);
        },
        (error) => {
            console.log(error)
        }
    )
}

  const handleExpandClick = () => {
    setOpen(!open)
    if (!open)
    refreshReceivers()
  };

  return (
    <Card className={classes.root} style={inputStyle}>
      <CardHeader 
      title={formatDateToText(sendDate)} 
      subheaderTypographyProps={inputStyle}
      subheader={`${statusCode}: ${description}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Box
      sx={{
        width: 320,
        pl: '24px',
      }}
    >
      <List
        size="sm"
        sx={(theme) => ({
          // Gatsby colors
          '--joy-palette-primary-plainColor': '#8a4baf',
          '--joy-palette-neutral-plainHoverBg': 'transparent',
          '--joy-palette-neutral-plainActiveBg': 'transparent',
          '--joy-palette-primary-plainHoverBg': 'transparent',
          '--joy-palette-primary-plainActiveBg': 'transparent',
          [theme.getColorSchemeSelector('dark')]: {
            '--joy-palette-text-secondary': '#635e69',
            '--joy-palette-primary-plainColor': '#d48cff',
          },
          '--List-insetStart': '32px',
          '--ListItem-paddingY': '0px',
          '--ListItem-paddingRight': '16px',
          '--ListItem-paddingLeft': '21px',
          '--ListItem-startActionWidth': '0px',
          '--ListItem-startActionTranslateX': '-50%',
          [`& .${listItemButtonClasses.root}`]: {
            borderLeftColor: 'divider',
          },
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
            borderLeftColor: 'currentColor',
          },
          '& [class*="startAction"]': {
            color: 'var(--joy-palette-text-tertiary)',
          },
        })}
      >
        <ListItem
          nested
          sx={{ my: 1 }}
          startAction={
            <IconButton
              variant="plain"
              size="sm"
              color="neutral"
              onClick={handleExpandClick}
            >
              <KeyboardArrowDown
                sx={{ color: inputStyle.color, transform: open ? 'initial' : 'rotate(-90deg)' }}
              />
            </IconButton>
          }
        >
          <ListItem style={inputStyle}>
            <Typography
              level="inherit"
              sx={{
                fontWeight: open ? 'bold' : undefined,
                color: open ? inputStyle.color : 'inherit',
              }}
            >
              {lang.receivers}
            </Typography>
          </ListItem>
          {open && (
            <List sx={{ '--ListItem-paddingY': '8px' }}>
            {receiverList.map(receiver => (
              <Receiver 
               key={receiver.id}
               name={receiver.name}
               phoneNumber={receiver.phoneNumber}
               >
              </Receiver>
            ))}
            </List>
          )}
        </ListItem>
      </List>
    </Box>
      </CardContent>
    </Card>
  );
}

export default Message;
