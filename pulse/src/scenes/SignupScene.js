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

const times =  [];
function onStopButtonClick() {
  if (myCharacteristic) {
    myCharacteristic.stopNotifications()
    .then(_ => {
      for (var i = 0; i < list.length*20; i+=20) {
        times.push(i)
      }
      console.log('> Notifications stopped');
      myCharacteristic.removeEventListener('characteristicvaluechanged',
          handleNotifications);
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
}

const list = [];
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



const d={
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
}


export default class SignUp extends Component {

  constructor(props) {
      super(props);
    }
    render() {
        console.log(d)
        return (

          <div style={Styles.container} className="NotFound">
              <h3>Execute Script Screen</h3>
              <Button variant="contained" size="large" color="primary" onClick={onStartButtonClick}>
              Start Diagnosis
              </Button>
              <Button variant="contained" size="large" color="secondary" onClick={onStopButtonClick}>
              Stop
              </Button>
              <Chart>
              data ={d.chartData}
              </Chart>
          </div>
        );
    }
}
