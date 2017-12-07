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
import {Payments} from './payments';
import {Installment} from './payInstallment';

export class PaymentType extends React.Component {
  static navigationOptions = {
    title: 'PAYMENT TYPE'.toUpperCase()
  };

  constructor(props) {
    super(props);
    console.log("Inside Installments!!");
  }

  render() {
  /*  let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
    }; */
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>

          <RkText rkType='h1'>Pay in Installment or Full Amount?</RkText>
        </View>
        <View style={styles.content}>
          <View>
              <RkText >If you choose to pay in Installments an additional 2% will be charged</RkText>

            <GradientButton style={styles.save} rkType='large' text='Pay in Installments' onPress={() => {
              this.props.navigation.navigate('Installment')
            }}/>
            <GradientButton style={styles.save} rkType='large' text='Full Payment' onPress={() => {
              this.props.navigation.navigate('Payments')
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
