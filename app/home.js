import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import {styles} from './styles'

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerMode: 'screen',
        headerTitle: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Home Page where people will scan QR codes!</Text>
        <Text>For now, it serves as the home page and the side bar</Text>
        <Button
            onPress={() => navigate('Payment')}
            title="act like you scanned a code and go to Payment Page!"
        />
        <Button
            onPress={() => navigate('Create QR')}
            title="go to create QR Codes"
        />
        <Button
            onPress={() => navigate('Saved QR')}
            title="go to saved QR Codes"
        />
        <Button
            onPress={() => navigate('Transaction History')}
            title="go to Transaction History"
        />
        <Button
            onPress={() => navigate('Wallet')}
            title="go to wallet"
        />
        <Button
            onPress={() => navigate('Settings')}
            title="go to Settings"
        />
        <Button
            onPress={() => navigate('Help')}
            title="go to Help"
        />
        <Button
            onPress={() => navigate('Info')}
            title="go to Info"
        />
        <Button
            onPress={() => navigate('LoginScreen')}
            title="Log Out"
        />
      </View>
    );
  }
}