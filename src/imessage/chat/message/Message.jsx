import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import "./Message.css";

const Message = forwardRef(
  (
    { id, content: { timestamp, displayName, email, uid, photo, data } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message--sender"}`}
      >
        <Avatar src={photo} className="message__photo" />
        <p>{data}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
    );
  }
);

export default Message;
