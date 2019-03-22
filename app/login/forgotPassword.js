import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from '../styles'

export default class ForgotPassword extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Forgot Password Page</Text>
        <Button
            onPress={() => this.props.navigation.goBack()}
            title="back to sign in"
        />
      </View>
      ); 

  }
}