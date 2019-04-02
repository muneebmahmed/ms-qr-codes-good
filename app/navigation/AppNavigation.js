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
import generatedQR from '../qr-codes/generatedQR';
import {store} from '../store';
import {menuColor} from '../constants';

const DrawerContent = (props) => (
  <View style={
    {
      flex: 1,
      paddingBottom: 20
    }
  }>
    <View
      style={{
        backgroundColor: menuColor,
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
	"Transactions": {screen: transNavigator},
  Wallet: { screen: Wallet},
	"Create QR": {screen: CreateQR},
  "Saved QR Codes": {screen: qrNavigator},
  Settings: {screen: Settings},
	Info: { screen: Info},
	Help: { screen: Help},
  "Log Out": { screen: LogOut},
  Generated: {screen: generatedQR},
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
