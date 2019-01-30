import React, {Component} from 'react';
import {View} from 'react-native';
import Home from './home';
import SignIn from './signIn';
import CreateAccount from './createAccount';
import ConfirmID from './confirmID';
import TransactionHistory from './transactionHistory';
import Settings from './settings';
import CreateQR from './createQR';
import SavedQR from './savedQR';
import Payment from './payment';
import Wallet from './wallet';
import Info from './info';
import Help from './help';
import ForgotPassword from './forgotPassword';
import {styles} from './styles';

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
}
