import React from 'react';
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { styles } from '../styles';
import {store} from '../store';
import {host, updateStripeEndpoint, HEIGHT, WIDTH} from '../constants';
import t from 'tcomb-form-native';



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
        console.log(responseJson['stripeVerified'])
      var confirm = responseJson['bankCreated'];
      if (confirm) {
          Alert.alert('Bank Added!');
          if (!responseJson['stripeVerified']) {
            console.log('redirecting')
            const {navigate} = this.props.navigation;
            navigate('AddStripeDetail');
            
          } else {
            const {navigate} = this.props.navigation;
            navigate('Wallet');
          }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <KeyboardAvoidingView  behavior="padding" enabled>
      <View style={{ paddingBottom: HEIGHT*.25, width: WIDTH * .75 }}>
        <Form 
          ref={c => this._form = c}
          type={User} 
        />
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