import React, {Component} from 'react';
import { Text, View, Button, ScrollView } from 'react-native'
import {createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {styles} from '../styles';
import Home from '../home';
import Settings from '../settings';
import CreateQR from '../qr-codes/createQR';
import qrNavigator from '../qr-codes/ViewQR';
import Payment from '../payment';
import Wallet from '../wallet';
import Info from '../info';
import Help from '../help';
import transNavigator from '../transactions/transactions';
import LogOut from '../LogOut';
import {store} from '../store'

const DrawerContent = (props) => (
  <View style={
    {
      flex: 1,
      paddingBottom: 20
    }
  }>
    <View
      style={{
        backgroundColor: '#46c487',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 30 }} onPress={() => props.navigation.navigate('Settings')}>
        {store.name}
      </Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)


const AppNavigator = createDrawerNavigator({
	Home: {screen: Home},
  Settings: {screen: Settings},
	"Transactions": {screen: transNavigator},
  Wallet: { screen: Wallet},
	"Create QR": {screen: CreateQR},
	"Saved QR Codes": {screen: qrNavigator},
	Payment: {screen: Payment},
	Info: { screen: Info},
	Help: { screen: Help},
  "Log Out": { screen: LogOut},
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

AppNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;

  return {
    headerTitle,
  };
};

export default AppNavigator;