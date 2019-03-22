import React from 'react';
import { Text, View, Button } from 'react-native';
import {styles} from '../styles';
import {createMaterialTopTabNavigator, TabNavigator} from 'react-navigation';
import Paid from './Paid';
import Received from'./Received';

const transNavigator = createMaterialTopTabNavigator({
	Paid: {screen: Paid},
	Received: {screen: Received},
})

export default transNavigator;