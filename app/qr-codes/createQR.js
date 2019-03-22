import React from 'react';
import {Button, Text, View, TextInput } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from '../styles'
import {store} from '../store'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'Service', value: 0 },
  {label: 'Donation', value: 1 }
];

export default class CreateQR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount: ''};
    this.authenticate();
  }
  getInitialState() {
    return {
      value: 0,
    }
  }
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
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Enter default amount"
          onChangeText={(amount) => this.setState({amount})}
        />
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
      );

  }
}
