import React, {Component} from 'react';
import {StyleSheet, Button, Text, TextInput, Image, View, Platform, Alert, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import {store} from '../store';
import {host, loginEndpoint, touchEndpoint} from '../constants';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

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
          AsyncStorage.setItem('TouchToken', responseJson['touchAuthToken']);
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
    TouchID.authenticate('Log in to Give')
    .then(success => {
      AsyncStorage.getItem('TouchToken')
      .then((touchToken) => {

        var endpoint = host + touchEndpoint;
        fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            touchAuthToken: touchToken,
            devID: DeviceInfo.getUniqueID(),
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          var confirm = responseJson['loggedIn'];
          if (confirm) {
            store.name = responseJson['name'];
            store.authToken = responseJson['loginAuthToken'];
            store.email = responseJson['email'];
            var now = new Date();
            now.setMinutes(now.getMinutes() + 10);
            store.logOutTime = now;
            try {
              AsyncStorage.setItem('TouchToken', responseJson['touchAuthToken']);
            } catch(error){
              console.log(error);
            }
            store.loggedIn = true;
            this.resetNavigation('Main');
          }
          else{
            Alert.alert(responseJson['message']);
          }
        })
        .catch((error) => {
          //console.error(error);
          Alert.alert('Authentication Failure')
        });
      });
    })
    .catch(error => {
      console.log(error);
    })
  }
  getBioString(){
    TouchID.isSupported()
    .then(biometryType => {
      if (biometryType == 'FaceID'){
        store.biometryType = 'Face ID';
        this.setState({
          dataAvailable: true,
          bioString: 'Face ID',
        });
      }
      else{
        store.biometryType = 'Touch ID';
        this.setState({
          dataAvailable: true,
          bioString: 'Touch ID',
        })
      }
    })
    .catch(error =>{
      this.setState({
        dataAvailable: true,
        bioString: 'None',
      })
    });
  }
  renderTouchID(){
    if (this.state.bioString == 'None'){
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
  componentDidMount(){
    this.getBioString();
  }

  render() {
    if (!this.state.dataAvailable){
      return null
    }
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder={'Username'}
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

      </View>
      ); 
        /* TODO: forgot password page
        <Button
            onPress={() => navigate('Forgot')}
            title="Forgot Password?"
        />*/
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
});

export default Login;
