import React, { Component } from "react";
import {StackActions, NavigationActions} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {store} from './store';

class CameraView extends Component {
  validateData(data){
    try{
      var obj = JSON.parse(data);
      if (obj.hasOwnProperty('u') && obj.hasOwnProperty('a')){
        return true;
      }
      return false;
    }
    catch(error){
      return false;
    }
  }
  onSuccess(e) {
    if (this.validateData(e.data) && this.props.navigator.isFocused()){
      var obj = JSON.parse(e.data);
      store.scannedId = obj['u'];
      store.pendingPayment = true;
      store.scannedAmount = obj['a'];
      store.scannedType = obj['p'];
      this.pushNavigation('Payment');
    }
    setTimeout(() => {this.scanner.reactivate()}, 3000);
  }
  pushNavigation(targetRoute){
    const pushAction = StackActions.push({
      routeName: targetRoute,
    });
    this.props.navigator.dispatch(pushAction);
  }

  render() {
      return (
        <View>
          <QRCodeScanner
        ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess.bind(this)}
        cameraStyle={styles.camera}
        topContent={
          <Text style={styles.centerText}>
            Scan any QR code to see its data!
          </Text>
        }
      />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  centerText: {
    marginTop: 50,
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  camera: {
    marginTop: 80,
    height: 1000,
  }
});

export default CameraView;