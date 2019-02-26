import React from 'react';
import {Button, Text, View, TextInput } from 'react-native';
import {styles} from './styles'

export default class Payments extends React.Component {
  render() {
    constructor(props) {
      super(props);
      this.state = { text: '$10.00' };
    }
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, justifyContent: 'center'}}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={() => this.props.increase}
          title="Plus One"/>
        <Button
          onPress={() => this.props.decrease}
          title="Minus One"/>
      </View>
      );

  }
}
