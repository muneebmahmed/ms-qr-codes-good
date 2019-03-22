import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {createStackNavigator, NavigationActions} from 'react-navigation';
import {styles} from './styles';
import Login from './signIn';
import CreateAccount from './createAccount';
import ForgotPassword from './forgotPassword';
import {store} from './store';

const LoginStack = createStackNavigator({
	LoginScreen: {screen: Login},
	Forgot: { screen: ForgotPassword },
	Create: { screen: CreateAccount},
	},
	{
    initialRouteName: 'LoginScreen',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerMode: 'none',
    },
  }
);

LoginStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

export default LoginStack;