import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import Chart from '../components/Chart';
const Styles = {
    container: {
        paddingTop: "100px",
        textAlign: "center"
    }
}

var myCharacteristic;


function onStartButtonClick() {

  var serviceUuid = 'cdeacb80-5235-4c07-8846-93a37ee6b86d'
  var characteristicUuid = 'cdeacb81-5235-4c07-8846-93a37ee6b86d'

  this.setState({
    chartData:{
      labels: [],//time in switch
      datasets:[
        {
          label: 'Pulse Height',
          data:[],
        }
      ],
      backgroundColor: 'rgba(255,99,132,0.6)'
    }
  })

  console.log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    console.log('Getting Service...');
    return server.getPrimaryService(serviceUuid);
  })
  .then(service => {
    console.log('Getting Characteristic...');
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristic => {
    myCharacteristic = characteristic;
    return myCharacteristic.startNotifications().then(_ => {
      console.log('> Notifications started');
      myCharacteristic.addEventListener('characteristicvaluechanged',
          handleNotifications);
    });
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}


function onStopButtonClick() {
  if (myCharacteristic) {
    myCharacteristic.stopNotifications()
    .then(_ => {
      for (var i = 0; i < list.length*20; i+=20) {
        times.push(i)
      }
      this.setState({
        chartData:{
          labels: times,//time in switch
          datasets:[
            {
              label: 'Pulse Height',
              data:list,
            }
          ],
          backgroundColor: 'rgba(255,99,132,0.6)'
        }
      })
      times = []
      list = []
      console.log('> Notifications stopped');
      myCharacteristic.removeEventListener('characteristicvaluechanged',
          handleNotifications);
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
}

var list = [];
var times =  [];
//var count = 0;
function handleNotifications(event) {
  let value = event.target.value;
  let bytes = value.byteLength;
  var eight = new Uint8Array(value.buffer);
  var sliced = eight.slice(1, 12);
  //console.log(eight,sliced,value,bytes)
  if (bytes == 11) {
  list.push.apply(list, sliced);

}
  console.log(list)

  //console.log('> ' + a.join(' '));
}



export default class SignUp extends Component {

  constructor(props) {
      super(props);

      this.state = {
        chartData:{
          labels: [],//time in switch
          datasets:[
            {
              label: 'Pulse Height',
              data:[],
            }
          ],
          backgroundColor: 'rgba(255,99,132,0.6)'
        }
      }
    }
    render() {
        console.log(this.state)
        return (

          <div style={Styles.container} className="NotFound">
              <h3>Execute Script Screen</h3>
              <Button variant="contained" size="large" color="primary" onClick={onStartButtonClick.bind(this)}>
              Start Diagnosis
              </Button>
              <Button variant="contained" size="large" color="secondary" onClick={onStopButtonClick.bind(this)}>
              Stop
              </Button>
              <Chart>
              data ={this.state.chartData}
              </Chart>
          </div>
        );
    }
}
