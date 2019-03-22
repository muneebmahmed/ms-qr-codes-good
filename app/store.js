export let store = {
    name: null,
    email: null,
    qrcode: "this QrCode",
    screen: "MS Give",
    loggedIn: false,
    authToken: null,
    touchToken: null,
    scannedId: null,
    scannedAmount: null,
    scannedType: null,
    cardData: [{title: 'VISA', user: 'Timothy Smithony', number: '************1234', isPrimary: true}, 
    {title: 'Apple Pay', user: 'Timothy Smithony', number: '', isPrimary: false},
    {title: 'Amex', user: 'Timothy R. Smithony', number: '************98765', isPrimary: false},
    {title: 'Checking', user: 'Timothy Randolph Smithony', number: '************5432', isPrimary: false}
    ],
}