import React from 'react';
import * as Screens from '../../screens/index';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar
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
import {FontAwesome} from '../../assets/icons';
import {NavigationActions} from 'react-navigation';

export class ScheduleSuccess extends React.Component {
  static navigationOptions = {
    title: 'Schedule Confirmation'.toUpperCase()
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
        <View style={styles.section}>

            <RkText rkType='h1' style={{marginLeft: 50}} >SCHEDULE SUCCESS</RkText>
            <RkText></RkText>
              <RkText rkType='header6' style={{marginLeft: 90}}>Your appointment has been Successfully Scheduled </RkText>
              <RkText></RkText>
            <RkText rkType='header6' style={{marginLeft: 90}}>Please find your appointment confirmation number.</RkText>
            <RkText></RkText>
              <RkText rkType='h3' style={{marginLeft: 90}}>54673837384349</RkText>
              <View>

              <RkText></RkText>

              </View>

              <RkButton style={{marginLeft: 120, width:150}} onPress={()=>
              {StatusBar.setHidden(false, 'slide');
            let toHome = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Dashboard'})]
          });
          this.props.navigation.dispatch(toHome)}}>Go To Dashboard</RkButton>


        </View>

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
