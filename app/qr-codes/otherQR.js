import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import {store} from '../store';

export default class otherQR extends React.Component {
  constructor(props) {
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
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }
  fetchQR(){
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
      names: ['John Smith', 'Eric Jones', 'Max Grant', 'Lisa Frank', 'Nick Maiman', 'Alex Ramirez'],
      amounts: [10, 10, 10, 10, 10, 10],
    })
  }
  getQR(){
    var jsx = [];
    for (i in this.state.amounts){
      let name = this.state.names[i];
      let amount = this.state.amounts[i];
      let imgsource2 = null;
      jsx.push(
        <View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.container}>
            <QRCode
              logo={{uri: imgsource2}}
              size={50}
              logoSize={50}
              logoBackgroundColor='transparent'
            />
            <Text style={{fontSize:26}}>
              Donation
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize:20}}>                Default: </Text>
              <Text style={{fontSize:20}}>${amount.toFixed(2)}</Text>
            </View>
            <Text style={{fontSize:20}}>                {name}</Text>
          </View>
        </View>
      );
    }
    return jsx;
  }
  componentDidMount(){
    this.fetchQR();
  }
  render() {
    if (!this.state.dataAvailable){
      return null;
    }
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Saved QR Codes </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchQR.bind(this)}
            />
          }
        >
          {this.getQR()}
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
