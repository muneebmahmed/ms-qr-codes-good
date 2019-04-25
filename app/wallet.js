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
import {Button, Text, View, ScrollView, Alert, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import {store} from './store';
import {host, cardEndpoint, deletePayment, updateDefaultPayment} from './constants';


const debug = false;

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataAvailable: false, cards: [], checked: [], refreshing: false};
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
      store.redirectDest = 'Wallet';
      this.resetNavigation('LoginScreen');
    }
  }
  fetchCardData(){
    this.setState({refreshing: true});
    var endpoint = host + cardEndpoint + encodeURIComponent(store.email);
    if (!debug){
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      console.log(responseJson)
      this.setState({
        dataAvailable: true,
        cards: responseJson,
        checked: responseJson.primaryCard,
        refreshing: false
      })
    })
    .catch((error) =>{
      console.error(error);
      this.setState({
        refreshing: false
      })
    });
    }else{
    //temp code for testing below
    this.setState({
      dataAvailable: true,
      cards: store.cardData,
      checked: store.cardData.primaryCard,
      refreshing: false
    })
    }
    return store.cardData;
  }
  updateCheck(num){
    checked = this.state.checked;
    for (i in checked){
      if (num == i){
        checked[i] = true;
      }
      else{
        checked[i] = false;
      }
    }
    var endpoint = host + updateDefaultPayment;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        defaultIndex: num,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({checked: checked});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteCards(index){
    var endpoint = host + deletePayment;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        loginAuthToken: store.authToken,
        deleteIndex: index,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        cards: responseJson.stripeData,
        checked: responseJson.stripeData.primaryCard,
      })
      Alert.alert(responseJson.message);
    })
    .catch((error) => {
      //console.error(error);
      Alert.alert(error.message);
    });
  }

  getCards(){
    var text = [];
    cards = [];
    for (i in this.state.cards.title){
      var repeatNum = (this.state.cards.numberOfDigits[i] == null)? 10 : Math.max(this.state.cards.numberOfDigits[i] - this.state.cards.creditCardLastDigits[i].length, 0);
      cards.push({
        title: this.state.cards.title[i],
        user: this.state.cards.name[i],
        cardNumber: '*'.repeat(repeatNum) + this.state.cards.creditCardLastDigits[i],
        numberOfDigits: this.state.cards.numberOfDigits[i],
        lastDigits: this.state.cards.creditCardLastDigits[i],
        default: this.state.checked[i],
      })
    }
    return(
      <View >
        <FlatList
          data={cards}
          renderItem={({item, index}) => this._renderItem(item, index)}
        />
      </View>
    );
  }
  confirmDelete(index){
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: this.deleteCards.bind(this, index)
        }
      ],
      {cancelable: true},
    );
  }
  _renderItem(item, index){
    var swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: this.confirmDelete.bind(this, index)
      }
    ]
    return(
      <Swipeout right={swipeoutBtns} autoClose={true} style={{paddingBottom: 15}}>
          <Card title={item.title}>
            <Text style={{marginBottom: 10}}> Card Holder: {item.user} </Text>
            <Text sytle={{marginBottom: 10}}> Card Number: {item.cardNumber} </Text>
            <CheckBox title='Primary Payment Method' checked={item.default} onPress={this.updateCheck.bind(this, index)} />
          </Card>
      </Swipeout>
    );
  }
  componentDidMount(){
    this.fetchCardData();
  }
  componentDidUpdate(){
    this.authenticate();
  }
  render() {
    
    const {navigate} = this.props.navigation;
    if (!this.state.dataAvailable){
      return (
        <View style={styles.container}>
        <Text> Data Unavailable </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
          <ScrollView 
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.fetchCardData.bind(this)}
              />
            }
          >
            {this.getCards()}
          </ScrollView>
          
          <Button onPress={() => navigate('AddPayment')} title="Add New Payment Method"/>
          <View style={styles.bottom}>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 0,
    width: '100%',
    padding: 10
  },
  row: {
  flexDirection: "row",
  padding: 10,
  justifyContent: 'center',
  marginRight: 0
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
