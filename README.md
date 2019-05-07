# ms-qr-codes-good

This repository was created by the University of Arizona's 2019 Engineering Design Team 18080, QR Codes for Good.
It stores the data for the project's mobile applications - both Android and iOS.
The repository for all of the code, including the server and website, can be found [here](https://github.com/muneebmahmed/Qr-Master)

## Dependencies
This project was designed using [React Native](https://facebook.github.io/react-native/),
an open source framework for designing universal applications using a single code base.
Detailed instructions for installing React Native on your development machine 
can be found [here](https://facebook.github.io/react-native/)

[Node.js](https://nodejs.org) is required for React Native, including npm
React native can be installed with `npm install -g react-native-cli`

how to get react native working:
https://www.christianengvall.se/install-react-native/

## Running on iOS
Building the application for an iOS device can be done through Xcode on a Mac.
There are a few changes that must be made to run the application using a different developer profile.

After opening the `ios/msqrc4g.xcodeproj` file using Xcode, open the project from the Project Navigator.
1. Under "Identity", change the Bundle Identifier from "org.reactjs.native.ua.msqrc4g" to any other unique identifier.
2. Under "Signing"->"Team", select your Apple ID. It may be necessary to also do this after changing the target from "msqrc4g" to "msqrc4gTests"

Running the application for release instead of a debug build can be configured by changing the scheme (`⌘<`).
A debug build must have a connection to the Metro Bundler for its JS files, while a release build can be standalone.

The application can be installed and launch by selecting the proper build target from the Active Scheme dropdown, and then running (`⌘R`)


## Running on Android
1. Go into Settings-> About phone and tap the “Build number” seven times. If “Build number” doesn’t automatically show up in that section, search for it and it should come up. Tapping it specifically 7 times allows you to be a developer on the phone, not just a regular user.
    1. For the HTC one, "Build number" is not searchable. Go to Settings->About->Software Information->More and that is where you will  find Build number. Go through the same protocol of tapping 7 times
    2. For the Redmi 6, "Build Number" does not exist. Under About Phone, select MIUI version 7 times to enable you to become a developer. For more information, follow this link: https://www.softwarert.com/enable-developer-options-xiaomi-redmi-phone/
2. Then go to Settings-\>Developer options and enable “USB debugging”. Again, if it doesn’t automatically show up in that section, search for it and it should come up.
3. Connect the device via USB to the computer and make sure the computer acknowledges the phone (i.e. it shows up in My Computer/Finder). If not, you may have to change the way in which the USB cord works.
    1. on the Google Pixel, when the phone is first connected to a PC, it is set to “Use USB to Charge this device”. 
    The computer does not recognize the phone this way, so you must pull down the settings bar from the top of the phone, 
    click the bottom row that says “Android System” and then select it again for “Tap for more options.” 
    Now, select “Transfer files” and the computer should recognize the device.
4. From this repository, click the green "Clone or Download" button and copy the URL.
5. Open up the "Command Prompt" on a PC or "Terminal" on Mac. 
6. We now need to head to the Desktop. Type`cd Desktop` and press enter. The line should read C:\Users\[username]\Desktop. 
7. Then type `git clone [project-url]` [project-url] is what you just copied in step 4. Press enter and let the computer run.
8. Once installed, type `cd ms-qr-codes-good`. The line should read C:\Users\[username]\Desktop\ms-qr-codes-good.
9. Type `npm install`, hit enter, and let the command run. This will take a few minutes.
10. Copy the below command and run it
```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```
11. Once that is done, run the command 

    ```
    $ react-native run-android
    ```

12. This will take some time to get fully booted up, especially if this is the first time running the app on the particular computer. Will still take over a minute even if it has been run before. If that does not work there are a few different possibilities as to why. Possible errors:
    1. ERROR: JAVA\_HOME is not set and no 'java' command could be found in your PATH: [Setting JAVA\_HOME](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/index.html)
    2.	sdk manager not recognized: [StackOverflow](https://stackoverflow.com/questions/30607520/how-to-solve-sdk-manager-path-not-recognized-as-an-internal-or-external-command) 
    and [AndroidCentral](https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial)
    3.	Once sdkmanager is installed, it is only compatible with Java8, so make sure that is the 
    version you have [downloaded](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    4. One of the libraries we used on this project, flipcard, did not test their code to make sure it works on Android. It works just fine on iOS, but in order for it to run on Android, one must go into node_modules/react-native-flip-card/lib/FlipCard.js and delete line 173 (a redefinition of style). Until this problem is fixed within the library, the app cannot be loaded on Androids and this process must be done manually. 
13. After working through any errors, repeat steps 10 and 11. Once you receive a "BUILD SUCCESSFUL" in the command prompt, look for a new app on the phone entitled "Give". Open the app, and select Allow when asked "Allow Give to take pictures and record video?" App should now be fully accessible!

### Android Reloading Tip
Whenever the code is updated, you can't just re-run the app. It needs to be rebundled to do all of the new cool code you added!
Run
```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```
to rebundle it before you run `react-native run-android`. No need to push to the repo after small changes to get the app running, bt be sure to push changes after a little while because you don't want to lose your progress.
