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

how to get react native working:
https://www.christianengvall.se/install-react-native/


## To run the app on an Android phone (while in developer mode, before app is available from other platforms)
1.	Go into Settings-> About phone and tap the “Build number” seven times. If “Build number” doesn’t automatically show up in that section, search for it and it should come up. Tapping it specifically 7 times allows you to be a developer on the phone, not just a regular user
2.	Then go to Settings->Developer options and enable “USB debugging”. Again, if it doesn’t automatically show up in that section, search for it and it should come up.
3.	Connect the device via USB to the computer and make sure the computer acknowledges the phone (i.e. it shows up in My Computer/Finder). If not, you may have to change the way in which the USB cord works 
a.	on the Google Pixel, when the phone is first connected to a PC, it is set to “Use USB to Charge this device”. The computer does not recognize the phone this way, so you must pull down the settings bar from the top of the phone, click the bottom row that says “Android System” and then select it again for “Tap for more options.” Now, select “Transfer files” and the computer should recognize the device.
4.	Open up “Command Prompt” or “Terminal” from the Windows search bar and cd into the project. Once inside the project, type the command react-native run-android
5.	If that does not work there are a few different possibilities as to why. Possible errors:
a.	ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH: https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/index.html
b.	sdk manager not recognized: https://stackoverflow.com/questions/30607520/how-to-solve-sdk-manager-path-not-recognized-as-an-internal-or-external-command and https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial
i.	Once sdkmanager is installed, it is only compatible with Java8, so make sure that is the version you have downloaded: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
6.	Try running the command react-native run-android again to see if it works. If not, keep Googling your errors

