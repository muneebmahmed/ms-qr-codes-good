/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React from 'react';
import {Button, Text, View, StyleSheet, Alert, Image } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from '../store';

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
      if (store.loggedIn){
        Alert.alert("Your token has expired");
      }
      store.pendingRedirect = true;
      store.redirectDest = 'Info';
      this.resetNavigation('LoginScreen');
    }
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  componentDidUpdate(){
    this.authenticate();
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image
        style={styles.keepitsmall}
        source={require('../images/microsoftlogo.png')} />

     
        <Text style={styles.Text}> Microsoft Give </Text>
        <Text style={styles.Text}> V 1.0 </Text>
        
        <View style={styles.button}>
          <Button
            onPress={() => navigate('Tos')}
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