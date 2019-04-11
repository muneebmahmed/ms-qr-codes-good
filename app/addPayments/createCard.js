import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Keyboard, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {store} from '../store';
import {host, updateStripeEndpoint, HEIGHT} from '../constants';

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
      var endpoint = host + updateStripeEndpoint;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': store.authToken,
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
        console.log(responseJson)
        if (confirm) {
          Alert.alert('Card Added!');
          const {navigate} = this.props.navigation;
          navigate('Wallet');
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <KeyboardAvoidingView  behavior="padding" enabled>

        <View style={{ paddingBottom: HEIGHT*.2, width: 400 }}>
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
       
        <Button
          onPress={this._onSubmit.bind(this)}
          backgroundColor='#03A9F4'
          title='Submit' />
 </View>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}
