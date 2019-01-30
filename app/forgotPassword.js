import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

export default class ForgotPassword extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Forgot Password Page</Text>
        <Button
            onPress={() => this.props.action('SignIn')}
            title="back to sign in"
        />
      </View>
      ); 

  }
}