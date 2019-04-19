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
import { AppRegistry, Text, Switch, TextInput, View, Button,StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {host, createEndpoint, WIDTH, HEIGHT} from '../constants';
import logo from '../images/logo.png';

export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
    };
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(WIDTH / 2);
  }

  static navigationOptions = {
        title: 'Create Account',
        headerMode: 'screen',
        headerTitle: 'Create Account',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
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

  _onPressButton() {
    var endpoint = host + createEndpoint;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        confirmPassword: this.state.ConfirmPassword,
        name: (this.state.FirstName + ' ' + this.state.LastName),
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var confirm = responseJson['accountCreated'];
      if (confirm) {
        Alert.alert('Account Created!');
        this.resetNavigation('LoginScreen');
      }
      else
        Alert.alert(responseJson['message']);
    })
    .catch((error) => {
      console.error(error);
    });
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
        toValue: HEIGHT / 10,
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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight}]}>
        <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />

        <View style={styles.Parent}>
          <TextInput
            value={this.state.FirstName}
            onChangeText={(FirstName) => this.setState({FirstName})}
            style={styles.input}
            placeholder="First Name"
          />
        </View>

        <View style={styles.Parent}>
          <TextInput
            value={this.state.LastName}
            onChangeText={(LastName) => this.setState({LastName})}
            style={styles.input}
            placeholder="Last Name"
          />
        </View>

        <View style={styles.Parent}>
          <TextInput
            value={this.state.Email}
            onChangeText={(Email) => this.setState({Email})}
            style={styles.input}
            placeholder="Email"
          />
        </View>

        <View style={styles.Parent}>
          <TextInput
            value={this.state.Password}
            onChangeText={(Password) => this.setState({Password})}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
          />
        </View>

        <View style={styles.Parent}>
          <TextInput
            value={this.state.ConfirmPassword}
            onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword})}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirm Password"
          />
        </View>

        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Create My Account"
          />
        </View>
      </Animated.View>

      </TouchableWithoutFeedback>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',

  },
  input: {
    width: WIDTH - 50,
    height: HEIGHT / 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: HEIGHT / 90,
  },
  Parent: {
      
    alignItems: 'flex-start',
    margin: 2,
    flexDirection: 'column',

  },
  Text: {
      
    fontSize: 18,
    paddingBottom: 5,
  },

  TextHeader: {
   //paddingTop: 0,
    paddingBottom: 30,
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  ButtonContainer: {
    
    margin: 10,
    flexDirection: 'row',
    //borderRadius: 5,
    //borderWidth: 1,
    justifyContent: 'center',

  },
  logo: {
    height: WIDTH / 2,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  },
 
});
