
import React, { Component } from 'react';
import { AppRegistry, Text, Switch, TextInput, View, Button,StyleSheet, Alert } from 'react-native';

export default class test extends Component {
state = {
  switchValue1: false,

  switchValue2: false,

  switchValue3: false,
};

_handleToggleSwitch1 = () => this.setState(state => ({

switchValue1: !state.switchValue1,

}))

_handleToggleSwitch2 = () => this.setState(state => ({

switchValue2: !state.switchValue2,

}))

_handleToggleSwitch3 = () => this.setState(state => ({

switchValue3: !state.switchValue3,

}))

;


  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (

      <View style={styles.container}>
      <Text style={styles.TextHeader}> Settings </Text>
      <Text style={styles.Text}> Payment </Text>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Bank Account"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Saved Credit Cards"
            //color="#841584"
          />
        </View>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Add Payment Method"
            //color="#841584"
          />
        </View>
        <Text style={styles.Text}> Account </Text>
        <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Email"
            //color="#841584"
          />
        </View>
                <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Change Password"
            //color="#841584"
          />
        </View>

<Text style={styles.Text}> Security </Text>
                <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Passcode"
            //color="#841584"
          />
        </View>

<View style={styles.SwitchParent}>
    <Button
      onPress={this._onPressButton}
      title="Enable Face ID"
      />
   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch1}
      value={this.state.switchValue1}
      />
  </View>
</View>

        <Text style={styles.Text}> Notification </Text>

<View style={styles.SwitchParent}>
    <Button
      onPress={this._onPressButton}
      title="Push Notification"
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
      onPress={this._onPressButton}
      title="Email"
      />

   <View style={styles.SwitchButton}>
    <Switch
      onValueChange={this._handleToggleSwitch3}
      value={this.state.switchValue3}
      />
  </View>
</View>

        <Text style={styles.Text}> Privacy </Text>


  <View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Send Annonymous Statistics"
            //color="#841584"
          />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
    container: {
   flex: 1,
   paddingTop: 70

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

