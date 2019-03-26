import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles'
import CameraView from './camera';
import {store} from './store';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerMode: 'screen',
        headerTitle: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
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
      routeName: 'Payment',
    });
    this.props.navigation.dispatch(pushAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }

  goToPayment() {
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
    else{
      this.pushNavigation('Payment');
    }
  }

  render() {
    
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 100}}></Text>
        <Button 
            onPress={this.goToPayment.bind(this)} 
            title="Go to Payments Page"
        />
        <CameraView/>
      </View>
    );
  }
}