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


export class RentServiceMenu1 extends React.Component {
  static navigationOptions = {
    title: 'Rent Service'.toUpperCase()
  };

  /*constructor(props) {
    super(props);

    this.data = data.getArticles('fact');
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post, index) {
    return post.id;
  }*/

  constructor(props) {
    super(props);
    //1. call the function to get the list of items
    this.getServices();
    this.pic = 'https://www.servicechampions.net/wp-content/uploads/2015/03/air-ducts-energy-star.jpg';//'https://static1.squarespace.com/static/58588d72e6f2e1e1d54aa8e4/t/5876d0da03596ef4262a5362/1484181726567/Icon+Clean+Tech+darkgreen.png';
    //2.Define the array to store the list
    this.state = {
       serviceList : []
    };
    //3. bind renderItem to call _renderItem function to render each item in the list
   this.renderItem = this._renderItem.bind(this);
  }

  //4. write the function to get the list from backend
  getServices = () => {
      console.log("Inside getServices");
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/service', {
         method: 'GET'
      })
      .then(response => {
        console.log("response:"+JSON.stringify(response));
        var obj= {};
        //parse the response - get response from response._bodyInit
        obj= JSON.parse(JSON.stringify(response));
        var bodyInit = JSON.parse(obj._bodyInit);
        this.obj = bodyInit.obj;
        for (i = 0; i < this.obj.length; i++) {
          this.obj[i].photo = 'https://raw.githubusercontent.com/snehakasetty224/images/master/'+this.obj[i].header+'.png';
        }
        var item = {};
        item = JSON.stringify(this.obj);
        console.log("response1:"+ JSON.stringify(item));
        console.log("customerrentmenu response obj"+item.id);
        console.log("response obj1 "+this.obj[0].photo);
        //5. set the array from the response to the list
        this.setState({
          //isLoading: false,
          serviceList : this.obj
        });

      })
      .catch((error) => {
         console.error(error);
      });
   }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('RentService', {id: info.item.id, servicename: info.item.header})}>
        <RkCard rkType='backImg'>
          <Image rkCardImg source={{ uri: info.item.photo}}/>
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4'>{info.item.header}</RkText>

          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

/*  render() {
    let info = {};
    info.item = this.data[0];
    return (
      <FlatList data={this.data}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.root}/>

    )
  }
}*/

render() {
  return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
      <FlatList
      //6. Set the data for the flat list
        data={this.state.serviceList}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.container}/>
    </View>
  )
}
}

let styles = RkStyleSheet.create(theme => ({

  RkText: {
  color  : 'red'

  },



}));
