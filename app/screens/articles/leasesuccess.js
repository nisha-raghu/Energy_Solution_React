import React from 'react';
import * as Screens from '../../screens/index';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  RkButton,
  RkCard,
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends
} from '../../components';
import {Cart} from '../other/cart';
import {FontAwesome} from '../../assets/icons';

export class LeaseSuccess extends React.Component {
  static navigationOptions = {
    title: 'Lease Confirmation'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      sendPush: true,
      shouldRefresh: false,
      twitterEnabled: true,
      googleEnabled: false,
      facebookEnabled: true
    }
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/PaymentLogo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/PaymentLogo.png')}/>
    };
    return (
      <ScrollView style={styles.container}>
      <RkCard rkType='article'>
        <View style={styles.section}>

            <RkText rkType='h1' style={{marginLeft: 40}} >SUCCESSFULLY ADDED TO CART</RkText>
            <RkText></RkText>
              <RkText rkType='header6' style={{marginLeft: 80}}>Your Energy Service has been successfully added to Cart </RkText>
              <RkText></RkText>
            <RkText rkType='header6' style={{marginLeft: 80}}>Please find your items in the cart .</RkText>
            <RkText></RkText>
              <RkText rkType='h3' style={{marginLeft: 40}}>CHECKOUT AND MAKE PAYMENT </RkText>
            <RkText></RkText>
              <RkButton style={{marginLeft: 120, width:150}} onPress={() => this.props.navigation.navigate('Cart')}>Go To Cart</RkButton>
        </View>

       </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 14
  },
}));
