import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {createStackNavigator, createDrawerNavigator, NavigationActions, DrawerActions} from 'react-navigation';
import {styles} from '../styles';
import Login from '../login/signIn';
import CreateAccount from '../login/createAccount';
import AppNavigator from './AppNavigation';
import Payment from '../payment';
import Tos from '../login/tos';
import confirmPay from '../confirmPayment';
import AddPayNavigator from '../addPayments/addPayment';
import AddStripeDetail from '../addPayments/addStripeDetail';
import EditStripeDetail from '../addPayments/editStripeDetail';
import {store} from '../store';
import {menuColor} from '../constants';

const MainNavigator = createStackNavigator({
	LoginScreen: {screen: Login},
	Create: { screen: CreateAccount},
	Tos: {screen : Tos},
	Payment: {screen: Payment},
	ConfirmPayment: {screen: confirmPay},
	AddPayment: {screen : AddPayNavigator},
	AddStripeDetail: {screen : AddStripeDetail},
	EditStripeDetail: {screen : EditStripeDetail},
	Main: { screen: AppNavigator,
		navigationOptions: ({ navigation }) => ({
        title: "MS Give",
  			headerLeft : <View>
  				<Icon
  					name='navicon'
  					type='evilicon'
  					size={38}
  					color='white'
  					style={{paddingLeft:20}}
  					onPress={() => navigation.toggleDrawer()}/>
  			</View>
		}),
	},
  },
  {
    initialRouteName: 'Main',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: menuColor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default MainNavigator;
