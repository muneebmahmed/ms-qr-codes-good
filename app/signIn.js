import React, {Component} from 'react';
import {StyleSheet, Button, Text, TextInput, Image, View, Platform, AlertIOS } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import {store} from './store';
//import {styles} from './styles'

const host = 'http://104.42.36.29:3001';
const loginEndpoint = '/api/user/login';

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
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var confirm = responseJson['loggedIn'];
      if (confirm) {
        store.name = responseJson['name'];
        store.loggedIn = true;
        this.resetNavigation('Main');
      }
      else
        if (Platform.OS === 'ios')
          AlertIOS.alert('Authentication Failure')
    })
    .catch((error) => {
      console.error(error);
    });
    // var confirm = this.state.username == 'Msgive' && this.state.password == 'QR4G';
    // if (confirm)
    //     this.resetNavigation('Main')
    // else
    //   if (Platform.OS ==='ios')
    //     AlertIOS.alert('Authentication Failure')
  }
  _touchLogin(){
    const {navigate} = this.props.navigation;
    TouchID.authenticate('Log in to Give')
    .then(success => {
          var endpoint = host + loginEndpoint;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          touchIDtoken: store.touchToken,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var confirm = responseJson['loggedIn'];
        if (confirm) {
          store.name = responseJson['name'];
          store.loggedIn = true;
          this.resetNavigation('Main');
        }
      })
      .catch((error) => {
        //console.error(error);
      });
      store.loggedIn = true;
      this.resetNavigation('Main');
    })
    .catch(error => {
      if(Platform.OS ==='ios')
        AlertIOS.alert('Authentication Failure')
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