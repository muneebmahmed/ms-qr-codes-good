import React from 'react';
import {Button, Text, View, ScrollView, Alert, StyleSheet } from 'react-native';
import { Card, Icon, CheckBox } from 'react-native-elements';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';

export default class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.authenticate();
  }
  resetNavigation(targetRoute) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  authenticate(){
    if (!store.loggedIn){
      this.resetNavigation('LoginScreen');
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.row}>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Edit' />
      </View>
      <ScrollView>
      <Card
        title='VISA'>
        <Text style={{marginBottom: 10}}>
        Card Holder: Timothy Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************1234
        </Text>
        <CheckBox
          title='Primary Payment Method'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />
        </Card>
        <Card
        title='Apple Pay'>
         <Text style={{marginBottom: 10}}>
        Card Holder: Tim Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Default Card: Mastercard 5678
        </Text>
        <CheckBox
          title='Primary Payment Method'
          checked={this.state.checked2}
        />
        </Card>
        <Card
        title='Amex'>
         <Text style={{marginBottom: 10}}>
        Card Holder: Timothy R. Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************98765
        </Text>
        <CheckBox
          title='Primary Payment Method'
          checked={this.state.checked3}
        />
        </Card>
        <Card
        title='Checking'>
        <Text style={{marginBottom: 10}}>
        Card Holder: Timothy Randolph Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************5432
        </Text>
        <CheckBox
          title='Primary Payment Method'
          checked={this.state.checked4}
        />
        </Card>
        </ScrollView>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Add New Payment Method' />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 0,
    width: '100%',
    padding: 10
  },
  row: {
  flexDirection: "row",
  padding: 10,
  justifyContent: 'center',
  marginRight: 0
  }
});
