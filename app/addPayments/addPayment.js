/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React from 'react';
import { Text, View, Button } from 'react-native';
import {styles} from '../styles';
import {createMaterialTopTabNavigator, TabNavigator} from 'react-navigation';
import CreateCard from './createCard';
import CreateBank from'./createBank';

const AddPayNavigator = createMaterialTopTabNavigator({
	Card: {screen: CreateCard},
	Bank: {screen: CreateBank},
},
{
	swipeEnabled: false,
});

AddPayNavigator.navigationOptions = ({ navigation }) => {
  //const { routeName } = navigation.state.routes[navigation.state.index];

  const headerTitle = "Add Payment Method";
  return {
    headerTitle,
  };
};

export default AddPayNavigator;