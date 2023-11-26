import React, { useState, useEffect } from "react";
import { Contact } from "../Directory/Contact";
import { makeStyles } from "@mui/styles";
import Form from '../Directory/Form';

const useStyles = makeStyles(() => ({
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

function Directory() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [contactList, setContactList] = useState([]);

  const refreshDirectory = () => {
    fetch("http://localhost:8080/directory")
      .then((res) => res.json())
      .then(
        (result) => {
          setContactList(result);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshDirectory();
  }, []);

  if (error) {
    return <div> Error! </div>;
  } else {
    return (
      <div className={classes.Container}>
        <Form />
        {contactList.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.name}
            phoneNumber={contact.phoneNumber}
            recordTime={contact.recordTime}
          />
        ))}
      </div>
    );
  }
}

export default Directory;
