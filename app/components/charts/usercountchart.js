import React from 'react';
import {
  View,
  Image,
  Dimensions
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';

import {
  VictoryPie,
} from "victory-native";

import {Svg, Text as SvgText} from 'react-native-svg';
import {scale} from '../../utils/scale';


export class UserCountChart extends RkComponent {

  constructor(props) {
    super(props);
    this.size = 300;
    this.fontSize = 40;
    this.state = {
      selected: 0,
      data: [
        {
          x: 1,
          y: 240,
          title: '1',
          name: 'Vender',
          color: RkTheme.current.colors.charts.doughnut[0],
        },  {
            x: 2,
            y: 1,
            title: 'Vendor',
            name: 'Vendor',
            color: RkTheme.current.colors.charts.doughnut[0],
          },
        {
          x: 3,
          y: 12,
          title: 'Admin',
          name: 'Admin',
          color: RkTheme.current.colors.charts.doughnut[1],
        },  {
            x: 4,
            y: 270,
            title: '123',
            name: '1',
            color: RkTheme.current.colors.charts.doughnut[1],
          },
        {
          x: 5,
          y: 6,
          title: 'Customer',
          name: 'Customer',
          color: RkTheme.current.colors.charts.doughnut[2],
        }
      ]
    }
  }

  getServices = () => {
      console.log("Inside getServices");
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/user.count', {
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
  computeColors() {
    return this.state.data.map(i => i.color)
  }

  handlePress(e, props) {
    this.setState({
      selected: props.index
    })
  }

  render() {
    return (
      <View>
        <RkText rkType='header4'>USERS</RkText>
        <View style={{alignSelf: 'center'}}>
          <Svg width={scale(this.size)} height={scale(this.size)}>
            <VictoryPie
              labels={[]}
              width={scale(this.size)} height={scale(this.size)}
              colorScale={this.computeColors()}
              data={this.state.data}
              standalone={false}
              padding={scale(25)}
              innerRadius={scale(70)}
              events={[{
                target: "data",
                eventHandlers: {
                  onPressIn: (evt, props) => this.handlePress(evt, props)
                }
              }]}>
            </VictoryPie>
            <SvgText
              textAnchor="middle" verticalAnchor="middle"
              x={scale(this.size / 2)}
              y={scale(this.size / 2 - this.fontSize / 2)}
              dy={scale(this.fontSize * -0.25)}
              height={scale(this.fontSize)}
              fontSize={scale(this.fontSize)}
              fontFamily={RkTheme.current.fonts.family.regular}
              stroke={RkTheme.current.colors.text.base}
              fill={RkTheme.current.colors.text.base}>
              {this.state.data[this.state.selected].title}
            </SvgText>
          </Svg>
        </View>
        <View style={styles.legendContainer}>
          {this.state.data.map(item => {
            return (
              <View key={item.name} style={styles.legendItem}>
                <View style={[styles.itemBadge, {backgroundColor: item.color}]}/>
                <RkText rkType="primary3">{item.name}</RkText>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
}));
