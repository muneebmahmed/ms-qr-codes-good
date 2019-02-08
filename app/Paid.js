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
        <View style={{flexDirection: 'row', textAlign: 'center', justifyContent: 'center'}}>
          <Button
            onPress={() => navigate('Received')}
            title="Received"
            type="outline"
            accessibilityLabel="See Received Transactions"
          />
          <Button
            title="Paid"
            type="outline"
            color="black"
            accessibilityLabel="See Paid Transactions"
          />
        </View>
        <ScrollView>
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$10.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>1/22/2019</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid John</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$15.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>12/18/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid Kim</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$3.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>10/13/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid Sally</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$5.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>10/07/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid Lara</Text>
            </View>
          </View>
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$1.50</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>9/30/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid Jack</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>-</Text>
            <Text style={{fontSize:26}}>$7.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>10/13/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid Sally</Text>
            </View>
          </View>
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
    fontSize: 36,
    marginTop: 0,
    width: '100%',
    padding: 10
  },
  row: {
    flexDirection: "row",
    textAlign: 'right',
    padding: 10,
    justifyContent: 'flex-end'
  },
   leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  }
});
