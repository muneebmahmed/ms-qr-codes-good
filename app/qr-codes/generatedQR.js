import React from 'react';
import {Button, Text, View, TextInput, Image, Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles'
import {store} from '../store'
import QRCode from 'react-native-qrcode-svg';

export default class generatedQR extends React.Component {
  render() {
    let base64Logo = store.createdCode;
      return (
        <View style={styles.container}>
        <QRCode
          logo={{uri: base64Logo}}
          size={400}
          logoSize={400}
          logoBackgroundColor='transparent'
        />
        </View>
      );
  }
}
