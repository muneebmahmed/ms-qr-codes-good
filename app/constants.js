/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

import { Dimensions } from 'react-native';
export const host = 'https://qrcodes4good.com';
export const cardEndpoint = '/api/user/getCards/';
export const loginEndpoint = '/api/user/login';
export const touchEndpoint = '/api/user/bioLogin';
export const getQRCodes = '/api/user/getQRCodes';
export const createEndpoint = '/api/user/create';
export const updateStripeEndpoint = '/api/user/updateStripe';
export const updatePersonal = '/api/user/update';
export const updateDefaultPayment = '/api/user/updateDefaultPayment';
export const verifyStripe = '/api/user/verifyStripe';
export const transaction = '/api/user/transaction';
export const generateQREndpoint = '/api/user/generateQRCode';
export const deleteQRCode = '/api/user/deleteQRCode';
export const deleteSavedQRCode = '/api/user/deleteSavedQRCode';
export const deletePayment = '/api/user/deletePayment';
export const saveCodePoint = '/api/user/saveQRCode';
export const getOtherCodes = '/api/user/getSavedQRCodes';
export const getTransactions = '/api/user/transactionHistory';
export const forgotEndpoint = '/api/user/forgotPassword';
export const deleteSavedCode = '/api/user/deleteSavedQRCode';
export const tosEndpoint = '/api/user/tosUpdate';
export const menuColor = '#0070c0';
export let HEIGHT = Dimensions.get('window').height;
export let WIDTH = Dimensions.get('window').width;
//export const menuColor = '#46c487';

