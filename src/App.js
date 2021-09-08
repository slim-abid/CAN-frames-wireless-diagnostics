import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {io} from "socket.io-client";
const socket = io('http://localhost:3001');

export default class App extends Component {
  constructor(props){
  super(props);
  this.state ={
    //array:[[0,1,0,1,1,0,0,1],[0,1,1,1,1,0,1,0],[0,1,0,1,1,0,1,1],[0,1,0,1,0,0,1,0],[0,1,0,1,1,0,1,1],[0,1,0,1,1,0,1,1],[0,1,0,1,1,0,1,1],[0,1,0,1,1,0,1,1]],
    bw: [],
    hexArray:[],
    data:{},
    allData:[],
    arraySec:[]
  }
  }
  componentDidMount(){
    ////////////////////////////
    socket.once('connect', () => {
      console.log(`I'm connected with the back-end`);
      
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on("message", data => {
        var interArray = this.state.allData;
        interArray.push([data.data.substr(0,8),data.data.substr(8,8),data.data.substr(16,8),data.data.substr(24,8),data.data.substr(32,8),data.data.substr(40,8),data.data.substr(48,8),data.data.substr(56,8)]);
        //this.setState({data});
        //console.log('simple data coming: ',this.state.data);
        //this.setState({allData:interArray});
        //console.log('this is all of the data: ' ,this.state.allData); 
        /*if(data)
        this.setState({arraySec:[data.data.substr(0,8),data.data.substr(8,8),data.data.substr(16,8),data.data.substr(24,8),data.data.substr(32,8),data.data.substr(40,8),data.data.substr(48,8),data.data.substr(56,8)]});
        console.log('new array: ',this.state.arraySec)*/
        var i;
        var j; 
        var k;
        var h;
        var hexData = [];
        var diffNumber;
        var som = [];
   

    
          for(i=0;i<8;i++)
          {
            hexData.push(parseInt(this.state.allData[this.state.allData.length - 1][i], 2).toString(16).toUpperCase());
            console.log('this is hexData: ',hexData)
          }
          //this.setState({hexArray:hexData},()=>console.table(this.state.hexArray));
          
          //som= [];
          var all = [];
          this.state.allData.length >=5 ? diffNumber = 5 : diffNumber = this.state.allData.length;
         
          for(h = 0;h<8;h++)
          {   
            som= [];
              for(i = 0;i<8;i++)
              {
                k=0;
                for(j=0;j<diffNumber-1;j++)
                {
                  k= ((parseInt(this.state.allData[this.state.allData.length-1-j][h][i]))^(parseInt(this.state.allData[this.state.allData.length-j-2][h][i]))) + k;
                }
                
                som.push(k);
                
              }
              all.push(som)
          }
        
          console.log('this is all: ',all)
          //console.log('bitwise result: ',som)
          this.setState({bw:all,hexArray:hexData,allData:interArray},()=> {console.log('updating bw state: ',this.state.bw[0][0])})
      
        
      });
    });
    ///////////////////////////////
    
    
  
  }
 
  
  
  render() {
    const colors = ["#FFFFFF","#ffbaba","#ff7b7b","#ff5252",	"#ff0000"]
  
    return (
      <Container style={{textAlign:'center',marginTop:'2em'}}>
       
        <Grid container justifyContent="center"  spacing={1}>
        { this.state.hexArray ?
        this.state.hexArray.map((item,j) =>
        <Grid style={{paddingRight:'125px',margin:"0.25em",borderStyle:'solid',fontSize:'30px',borderColor:"#404EED",borderRadius:'5%'}} item xs={1}>
        <div style={{backgroundColor:"#272C34",marginLeft:"1.5em"}}>{item}</div>
        
          <div style={{marginTop:"0.5em"}}>{
          this.state.allData[this.state.allData.length - 1][j].split('').map((item,i) => 
            <span key={i} style={{fontSize:'30px',display:'inline',backgroundColor:`${colors[parseInt(this.state.bw[j][i])]}`}}>{item}</span>
          )
        }</div>
        </Grid>):null}
        </Grid>
        <div>{/*this.state.data ? this.state.data.data+"" : null*/}</div>
      </Container>
    )
  }
}
