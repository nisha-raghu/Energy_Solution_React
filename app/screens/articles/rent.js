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

export class RentService extends React.Component {
  static navigationOptions = {
    title: 'Rent Service View'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    let servicename = params ? params.servicename : 1;
    console.log('servicename' + servicename)
    this.data = data.getArticle(id);
    console.log("header " + this.data.id)
    this.state = {
      servicename: '',
      token: '',
      serviceid:'',
      squarefeet: '',
      duration: '',
      warranty: '',
      price: ''
    }
  }

  handleServiceId = (text) => {
     this.setState({ serviceid: text })
  }
  handleSqFeet = (text) => {
     this.setState({ squarefeet: text })
  }
  handleDuration = (text) => {
     this.setState({ duration: text })
  }
  handleWarranty = (text) => {
     this.setState({ warranty: text })
  }
  handlePrice = (text) => {
     this.setState({ price: text })
  }

  rentService = (serviceid, servicename, squarefeet, duration, warranty, price) => {
      console.log('in rent service' + serviceid + servicename)
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/cart/add', {
         method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           token: auth.getToken(),
           service_id: serviceid,
           service_name: servicename,
           squarefeet: squarefeet,
           duration: duration,
           warranty: warranty,
           price: this.state.squarefeet*this.state.duration*2
         })
      }).then(response => {
        console.log('in result')
        var res = JSON.parse(JSON.stringify(response));
        if(res.status==201){
          //redirect to the rent page
          this.props.navigation.navigate('LeaseSuccess');
      }
    }).catch(error => {
      console.error(error);
    });
   }


  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={this.data.photo}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
              <RkText rkType='header4'>{this.data.text}</RkText>
            </View>
          </View>
          <View rkCardContent>
            <View>
              <RkText>Service Id : </RkText>
              <RkTextInput rkType='rounded' placeholder='id' value={(this.data.id).toString()}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
              <RkText >Square Feet : </RkText>
              <RkTextInput rkType='rounded' placeholder='Square Feet' onChangeText = {this.handleSqFeet}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
              <RkText > Duration : </RkText>
              <RkTextInput rkType='rounded' placeholder='No of days' onChangeText = {this.handleDuration}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
              <RkText > Warranty : </RkText>
              <RkTextInput rkType='rounded' placeholder='Yes/No' onChangeText = {this.handleWarranty}/>
            </View>
          </View>
          <View rkCardContent>
            <View>
              <RkText> Price ($50) </RkText>
              <RkTextInput rkType='rounded' placeholder='Price' value={(this.state.squarefeet*this.state.duration*2).toString()} onChangeText = {this.handlePrice}/>
            </View>
          </View>
          <GradientButton style={styles.save} rkType='large' text='Add to Cart' onPress={
            //this.props.navigation.navigate('LeaseSuccess')
            () => this.rentService(this.data.id, this.data.text, this.state.squarefeet,this.state.duration,this.state.warranty,this.state.price)
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
