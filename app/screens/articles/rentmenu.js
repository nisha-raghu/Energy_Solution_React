import React from 'react';

//import {CategoryMenu} from './categoryMenu';
import * as Routes from '../../config/navigation/routesBuilder';
import {
  ScrollView,
  FlatList,
  Image,
  View,
  TouchableOpacity,
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
import {Articles4} from '../articles/articles4';
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


export class RentMenu extends React.Component {
  static navigationOptions = {
    title: 'Rent Service Menu'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.data = data.getArticles('fact');
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post, index) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('RentService', {id: info.item.id})}>
        <RkCard rkType='backImg'>
          <Image rkCardImg source={info.item.photo}/>
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4'>{info.item.header}</RkText>

          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    let info = {};
    info.item = this.data[0];
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
      <FlatList data={this.data}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.root}/>
      </View>

    )
  }
}
let styles = RkStyleSheet.create(theme => ({

  RkText: {
  color  : 'red'

  },



}));
