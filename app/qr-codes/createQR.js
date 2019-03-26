import React from 'react';
import {Button, Text, View, TextInput, Image } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles'
import {store} from '../store'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const host = 'https://qrcodes4good.com:8080';
const generateQREndpoint = '/api/user/generateQRCode';

var radio_props = [
  {label: 'Service', value: 0 },
  {label: 'Donation', value: 1 }
];

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      QRcodeName: ''};
    this.authenticate();
  }
  getInitialState() {
    return {
      value: 0,
    }
  }
  onPressSubmit(){
    const {navigate} = this.props.navigation;
    var endpoint = host + generateQREndpoint;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.email, //ok?
        defaultAmount: this.state.amount,
        loginAuthToken: store.authToken, //where?
        paymentType: this.state.value,
        qrCodeGivenName: this.state.QRcodeName,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      store.createdCode = responseJson.qrcodeData;
      Alert.alert(responseJson.qrcodeData);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Enter QR code name"
        onChangeText={(QRcodeName) => this.setState({QRcodeName})}
      />
        <TextInput
          style={{height: 40}}
          placeholder="Enter default amount"
          onChangeText={(amount) => this.setState({amount})}
        />
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
        <Button
          onPress={onPressSubmit}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      );

  }
}
