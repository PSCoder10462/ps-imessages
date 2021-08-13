import React from "react";
import Chat from "./chat/Chat";
import Sidebar from "./sidebar/Sidebar";
import "./IMessage.css";

function IMessage() {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default IMessage;
