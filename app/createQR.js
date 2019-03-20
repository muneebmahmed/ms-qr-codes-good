import React from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'Service', value: 0 },
  {label: 'Donation', value: 1 }
];

export default class CreateQR extends React.Component {
constructor(props) {
  super(props);
  this.state = {amount: ''};
}
getInitialState: function() {
  return {
    value: 0,
  }
},
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Create QR Code Page</Text>
        <Button
            onPress={() => navigate('Home')}
            title="go home"
        />
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
