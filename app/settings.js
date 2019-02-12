import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'
import {store} from './store'

export default class Settings extends React.Component {
  changeName (Aname) {
   store.name = Aname;
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Settings Page</Text>
        <Button
            onPress={() => navigate('Home')}
            title="go home"
        />
        <Text>The button bellow will change the name!</Text>
        <Text>Then go home to see what it has changed to</Text>
        <Button
            onPress={() => this.changeName('Corey')}
            title="Change Name"
        />
      </View>
      ); 

  }
}