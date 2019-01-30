import React, {Component} from 'react';
import {Button, Text, View } from 'react-native';
import {styles} from './styles'

class Login extends Component {
  constructor(props){
    super(props);
  };
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>This is the Sign In Page</Text>
        <Button
            onPress={() => navigate('Home')}
            title="log in"
        />
        <Button
            onPress={() => this.props.action('CreateAccount')}
            title="create new account"
        />
        <Button
            onPress={() => this.props.action('ForgotPassword')}
            title="forgot password?"
        />
      </View>
      ); 

  }
};

export default Login;