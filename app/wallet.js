import React from 'react';
import {Button, Text, View } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles';
import {store} from './store'

export default class Wallet extends React.Component {
  constructor(props){
    super(props);
    this.authenticate();
  }
  resetNavigation(targetRoute) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Wallet Page</Text>
        <Button
            onPress={() => navigate('Home')}
            title="go home"
        />
      </View>
      ); 

  }
}