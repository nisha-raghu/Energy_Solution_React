import React from 'react';
import * as Screens from '../../screens/index';
import {
  ScrollView,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  RkCard,
  RkButton,
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends,
  GradientButton
} from '../../components';
import {FontAwesome} from '../../assets/icons';
import {
  ProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart,
  Avatar,
  SocialBar,
  PaginationIndicator
} from '../../components/';

export class ViewCustomers extends React.Component {
  static navigationOptions = {
    title: 'View Customers'.toUpperCase()
  };
/*
  constructor(props) {
    super(props);

    this.state = {
      sendPush: true,
      shouldRefresh: false,
      twitterEnabled: true,
      googleEnabled: false,
      facebookEnabled: true
    }
  } */

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

//4. write the function to get the list from backend
componentDidMount(){
    return fetch('https://cmpe235-finalproject.herokuapp.com/v1/user', {
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

   _renderItem(info) {
    return (

     <ScrollView style={styles.container}>

       <View style={styles.section}>
         <View style={styles.row}>
          <RkText  rkType='header6'>{info.item.name}</RkText>
          <RkText  rkType='header6'>{info.item.email}</RkText>
        </View>
       </View>
     </ScrollView>
  )
}


render() {
  return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
      <FlatList
      //6. Set the data for the flat list
        data={this.state.serviceList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item._id}
        style={styles.container}/>
    </View>
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
