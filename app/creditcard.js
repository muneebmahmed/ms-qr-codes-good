import React from 'react';
import {Button, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {styles} from './styles'

export default class CreditCard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.headline}>Wallet</Text>
      <ScrollView>
      <Card
        title='VISA'>
        <Text style={{marginBottom: 10}}>
        Card Holder: Timothy Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************1234
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
        </Card>
        <Card
        title='Apple Pay'>
         <Text style={{marginBottom: 10}}>
        Card Holder: Tim Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Default Card: Mastercard 5678
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
        </Card>
        <Card
        title='Amex'>
         <Text style={{marginBottom: 10}}>
        Card Holder: Timothy R. Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************98765
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
        </Card>
        <Card
        title='Checking'>
        <Text style={{marginBottom: 10}}>
        Card Holder: Timothy Randolph Smithony
        </Text>
        <Text style={{marginBottom: 10}}>
        Card Number: ************5432
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
        </Card>
        </ScrollView>
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
  }
});
