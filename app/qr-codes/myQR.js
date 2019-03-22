import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from '../store';

export default class myQR extends React.Component {
  constructor(props) {
    super(props);
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
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>My QR Codes </Text>
        <ScrollView>
        <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.container}>
              <Text style={{fontSize:26}}>
                <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 70, height: 70}}             />
              Donation
              </Text>
              <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize:20}}>                Default: </Text>
              <Text style={{fontSize:20}}>$10.00</Text>
              </View>
              <Text style={{fontSize:20}}>                Me</Text>
              </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={styles.container}>
            <Text style={{fontSize:26}}>
              <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 70, height: 70}}             />
              Donation
            </Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:20}}>                Default: </Text>
            <Text style={{fontSize:20}}>$10.00</Text>
            </View>
            <Text style={{fontSize:20}}>                Me</Text>
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
  keepitsmall: {
    width: 34,
    height: 34
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
