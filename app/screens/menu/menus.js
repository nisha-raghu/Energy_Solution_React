import React from 'react';

import {CategoryMenu} from './categoryMenu';
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
import {SignUp} from '../login/signUp';
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

export class LoginMenu extends React.Component {
  static navigationOptions = {
    title: 'Login'.toUpperCase()
  };
  render() {
    return (
     //<CategoryMenu navigation={this.props.navigation} items={Routes.LoginRoutes}/>
     <RkButton style={{marginLeft: 85, width:150}} onPress={() => this.props.navigation.navigate('SignUp',{id: 0})}>Logout</RkButton>

    )
  }
}

export class NavigationMenu extends React.Component {
  static navigationOptions = {
    title: 'Navigation'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.NavigationRoutes}/>
    )
  }
}


export class SocialMenu extends React.Component {
  static navigationOptions = {
    title: 'Social'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.SocialRoutes}/>
    )
  }
}

// This is the current energy service of Customer Start

export class ArticleMenu extends React.Component {

  static navigationOptions = {
    title: 'Current Energy Solution'.toUpperCase()
  };

  constructor(props) {

    super(props);
    this.getServices();
    //this.data = data.getArticles('fact');
    //console.log("Article data:"+this.data);
    //this.obj = [];
    this.pic = 'https://facebook.github.io/react-native/docs/assets/favicon.png';//"https://github.com/mohamadkhan19/CMPE235_MobileSoftwareDesign_FinalProject_Backend/blob/master/img/normalEnergy.png";
    this.state = {
     serviceList : []
     //isLoading: true
    };
   this.renderItem = this._renderItem.bind(this);
  }

  getServices = () => {
      console.log("Inside getServices");
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/service', {
         method: 'GET'
      })
      .then(response => {
        console.log("response in usercount:"+JSON.stringify(response));
        var obj= {};
        obj= JSON.parse(JSON.stringify(response));
        console.log("obj user count" + obj)
        var bodyInit = JSON.parse(obj._bodyInit);
        this.obj = bodyInit.obj;
        var item = {};
        item = JSON.stringify(this.obj);
        console.log("response1:"+ JSON.stringify(item));
        console.log("response obj"+item.id);

        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
    //if (this.state.isLoading) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('ScheduleService', {id: info.item.id,name: info.item.header})}>
        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={{uri: this.pic}}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'></RkText>
            <RkButton style={{marginLeft: 85, width:150}} onPress={() => this.props.navigation.navigate('ScheduleService',{id: info.item.id,name: info.item.header})}>Uninstalled</RkButton>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'></RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  //}
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.serviceList}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
      </View>
    )
  }
}

// This is the current energy service of Customer end

//This Customer Rent Service Menu Start

export class RentServiceMenu extends React.Component {
  static navigationOptions = {
    title: 'Rent Service'.toUpperCase()
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
            <RkText rkType='header6'>{info.item.header}</RkText>

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

//This Customer Rent Service Menu End


//This Customer Rent AdminEnergyService vendor menu start

export class AdminEnergyServiceMenu extends React.Component {

  static navigationOptions = {
    title: 'Energy Services'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.pic = 'https://www.servicechampions.net/wp-content/uploads/2015/03/air-ducts-energy-star.jpg';//'https://static1.squarespace.com/static/58588d72e6f2e1e1d54aa8e4/t/5876d0da03596ef4262a5362/1484181726567/Icon+Clean+Tech+darkgreen.png';
    //2.Define the array to store the list
    this.state = {
       serviceList : []
    };
    //3. bind renderItem to call _renderItem function to render each item in the list
   this.renderItem = this._renderItem.bind(this);
  }

  componentDidMount (){
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
        var item = {};
        item = JSON.stringify(this.obj);
        console.log("response1:"+ JSON.stringify(item));
        console.log("response obj"+item.id);
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
        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={{uri:this.pic}}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'></RkText>
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
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <FlatList
          data={this.state.serviceList}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
      </View>
    )
  }
}

//This Customer Rent AdminEnergyService vendor menu End

// This is Admin Add Energy Service vendor start

export class AdminAddVendorMenu extends React.Component {
  static navigationOptions = {
    title: 'Add Energy Service Vendor'.toUpperCase()
  };

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.screen}>

        <View style={{alignItems: 'center'}}>

          <RkText rkType='h1'>Enter Energy Service Vendor</RkText>
        </View>
        <View style={styles.content}>
          <View>
              <RkText >Energy Service Vendor Name : </RkText>
            <RkTextInput rkType='rounded' placeholder='HVAC'/>
              <RkText >Add Energy Service</RkText>
            <RkTextInput rkType='rounded' placeholder='Solar'/>
            <RkText > Add Amount </RkText>
            <RkTextInput rkType='rounded' placeholder='1000$ '/>
            </View>

