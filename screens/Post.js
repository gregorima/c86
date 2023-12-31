import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";


import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";


SplashScreen.preventAutoHideAsync();


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speaker: "volume-high-outline"
    };
  }


  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }


  componentDidMount() {
    this._loadFontsAsync();
  }


  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
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
            <ScrollView>
                <View style={styles.fieldsContainer}>
                    <Image source={this.state.previewImage}/>
                </View>
            <View style={styles.dataContainer}>
              <View style={styles.titleTextConatiner}>
                <Text style={styles.storyTitleText}>{this.props.route.params.story.title}</Text>
                <Text style={styles.storyAuthorText}>{this.props.route.params.story.author}</Text>
                <Text style={styles.storyAuthorText}>{this.props.route.params.story.created_on}</Text>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => {this.initiateTTS(
                  this.props.route.params.story.title,
                  this.props.route.params.story.author,
                  this.props.route.params.story.story,
                  this.props.route.params.story.moral
                )}}>
                    <Ionicons name={this.state.speaker} size={RFValue(30)} color={this.state.speakerColor} style={{margin: 15}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.storyTextContainer}>
              <Text style={styles.storyAuthorText}>{this.props.route.params.story.story}</Text>
              <Text style={styles.storyAuthorText}>{this.props.route.params.story.moral}</Text>
              </View>
              <View style={styles.actionContainer}>
                  <TouchableOpacity>
                    <Ionicons name={"heart"} color={"white"} size={RFValue(30)}/>
                    <Text style={styles.likeText}>
                      12K
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
            </ScrollView>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});




