import * as React from 'react';
import { Platform, CameraRoll, Dimensions, Text, View, StyleSheet, Button, ScrollView, Image, RefreshControl, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import Swipeout from 'react-native-swipeout';
import {store} from '../store';
import {host, getQRCodes, deleteQRCode} from '../constants';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class myQR extends React.Component {
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
  deleteCode(index){
    var endpoint = host + deleteQRCode;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        loginAuthToken: store.authToken,
        deleteID: this.state.qrcodes[index].qrCodeID,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        qrcodes: this.state.qrcodes.filter(function(value, i, arr) { return i != index; }),
      })
      Alert.alert(responseJson.message);
    })
    .catch((error) => {
      //console.error(error);
      //Alert.alert(error);
    });
  }
  _renderItem(item, index){
    var swipeoutBtns = [
      {
        text: 'Delete',
        type: 'delete',
        onPress: this.deleteCode.bind(this, index)
      }
    ]
    return(
      <Swipeout right={swipeoutBtns} autoClose={true}>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}} />
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {this.setState({modalVisible: true, viewQr: this.state.qrcodes[index].qrCodeData})}}
            >
            <QRCode
              logo={{uri: item.qrCodeData}}
              size={40}
              logoSize={40}
              logoBackgroundColor='transparent'
            />
            </TouchableOpacity>
            <Text style={{fontSize:26}}>
              {item.qrCodeName}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize:20}}>                Default: </Text>
                <Text style={{fontSize:20}}>${Number(item.qrCodeDefaultAmount).toFixed(2)}</Text>
            </View>
              <Text style={{fontSize:20}}>                Me</Text>
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
  }
  saveCode(){
    const image = this.state.viewQr;
    console.log("hi", image);
    if (Platform.OS === 'android') {
      RNFetchBlob
        .config({
          fileCache : true,
          appendExt : 'png'
        })
        .fetch('GET', image)
        .then((res) => {
          CameraRoll.saveToCameraRoll(res.path())
            .then(Alert.alert('Success', 'Photo added to camera roll!'))
            .catch(err => console.log('err:', err))
        })
    } else {
        CameraRoll.saveToCameraRoll(image)
          .then(Alert.alert('Success', 'Photo added to camera roll!'))
    }
  }
  _setModalVisible = visible => {
      this.setState({modalVisible: visible});
  };
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
        <Text style={styles.headline}> My QR Codes </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.fetchQR.bind(this)}
            />
          }
        >
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => Alert.alert('Modal closed')}
          >
            <View style={styles.container}>
              <View style={styles.qr}>
              <QRCode
                logo={{uri: this.state.viewQr}}
                size={WIDTH * .7}
                logoSize={WIDTH * .7}
                logoBackgroundColor='transparent'
              />
              </View>
              <View style={styles.bottom}>
              <View style={styles.row}>
              <AwesomeButtonRick stretch={true} onPress={this.saveCode.bind(this)} type="primary">Save</AwesomeButtonRick>
              </View>
              <View style={styles.row}>
              <AwesomeButtonRick stretch={true} onPress={() => {this.setState({modalVisible: false})}} type="secondary">Close</AwesomeButtonRick>
              </View>
              </View>
            </View>
          </Modal>
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
  },
  qr: {
    flex: 1,
    margin: WIDTH * .15,
    marginTop: HEIGHT * .3
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: HEIGHT * .1
  }
});
