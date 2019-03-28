import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {store} from '../store';

const host = 'https://qrcodes4good.com:8080';
const createEndpoint = '/api/user/updateStripe';

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

export default class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  _onSubmit() {
    const data = this.state.formData;
    console.log(data);
    if (data.status.cvc == "valid" &&
      data.status.expiry == "valid" &&
      data.status.name == "valid" &&
      data.status.number == "valid") {
      console.log("lets add a card")
      var endpoint = host + createEndpoint;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: store.email,
          cvc: data.values.cvc,
          expiry: data.values.expiry,
          name : data.values.name,
          number : data.values.number,
          postalCode : data.values.postalCode,
          type: data.values.type,
          card: true,
		      routing_number: null,
		      account_number: null
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var confirm = responseJson['cardCreated'];
        if (confirm) {
          Alert.alert('Card Added!');
        } else
          Alert.alert(responseJson['message']);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      Alert.alert('Invalid Card!');
    }
  }
  _onChange(formData) { this.setState({ formData }); }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <View style={{ width: 400 }}>
          <CreditCardInput
            autoFocus
            input
            requiresName
            requiresCVC
            requiresPostalCode

            labelStyle={s.label}
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange.bind(this)} />
        </View>
        <Button
          onPress={this._onSubmit.bind(this)}
          backgroundColor='#03A9F4'
          title='Submit' />

      </KeyboardAvoidingView>
    );
  }
}
