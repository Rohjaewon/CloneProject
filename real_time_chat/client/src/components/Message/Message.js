import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Message.css';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser
          ? (
            <div className="messageContainer">
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
                <p className="sentText">{name}</p>
                
            </div>   
          )
          : (
            <div className="messageContainer">
                <div className="messageBox backgroundLight">
                    <p className="sentText">{user}</p>
                    <p className="messageText colorDark">{text}</p>
                </div>
                
            </div> 
          )
    )
}

export default Message;