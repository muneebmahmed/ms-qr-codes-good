import React, { Component } from "react";
import {StackActions, NavigationActions} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class CameraView extends Component {
  validateData(data){
    if (data){
      return true;
    }
    return false;
  }
  onSuccess(e) {
    if (validateData(e.data)){
      alert(e.data);
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