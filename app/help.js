import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

export default class Help extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Help Page</Text>
        <Button
            onPress={() => navigate('Home')}
            title="go home"
        />
      </View>
      ); 

  }
}