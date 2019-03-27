import React from 'react';
import {Button, Text, View, ScrollView, Alert, StyleSheet, RefreshControl } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';

const host = 'https://qrcodes4good.com:8080';
const cardEndpoint = '/api/user/getCards/';
const debug = true;

export default class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataAvailable: false, checked: [], refreshing: false};
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
  fetchCardData(){
    this.setState({refreshing: true});
    var endpoint = host + cardEndpoint + store.email;
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
    //make call to server here
    this.setState({checked: checked});
  }

  getCards(){
    var text = [];
    for (i in this.state.cards.title){
      let title = this.state.cards.title[i];
      let user = this.state.cards.name[i];
      let cardNumber = '*'.repeat(this.state.cards.numberOfDigits[i]) + this.state.cards.creditCardLastDigits[i];
      text.push(
          <Card title={title}>
            <Text style={{marginBottom: 10}}> Card Holder: {user} </Text>
            <Text sytle={{marginBottom: 10}}> Card Number: {cardNumber} </Text>
            <CheckBox title='Primary Payment Method' checked={this.state.checked[i]} onPress={this.updateCheck.bind(this, i)} />
          </Card>
      )
    }
    return text;

  }
  componentDidMount(){
    this.fetchCardData();
  }
  render() {
    if (!this.state.dataAvailable){
      return (
        <View style={styles.container}>
        <Text> Data Unavailable </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Edit' />
        </View>
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
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Add New Payment Method' />
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
  }
});
