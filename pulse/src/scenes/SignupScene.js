import React from "react";
import Button from '@material-ui/core/Button';
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

function onStopButtonClick() {
  if (myCharacteristic) {
    myCharacteristic.stopNotifications()
    .then(_ => {
      console.log('> Notifications stopped');
      myCharacteristic.removeEventListener('characteristicvaluechanged',
          handleNotifications);
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
}

function handleNotifications(event) {
  let value = event.target.value;
  let bytes = value.byteLength;
  var eight = new Uint8Array(value.buffer);
  var sliced = eight.slice(1, 12);
  console.log(eight,sliced,value,bytes)

  let a = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }

  //console.log('> ' + a.join(' '));
}

export default () =>
    <div style={Styles.container} className="NotFound">
        <h3>Execute Script Screen</h3>
        <Button variant="contained" size="large" color="primary" onClick={onStartButtonClick}>
        Start Diagnosis
        </Button>
        <Button variant="contained" size="large" color="secondary" onClick={onStopButtonClick}>
        Stop
        </Button>
    </div>
