import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl, Alert, FlatList, TouchableHighlight } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import Swipeout from 'react-native-swipeout';
import {store} from '../store';
import {host, getOtherCodes} from '../constants';
import ModalQR from './ModalQR';

export default class otherQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataAvailable: false, refreshing: false, qrcodes: [], modalVisible: false };
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
  pushNavigation(targetRoute){
    const pushAction = StackActions.push({
      routeName: targetRoute,
    });
    this.props.navigation.dispatch(pushAction);
  }
  authenticate(){
    if (new Date() > store.logOutTime || !store.loggedIn){
      if (store.loggedIn){
        Alert.alert("Your token has expired");
      }
      store.pendingRedirect = true;
      store.redirectDest = 'Saved QR Codes';
      this.resetNavigation('LoginScreen');
    }
  }
  fetchQR(){
    var debug = false;
    this.setState( { refreshing: true })
    var endpoint = host + getOtherCodes;
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
    this.setState({
      dataAvailable: true,
      refreshing: false,
      names: ['John Smith', 'Eric Jones', 'Max Grant', 'Lisa Frank', 'Nick Maiman', 'Alex Ramirez'],
      amounts: [10, 10, 10, 10, 10, 10],
    })
  }
  _renderItem(item, index){
    var swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
      }
    ]
    return(
      <Swipeout right={swipeoutBtns} autoClose={true}>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}} />
          <View style={styles.container}>
            <TouchableHighlight
              onPress={() => {this.setState({modalVisible: true, viewQr: this.state.qrcodes[index]})}}
            >
            <QRCode
              logo={{uri: item.qrCodeData}}
              size={50}
              logoSize={50}
              logoBackgroundColor='transparent'
            />
            </TouchableHighlight>
            <Text style={{fontSize:26}}>
              Donation
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize:20}}>                Default: </Text>
                <Text style={{fontSize:20}}>${Number(item.qrCodeDefaultAmount).toFixed(2)}</Text>
            </View>
              <Text style={{fontSize:20}}>                {item.qrCodeUser}</Text>
            </View>
      </Swipeout>
    );
  }
  getQR(){
    var jsx = [];
    return(
      <View>
        <FlatList
          data={this.state.qrcodes}
          renderItem={({item, index}) => this._renderItem(item, index)}
        />
      </View>
    );
    /*
    for (i in this.state.amounts){
      let name = this.state.names[i];
      let amount = this.state.amounts[i];
      let imgsource2 = '';
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
    return jsx;*/
  }
  pay(){
      store.scannedId = this.state.viewQr.qrCodeID;
      store.pendingPayment = true;
      store.scannedAmount = this.state.viewQr.qrCodeDefaultAmount;
      store.scannedType = this.state.viewQr.qrCodeType;
      store.scannedData = this.state.viewQr.qrCodeData;
      this.setState({modalVisible: false});
      //this.props.navigation.navigate('Home');
      this.pushNavigation('Payment');
  }
  componentDidMount(){
    this.fetchQR();
  }
  componentDidUpdate(){
    this.authenticate();
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
        <ModalQR
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => Alert.alert('Modal closed')}
            uri={this.state.viewQr == null? this.state.viewQr : this.state.viewQr.qrCodeData}
            onSavePress={this.pay.bind(this)}
            onClosePress={() => {this.setState({modalVisible: false})}}
            firstTitle='Pay'
            secondTitle='Close'
        />
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
