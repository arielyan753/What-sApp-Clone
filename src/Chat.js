import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom" ;
import { Avatar } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import db from './firebase';
import { useStateValue } from './stateProvider';
import firebase from 'firebase/compat/app';
import{
  getFirestore , collection , onSnapshot,
   addDoc , deleteDoc , doc,
  query , where ,
   orderBy , serverTimestamp
 } from'firebase/firestore'




function Chat() {

  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  const  params = useParams();
  const roomId = params.roomId;
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  
  useEffect(()=>{
    if (roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
        setRoomName(snapshot.data().name)
      ));
      db.collection('rooms').doc(roomId).collection("messages")
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => setMessages((snapshot.docs.map((doc) =>
      doc.data()
      )))  )
    }
  },[roomId])

  useEffect(()=> {
      setSeed(Math.floor(Math.random() * 5000))
  },[roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed', input );

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    })
    setInput("")
  };

  const formatDateTime= (dateTime) => {
    const now = new Date(dateTime);
    const current = now.toLocaleTimeString('en-US', {
      // en-US can be set to 'default' to use user's browser settings
      hour: '2-digit',
      minute: '2-digit',
    });

    return current
}

  let randomColor = Math.floor(Math.random()*16777215).toString(16);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`} />   
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen at{" "}
          {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div> 

        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map(message => (
        <p className={`chat__message ${
          message.name === user.displayName && 'chat__reciever'}`}>
        <span className='chatName'>{message.name}</span>
          {message.message} 
        <span className='chat__timestamp'>
          {formatDateTime(new Date().toString())}
        </span>
          </p>
        ))}

      </div>

      <div className='chat__footer'>
      <IconButton>
        <InsertEmoticonIcon />
      </IconButton>  
        <form>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
           placeholder='Type a message' />
          <button onClick={sendMessage} type='submit' >Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
