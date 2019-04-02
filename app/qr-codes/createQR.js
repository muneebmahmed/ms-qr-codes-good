import React from 'react';
import {Button, Text, View, TextInput, Image, Alert, StyleSheet } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles'
import {store} from '../store'
import {host, generateQREndpoint} from '../constants';

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      QRcodeName: '',
      checked: []
    };
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
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        //email: store.email, //ok?
        defaultAmount: this.state.amount,
        loginAuthToken: store.authToken, //FIXME remove from body
        paymentType: this.state.checked[0]? 0 : 1,
        qrCodeGivenName: this.state.QRcodeName,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      store.createdCode = responseJson.qrcodeData;
      Alert.alert(responseJson.message);
      this.pushNavigation('Generated');
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
  pushNavigation(targetRoute){
    const pushAction = StackActions.push({
      routeName: targetRoute,
    });
    this.props.navigation.dispatch(pushAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }

  updateCheck(num){

    checked = this.state.checked;
    checked[num] = true;
    checked[1-num] = false;
    //make call to server here
    this.setState({checked: checked});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <TextInput
        value={this.state.QRcodeName}
        style={s.input}
        placeholder="Enter QR code name"
        onChangeText={(QRcodeName) => this.setState({QRcodeName})}
      />
        <TextInput
          value={this.state.amount}
          style={s.input}
          placeholder="Enter default amount"
          keyboardType='numeric'
          onChangeText={(amount) => this.setState({amount})}
        />
        <CheckBox containerStyle={{width: 130}} title='Service' checked={this.state.checked[0]} onPress={this.updateCheck.bind(this, 0)} />
        <CheckBox containerStyle={{width: 130}} title='Donation' checked={this.state.checked[1]} onPress={this.updateCheck.bind(this, 1)} />
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

const s = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});