import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./sidebarChat/SidebarChat";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import firebase from "../../firebase";

const auth = firebase.auth(),
  db = firebase.firestore();

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("Enter the chat name:");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    } else {
      alert("chat name cannot be empty!");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          className="sidebar__avatar"
          onClick={() => auth.signOut()}
        />
        <div className="sidebar__input">
          <SearchIcon className="sidebar__searchIcon" />
          <input type="text" placeholder="Search" />
        </div>

        <IconButton className="sidebar__chats" onClick={addChat}>
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats?.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
