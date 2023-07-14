import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

const appIcon = require("../assets/logo.png");

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state= {
            fontsLoaded:false,
            isEnabled: true,
            lightIsEnables: false,
            lightModeEnabled: true,
            name: ""
        }
      }

      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
      }
    render() {
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                    <Image styles={styles.iconImage} source={require("../assets/logo.png")}/>
                </View>
            <View style={styles.appTitleTextContainer}>
                <Text style={styles.appTitleText}>Espectograma</Text>
            </View>
            </View>
            </View>
        )
    }

    async fetchUser() {
        var tema, nome
        await firebase.database.ref("/users/"+firebase.auth().currentUser.uid).on("value", (snapshot)=>{
            tema= snapshot.val().currentTheme
            nome= `${snapshot.val().first_name}´ `${snapshot.val().last_name}´
        })
        this.setState({
            isEnabled: tema=== "light" ? false : true,
            lightModeEnabled: tema=== "light" ? true : false,
            name: nome
        })
    }
}