          <View>
          <GradientButton style={styles.save} rkType='large' text='Add Vendor' onPress={() => {
              this.props.navigation.navigate('AdminAddVendorSuccess')
            }}/>

          </View>

        </View>
      </View>
    )
  }
}

//This is admin Add energy service vendor end


//This is Admin View Energy Service
export class AdminEnergyServiceList extends React.Component {

  static navigationOptions = {
    title: 'Admin Energy Service List'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = data.getArticles('fact');
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('ScheduleService', {id: info.item.id,name: info.item.header})}>
        <RkCard rkType='horizontal' style={styles.card}>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'></RkText>

            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'></RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
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
//This is Admin End Energy Service

export class MessagingMenu extends React.Component {
  static navigationOptions = {
    title: 'Messaging'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.MessagingRoutes}/>
    )
  }
}

export class AdminDashboardMenu extends React.Component {
  static navigationOptions = {
    title: 'Dashboards'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.DashboardRoutes}/>
    )
  }
static navigationOptions = {
      title: 'Admin Dashboard'.toUpperCase()
    };

    constructor(props) {
      super(props);
      console.log("inside admin dashboard");
      this.data = {
        statItems: [
          {
            name: 'Profile',
            value: 'Profile',
            //icon: 'github',
            background: RkTheme.current.colors.dashboard.stars
          },
          {
            name: 'Upgrade',
            value: '2,256',
            //icon: 'twitter',
            background: RkTheme.current.colors.dashboard.tweets
          },
          {
            name: 'Rent',
            value: '1,124',
            //icon: 'facebook',
            background: RkTheme.current.colors.dashboard.likes
          },
        ]
      };
    }

    renderStatItem(item) {
      return (
        <View style={[styles.statItemContainer, {backgroundColor: item.background}]} key={item.name}>
          <View>
            //<RkText rkType='header6' style={styles.statItemValue}>{item.value}</RkText>
            <RkText rkType='secondary7' style={styles.statItemName}>{item.name}</RkText>
          </View>
          //<RkText rkType='awesome hero' style={styles.statItemIcon}>{FontAwesome[item.icon]}</RkText>
        </View>
      )
    }

    render() {
      let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
      return (
        <ScrollView style={styles.screen}>
          <View style={styles.statItems}>
            {this.data.statItems.map(item => this.renderStatItem(item))}
          </View>
          <View style={chartBlockStyles}>
            <DoughnutChart/>
          </View>
          <View style={chartBlockStyles}>
            <AreaChart/>
          </View>
          <View style={chartBlockStyles}>
            <ProgressChart/>
          </View>
          <View style={chartBlockStyles}>
            <AreaSmoothedChart/>
          </View>
        </ScrollView>
      )
    }
}

export class VendorDashboardMenu extends React.Component {
  static navigationOptions = {
    title: 'Dashboards'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.DashboardRoutes}/>
    )
  }


    /*static navigationOptions = {
      title: 'Admin Dashboard'.toUpperCase()
    };

    constructor(props) {
      super(props);
      console.log("inside admin dashboard");
      this.data = {
        statItems: [
          {
            name: 'Profile',
            value: 'Profile',
            //icon: 'github',
            background: RkTheme.current.colors.dashboard.stars
          },
          {
            name: 'Upgrade',
            value: '2,256',
            //icon: 'twitter',
            background: RkTheme.current.colors.dashboard.tweets
          },
          {
            name: 'Rent',
            value: '1,124',
            //icon: 'facebook',
            background: RkTheme.current.colors.dashboard.likes
          },
        ]
      };
    }

    renderStatItem(item) {
      return (
        <View style={[styles.statItemContainer, {backgroundColor: item.background}]} key={item.name}>
          <View>
            //<RkText rkType='header6' style={styles.statItemValue}>{item.value}</RkText>
            <RkText rkType='secondary7' style={styles.statItemName}>{item.name}</RkText>
          </View>
          //<RkText rkType='awesome hero' style={styles.statItemIcon}>{FontAwesome[item.icon]}</RkText>
        </View>
      )
    }

    render() {
      let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
      return (
        <ScrollView style={styles.screen}>
          <View style={styles.statItems}>
            {this.data.statItems.map(item => this.renderStatItem(item))}
          </View>
          <View style={chartBlockStyles}>
            <DoughnutChart/>
          </View>
          <View style={chartBlockStyles}>
            <AreaChart/>
          </View>
          <View style={chartBlockStyles}>
            <ProgressChart/>
          </View>
          <View style={chartBlockStyles}>
            <AreaSmoothedChart/>
          </View>
        </ScrollView>
      )
    }*/
}

