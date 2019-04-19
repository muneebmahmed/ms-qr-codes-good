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
import { Text, View, Button } from 'react-native';
import {styles} from '../styles';
import {createMaterialTopTabNavigator, TabNavigator} from 'react-navigation';
import Paid from './Paid';
import Received from'./Received';

const transNavigator = createMaterialTopTabNavigator({
	Paid: {screen: Paid},
	Received: {screen: Received},
})

export default transNavigator;