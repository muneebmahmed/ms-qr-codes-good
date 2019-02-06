import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Transaction History </Text>
        <Button
            onPress={() => this.props.action('Home')}
            title="Received"
            type="outline"
            accessibilityLabel="See Received Transactions"
        />
        <Button
            onPress={() => this.props.action('Home')}
            title="Paid"
            type="outline"
            accessibilityLabel="See Paid Transactions"
        />
        <ScrollView>
          <Text style={{fontSize:26}}>$10.00</Text>
          <Text style={{fontSize:16}}>1/22/2019</Text>
          <View style={styles.row}>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
            <Text style={{fontSize:16, textAlign: "right"}}>You paid John</Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{fontSize:26}}>$15.00</Text>
          <Text style={{fontSize:16}}>12/18/2018</Text>
          <Text style={{fontSize:16, textAlign: "right"}}>You paid Kim</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{fontSize:26}}>$3.00</Text>
          <Text style={{fontSize:16}}>10/13/2018</Text>
          <Text style={{fontSize:16, textAlign: "right"}}>You paid Sally</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}} />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{fontSize:26}}>$5.00</Text>
          <Text style={{fontSize:16}}>10/07/2018</Text>
          <Text style={{fontSize:16, textAlign: "right"}}>You paid Lara</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}} />
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{fontSize:26}}>$1.50</Text>
          <Text style={{fontSize:16}}>9/30/2018</Text>
          <Text style={{fontSize:16, textAlign: "right"}}>You paid Jack</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}} />
        </ScrollView>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
   headline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: '100%',
  },
  row: {
    flexDirection: "row",
    textAlign: 'right'
  }
});
