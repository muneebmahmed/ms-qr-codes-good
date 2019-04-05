import React from 'react';
import {Platform, CameraRoll, Dimensions, Button, Modal, View, TextInput, Image, Alert, StyleSheet } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles';
import QRCode from 'react-native-qrcode-svg';
import {store} from '../store';
import {host, generateQREndpoint} from '../constants';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      QRcodeName: '',
      checked: [],
      modalVisible: false,
    };
    this.authenticate();
  }

  saveCode(){
    const image = store.createdCode;
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
  onPressSubmit() {
    var success = false;
    //const {navigate} = this.props.navigation;
    var endpoint = host + generateQREndpoint;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        //email: store.email, //ok?
        defaultAmount: this.state.amount,
        loginAuthToken: store.authToken, //FIXME remove from body
        paymentType: this.state.checked[0]? 0 : 1,
        qrCodeGivenName: this.state.QRcodeName,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        success = true;
        store.createdCode = responseJson.qrcodeData;
        Alert.alert(responseJson.message);
      }
        else {
          Alert.alert(responseJson.message);
          store.createdCode = null;
      
      }
    })
    .catch((error) => {
      console.error(error);
    });
      this.setState({modalVisible: true})
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

  navigation(targetRoute) {
    const resetAction = StackActions.push({
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
      store.redirectDest = 'Create QR';
      this.resetNavigation('LoginScreen');
    }
  }

  updateCheck(num){

    checked = this.state.checked;
    checked[num] = true;
    checked[1-num] = false;
    //make call to server here
    this.setState({checked: checked});
  }

  componentDidUpdate(){
    this.authenticate();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => Alert.alert('Modal closed')}
          >
            <View style={s.container}>
              <View style={s.qr}>
              <QRCode
                logo={{uri: store.createdCode}}
                size={WIDTH * .7}
                logoSize={WIDTH * .7}
                logoBackgroundColor='transparent'
              />
              </View>
              <View style={s.bottom}>
              <View style={s.row}>
              <AwesomeButtonRick stretch={true} onPress={this.saveCode.bind(this)} type="primary">Save</AwesomeButtonRick>
              </View>
              <View style={s.row}>
              <AwesomeButtonRick stretch={true} onPress={() => this.navigation('Saved QR Codes')} type="secondary">Close</AwesomeButtonRick>
              </View>
              </View>
            </View>
          </Modal>
      <TextInput
        value={this.state.QRcodeName}
        style={s.input}
        placeholder="Enter QR code name"
        onChangeText={(QRcodeName) => this.setState({QRcodeName})}
      />
        <TextInput
          value={this.state.amount}
          style={s.input}
          placeholder="Enter default amount"
          keyboardType='numeric'
          onChangeText={(amount) => this.setState({amount})}
        />
        <CheckBox containerStyle={{width: 130}} title='Service' checked={this.state.checked[0]} onPress={this.updateCheck.bind(this, 0)} />
        <CheckBox containerStyle={{width: 130}} title='Donation' checked={this.state.checked[1]} onPress={this.updateCheck.bind(this, 1)} />
        <Button
          onPress={this.onPressSubmit.bind(this)}
          title="Submit"
          color="#841584"
        />
      </View>
      );

  }
}

const s = StyleSheet.create({
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
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