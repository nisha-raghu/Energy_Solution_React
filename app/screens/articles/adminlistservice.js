import React from 'react';

import * as Routes from '../../config/navigation/routesBuilder';
import {
  ScrollView,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ListView,
  Dimensions,
  StatusBar,
  StyleSheet
} from 'react-native';

import {
  RkCard,
  RkText,
  RkTextInput,
  RkButton,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

import {GradientButton} from '../../components/';
import {Walkthrough} from '../../components/walkthrough';
import {Walkthrough1} from '../walkthroughs/walkthrough1';
import {Walkthrough2} from '../walkthroughs/walkthrough2';
import {LoginV2} from '../login/login2';
//import {PaginationIndicator} from '../../components';
import {Upgrade} from '../theme/upgrade';
import {Cart} from '../other/cart';
import {data} from '../../data';

let moment = require('moment');

import {FontAwesome} from '../../assets/icons';
import {
  ProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart,
  Avatar,
  SocialBar,
  PaginationIndicator,
  RkSwitch,
  FindFriends
} from '../../components/';


import {FontIcons} from '../../assets/icons';
const paddingValue = 8;

import {NavigationActions} from 'react-navigation';

export class AdminEnergyServiceList1 extends React.Component {

  static navigationOptions = {
    title: 'Admin Energy Service List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getServices('fact');
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (

        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={info.item.photo}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'>{info.item.text}</RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'></RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>

    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({

  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 15,
    paddingVertical: 28,
    flex: 1,
  },
  menuButtons: {
    marginLeft: 120,
    width:150,
    padding: 15,
    borderColor: theme.colors.border.solid,
    flex: 1,
    paddingVertical: 24
  },
  icon: {
    marginBottom: 16
  },
  text: {
    flexDirection: 'row'
  },wrapper: {
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },

  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  statItemIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  statItemValue: {
    color: 'white',
  },
  statItemName: {
    color: 'white',
  },
  chartBlock: {
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },container: {
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
