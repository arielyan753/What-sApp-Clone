import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import db from './firebase';
import { NavLink } from "react-router-dom";

function SidebarChat({ name, id ,addNewChat}) {

    const [seed, setSeed] = useState('');
    const[messages,setMessages]=useState("");

    useEffect(()=>{
      if(id){
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp","desc")
          .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>
            doc.data()))
          );
     }
    },[id]);

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat room');
        if (roomName){
            // do some cleaver database stuff...
            db.collection('rooms').add({
              name: roomName,
            });
        }
    };

  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>    
    <div className='sidebarChat'>
    <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
    <div className='sidebarChat__info'>
     <h2>{name}</h2>
     <p>{messages[0]?.message}</p>
    </div>
 </div>
 </NavLink>

  ): (
    <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat
