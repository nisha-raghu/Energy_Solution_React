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


export class AdminDeleteVendor extends React.Component {
  static navigationOptions = {
    title: 'Schedule Service View'.toUpperCase()
  };

  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let id = params ? params.id : 1;
    this.data = data.getArticle(id);
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={this.data.photo}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
              <RkText style={styles.title} rkType='header4'> Are you Sure you want to delete the Vendor</RkText>
            </View>
          </View>

          <GradientButton style={styles.save} rkType='large' text='Yes' onPress={() => {
            this.props.navigation.navigate('AdminDeleteSuccess')
          }}/>
          <View>
            <RkText style={styles.title} rkType='header4'> </RkText>
            <RkText style={styles.title} rkType='header4'> </RkText>
          </View>

          <GradientButton style={styles.save} rkType='large' text='No' onPress={() => {
            this.props.navigation.navigate('AdminDashboard')
          }}/>
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
