import React from 'react';
import {Button, Text, View, TextInput } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles';
import {store} from './store';


export default class Payments extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '$10.00' };
    this.authenticate();
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
