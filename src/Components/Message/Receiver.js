import React from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { inputStyle } from '../Navbar/Switch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: inputStyle.backgroundColor,
  border: '2px solid #D7263D',
  boxShadow: 24,
  p: 4,
};

function Receiver(props) {
  const { name, phoneNumber } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ListItem>
      <ListItemButton style={inputStyle} onClick={handleOpen}>
        {name}
      </ListItemButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{color:inputStyle.color}}>
              {phoneNumber}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </ListItem>
  );
}

export default Receiver;
