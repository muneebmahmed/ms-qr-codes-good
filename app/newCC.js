import React from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import {styles} from './styles';

import t from 'tcomb-form-native';
// or any pure javascript modules available in npm

const Form = t.form.Form;

const User = t.struct({
  Name: t.String,
  Card: t.String,
  Expiration: t.String,
  Security: t.String,
  Billing: t.String,
  City: t.String,
  State: t.String,
  Zip: t.String
  //terms: t.Boolean
});

export default class App extends React.Component {
   handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
       <Form ref={c => this._form = c} // assign a ref
          type={User}/>
       <Button
          onPress={this.handleSubmit}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Submit' />
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    justifyContent: 'center'
  }
})
