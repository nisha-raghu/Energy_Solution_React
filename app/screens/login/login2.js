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
  RkAvoidKeyboard, RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/';
import {RkTheme} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {NavigationActions} from 'react-navigation';
import auth from '../../utils/authUtils';

export class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    //schema for post request
    this.state = {
      email: '',
      password: ''
   }
  }
  // create handlers for schema
  handleEmail = (text) => {
     this.setState({ email: text })
  }
  handlePassword = (text) => {
     this.setState({ password: text })
  }

//function for login http request
  login = (email, pass) => {
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/user/login', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         email: email,
         password: pass
         })
      }).then(response => {
        var obj= {};
        obj= response._bodyInit;
        var res = JSON.parse(obj);
        if(res.success==1){
          //set the token in authUtils
          auth.setToken(res.token);
          auth.setUserId(res.obj._id);
          if(res.obj.type == "Admin"){
            //redirect to the admin dashboard page
            StatusBar.setHidden(false, 'slide');
            let toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'AdminDashboard'})]
          });
          this.props.navigation.dispatch(toHome)
        }
          if(res.obj.type == "Customer"){
            //redirect to the customer dashboard page
            StatusBar.setHidden(false, 'slide');
            let toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Dashboard'})]
        });
        this.props.navigation.dispatch(toHome)
      }

      if(res.obj.type == "Vendor"){
        //redirect to the customer dashboard page
          StatusBar.setHidden(false, 'slide');
          let toHome = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'VendorDashboard'})]
        });
        this.props.navigation.dispatch(toHome)
        }
      }
    }).catch(error => {
      console.error(error);
    });
   }

  render() {
    let renderIcon = () => {
        return <Image style={styles.image} source={require('../../assets/images/JustLightsplashscreen.png')}/>
    };

    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={styles.header}>
          {renderIcon()}
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Email' onChangeText = {this.handleEmail}/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChangeText = {this.handlePassword}/>
            <GradientButton style={styles.save} rkType='large' text='LOGIN' onPress = {
              //passing params to login function
                  () => this.login(this.state.email, this.state.password)
               }
          />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear' onPress={() => this.props.navigation.navigate('SignUp')}>
                <RkText rkType='header6'> Sign up now </RkText>
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
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    height: scaleVertical(390),
    resizeMode: 'contain',
    width: 400
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}));
