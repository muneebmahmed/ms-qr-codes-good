import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native'
import {createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {styles} from './styles';
import Login from './signIn';
import Home from './home';
import CreateAccount from './createAccount';
import ConfirmID from './confirmID';
import Paid from './Paid';
import Received from './Received';
import Settings from './settings';
import CreateQR from './createQR';
import SavedQR from './savedQR';
import Payment from './payment';
import Wallet from './wallet';
import Info from './info';
import Help from './help';
import ForgotPassword from './forgotPassword';
import transNavigator from './transactions';
import Settings2 from './settings2';

const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#46c487',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 30 }}>
        User Profile
      </Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)

const AppNavigator = createDrawerNavigator({
	Home: {screen: Home},
	"Transactions": {screen: transNavigator},
	Settings: {screen: Settings},
  Setting2: {screen : Settings2},
	"Create QR": {screen: CreateQR},
	"Saved QR": {screen: SavedQR},
	Payment: {screen: Payment},
	Wallet: { screen: Wallet},
	Info: { screen: Info},
	Help: { screen: Help},
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    contentComponent: DrawerContent,
  }
);

export default AppNavigator;