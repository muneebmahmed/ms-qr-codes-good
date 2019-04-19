/*
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *
 *  @author Muneeb Ahmed
 *  @author Corey Miner
 *  @author Amanda Chesin
 *
 */

export let store = {
    name: null,
    email: null,
    qrcode: "this QrCode",
    screen: "MS Give",
    loggedIn: false,
    faceID: true,
    logOutTime: new Date(),
    authToken: null,
    touchToken: null,
    pendingRedirect: false,
    redirectDest: null,
    pendingPayment: false,
    biometryType: 'None',
    scannedId: null,
    scannedAmount: null,
    scannedType: null,
    cardData: {
        token: [],
        title: ['VISA', 'Apple Pay', 'Amex', 'Checking'],
        name: ['Timothy Smithony', 'Timothy Smithony', 'Timothy R. Smithony', 'Timothy Randolph Smithony'],
        primaryCard: [true, false, false, false],
        creditCardLastDigits: ['1234', '', '98765', '5432'],
        creditCardType: [],
        numberOfDigits: [13, 0, 12, 12]
    }
}