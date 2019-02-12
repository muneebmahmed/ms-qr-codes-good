import React, {Component} from 'react';
import {View} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {styles} from './styles'
import CameraView from './camera';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerMode: 'screen',
        headerTitle: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

  resetNavigation(targetRoute) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <CameraView/>
      </View>
    );
  }
}