import React from 'react';
import { AppRegistry, Text, Switch, TextInput, View, Button,StyleSheet, Alert } from 'react-native';

const host = 'http://104.42.36.29:3001';
const createEndpoint = '/api/user/create';

export default class CreateAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
    };
  }

  _onPressButton() {
    var endpoint = host + createEndpoint;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        confirmPassword: this.state.ConfirmPassword,
        name: (this.state.FirstName + ' ' + this.state.LastName),
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var confirm = responseJson['accountCreated'];
      if (confirm) {
        Alert.alert('Account Created!');
      }
      else
        Alert.alert('Creation Failure');
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
<View style={styles.container}>

<Text style={styles.TextHeader}> Create Account </Text>

  <View style={styles.Parent}>
        <Text style={styles.Text}> First Name: </Text>
        <TextInput
          value={this.state.FirstName}
          onChangeText={(FirstName) => this.setState({FirstName})}
          style={styles.input}
        />
  </View>

  <View style={styles.Parent}>
        <Text style={styles.Text}> Last Name: </Text>
        <TextInput
          value={this.state.LastName}
          onChangeText={(LastName) => this.setState({LastName})}
          style={styles.input}
        />
  </View>

    <View style={styles.Parent}>
        <Text style={styles.Text}> Email: </Text>
        <TextInput
          value={this.state.Email}
          onChangeText={(Email) => this.setState({Email})}
          style={styles.input}
        />
  </View>

    <View style={styles.Parent}>
        <Text style={styles.Text}> Password: </Text>
        <TextInput
          value={this.state.Password}
          onChangeText={(Password) => this.setState({Password})}
          secureTextEntry={true}
          style={styles.input}
        />
  </View>

    <View style={styles.Parent}>
        <Text style={styles.Text}> Confirm Password: </Text>
        <TextInput
          value={this.state.ConfirmPassword}
          onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword})}
          secureTextEntry={true}
          style={styles.input}
        />
 </View>

<View style={styles.ButtonContainer}>
          <Button
            onPress={this._onPressButton.bind(this)}
            title="Sign Up"
          />
        </View>



</View>
      ); 
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',

  },
  input: {
    width: 360,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
     Parent: {
      
      alignItems: 'flex-start',
      margin: 6,
    flexDirection: 'column',

   },
        Text: {
      
fontSize: 18,
paddingBottom: 5,
   },

  TextHeader: {
   //paddingTop: 0,
   paddingBottom: 30,
   fontSize: 25,
   justifyContent: 'center',
   textAlign: 'center',
   fontWeight: 'bold',

  },

  ButtonContainer: {
    
    margin: 30,
    flexDirection: 'row',
    //borderRadius: 5,
    //borderWidth: 1,
    justifyContent: 'center',

  },
 
});
