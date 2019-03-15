import React from 'react';
import { Text, View, Button } from 'react-native';
import {styles} from './styles';
import {createMaterialTopTabNavigator, TabNavigator} from 'react-navigation';
import myQR from './myQR';
import otherQR from'./otherQR';

const qrNavigator = createMaterialTopTabNavigator({
	Mine: {screen: Paid},
	Others: {screen: Received},
})

export default qrNavigator;
