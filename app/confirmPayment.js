import React from 'react';
import {Button, Text, View, TextInput, Modal, TouchableHighlight, Picker, StyleSheet, Alert } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from './store';
import {host, cardEndpoint, transaction} from './constants';

export default class confirmPay extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dataAvailable: false,
			modalVisible: false,
			selected: 0,
			username: '',
			password: '',
		}
	}
	initiatePayment(){
		const {navigate} = this.props.navigation;
		console.log(store.email, store.scannedId, store.scannedAmount, store.authToken);
		var endpoint = host + transaction;

		fetch(endpoint, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': store.authToken,
			},
			body: JSON.stringify({
				email: store.email,
				receiverID: store.scannedId,
				amount: store.scannedAmount,
			}),
		})
		.then((response) => response.json())
		.then((responseJson) => {
			var confirm = responseJson['success'];
			if (confirm) {
				Alert.alert('Transfer Completed!');
				navigate('Main')
			} else
				Alert.alert(responseJson['message']);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	fetchCardData(){
	    var endpoint = host + cardEndpoint + store.email;
	    var debug = false;
	    if (!debug){
	    fetch(endpoint, {
	      method: 'GET',
	      headers: {
	        Accept: 'application/json',
	        'Content-Type': 'application/json',
	        'Authorization': store.authToken,
	      },
	    })
	    .then((response) => response.json())
	    .then((responseJson) =>{
	      this.setState({
	        dataAvailable: true,
	        cards: responseJson,
	        checked: responseJson.primaryCard,
	        refreshing: false
	      })
	    })
	    .catch((error) =>{
	      console.error(error);
	      this.setState({
	        refreshing: false
	      })
	    });
	    }else{
	    //temp code for testing below
	    this.setState({
	      dataAvailable: true,
	      cards: store.cardData,
	      checked: store.cardData.primaryCard,
	      refreshing: false
	    })
	    }
  	}
  	_setModalVisible = visible => {
  		this.setState({modalVisible: visible});
  	};
  	getDefaultCard(){
  		return(
  			<View>
  				<TouchableHighlight style={styles.input} onPress={() => {this.setState({modalVisible: true})}}>
  					<Text>{this.state.cards.title[this.state.selected]} {this.state.cards.creditCardLastDigits[this.state.selected]}</Text>
  				</TouchableHighlight>
  			</View>
  		);
  	}
  	componentDidMount(){
  		this.fetchCardData();
  	}
	render(){
		if (!this.state.dataAvailable){
	      return (
	        <View style={styles.container}>
	        	<Text> Data Unavailable </Text>
	        </View>
	      );
    	}
    	var options = this.state.cards.title;
		return(
			<View style={styles.container}>
				{this.getDefaultCard()}
				
				<Modal
					animationType='slide'
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => Alert.alert('Modal closed')}
				>
					<View style={styles.container}>
						<Picker
							style={{height: 50, width: 200, paddingBottom: 300, flexDirection: 'column'}}
							mode="dropdown"
							selectedValue={this.state.selected}
							onValueChange={(value, index) => {this.setState({selected: value})}}
						>
							{options.map((item, index) => {
								return(<Picker.Item label={item} value={index} key={index}/>)
							})}
						</Picker>
						<Button onPress={() => {this.setState({modalVisible: false})}} title='Confirm' />
					</View>
				</Modal>
				
				<TextInput
		          value={this.state.username}
		          onChangeText={(username) => this.setState({username})}
		          placeholder={'Username'}
		          style={styles.input}
		        />
		        <TextInput
		          value={this.state.password}
		          onChangeText={(password) => this.setState({password})}
		          placeholder={'Password'}
		          secureTextEntry={true}
		          style={styles.input}
		        />
		        <Button
		          title={'Pay'}
		          style={styles.input}
		          onPress={this.initiatePayment.bind(this)}
		        />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});