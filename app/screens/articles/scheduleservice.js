import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkCard,
  RkButton,
  RkTextInput,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {
  Avatar,
  SocialBar,
  GradientButton} from '../../components';
let moment = require('moment');
import auth from '../../utils/authUtils';

export class ScheduleService extends React.Component {
  static navigationOptions = {
    title: 'Schedule Service View'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    console.log("Schedule service:"+JSON.stringify(this.props.navigation.state));
    this.sid = params ? params.id : 1;
    this.sname = params ? params.name : 1;
    console.log("schedule params:"+params);

    this.pic = 'https://readwrite.com/wp-content/uploads/energy-effeciency-e1472285339838.jpg';
    this.data = data.getArticle(this.sid);
    this.state = {
      name: '',
      address: '',
      zipcode: '',
      phone: '',
      date:'',
      time:'',
   }
  }

  handleName = (text) => {
     this.setState({ name: text })
  }
  handleAddress = (text) => {
     this.setState({ address: text })
  }
  handleZipcode = (text) => {
     this.setState({ zipcode: text })
  }
  handlePhone = (text) => {
     this.setState({ phone: text })
  }
  handleDate = (text) => {
     this.setState({ date: text })
  }
  handleTime = (text) => {
     this.setState({ time: text })
  }

  //function for register http request
    scheduleservice = (name, address, zipcode, phone, date, time) => {
        fetch('https://cmpe235-finalproject.herokuapp.com/v1/schedule', {
           method: 'POST',
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             token: auth.getToken(),
             name: name,
           address: address,
           zipcode: zipcode,
           phone: phone,
           date: date,
           time: time,
           service_id: this.sid,
           service_name: this.sname
           })
        }).then(response => {
          var obj= {};
          obj= response._bodyInit;
          var res = JSON.parse(obj);
          console.log("responsesss:"+JSON.stringify(response._bodyInit));
          if(res.success==1){
            //redirect to the login page
            this.props.navigation.navigate('ScheduleSuccess')
          }

      }).catch(error => {
        console.error(error);
      });
     }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={{uri: this.pic}}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
              <RkText style={styles.title} rkType='header4'>Please Enter Details to Schedule energy Service Installation</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View>

            <RkText >Name : </RkText>
            <RkTextInput rkType='rounded' placeholder='Name' onChangeText={this.handleName}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
            <RkText >Adress : </RkText>
            <RkTextInput rkType='rounded' placeholder='Address' onChangeText={this.handleAddress}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
            <RkText >Zip Code : </RkText>
            <RkTextInput rkType='rounded' placeholder='Zip code' onChangeText={this.handleZipcode}/>

            </View>
          </View>
          <View rkCardContent>
            <View>
            <RkText >Phone : </RkText>
            <RkTextInput rkType='rounded' placeholder='xxx-xxx-xxxx' onChangeText={this.handlePhone}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
            <RkText >Date : </RkText>
            <RkTextInput rkType='rounded' placeholder='mm/dd/yyyy' onChangeText={this.handleDate}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
            <RkText >Time : </RkText>
            <RkTextInput rkType='rounded' placeholder='00:00' onChangeText={this.handleTime}/>
            </View>
          </View>
          <GradientButton style={styles.save} rkType='large' text='Schedule' onPress={
            //this.props.navigation.navigate('ScheduleSuccess')
            () => this.scheduleservice(this.state.name, this.state.address, this.state.zipcode, this.state.phone, this.state.date, this.state.time)
          }/>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));
