import React from 'react';
import * as Screens from '../../screens/index';
import {VendorAddServiceSuccess} from './vendoraddservicesuccess';
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {
  RkSwitch,
  FindFriends,
  GradientButton
} from '../../components';
import {FontAwesome} from '../../assets/icons';
import auth from '../../utils/authUtils';


/*
* Used in Vendor Dashboard View Service
*/
export class VendorAddService extends React.Component {
  static navigationOptions = {
    title: 'Add Service'.toUpperCase()
  };

  constructor(props) {
    super(props);
    console.log("In Vendor Add");
    this.state = {
      id: '',
      name: '',
      details: ''
    }
  }

  // create handlers for schema
  handleId = (text) => {
     this.setState({ id: text })
  }
  handleName = (text) => {
     this.setState({ name: text })
  }
  handleDetails = (text) => {
     this.setState({ details: text })
  }

  //function for register http request
    addService = (id, name, details) => {
      
        fetch('https://cmpe235-finalproject.herokuapp.com/v1/service/add', {
           method: 'POST',
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             token : auth.getToken(),
             id : id,
             type: 'fact',
             time: -565,
             header: name,
             text: details,
             comments: [],
             status:'uninstalled'
           })
        }).then(response => {
          var obj= {};
          console.log("vendor add service response:"+JSON.stringify(response));
          obj= response._bodyInit;
          var res = JSON.parse(obj);
          if(res.success==1){
            //redirect to the login page
            this.props.navigation.navigate('VendorAddServiceSuccess');
            console.log("Vendor Add service success");
        }
      }).catch(error => {
        console.error(error);
      });
     }

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.save}>
        <View>
        <RkTextInput rkType='rounded' placeholder='Service Id' onChangeText={this.handleId}/>
          <RkTextInput rkType='rounded' placeholder='Service name' onChangeText={this.handleName}/>
          <RkTextInput rkType='rounded' placeholder='Service Details' onChangeText={this.handleDetails}/>
          <RkTextInput rkType='rounded' placeholder='Price' />
          <GradientButton style={styles.save} rkType='large' text='ADD' onPress = {
            () =>   this.addService(this.state.id, this.state.name, this.state.details) }/>

        </View>
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
  save: {
    marginVertical: 20
  },
}));
