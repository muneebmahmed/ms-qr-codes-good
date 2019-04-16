import React from 'react';
import {Button, Text, View, TextInput, StyleSheet} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import { Icon } from 'react-native-elements';
import {styles} from './styles';
import {store} from './store';
import {host, saveCodePoint, HEIGHT, WIDTH} from './constants';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";



export default class Payments extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '$10.00', amount: (store.scannedAmount == null)? 10 : Number(store.scannedAmount).toFixed(2) };
    store.pendingPayment = false;
    this.authenticate();
  }
  static navigationOptions = {
        title: 'Select Amount',
        headerMode: 'screen',
        headerTitle: 'Select Amount',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
  };
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
    store.scannedAmount = Number(this.state.amount) + 1;
    this.setState({
      amount: Number(store.scannedAmount).toFixed(2)
    })
  }
  decrease(){
    store.scannedAmount = Number(this.state.amount) <= 1? 0 : Number(this.state.amount) - 1;
    this.setState({
      amount: Number(store.scannedAmount).toFixed(2)
    })
  }

  go() {
    this.pushNavigation('ConfirmPayment')
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={{ paddingBottom: HEIGHT*.25, width: WIDTH * .75 }}>
      <View style={{alignItems: 'center',justifyContent: 'center'}}>
      <Text style={{color:'#2F4F4F', fontSize: 24, fontWeight: 'bold', paddingBottom: WIDTH*.05}}> Select Amount:</Text>
        <TextInput
          color='#2F4F4F'
          style={{height: WIDTH * .2, width: WIDTH * .5, borderColor: 'gray', fontSize: 40, borderWidth: 1, justifyContent: 'center'}}
          textAlign={'center'}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({amount: text})}
          onBlur={() => this.setState({amount: Number(this.state.amount).toFixed(2)})}
          value={String(this.state.amount)}
        />
        </View>
        <View style={s.container}>
        <View style={{padding:20}}>
            <Icon
  					name='minus'
  					type='evilicon'
  					size={100}
  					color='#2F4F4F'
  					onPress={this.decrease.bind(this)}/>
            </View>
            <View style={{padding:20}}>
          <Icon
  					name='plus'
  					type='evilicon'
  					size={100}
  					color='#2F4F4F'
  					onPress={this.increase.bind(this)}/>
            </View>
        </View>
        <AwesomeButton stretch onPress={this.go.bind(this)}>Next</AwesomeButton>
        
        </View>
      </View>
      );

  }
}


const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});