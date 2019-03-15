import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image } from 'react-native';

export default class otherQR extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Payments </Text>
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
              <Image
              style={styles.keepitsmall}
              source={require('./images/user.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> John</Text>
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
            <Image
            style={styles.keepitsmall}
            source={require('./images/anonymoususer.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid </Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> Kim</Text>
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
            <Image
            style={styles.keepitsmall}
            source={require('./images/user.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> Sally</Text>
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
            <Image
            style={styles.keepitsmall}
            source={require('./images/anonymoususer.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> Lara</Text>
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
            <Image
            style={styles.keepitsmall}
            source={require('./images/user.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid</Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> Jack</Text>
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
            <Image
            style={styles.keepitsmall}
            source={require('./images/user.png')} />
              <Text style={{fontSize:16, textAlign: 'right'}}>You paid </Text>
              <Text style={{fontSize:16, textAlign: 'right'}}> Rachel</Text>
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
