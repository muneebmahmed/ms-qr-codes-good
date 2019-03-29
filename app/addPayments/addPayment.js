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
})

export default AddPayNavigator;