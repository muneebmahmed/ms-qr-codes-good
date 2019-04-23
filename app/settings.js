/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React, { Component } from 'react';
import {TouchableHighlight, Text, Switch, TextInput, View, Button,StyleSheet, Alert, ScrollView, AsyncStorage } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';
import {host, loginEndpoint, touchEndpoint, updatePersonal} from './constants';
import { Icon } from 'react-native-elements';
import Dialog from "react-native-dialog";
import * as Keychain from 'react-native-keychain';

export default class Settings extends Component {
  constructor(props){
    super(props);
    this.authenticate();
    this._onPressButton = this._onPressButton.bind(this);
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

  changeInfo(){
    var success = false;
    var endpoint = host + updatePersonal;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.email,
        newEmail: (this.state.pass || this.state.name) ? undefined : this.state.newEmail,
        name: this.state.name? this.state.newName: null,
        currentPassword: this.state.oldPass,
        newPassword: this.state.pass ? this.state.newPass: undefined,
        confirmNewPassword: this.state.pass ? this.state.confirmPass: undefined,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      if (this.state.name) {
        store.name = this.state.newName;
      }
      Alert.alert(
        'Alert',
        responseJson.message,
        [
          {text: 'OK', onPress:() => {this.setState({changeVisible: false})}},
        ],
        { cancelable: false }
      );
      
    })
    .catch((error) =>{
      console.error(error);
      Alert.alert(
        'Error',
        error,
        [
          {text: 'OK', onPress:() => {this.setState({changeVisible: false})}},
        ],
        { cancelable: false }
      )
    });
  }
  authenticate(){
    if (new Date() > store.logOutTime || !store.loggedIn){
      if (store.loggedIn){
        Alert.alert("Your token has expired");
      }
      store.pendingRedirect = true;
      store.redirectDest = 'Settings';
      this.resetNavigation('LoginScreen');
    }
  }
state = {
  switchValue1: store.faceID,
  switchValue2: false,
  switchValue3: true,
  switchValue4: true,
};

  _handleToggleSwitch1 = () => {
    var settings = this.state.settings;
    settings['USE_BIOMETRY'] = !settings['USE_BIOMETRY'];
    this.setState({
      settings: settings
    })
    AsyncStorage.setItem('Settings', JSON.stringify(settings));
    if(!settings['USE_BIOMETRY']){
      Keychain.resetGenericPassword();
      Alert.alert('Credentials deleted. You must provide your username and password to re-enable Touch ID');
    }
    else{
      Alert.alert('You will need to log in with your credentials one more time to re-enable Touch ID');
    }
    // this.setState(state => ({
    //   switchValue1: !state.switchValue1,
    // }));
    // store.faceID= this.state.switchValue1;
  }

  _handleToggleSwitch2 = () => this.setState(state => ({
    switchValue2: !state.switchValue2,
  }))

  _handleToggleSwitch3 = () => this.setState(state => ({
    switchValue3: !state.switchValue3,
  }))
  _handleToggleSwitch4 = () => this.setState(state => ({
    switchValue4: !state.switchValue4,
  }))

  _onPressButton(message) {
    Alert.alert(message)
  }
  
  componentDidUpdate(){
    this.authenticate();
  }
  componentDidMount(){
    try{
      AsyncStorage.getItem('Settings')
      .then((item) =>{
        this.setState({
          settings: JSON.parse(item),
          dataAvailable: true,
        })
      })
      .catch((error) => {
        this.setState({
          settings: store.defaultSettings,
          dataAvailable: true,
        })
      })
    } catch (error) {}
  }
  render() {
    const {navigate} = this.props.navigation;
    if (!this.state.dataAvailable){
      return null;
    }
    return (
      <ScrollView style={styles.container}>
      <Dialog.Container visible={this.state.changeVisible}>
          {this.state.name ? <Dialog.Title>Change Name</Dialog.Title> : this.state.pass?<Dialog.Title>Change Password</Dialog.Title> : <Dialog.Title>Change Email</Dialog.Title>}
          {this.state.name?<Dialog.Description> Please enter your new name</Dialog.Description>: this.state.pass?<Dialog.Description> Please enter your old and new password </Dialog.Description> :<Dialog.Description> Please enter your new Email </Dialog.Description>}
          {this.state.pass?<Dialog.Input placeholder="Old Password" value={this.state.oldPass} onChangeText={(username) => this.setState({oldPass: username})} /> : <Dialog.Input placeholder="Email" value={this.state.newEmail} onChangeText={(username) => this.setState({newEmail: username})} /> }
          {this.state.pass?<Dialog.Input placeholder="New Password"value={this.state.newPass} onChangeText={(username) => this.setState({newPass: username})} />: <Dialog.Input placeholder="Password" value={this.state.oldPass} onChangeText={(username) => this.setState({oldPass: username})} />}
          {this.state.pass?<Dialog.Input placeholder="Confirm New Password"value={this.state.confirmPass} onChangeText={(username) => this.setState({confirmPass: username})} />: null}
          {this.state.name?<Dialog.Input placeholder="Name"value={this.state.newName} onChangeText={(username) => this.setState({newName: username})} />: null}
          <Dialog.Button label="Cancel" onPress={() => {this.setState({changeVisible: false})}} />
          <Dialog.Button label="OK" onPress={this.changeInfo.bind(this)} />
        </Dialog.Container>

        
      <Text style={styles.Text}> User Settings </Text>

        <TouchableHighlight onPress={() => navigate('Wallet')}>
            <View style={styles.ButtonContainer}>
        <Icon
          size={40}
          name='credit-card'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            onPress={() => navigate('Wallet')}
            title="Payment Methods"
            color="#517fa4"
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('AddStripeDetail')}>
        <View style={styles.ButtonContainer}>
        <Icon
          size={40}
          name='user'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            onPress={() => navigate('EditStripeDetail')}
            title="Edit Personal Information"
            color="#517fa4"
            //color="#841584"
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {this.setState({changeVisible: true, pass:false, name:true})}}>
        <View style={styles.ButtonContainer}>
        <Icon
          size={40}
          name='tag'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            onPress={() => {this.setState({changeVisible: true, pass:false, name:true})}}
            title="Edit Name"
            color="#517fa4"
            //color="#841584"
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {this.setState({changeVisible: true, pass:false, name: false})}}>
        <View style={styles.ButtonContainer}>
        <Icon
          size={40}
          name='envelope'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            onPress={() => {this.setState({changeVisible: true, pass:false, name: false})}}
            title="Edit Email"
            color="#517fa4"
            //color="#841584"
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
        
        <Text style={styles.Text}> Security </Text>
        <TouchableHighlight onPress={() => {this.setState({changeVisible: true, pass: true, name: false})}}>
        <View style={styles.ButtonContainer}>
        <Icon
          size={40}
          name='lock'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            onPress={() => {this.setState({changeVisible: true, pass:true, name: false})}}
            title="Change Password"
            color="#517fa4"
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
       
        <View style={styles.SwitchParent}>
        <Icon
          size={40}
          name='pointer'
          type='evilicon'
          color='#517fa4'
        />
            <Button
              onPress={void(0)}
              title="Enable Face/Touch ID"
              color="#517fa4"
              />
          <View style={styles.SwitchButton}>
            <Switch
              onValueChange={this._handleToggleSwitch1}
              value={this.state.settings.USE_BIOMETRY}
              />
          </View>
        </View>
        <Text style={styles.Text}> Notifications </Text>

