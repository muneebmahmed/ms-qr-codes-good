import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl, Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from '../store';

export default class Paid extends React.Component {
  constructor(props){
    super(props);
    this.state = { dataAvailable: false, refreshing: false };
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
      store.redirectDest = 'Transactions';
      this.resetNavigation('LoginScreen');
    }
  }
  fetchData(){
    var debug = true;
    this.setState( { refreshing: true })
    var endpoint = '';
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
        names: responseJson.names,
        amounts: responseJson.amounts,
        dates: responseJson.dates,
        anonymous: responseJson.anonymous,
        refreshing: false
      })
    })
    .catch((error) =>{
      console.error(error);
      this.setState({
        refreshing: false
      })
    });
    }
    this.setState({
      dataAvailable: true,
      refreshing: false,
      names: ['John', 'Kim', 'Sally', 'Lara', 'Jack', 'Rachel'],
      amounts: [10, 15, 3, 5, 1.5, 7],
      dates: [new Date(2019, 0, 22), new Date(2018, 11, 18), new Date(2018, 9, 13), new Date(2018, 9, 7), new Date(2018, 8, 30), new Date(2018, 9, 13)],
      anonymous: [false, true, false, true, false, false]
    })
  }
  getData(){
    var jsx = [];
    for (i in this.state.names){
      let name = this.state.names[i];
      let amount = this.state.amounts[i];
      let date = this.state.dates[i];
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      let imgsource = this.state.anonymous[i]? require('../images/anonymoususer.png') : require('../images/user.png');
      jsx.push(
        <View>
        <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }} 
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize:26}}>-</Text>
          <Text style={{fontSize:26}}>${amount.toFixed(2)}</Text>
        </View>
        <View style={styles.leftContainer}>
          <Text style={{fontSize:16}}>{month}/{day}/{year}</Text>
          <View style={styles.rightContainer}>
            <Image
              style={styles.keepitsmall}
              source={imgsource} />
            <Text style={{fontSize:16, textAlign: 'right'}}>You paid</Text>
            <Text style={{fontSize:16, textAlign: 'right'}}> {name}</Text>
          </View>
        </View>
        </View>
      );
    }
    return jsx;
  }
  componentDidMount(){
    this.fetchData();
  }
  componentDidUpdate(){
    this.authenticate();
  }
  render() {
    const {navigate} = this.props.navigation;
    if (!this.state.dataAvailable){
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Payments </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchData.bind(this)}
            />
          }
        >
          {this.getData()}
        </ScrollView>
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
    textAlign: 'right',
    padding: 10,
    justifyContent: 'flex-end'
  },
  keepitsmall: {
    width: 34,
    height: 34
  },
   leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  }
});
