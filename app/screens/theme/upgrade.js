import React from 'react';
import {
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  RkText,
  RkButton,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {DarkKittenTheme} from '../../config/darkTheme';
import {KittenTheme} from '../../config/theme';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {FontIcons} from '../../assets/icons';
import {Cart} from '../other/cart';
import {PaymentType} from '../other/paymenttype';
const paddingValue = 8;

export class Upgrade extends React.Component {
  static navigationOptions = {
    title: 'Upgrade'.toUpperCase()
  };

  constructor(props) {
    super(props);
  }
  _calculateItemSize() {
    let {height, width} = Dimensions.get('window');
    return (width - paddingValue * 6);
  }

  render() {
    let size = this._calculateItemSize();
    return (
      <ScrollView style={styles.screen}>
        <View>
          <RkText rkType='h1' style={styles.container}>Select the Plan</RkText>
        </View>
        <View style={styles.container}>
          <RkButton
            rkType='square shadow'
            style={{width: size, height: 320}}
            onPress={() => {
              this.props.navigation.goBack()
            }}>

            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.dashboard}
            </RkText>

            <RkText rkType='h1' style={styles.header}>Free</RkText>
            <RkText rkType='h2'>"0$"</RkText>

            <RkText rkType='h3'>Email Support</RkText>
            <RkText rkType='h3'>Limited Statistics</RkText>
            <RkText rkType='h3'>Scheduling Feature</RkText>
            <RkText rkType='h3'>Full Search</RkText>

            <RkText rkType='h4'>Congratulations! You are using Free Version!</RkText>
            </RkButton>
        </View>
          <View style={styles.container}>
          <RkButton
            rkType='square shadow'
            style={{width: size, height: 320}}
            onPress={() => {
              this.props.navigation.navigate('PaymentType')
            }}>

            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.card}
            </RkText>
            <RkText rkType='h1' style={styles.header}>VIP</RkText>
            <RkText rkType='h2'>"99.99$"</RkText>

            <RkText rkType='h3'>No Installation Charges</RkText>
            <RkText rkType='h3'>Discounts</RkText>
            <RkText rkType='h3'>Full support</RkText>
            <RkText rkType='h3'>Enhanced Statistics</RkText>

          </RkButton>
         </View>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    paddingHorizontal: scale(72),
    alignItems: 'center',
  },screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 15,
  },
  header: {
    color: 'green',
    marginBottom: 16
  },
  image: {
    height: scaleVertical(160)
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleVertical(20)
  },
  save: {
    marginVertical: 20
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  icon: {
    marginBottom: 16
  }
}));
