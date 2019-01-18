# ms-qr-codes-good

This is the repository for Team 18080 for our Senior Design Project. This repo stores the data for the mobile applications- both Android and iOS.

## Bundling
Normally React Native apps are tested by running a Metro server on the host
machine, which the phone connects to. To use the app without requiring a server
connection, it needs to be bundled. To enable bundling, add the following
line to `ios/msqrc4g/AppDelegate.m`

```
#undef DEBUG
```

Additionally, you will need to bundle the Javascript from the project root:

```
$ react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
```


