import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {createStackNavigator, createDrawerNavigator, NavigationActions, DrawerActions} from 'react-navigation';
import {styles} from '../styles';
import Login from '../login/signIn';
import CreateAccount from '../login/createAccount';
import ForgotPassword from '../login/forgotPassword';
import AppNavigator from './AppNavigation';
import Tos from '../login/tos'
import {store} from '../store';

// const MenuButton = (
// 	<View>
// 		<Icon
// 			name="md-menu"
// 			color='white'
// 			onPress={() => navigation.navigate('DrawerOpen')}/>
// 	</View >
// );

const MainNavigator = createStackNavigator({
	LoginScreen: {screen: Login},
	Forgot: { screen: ForgotPassword },
	Create: { screen: CreateAccount},
	Tos: {screen : Tos},
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
        backgroundColor: '#46c487',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default MainNavigator;