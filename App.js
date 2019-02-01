import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppNavigator, createAppContainer} from 'react-navigation';
import Home from './app/home';
import SignIn from './app/signIn';
import CreateAccount from './app/createAccount';
import ConfirmID from './app/confirmID';
import TransactionHistory from './app/transactionHistory';
import Settings from './app/settings';
import CreateQR from './app/createQR';
import SavedQR from './app/savedQR';
import Payment from './app/payment';
import Wallet from './app/wallet';
import Info from './app/info';
import Help from './app/help';
import ForgotPassword from './app/forgotPassword';
import AppNavigator from './app/AppNavigation';
import {styles} from './app/styles';

const App = createAppContainer(AppNavigator);

export default App; 

// export default class App extends Component {
//   render(){
//     return ( <PrimaryNav /> );
//   }
// }

/*

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.changePage = this.changePage.bind(this);
    this.state = { page : "SignIn" };
  }

  changePage(text) {
    this.setState({
      page: text
    });
  }

  componentDidMount() {
  }

  render() {
    const apps = {
      'Home': <Home action={this.changePage}/>,  
      'SignIn' : <SignIn action={this.changePage}/>,
      'CreateAccount': <CreateAccount action={this.changePage}/>,  
      'ConfirmID' : <ConfirmID action={this.changePage}/>,
      'TransactionHistory' : <TransactionHistory action={this.changePage}/>,
      'Settings': <Settings action={this.changePage}/>,  
      'CreateQR' : <CreateQR action={this.changePage}/>,
      'SavedQR': <SavedQR action={this.changePage}/>,  
      'Payment' : <Payment action={this.changePage}/>,
      'Wallet': <Wallet action={this.changePage}/>,  
      'Info' : <Info action={this.changePage}/>,
      'Help' : <Help action={this.changePage}/>,
      'ForgotPassword' : <ForgotPassword action={this.changePage}/>,
    }
    return (
      <View style={styles.container}>
        {apps[this.state.page]}
      </View>
    );
  }
}*/
