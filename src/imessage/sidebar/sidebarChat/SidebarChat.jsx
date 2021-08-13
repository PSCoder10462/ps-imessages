import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./SidebarChat.css";
import { setChat } from "../../../features/chatSlice";
import firebase from "../../../firebase";
import * as timeago from "timeago.js";

const db = firebase.firestore();

function SidebarChat({ id, chatName }) {
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);
  return (
    <div
      className="sidebarChat"
      onClick={() => dispatch(setChat({ chatId: id, chatName: chatName }))}
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.data}</p>
        <small>
          {timeago.format(
            new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()
          )}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
