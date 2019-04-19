/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import {store} from '../store';
import {host, verifyStripe} from '../constants';
import t from 'tcomb-form-native';
import moment from 'moment';



const Form = t.form.Form;

const User = t.struct({
  Last_4_digits_of_your_Social_Security_Number: t.String,
  address: t.String,
  city: t.String,
  state: t.String,
  postal_code: t.String,
  Birthday: t.Date,
});

let myFormatFunction = (format,date) =>{
    return moment(date).format(format);
}

var options = {
    fields: {
      Birthday: {
        mode: 'date',
        config:{
            format:(date) => myFormatFunction("MMM DD YYYY",date)
        }
      }
    }
  };

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'black',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}


const s = StyleSheet.create({
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

export default class AddStripeDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
        title: 'Personal Information',
        headerMode: 'screen',
        headerTitle: 'Personal Information',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
  };

  _onSubmit() {
    const data = this._form.getValue();
    if (data) {
      console.log("lets add a stripe info")
      var endpoint = host + verifyStripe;
      fetch(endpoint, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': store.authToken,
          },
          body: JSON.stringify({
                email: store.email,
                ssn_last_4: data.Last_4_digits_of_your_Social_Security_Number,
                dob_day: myFormatFunction("DD",data.Birthday),
                dob_month: myFormatFunction("MM",data.Birthday),
                dob_year: myFormatFunction("YYYY",data.Birthday),
                line1: data.address,
                city: data.city,
                state: data.state,
                postal_code: data.postal_code,
          }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
      var confirm = responseJson['verification'];
      if (confirm) {
          Alert.alert('Verification Sent');
          const {navigate} = this.props.navigation;
          navigate('Wallet');
      } else
          Alert.alert(responseJson['message']);
      })
      .catch((error) => {
          console.error(error);
      });
    } else {
      Alert.alert('Please enter valid verification information.');
    }
  }
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text>Please enter all current and valid personal information to allow payouts to your bank.</Text>
        <Text></Text>
        <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
        />
        <Button
          onPress={this._onSubmit.bind(this)}
          backgroundColor='#03A9F4'
          title='Submit' />

      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}