/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React from 'react';
import {KeyboardAvoidingView, Platform, CameraRoll, Dimensions, Button, Modal, View, TextInput, Image, Alert, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles';
import QRCode from 'react-native-qrcode-svg';
import {store} from '../store';
import {host, generateQREndpoint} from '../constants';
import ModalQR from './ModalQR';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      QRcodeName: '',
      checked: [],
      modalVisible: false,
    };
    this.authenticate();
  }

  saveCode(){
    const image = store.createdCode;
    console.log("hi", image);
    if (Platform.OS === 'android') {
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'png'
        })
        .fetch('GET', image)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(Alert.alert('Success', 'Photo added to camera roll!'))
            .catch(err => console.log('err:', err))
        })
    } else {
        CameraRoll.saveToCameraRoll(image)
          .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }
  onPressSubmit() {
    var success = false;
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
      if (responseJson && responseJson.hasOwnProperty('qrcodeData')) {
        success = true;
        store.createdCode = responseJson.qrcodeData;
        this.setState({modalVisible: true});
        //Alert.alert(responseJson.message);
      }
        else {
          Alert.alert(responseJson.message);
          store.createdCode = null;
      
      }
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

  _navigation(navi, route) {
    this.setState({
      modalVisible: false,
    })
    navi(route);
  }
  
  authenticate(){
    if (new Date() > store.logOutTime || !store.loggedIn){
      if (store.loggedIn){
        Alert.alert("Your token has expired");
      }
      store.pendingRedirect = true;
      store.redirectDest = 'Create QR Code';
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

  componentDidUpdate(){
    this.authenticate();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <KeyboardAvoidingView  behavior="padding" enabled>
      <ModalQR
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => Alert.alert('Modal closed')}
            uri={store.createdCode}
            onSavePress={this.saveCode.bind(this)}
            onClosePress={this._navigation.bind(this, navigate, 'Saved QR Codes')}
            firstTitle='Save'
            secondTitle='Close'
      />
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
        <View style={{alignItems: 'center',justifyContent: 'center'}}>
        <CheckBox containerStyle={{width: 130}} title='Service' checked={this.state.checked[0]} onPress={this.updateCheck.bind(this, 0)} />
        <CheckBox containerStyle={{width: 130}} title='Donation' checked={this.state.checked[1]} onPress={this.updateCheck.bind(this, 1)} />
        </View>
        <Button
          onPress={this.onPressSubmit.bind(this)}
          title="Submit"
          color="#841584"
        />
        </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 0,
    width: '100%',
    padding: 10
  },
  row: {
    flexDirection: "row",
    textAlign: 'right',
    padding: 10,
    justifyContent: 'flex-end'
  },
  keepitsmall: {
    width: 34,
    height: 34
  },
   leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  },
  qr: {
    flex: 1,
    margin: WIDTH * .15,
    marginTop: HEIGHT * .15
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: HEIGHT * .1
  }
});