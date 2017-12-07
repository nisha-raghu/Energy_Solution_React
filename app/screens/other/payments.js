import React from 'react';
import {
  View,
  Image,
  Keyboard
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
import {PaymentConfirm} from './paymentConfirmation';

export class Payments extends React.Component {
  static navigationOptions = {
    title: 'CONFIRMATION'.toUpperCase()
  };

  constructor(props) {
    super(props);
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/PaymentLogo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/PaymentLogo.png')}/>
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
      {renderIcon()}
          <RkText rkType='h1'>Payments</RkText>
        </View>
        <View style={styles.content}>
          <View>
              <RkText >Credit card number</RkText>
            <RkTextInput rkType='rounded' placeholder='4568-3456-9876'/>
              <RkText >Expiration</RkText>
            <RkTextInput rkType='rounded' placeholder='12/12/18'/>
            <RkText >CVC/CVV</RkText>
            <RkTextInput rkType='rounded' placeholder='***' secureTextEntry={true}/>
            <GradientButton style={styles.save} rkType='large' text='Pay Now' onPress={() => {
              this.props.navigation.navigate('PaymentConfirm')
            }}/>

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
