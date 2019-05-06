/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  Image,
  View,
  Platform,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import {store} from '../store';
import {host, loginEndpoint, touchEndpoint, forgotEndpoint, HEIGHT, WIDTH} from '../constants';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import Dialog from "react-native-dialog";
import logo from '../images/logo.png';

//import {styles} from './styles'

class Login extends Component {
  constructor(props){
    super(props);
    store.loggedIn = false;
    this.state = {
      username: '',
      password: '',
      dataAvailable: false,
      bioString: '',
    };
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(WIDTH / 2);
  };
  static navigationOptions = {
    title: 'Login',
  };
  resetNavigation(targetRoute) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  _confirmLogin(){
    const {navigate} = this.props.navigation;
    var endpoint = host + loginEndpoint;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.username,
        inputPassword: this.state.password,
        devID: DeviceInfo.getUniqueID(),
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var confirm = responseJson['loggedIn'];
      if (confirm) {
        store.name = responseJson['name'];
        store.email = this.state.username;
        store.authToken = responseJson['loginAuthToken'];
        store.touchToken = responseJson['touchAuthToken'];
        var now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        store.logOutTime = now;
        try {
          //AsyncStorage.setItem('TouchToken', responseJson['touchAuthToken']);
          Keychain.resetGenericPassword()
          .then(() => {
            if (Platform.OS == 'ios'){
              Keychain.setGenericPassword(
                this.state.username,
                this.state.password,
                {accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE, accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED}
              )
            }else{
              //Hopefully this fixes Android issue with react native keychain
              Keychain.setGenericPassword(this.state.username, this.state.password);
            }
          })
        } catch(error){
          console.log(error);
        }
        store.loggedIn = true;
        if (responseJson['tosAccepted']) {
          this.resetNavigation('Main');
        } else {
          this.resetNavigation('Tos');
        }
      }
      else
        Alert.alert('Authentication Failure')

    })
    .catch((error) => {
      console.error(error);
    });
  }
  _touchLogin(){
    const {navigate} = this.props.navigation;
    Keychain.getGenericPassword({authenticationPrompt: 'Log in to Give'})
    .then((credentials) => {
      var endpoint = host + loginEndpoint;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.username,
          inputPassword: credentials.password,
          devID: DeviceInfo.getUniqueID(),
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var confirm = responseJson['loggedIn'];
        if (confirm) {
          store.name = responseJson['name'];
          store.email = credentials.username;
          store.authToken = responseJson['loginAuthToken'];
          var now = new Date();
          now.setMinutes(now.getMinutes() + 10);
          store.logOutTime = now;
          store.loggedIn = true;
          if (responseJson['tosAccepted']) {
            this.resetNavigation('Main');
          } else {
            this.resetNavigation('Tos');
          }
        }
        else
          Alert.alert('Authentication Failure')

      })
      .catch((error) => {
        console.error(error);
      });
    })
    // TouchID.authenticate('Log in to Give')
    // .then(success => {
    //   AsyncStorage.getItem('TouchToken')
    //   .then((touchToken) => {

    //     var endpoint = host + touchEndpoint;
    //     fetch(endpoint, {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         touchAuthToken: touchToken,
    //         devID: DeviceInfo.getUniqueID(),
    //       }),
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       var confirm = responseJson['loggedIn'];
    //       if (confirm) {
    //         store.name = responseJson['name'];
    //         store.authToken = responseJson['loginAuthToken'];
    //         store.email = responseJson['email'];
    //         var now = new Date();
    //         now.setMinutes(now.getMinutes() + 10);
    //         store.logOutTime = now;
    //         // try {
    //         //   AsyncStorage.setItem('TouchToken', responseJson['touchAuthToken']);
    //         // } catch(error){
    //         //   console.log(error);
    //         // }
    //         store.loggedIn = true;
    //         this.resetNavigation('Main');
    //       }
    //       else{
    //         Alert.alert(responseJson['message']);
    //       }
    //     })
    //     .catch((error) => {
    //       //console.error(error);
    //       Alert.alert('Authentication Failure')
    //     });
    //   });
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }
  getBioString(){
    AsyncStorage.getItem('Settings')
    .then((item) => {
      if (item){
        var settings = JSON.parse(item);
      }else{
        var settings = store.defaultSettings;
        try{
          AsyncStorage.setItem('Settings', JSON.stringify(settings));
        }catch(error){}
      }
      Keychain.getSupportedBiometryType()
      .then(biometryType => {
        if (biometryType == Keychain.BIOMETRY_TYPE.FACE_ID){
          store.biometryType = 'Face ID';
        } else if (biometryType == Keychain.BIOMETRY_TYPE.TOUCH_ID){
          store.biometryType = 'Touch ID';
        } else if (biometryType == Keychain.BIOMETRY_TYPE.FINGERPRINT){
          store.biometryType = 'Fingerprint';
        } else { 
          store.biometryType = 'None';
        }
        this.setState({
          settings: settings,
          dataAvailable: true,
          bioString: store.biometryType,
        });
      })
      .catch((error) =>{
        this.setState({
          dataAvailable: true,
          bioString: 'None',
        })
      });
    });
    // TouchID.isSupported()
    // .then(biometryType => {
    //   if (biometryType == 'FaceID'){
    //     store.biometryType = 'Face ID';
    //     this.setState({
    //       dataAvailable: true,
    //       bioString: 'Face ID',
    //     });
    //   }
    //   else{
    //     store.biometryType = 'Touch ID';
    //     this.setState({
    //       dataAvailable: true,
    //       bioString: 'Touch ID',
    //     })
    //   }
    // })
    // .catch(error =>{
    //   this.setState({
    //     dataAvailable: true,
    //     bioString: 'None',
    //   })
    // });
  }
  renderTouchID(){
    if (this.state.bioString == 'None' || !this.state.settings.USE_BIOMETRY){
      return null;
    }
    const str = 'Use ' + this.state.bioString;
    return(
        <Button
          title={'Use ' + this.state.bioString}
          style={styles.input}
          onPress={this._touchLogin.bind(this)}
        />
    )
  }
  forgotPassword(){
    var endpoint = host + forgotEndpoint;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.forgotEmail,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      this.setState({
        forgotVisible: false,
      })
      //Alert.alert('Reset email sent');
    })
    .catch((error) =>{
      console.error(error);
      this.setState({
        forgotVisible: false,
      })
    });
  }
  componentDidMount(){
    this.getBioString();
  }
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: WIDTH / 5,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: WIDTH / 2,
      }),
    ]).start();
  };

  render() {
    if (!this.state.dataAvailable){
      return null
    }
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this._confirmLogin.bind(this)}
        />
        {this.renderTouchID()}
        <Button
            onPress={() => navigate('Create')}
            title="Create New Account"
        />
        <Button
            onPress={() => {this.setState({forgotVisible: true})}}
            title="Forgot Password?"
        />
        
        <Dialog.Container visible={this.state.forgotVisible}>
          <Dialog.Title>Forgot Password</Dialog.Title>
          <Dialog.Description> Please enter your email address </Dialog.Description>
          <Dialog.Input value={this.state.forgotEmail} onChangeText={(username) => this.setState({forgotEmail: username})} />
          <Dialog.Button label="Cancel" onPress={() => {this.setState({forgotVisible: false})}} />
          <Dialog.Button label="OK" onPress={this.forgotPassword.bind(this)} />
        </Dialog.Container>

      </Animated.View>
      </TouchableWithoutFeedback>
      ); 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },row: {
    width: 200,
    flexDirection: "row",
    textAlign: 'right',
    padding: 10,
    justifyContent: 'flex-end'
  },
  logo: {
    height: WIDTH / 2,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  },
});

export default Login;
