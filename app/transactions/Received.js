import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from '../store';

export default class Received extends React.Component {
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
      this.resetNavigation('LoginScreen');
    }
  }
  fetchData(){
    var debug = true;
    this.setState({ refreshing: true })
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
      names: ['John', 'Kim', '', 'Lara', '', 'Sally'],
      amounts: [5, 15, 6, 5, 2.5, 9],
      dates: [new Date(2018, 11, 22), new Date(2018, 3, 12), new Date(2018, 2, 1), new Date(2018, 1, 14), new Date(2018, 0, 20), new Date(2018, 0, 13)],
      anonymous: [false, false, true, false, true, false]
    })
  }
  getData(){
    var jsx = [];
    for (i in this.state.names){
      let name = this.state.anonymous[i]? 'Anon' : this.state.names[i];
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
          <Text style={{fontSize:26}}>+</Text>
          <Text style={{fontSize:26}}>${amount.toFixed(2)}</Text>
        </View>
        <View style={styles.leftContainer}>
          <Text style={{fontSize:16}}>{month}/{day}/{year}</Text>
          <View style={styles.rightContainer}>
            <Image
              style={styles.keepitsmall}
              source={imgsource} />
            <Text style={{fontSize:16, textAlign: 'right'}}>{name}</Text>
            <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
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
  render() {
    const {navigate} = this.props.navigation;
    if (!this.state.dataAvailable){
      return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Received </Text>
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
