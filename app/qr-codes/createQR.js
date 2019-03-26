import React from 'react';
import {Button, Text, View, TextInput, Image, Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles'
import {store} from '../store'

const host = 'https://qrcodes4good.com:8080';
const generateQREndpoint = '/api/user/generateQRCode';

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      QRcodeName: ''};
    this.authenticate();
  }
  onPressSubmit() {
    //const {navigate} = this.props.navigation;
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
        paymentType: 1,
        qrCodeGivenName: this.state.QRcodeName,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      store.createdCode = responseJson.qrcodeData;
      Alert.alert(responseJson.qrcodeData);
      Alert.alert(responseJson.message);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  resetNavigation(targetRoute) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <TextInput
        value={this.state.QRcodeName}
        style={{height: 40}}
        placeholder="Enter QR code name"
        onChangeText={(QRcodeName) => this.setState({QRcodeName})}
      />
        <TextInput
          value={this.state.amount}
          style={{height: 40}}
          placeholder="Enter default amount"
          onChangeText={(amount) => this.setState({amount})}
        />
        <Button
          onPress={this.onPressSubmit.bind(this)}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      );

  }
}
