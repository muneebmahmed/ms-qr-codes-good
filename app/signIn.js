import React, {Component} from 'react';
import {StyleSheet, Button, Text, TextInput, Image, View, Platform, Alert, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import {store} from './store';
//import {styles} from './styles'

const host = 'https://qrcodes4good.com:8080';
const loginEndpoint = '/api/user/login';
const touchEndpoint = '/api/user/bioLogin';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
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
      Alert.alert('Authentication Failure')
    })
  }

  render() {
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
        <Button
          title={'Use Touch ID'}
          style={styles.input}
          onPress={this._touchLogin.bind(this)}
        />
        <Text>This is the Sign In Page</Text>
        <Button
            onPress={() => navigate('Create')}
            title="create new account"
        />
        <Button
            onPress={() => navigate('Forgot')}
            title="forgot password?"
        />
      </View>
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
  },
});

export default Login;