export class DashboardMenu extends React.Component {
  /*static navigationOptions = {
    title: 'Dashboards'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.DashboardRoutes}/>
    )
  }
  Dashbaord
  */
  static navigationOptions = {
    title: 'Customer Dashboard'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.data = {
      statItems: [
        {
          name: 'Stars',
          value: '4,512',
          icon: 'github',
          background: RkTheme.current.colors.dashboard.stars
        },
        {
          name: 'Tweets',
          value: '2,256',
          icon: 'twitter',
          background: RkTheme.current.colors.dashboard.tweets
        },
        {
          name: 'Likes',
          value: '1,124',
          icon: 'facebook',
          background: RkTheme.current.colors.dashboard.likes
        },
      ]
    };
  }

  renderStatItem(item) {
    return (
      <View style={[styles.statItemContainer, {backgroundColor: RkTheme.current.colors.control.background}]} key={item.name}>
        <View>
          <RkText rkType='header6' style={styles.statItemValue}>{item.value}</RkText>
          <RkText rkType='secondary7' style={styles.statItemName}>{item.name}</RkText>
        </View>
        <RkText rkType='awesome hero' style={styles.statItemIcon}>{FontAwesome[item.icon]}</RkText>
      </View>
    )
  }

  _calculateItemSize() {
    let {height, width} = Dimensions.get('window');
    return (width - paddingValue * 6) / 2;
  }

  render() {
      let size = this._calculateItemSize();
      let chartBlockStyles = [styles.chartBlock, {backgroundColor: RkTheme.current.colors.control.background}];
      return (
        <ScrollView style={styles.root} contentContainerStyle={styles.rootContainer}>
          <RkButton rkType='square shadow' style={{width: size, height: size}}
            onPress={() => {
              this.props.navigation.navigate('Upgrade')
            }}>
            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.theme}
            </RkText>
            <RkText rkType='h3'>Upgrade VIP</RkText>
          </RkButton>

          <RkButton rkType='square shadow' style={{width: size, height: size}}
            onPress={() => {
              this.props.navigation.navigate('Articles4')
            }}>
            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.article}
            </RkText>
            <RkText rkType='h3'>View Services</RkText>
          </RkButton>

          <RkButton rkType='square shadow' style={{width: size, height: size}}
            onPress={() => {
              this.props.navigation.navigate('Cart')
            }}>
            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.article}
            </RkText>
            <RkText rkType='h3'>Cart</RkText>
          </RkButton>

          <RkButton rkType='square shadow' style={{width: size, height: size}}
            onPress={() => {
              this.props.navigation.navigate('Cart')
            }}>
            <RkText style={styles.icon} rkType='primary moon menuIcon'>{FontIcons.dashboard}
            </RkText>
            <RkText rkType='h3'>Service Usage</RkText>
          </RkButton>
          <View style={chartBlockStyles}>
              <DoughnutChart/>
          </View>
          <View style={chartBlockStyles}>
              <AreaChart/>
          </View>
          <View style={chartBlockStyles}>
              <AreaSmoothedChart/>
          </View>
        </ScrollView>
    )
  }
}
export class WalkthroughMenu extends React.Component {
  static navigationOptions = {
    title: 'Walkthrough'.toUpperCase()
  };
  render() {
    return (
    <CategoryMenu navigation={this.props.navigation} items={Routes.WalkthroughRoutes}/>

    )
  }
  Walkthrough

}

export class EcommerceMenu extends React.Component {
  static navigationOptions = {
    title: 'Ecommerce'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.EcommerceRoutes}/>
    )
  }
}
export class OtherMenu extends React.Component {
  /*static navigationOptions = {
    title: 'Other'.toUpperCase()
  };
  render() {
    return (
      <CategoryMenu navigation={this.props.navigation} items={Routes.OtherRoutes}/>
    )
  }Settings.js*/

  static navigationOptions = {
    title: 'Settings'.toUpperCase()
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
    return (
      <ScrollView style={styles.container}>
      <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>{"PROFILE SETTINGS"}</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>{"Edit Profile"}</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>{"Change Password"}</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <RkText rkType='header6'>{"Send Push Notifications"}</RkText>
            <RkSwitch style={styles.switch}
                      value={this.state.sendPush}
                      name="Push"
                      onValueChange={(sendPush) => this.setState({sendPush})}/>
          </View>
          <View style={styles.row}>
            <RkText rkType='header6'>{"Refresh Automatically"}</RkText>
            <RkSwitch style={styles.switch}
                      value={this.state.shouldRefresh}
                      name="Refresh"
                      onValueChange={(shouldRefresh) => this.setState({shouldRefresh})}/>
          </View>
          </View>
              <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>
                  <RkText rkType='primary header6'>{"SUPPORT"}</RkText>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.rowButton}>
                    <RkText rkType='header6'>{"Help"}</RkText>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.rowButton}>
                    <RkText rkType='header6'>{"Privacy Policy"}</RkText>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.rowButton}>
                    <RkText rkType='header6'>{"Terms & Conditions"}</RkText>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.rowButton}>
                    <RkText rkType='header6'>{"Logout"}</RkText>
                  </TouchableOpacity>
                </View>
            </View>
      </ScrollView>
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
