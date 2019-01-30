import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

export default class CreateAccount extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Create Account Page</Text>
        <Button
            onPress={() => this.props.action('ConfirmID')}
            title="next confirm your identity!"
        />
      </View>
      ); 

  }
}