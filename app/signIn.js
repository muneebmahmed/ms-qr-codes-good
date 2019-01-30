import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Sign In Page</Text>
        <Button
            onPress={() => this.props.action('Home')}
            title="log in"
        />
        <Button
            onPress={() => this.props.action('CreateAccount')}
            title="create new account"
        />
        <Button
            onPress={() => this.props.action('ForgotPassword')}
            title="forgot password?"
        />
      </View>
      ); 

  }
}