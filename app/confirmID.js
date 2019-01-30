import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

export default class ConfirmID extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the ConfirmID Page</Text>
        <Button
            onPress={() => this.props.action('Home')}
            title="go to home page"
        />
      </View>
      ); 

  }
}