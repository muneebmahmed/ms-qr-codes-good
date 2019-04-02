import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl, FlatList, TouchableHighlight, Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import {store} from '../store';
import {host, getQRCodes} from '../constants';

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
    if (new Date() > store.logOutTime || !store.loggedIn){
      store.loggedIn = false;
      this.resetNavigation('LoginScreen');
    }
  }
  fetchQR(){
    var debug = false;
    this.setState( { refreshing: true })
    var endpoint = host + getQRCodes;
    if (!debug) {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: null,
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      this.setState({
        dataAvailable: true,
        qrcodes: responseJson.qrcodes,
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
  _renderQuickActions(item, index){
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={{alignContent: 'flex-end'}}
          title="Delete"
          onPress={() => {
            Alert.alert("Delete QR Code " + this.state.qrcodes[index].qrCodeName);
          }}>
          <Text style={{alignContent: 'flex-end'}}>Delete</Text>
        </TouchableHighlight>
      </View>
    )
  };
  getQR(){
    var jsx = [];
    return(
      <View>
        <FlatList
          data={this.state.qrcodes}
          maxSwipeDistance={160}
          bounceFirstRowOnMount={false}
          renderItem={({item}) => <View><View style={{borderBottomColor: 'black', borderBottomWidth: 1,}} />
          <View style={styles.container}>
            <QRCode
              logo={{uri: item.qrCodeData}}
              size={40}
              logoSize={40}
              logoBackgroundColor='transparent'
            />
            <Text style={{fontSize:26}}>
              {item.qrCodeName}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize:20}}>                Default: </Text>
                <Text style={{fontSize:20}}>${Number(item.qrCodeDefaultAmount).toFixed(2)}</Text>
            </View>
              <Text style={{fontSize:20}}>                Me</Text>
          </View></View>
          }
          renderQuickActions={({item, index}) => this._renderQuickActions(item, index)}
        />
      </View>
    );
    /*for (i in this.state.qrcodes){
      let name = this.state.qrcodes[i].qrCodeName;
      let amount = this.state.qrcodes[i].qrCodeDefaultAmount;
      let imgsource = this.state.qrcodes[i].qrCodeData;
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
              {name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize:20}}>                Default: </Text>
                <Text style={{fontSize:20}}>${Number(amount).toFixed(2)}</Text>
              </View>
              <Text style={{fontSize:20}}>                Me</Text>
          </View>
        </View>
      );
    }
    if (!this.state.qrcodes || this.state.qrcodes.length < 1){
      jsx.push(<View><Text>No codes here!</Text></View>);
    }
    return jsx;*/
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
