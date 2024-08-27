import { useEffect, useState } from "react";

import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user,setUser] = useState(null);
  const [message, setMessage] = useState("")
  const [messageList, setMessageList] = useState([]);
  console.log("messageList", messageList);

  useEffect(()=>{
    socket.on('message',(message)=>{
      // console.log("res",message)
      setMessageList((prevState) => prevState.concat(message)); 
    })
    askUserName();
  }, []);

  const askUserName= () =>{
    const userName = prompt("당신의 이름을 입력해주세요")
    console.log("name :",userName);

    if (!userName) {
      return;
    }
    
    socket.emit("login",userName,(res)=>{
      console.log("Res",res)
      if(res?.ok){
        setUser(res.data);
      }
    })
  }

  const sendMessage=(event)=>{
    event.preventDefault();
    if (message.trim()) {  // 빈 메시지를 보내지 않도록 체크
      socket.emit("sendMessage", message, (res) => {
        console.log("sendMessage res", res);
      });
      setMessage("");
    }
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user = {user}/>
      {/* {user && <h1>Welcome, {user.name}!</h1>} */}
        <InputField message={message} 
        setMessage={setMessage} 
        sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
