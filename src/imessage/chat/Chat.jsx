import React, { useEffect, useState } from "react";
import TelegramIcon from "@material-ui/icons/Telegram";
import "./Chat.css";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Message from "./message/Message";
import { useSelector } from "react-redux";
import { selectchatName, selectchatId } from "../../features/chatSlice";
import { selectUser } from "../../features/userSlice";
import firebase from "../../firebase";
import FlipMove from "react-flip-move";

const db = firebase.firestore();

function Chat() {
  const [message, setMessage] = useState(""),
    [messages, setMessages] = useState([]),
    chatName = useSelector(selectchatName),
    user = useSelector(selectUser),
    chatId = useSelector(selectchatId);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      db.collection("chats").doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        data: message,
        uid: user.uid,
        photo: user.photo,
        displayName: user.displayName,
        email: user.email,
      });
    } else {
      alert("you cannot send an empty message");
    }

    setMessage("");
  };

  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name"> {chatName} </span>
        </h4>
        <strong>Details </strong>
      </div>
      {/* body */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} content={data} />
          ))}
        </FlipMove>
      </div>
      {/* input field */}
      <div className="chat__input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="iMessage"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <IconButton type="submit">
            <TelegramIcon className="chat__input__sendicon" />
          </IconButton>
        </form>
        <IconButton className="chat__input__mic">
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