<View style={styles.SwitchParent}>
<Icon
          size={36}
          name='bell'
          type='evilicon'
          color='#517fa4'
        />
    <Button
      onPress={void(0)}
      title="Enable Push Notifications"
      color="#517fa4"
      />
   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch2}
      value={this.state.switchValue2}
      />
  </View>
</View>

<View style={styles.SwitchParent}>
<Icon
          size={40}
          name='sc-telegram'
          type='evilicon'
          color='#517fa4'
        />

    <Button
      onPress={void(0)}
      title="Enable Emails"
      color="#517fa4"
      />

   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch3}
      value={this.state.switchValue3}
      />
  </View>
</View>

        <Text style={styles.Text}> Privacy </Text>


        <View style={styles.SwitchParent}>
        <Icon
          size={40}
          name='chart'
          type='evilicon'
          color='#517fa4'
        />
        
          <Button
            onPress={void(0)}
            title="Send Annonymous Statistics"
            color="#517fa4"
            //color="#841584"
          />
          <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch4}
      value={this.state.switchValue4}
      />
  </View>
  
        </View>
        <TouchableHighlight onPress={() => navigate('Tos')}>
        <View style={styles.SwitchParent}>
        <Icon
          size={40}
          name='question'
          type='evilicon'
          color='#517fa4'
        />
          <Button
            
            title="Terms of Use"
            color="#517fa4"
            onPress={() => navigate('Tos')}
          />
          <View style={styles.SwitchButton}>
          <Icon
          size={40}
          name='chevron-right'
          type='evilicon'
          color='#517fa4'
        />
        </View>
        </View>
        </TouchableHighlight>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
    container: {
   flex: 1,
   paddingTop: 10

  },
  TextHeader: {
   //margin: 15,
   fontSize: 22,
textAlign: 'center',
fontWeight: 'bold',
flexDirection: 'row',
  },
  Text: {
   margin: 6,
   fontSize: 18,
    flexDirection: 'row',
    color: '#aaaaaa',


  },
    container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    margin: 6,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d6d7da',
    //justifyContent: 'space-between'
  },
  SwitchButton: {
     flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'

   },
     SwitchParent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      margin: 6,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d6d7da',


   }
});

