import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles';
import {store} from '../store';
import t from 'tcomb-form-native';
const host = 'https://qrcodes4good.com:8080';
const createEndpoint = '/api/user/updateStripe';



const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  routing_number: t.String,
  account_number: t.String
});

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

export default class CreateBank extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSubmit() {
    const data = this._form.getValue();
    console.log(data);
    if (data) {
      console.log("lets add a bank")
      var endpoint = host + createEndpoint;
      fetch(endpoint, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: store.email,
              cvc: null,
              expiry: null,
              name : data.name,
              number : null,
              postalCode : null,
              type: null,
              card: false,
              routing_number: data.routing_number,
              account_number: data.account_number
          }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
      var confirm = responseJson['bankCreated'];
      if (confirm) {
          Alert.alert('Bank Added!');
      } else
          Alert.alert(responseJson['message']);
      })
      .catch((error) => {
          console.error(error);
      });
    } else {
      Alert.alert('Please enter valid bank information.');
    }
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <Form 
          ref={c => this._form = c}
          type={User} 
        />
        <Button
          onPress={this._onSubmit.bind(this)}
          backgroundColor='#03A9F4'
          title='Submit' />

      </KeyboardAvoidingView>
    );
  }
}