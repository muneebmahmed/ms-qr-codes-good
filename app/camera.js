import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

class CameraView extends Component {
  onSuccess(e) {
    alert(e.data);
    setTimeout(() => {this.scanner.reactivate()}, 3000);
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