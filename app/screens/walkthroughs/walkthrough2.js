import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

export class Walkthrough2 extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {width} = Dimensions.get('window');
    let image = RkTheme.current.name === 'light'
      ? <Image style={styles.image} source={require('../../assets/images/lightThemeImage.png')}/>
      : <Image style={styles.image} source={require('../../assets/images/darkThemeImage.png')}/>;

    return (
      <View style={styles.screen}>
        {image}
        <RkText rkType='header2' style={styles.text}>Perfect Green Building Solution</RkText>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  image: {
    height: 180,//scaleVertical(160)
    width: 180
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 30
  }
}));
