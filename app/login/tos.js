/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React, {Component} from 'react';
import {StyleSheet, Button, Text, ScrollView, Image, View, Platform, Alert, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import {store} from '../store';
import {styles} from '../styles';
import {host, tosEndpoint} from '../constants';

export default class Tos extends React.Component {
  constructor(props){
    super(props);
    this.authenticate();
  }
  static navigationOptions = {
        title: 'Terms of Service',
        headerMode: 'screen',
        headerTitle: 'Terms of Service',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
  };
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

  _updateTos(){
    const {navigate} = this.props.navigation;
    var endpoint = host + tosEndpoint;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': store.authToken,
      },
      body: JSON.stringify({
        email: store.email,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson['tosAccepted']) {
          this.resetNavigation('Main');
      } else {
        Alert.alert('TOS Failure')
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={s.h1}>Microsoft QR Codes For Good</Text>
        <Text style={s.h1}>Terms and Conditions ("Terms")</Text>
        <Text>Last updated: April 02, 2019</Text>
        <Text>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://qrcodes4good.com/ website (the "Service") operated by Microsoft QR Codes For Good ("us", "we", or "our").</Text>
        <Text>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</Text>
        <Text>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. The Terms and Conditions agreement  for Microsoft QR Codes For Good has been created with the help of <Text href="https://termsfeed.com/terms-conditions/generator/">TermsFeed Terms and Conditions Generator</Text>.</Text>
        <Text style={s.h1}>Accounts</Text>
        <Text>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</Text>
        <Text>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</Text>
        <Text>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</Text>
        <Text style={s.h1}>Links To Other Web Sites</Text>
        <Text>Our Service may contain links to third-party web sites or services that are not owned or controlled by Microsoft QR Codes For Good.</Text>
        <Text>Microsoft QR Codes For Good has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Microsoft QR Codes For Good shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</Text>
        <Text>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</Text>
        <Text style={s.h1}>Termination</Text>
        <Text>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</Text>
        <Text>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</Text>
        <Text>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</Text>
        <Text>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</Text>
        <Text>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</Text>
        <Text style={s.h1}>Governing Law</Text>
        <Text>These Terms shall be governed and construed in accordance with the laws of Arizona, United States, without regard to its conflict of law provisions.</Text>
        <Text>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</Text>
        <Text style={s.h1}>Changes</Text>
        <Text>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</Text>
        <Text>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</Text>
        <Text style={s.h1}>Contact Us</Text>
        <Text>If you have any questions about these Terms, please contact us.</Text>
        <Button
            onPress={this._updateTos.bind(this)}
            title="Accept"
        />
        </ScrollView>
      </View>
      ); 

  }
}

const s = StyleSheet.create({
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
   h2: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});