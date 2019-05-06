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
import { StackActions, NavigationActions } from 'react-navigation';
import {store} from '../store';

export default class LogOut extends React.Component {
	constructor(props){
    	super(props);
    	store.loggedIn = false;
    	this.resetNavigation('LoginScreen');
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
  render() {
    return null;
  }
}