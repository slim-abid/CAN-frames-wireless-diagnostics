import React, { useEffect, useState, Fragment } from 'react';
import {io} from "socket.io-client";
const socket = io('http://localhost:3001');
/*
import mqtt from 'mqtt';
var options = {
    port: 80,
    clientId: 'a:p9wc2t:' + Math.random().toString(16).substr(2, 8), 
    username: '7yWBwW0g0mQmOVhk9Xye1JDhZSo4nn5iLRK5CyaqJQClzJtyuPCjp3pcMD7XQ26q',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolVersion: 5,
    clean: true,
    encoding: 'utf8'
  };
    
var client  = mqtt.connect('ws://mqtt.flespi.io', options);
console.log(client)
client.subscribe('my/topic');
useEffect(() => {
        var note;      
        client.on('message', function (topic, message) {
            note = message.toString();
            // Updates React state with message 
            setMesg(note);
            console.log(note);
            client.end();
            });
            
    }, []);*/
function Mqtt() {
  
  
    
  // Sets default React state 
  const [mesg, setMesg] = useState([]);
  useEffect(() => {
    socket.once('connect', () => {
      console.log(`I'm connected with the back-end`);
      
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on("message", data => {
        setMesg(data);
        console.log(data)
      });
    });
    
  }, [socket]);
  return (
    <div className="App">
    <header className="App-header">
    <h1>A taste of MQTT in React</h1>
    <p>The message is: {mesg[0] ? mesg[0] : null}</p>
        </header>
        </div>
  );
}

export default Mqtt;