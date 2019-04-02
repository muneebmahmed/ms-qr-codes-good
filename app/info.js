import React from 'react';
import {Button, Text, View, StyleSheet, Alert, Image } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';

export default class Info extends React.Component {
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
    if (new Date() > store.logOutTime || !store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image
        style={styles.keepitsmall}
        source={require('./images/microsoftlogo.png')} />

     
        <Text style={styles.Text}> Microsoft Give </Text>
        <Text style={styles.Text}> V 1.0 </Text>
        
        <View style={styles.button}>
          <Button
            onPress={this._onPressButton}
            title="Terms of Use"
          />
        </View>

        <Text style={styles.Text2}> © Microsoft 2019 </Text>

      </View>
    );  

  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      alignItems: 'center',
      textAlign: 'center'
    },

    Text: {
      paddingTop: 5,
      margin: 6,
      fontSize: 15,
      fontWeight: 'bold',
    },

    button: {
      position: 'absolute',
      bottom:30
    },

    Text2: {
      position: 'absolute',
      bottom:15,
    },

    keepitsmall: {
    width: 170,
    height: 170, 
  },


});