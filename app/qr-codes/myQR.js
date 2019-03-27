import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import {store} from '../store';

const host = 'https://qrcodes4good.com:8080';
const getQRCodes = '/api/user/getQRCodes';

export default class myQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataAvailable: false, refreshing: false, qrcodes: [] };
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
    var debug = false;
    this.setState( { refreshing: true })
    var endpoint = host + getQRCodes;
    if (!debug) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        loginAuthToken: store.authToken //where?
      }),
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      this.setState({
        dataAvailable: true,
        qrcodes: JSON.stringify(responseJson.qrcodes[0].qrcodeData),
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
    else {
      this.setState({
        dataAvailable: true,
        refreshing: false,
        qrcodes: [],
        names: ['Donation', 'Donation'],
        amounts: [10, 10],
      })
    }
  }

  getQR(){
    var jsx = [];
    for (i in this.state.qrcodes){
      //let name = this.state.names[i];
      //let amount = this.state.amounts[i];
      let imgsource = this.state.qrcodes[i].qrcodeData;
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
              logo={{uri: imgsource}}
              size={40}
              logoSize={40}
              logoBackgroundColor='transparent'
              />
              <Text style={{fontSize:26}}>
              Hello
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize:20}}>                Default: </Text>

              </View>
              <Text style={{fontSize:20}}>                Me</Text>
          </View>
        </View>
      );
    }
    if (!this.state.qrcodes || this.state.qrcodes.length < 1){
      jsx.push(<View><Text>No codes here!</Text></View>);
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
        <Text style={styles.headline}> My QR Codes </Text>
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
