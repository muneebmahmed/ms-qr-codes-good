import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import {styles} from './styles'

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Home Page where people will scan QR codes!</Text>
        <Text>For now, it serves as the home page and the side bar</Text>
        <Button
            onPress={() => this.props.action('Payment')}
            title="act like you scanned a code and go to Payment Page!"
        />
        <Button
            onPress={() => this.props.action('CreateQR')}
            title="go to create QR Codes"
        />
        <Button
            onPress={() => this.props.action('SavedQR')}
            title="go to saved QR Codes"
        />
        <Button
            onPress={() => this.props.action('TransactionHistory')}
            title="go to Transaction History"
        />
        <Button
            onPress={() => this.props.action('Wallet')}
            title="go to wallet"
        />
        <Button
            onPress={() => this.props.action('Settings')}
            title="go to Settings"
        />
        <Button
            onPress={() => this.props.action('Help')}
            title="go to Help"
        />
        <Button
            onPress={() => this.props.action('Info')}
            title="go to Info"
        />
        <Button
            onPress={() => this.props.action('SignIn')}
            title="Log Out"
        />
      </View>
    );
  }
}