/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import React from 'react';
import { Platform, Dimensions, Text, View, StyleSheet, Button, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import {HEIGHT, WIDTH} from '../constants';

export default class ModalQR extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Modal
				animationType='slide'
				transparent={false}
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}
			>
				<View style={styles.container}>
					<View style={styles.qr}>
						<QRCode
							logo={this.props.uri}
							size={WIDTH * .7}
							logoSize={WIDTH * .7}
							logoBackgroundColor='transparent'
						/>
					</View>
					<View style={styles.bottom}>
						<View style={styles.row}>
							<AwesomeButtonRick stretch={true} onPress={this.props.onSavePress} type="primary">{this.props.firstTitle}</AwesomeButtonRick>
						</View>
						<View style={styles.row}>
							<AwesomeButtonRick stretch={true} onPress={this.props.onClosePress} type="secondary">{this.props.secondTitle}</AwesomeButtonRick>
						</View>
					</View>
				</View>
			</Modal>
		)
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
    padding: 15
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 2
  },
  qr: {
    flex: 1,
    margin: WIDTH * .15,
    marginTop: HEIGHT * .15
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: HEIGHT * .1
  }
});
