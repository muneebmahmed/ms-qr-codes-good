import React from 'react';
import {Button, Text, View, TextInput } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles';
import {store} from './store';
import {host, saveCodePoint} from './constants';


export default class Payments extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '$10.00', amount: (store.scannedAmount == null)? 10 : store.scannedAmount };
    store.pendingPayment = false;
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
  pushNavigation(targetRoute){
    const pushAction = StackActions.push({
      routeName: targetRoute,
    });
    this.props.navigation.dispatch(pushAction);
  }
  authenticate(){
    if (new Date() > store.logOutTime || !store.loggedIn){
      store.pendingPayment = true;
      this.resetNavigation('LoginScreen');
    }
    else if (store.scannedId != null) {
      endpoint = host + saveCodePoint;
      fetch(endpoint, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': store.authToken,
        },
        body: JSON.stringify({
          userID: store.scannedId,
          qrcodeData: store.scannedData,
          amount: store.scannedAmount,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) =>{
      })
      .catch((error) =>{
        console.error(error);
    });
    }
  }
  increase(){
    store.scannedAmount = this.state.amount + 1;
    this.setState({
      amount: store.scannedAmount
    })
  }
  decrease(){
    store.scannedAmount = this.state.amount <= 1? 0 : this.state.amount - 1;
    this.setState({
      amount: store.scannedAmount
    })
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, justifyContent: 'center'}}
          textAlign={'center'}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({amount: text})}
          value={Number(this.state.amount).toFixed(2)}
        />
        <Button
          onPress={this.increase.bind(this)}
          title="Plus One"/>
        <Button
          onPress={this.decrease.bind(this)}
          title="Minus One"/>
        <Button
          title="Next"
          onPress={() => this.pushNavigation('ConfirmPayment')}
        />
      </View>
      );

  }
}
