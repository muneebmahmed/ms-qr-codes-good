import React from 'react';
import {Button, Text, View, ScrollView, Alert, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import {store} from './store';
import {host, cardEndpoint} from './constants';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


const debug = false;

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
    cards = [];
    for (i in this.state.cards.title){
      cards.push({
        title: this.state.cards.title[i],
        user: this.state.cards.name[i],
        cardNumber: '*'.repeat(this.state.cards.numberOfDigits[i]) + this.state.cards.creditCardLastDigits[i],
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
    /*
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
    return text;*/
  }
  _renderItem(item, index){
    var swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
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
        <View style={styles.bottom}>
        <View style={styles.row}>
        <AwesomeButtonRick stretch={true} onPress={() => navigate('AddPayment')} type="primary">Add New Payment Method</AwesomeButtonRick></View>

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
    marginBottom: 36
  },
});
