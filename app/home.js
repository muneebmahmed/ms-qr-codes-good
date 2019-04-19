/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles'
import CameraView from './camera';
import {store} from './store';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            cameraVisible: true,
        };
    }

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
      routeName: targetRoute,
    });
    this.props.navigation.dispatch(pushAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }

  goToPayment() {
    store.pendingPayment = true;
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
    else{
      this.pushNavigation('Payment');
    }
  }

  componentDidMount(){
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus', payload => {
            this.setState({cameraVisible: true } );
        }
    );
    this.willBlurSubscription = this.props.navigation.addListener(
        'willBlur', payload => {
            this.setState({cameraVisible: false } );
        }
    );
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.debug('didFocus', payload);
        if (store.pendingPayment){
          store.pendingPayment = false;
          this.pushNavigation('Payment');
        }
        else if (store.pendingRedirect){
          store.pendingRedirect = false;
          this.props.navigation.navigate(store.redirectDest);
        }
      }
    );
  }
  componentWillUnmount(){
    this.willFocusSubscription.remove();
    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();
  }
  render() {
    
    const {navigate} = this.props.navigation;
    var debug = false;
    var loginComponent = function() {
      if (!store.loggedIn){
        return ( 
          <View>
          <Text>You are not logged in </Text>
          <Button onPress={() => {this.resetNavigation('LoginScreen')}} title="Sign In" />
          </View>
        )
      }else { return null}
    }.bind(this)
    var debugPay = function() {
      if (debug){
        return (<Button onPress={this.goToPayment.bind(this)} title="Go to Payments Page" />)
      }else { return null}
    }.bind(this)
    var cameraComponent = function() {
        if (this.state.cameraVisible) {
            return (<CameraView navigator={this.props.navigation}/>)
        }else{
            return null
        }
    }.bind(this)
    return (
      <View style={styles.container}>
        <Text style={{marginTop: 100}}></Text>
        {loginComponent()}
        {debugPay()}
        {cameraComponent()}
      </View>
    );
  }
}
