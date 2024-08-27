// import React, { useState } from "react";
import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <div className="profile-and-name">
                  <img
                    src="/profile.jpeg"
                    alt="User profile"
                    className="profile-image"
                    style={
                      (index === 0
                        ? { visibility: "visible" }
                        : messageList[index - 1].user.name === user.name) ||
                      messageList[index - 1].user.name === "system"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  />
                  <p className="user-name">{message.user.name}</p>
                </div>
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
