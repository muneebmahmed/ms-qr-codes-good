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
    pendingPayment: false,
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