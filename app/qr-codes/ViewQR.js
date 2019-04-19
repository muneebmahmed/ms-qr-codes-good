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
import myQR from './myQR';
import otherQR from'./otherQR';

const qrNavigator = createMaterialTopTabNavigator({
	Mine: {screen: myQR},
	Others: {screen: otherQR},
},
{
	swipeEnabled: false,
})

export default qrNavigator;
