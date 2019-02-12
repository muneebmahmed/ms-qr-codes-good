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
            title="Received"
            type="outline"
            color="black"
            accessibilityLabel="See Received Transactions"
          />
          <Button
            onPress={() => navigate('Paid')}
            title="Paid"
            type="outline"
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
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$5.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>12/22/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}} />
              <Text style={{fontSize:16, textAlign: 'right'}}>John</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$15.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>4/12/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>Kim</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$6.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>03/01/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>Sally</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$5.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>02/14/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>Lara</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
            </View>
          </View>
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$2.50</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>01/20/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>Jack</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:26}}>+</Text>
            <Text style={{fontSize:26}}>$9.00</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={{fontSize:16}}>01/13/2018</Text>
            <View style={styles.rightContainer}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 34, height: 34}}             />
              <Text style={{fontSize:16, textAlign: 'right'}}>Sally</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> paid you</Text>
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
