import React from 'react';
import {Button, Text, View, StyleSheet, ScrollView } from 'react-native';

export default class Help extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>

      <Text style={styles.TextHeader}> Frequently Asked Questions </Text>

      <Text style={styles.Text}> 1. How do I scan a QR code? </Text>
      <Text style={styles.Text2}> There are two ways you can have a QR code scanned. The first one is by opening the app and using the camera implemented on the homepage of the app. All you need to do is point the camera on the QR and it shall be scanned. The second way you can scan a QR code is by taking a picture of the QR code from your phone’s camera and then you can import the into the app by clicking the import picture icon. </Text>

      <Text style={styles.Text}> 2. How can I generate a QR code? </Text>
      <Text style={styles.Text2}> By pressing on the hamburger side menu at the top, you can choose “Generate a QR Code” tap, which will take you to a new page. In this new page you will be able to enter the default money amount you’d like to request and press “ Update QR Code”, which will generate the QR code for you.
      </Text>

      <Text style={styles.Text}> 3. How do I add my credit card information? </Text>
      <Text style={styles.Text2}> By pressing on the hamburger side menu at the top, you can choose “Wallet” tap, which will take you to a new page. At the end of this new page, there's a plus icon that says “Add New Payment Method”. By clicking on the plus icon you will be directed to a new page where you can enter all of your cards information. </Text>
     
      <Text style={styles.Text}> 4. How can I receive payments? </Text>
      <Text style={styles.Text2}> You should be able to receive the payments directly on your bank account, however you will need to allow 3-5 business days before the transaction is complete.
      </Text>

      <Text style={styles.Text}> 5. What if I don’t want my personal information to show when I donate money? </Text>
      <Text style={styles.Text3}> When you scan a QR code you will be taken to the payment page where there’ a check mark at the bottom of the screen that says “Make Donation Anonymous”. By checking this, the other party will not be able to see any of your information.
      </Text>

      </ScrollView>
      </View>
    );

  }
}

const styles = StyleSheet.create({
    container: {
   flex: 1,
   paddingTop: 0,

  },
  TextHeader: {
   //margin: 15,
   fontSize: 22,
textAlign: 'center',
fontWeight: 'bold',
flexDirection: 'row',
  },
  Text: {
    paddingTop: 10,
   margin: 6,
   fontSize: 17,
flexDirection: 'row',
fontWeight: 'bold',
  },

    Text2: {
    paddingTop: 5,
   margin: 6,
   fontSize: 15,
flexDirection: 'row',

  },
    Text3: {
    paddingTop: 5,
   margin: 6,
   fontSize: 15,
flexDirection: 'row',
paddingBottom: 40,
  },


});