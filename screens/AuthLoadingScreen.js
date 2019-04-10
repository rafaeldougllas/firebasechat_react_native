import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCnolplaZ-O8dWxThdcPSg8gX6owOULvhQ",
      authDomain: "fir-chat-2f849.firebaseapp.com",
      databaseURL: "https://fir-chat-2f849.firebaseio.com",
      projectId: "fir-chat-2f849",
      storageBucket: "fir-chat-2f849.appspot.com",
      messagingSenderId: "359315456598"
    };
    firebase.initializeApp(config);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    User.phone = await AsyncStorage.getItem('userPhone');
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
