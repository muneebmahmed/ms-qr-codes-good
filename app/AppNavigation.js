import React from 'react';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import {styles} from './styles';
import Login from './signIn';
import Home from './home';

const PrimaryNav = createDrawerNavigator({
	LoginScreen: {screen: Login},
	Home: {screen: Home},
});

export default PrimaryNav;