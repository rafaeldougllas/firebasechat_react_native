import React from 'react';
import {Platform,  
        Text, 
        Alert, 
        TouchableOpacity, 
        TextInput, 
        View} from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    phone: '',
    nmae: ''
  }

  handleChange = key => val => {
    this.setState({ [key]:val })
  }

  componentWillMount(){
    AsyncStorage.getItem('userPhone').then(val=>{
      if(val){
        this.setState({phone:val})
      }
    })
  }

  submitForm = async () => {
    if(this.state.phone.length < 10){
      Alert('Error','Wrong phone number')    
    }else if(this.state.name.length < 3){
      Alert('Error','Wrong name')
    }else{
      //save user data
      await AsyncStorage.setItem('userPhone',this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({name: this.state.name});
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input} 
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}/>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')} />

        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


