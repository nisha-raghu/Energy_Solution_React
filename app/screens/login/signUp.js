import React from 'react';
import {
  View,
  Image,
  Keyboard,
  StatusBar
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {NavigationActions} from 'react-navigation';

export class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    console.log("inside sign up");
    //schema for post request
    this.state = {
      name: '',
      email: '',
      password: '',
      type: ''
   }
  }

// create handlers for schema
  handleName = (text) => {
     this.setState({ name: text })
  }
  handleEmail = (text) => {
     this.setState({ email: text })
  }
  handlePassword = (text) => {
     this.setState({ password: text })
  }
  handleType = (text) => {
     this.setState({ type: text })
  }

//function for register http request
  register = (name, email, pass, type) => {
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/user/register', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         name: name,
         email: email,
         password: pass,
         type: type
         })
      }).then(response => {
        var obj= {};
        obj= response._bodyInit;
        var res = JSON.parse(obj);
        if(res.success==1){
          //redirect to the login page
          StatusBar.setHidden(false, 'slide');
          let toHome = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login2'})]
        });
        this.props.navigation.dispatch(toHome)
      }
    }).catch(error => {
      console.error(error);
    });
   }

  render() {
    let renderIcon = () => {
      return <Image style={styles.icon} source={require('../../assets/images/JustLightLogo.png')}/>
    };

    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
          {renderIcon()}
          <RkText rkType='h1'>Registration</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Name' onChangeText={this.handleName}/>
            <RkTextInput rkType='rounded' placeholder='Email' onChangeText = {this.handleEmail}/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChangeText = {this.handlePassword}/>
            {/*<RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true}/>*/}
            <RkTextInput rkType='rounded' placeholder='Type' onChangeText = {this.handleType}/>
            <GradientButton style={styles.save} rkType='large' text='SIGN UP' onPress = {
              //passing params to register function
                  () => this.register(this.state.name, this.state.email, this.state.password, this.state.type)
               }
        />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('Login2')}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));
