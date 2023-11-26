import React, {useState, useEffect} from "react";
import Message from "../Message/Message";

function History() {
    
    const [error, setError] = useState(null);
    const [messageList, setMessageList] = useState([]);

    const refreshReceivers = () => {
        fetch("http://localhost:8080/messages")
        .then(res => res.json())
        .then(
            (result) => {
                setMessageList(result);
            },
            (error) => {
                console.log(error)
                setError(error);
            }
        )
    }
    
    useEffect(() => {
        refreshReceivers()
    }, [])
    
    if(error) {
        return <div> Error! </div>;
    } else {
        return(
            <div>
                {
                messageList.map(message => (
                  <Message
                   key={message.id}
                   id={message.id}
                   text={message.text}
                   description={message.description}
                   statusCode={message.statusCode}
                   sendDate={message.sendDate}
                   >
                   </Message>
                ))}
                </div>
        )
    }
}
export default History;