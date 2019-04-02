
import React, { Component } from 'react';
import { AppRegistry, Text, Switch, TextInput, View, Button,StyleSheet, Alert, ScrollView } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';

export default class Settings2 extends Component {
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
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }
state = {
  switchValue1: store.faceID,
  switchValue2: false,
  switchValue3: false,
  switchValue4: false,
};

  _handleToggleSwitch1 = () => {
    this.setState(state => ({
      switchValue1: !state.switchValue1,
    }));
    store.faceID= this.state.switchValue1;
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

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.Text}> Payment </Text>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => navigate('Wallet')}
            title="Bank Account"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => navigate('Wallet')}
            title="Saved Credit Cards"
            //color="#841584"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => navigate('AddPayment')}
            title="Add Payment Method"
            //color="#841584"
          />
        </View>
        <Text style={styles.Text}> Account </Text>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => this._onPressButton(store.email)}
            title="Email"
            //color="#841584"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => this._onPressButton("Coming Soon!")}
            title="Change Password"
            //color="#841584"
          />
        </View>
        <Text style={styles.Text}> Security </Text>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={() => this._onPressButton("Coming Soon!")}
            title="Change Passcode"
            //color="#841584"
          />
        </View>

<View style={styles.SwitchParent}>
    <Button
      onPress={void(0)}
      title="Enable Face/Touch ID"
      />
   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch1}
      value={this.state.switchValue1}
      />
  </View>
</View>

        <Text style={styles.Text}> Notifications </Text>

<View style={styles.SwitchParent}>
    <Button
      onPress={void(0)}
      title="Enable Push Notifications"
      />
   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch2}
      value={this.state.switchValue2}
      />
  </View>
</View>

<View style={styles.SwitchParent}>
    <Button
      onPress={void(0)}
      title="Enable Emails"
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
          <Button
            onPress={void(0)}
            title="Send Annonymous Statistics"
            //color="#841584"
          />
          <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch4}
      value={this.state.switchValue4}
      />
  </View>
        </View>

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


  },
    container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    margin: 6,
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

