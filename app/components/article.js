import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';

import {data} from '../data';
import {Avatar} from '.';
import {SocialBar} from '.';
let moment = require('moment');


export class Article extends React.Component {
  static navigationOptions = {
    title: 'Article View'.toUpperCase()
  };

  constructor(props) {
    super(props);
    //let {params} = this.props.navigation.state;
    //let id = params ? params.id : 1;

    console.log("in constr")
    this.onScrollEnd = this._onScrollEnd.bind(this);
    this.data = data.getArticle(0);
  }


  _renderItem = ({item}) => {
    let {width} = Dimensions.get('window');
    return (
      <View style={[styles.item, {width: width}]}>
        {item}
      </View>
    );

  };

  _onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (this.props.onChanged) {
      this.props.onChanged(pageNum);
    }
  }


  render() {
    console.log("in render")
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={this.data.photo}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
              <RkText rkType='secondary2 hintColor'>{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.id})}>
              <Avatar rkType='circle' img={this.data.user.photo}/>
            </TouchableOpacity>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 bigLine'>{this.data.text}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View>
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
