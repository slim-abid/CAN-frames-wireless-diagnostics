const mqtt =require("mqtt")
const express = require('express')
const {request,response}=require('express')
const app=express();
const http = require("http");

var cors = require('cors')
//middlewares
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});
server.listen(3001)

var options = {
    port: 1883, //don't put 8883 because it's encrypted
    host: 'mqtt://' + 'mqtt.flespi.io', //put your ibm cloud host in the empty string
    clientId: 'a:p9wc2t:' + Math.random().toString(16).substr(2, 8), // a:orgId: in the empty string
    username: '7yWBwW0g0mQmOVhk9Xye1JDhZSo4nn5iLRK5CyaqJQClzJtyuPCjp3pcMD7XQ26q', // your API key
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'};
   
    


var topicSub1="my/topic";
var client  = mqtt.connect(options.host, options)
console.log("connected flag "+client.connected);

io.once('connect', (socket) => {
  console.log('socket io connected');
  socket.emit('message', 'a dog');
  io.on('disconnect', (msg) => {
    console.log('io disconnected');
  });

});
client.on('message',function(topic,message,packet)
{
 message=JSON.parse(message) 
 console.log(message);
 io.emit("message", message);


});
client.on("connect",function () {
  console.log("connected"+client.connected);
  
})
client.on('error',function (error) {
  console.log("Can't connect"+error);
  process.exit(1)
})
function publish(topicPub1,data,options)
 {
  console.log("publishing",data);
  if(client.connected==true){
    client.publish(topicPub1,data,options);
  }
}
function subscribe(topicSub,options)
{
 
  if(client.connected==true){
    client.subscribe(topicSub,options);
    console.log("subscribed successfully");
    
  }
}
client.subscribe(topicSub1,{qos:0});
app.get('/login',  (req, res) => {

  res.sendStatus(200);

})