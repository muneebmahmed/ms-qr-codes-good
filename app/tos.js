import React, {Component} from 'react';
import {StyleSheet, Button, Text, TextInput, Image, View, Platform, Alert, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import {store} from './store';
import {styles} from './styles'
//import {styles} from './styles'

const host = 'https://qrcodes4good.com:8080';
const tosEndpoint = '/api/user/tosUpdate';

export default class Tos extends React.Component {
  constructor(props){
    super(props);
    this.authenticate();
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

  _updateTos(){
    const {navigate} = this.props.navigation;
    var endpoint = host + tosEndpoint;
    alert(store.email);
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.email,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson['tosAccepted']) {
          this.resetNavigation('Main');
      } else {
        Alert.alert('TOS Failure')
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Accept Terms of Service Please</Text>
        <Button
            onPress={this._updateTos.bind(this)}
            title="Accept"
        />
      </View>
      ); 

  }
}