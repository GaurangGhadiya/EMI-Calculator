import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import PieChart from 'react-native-pie-chart'

import {Dropdown} from 'react-native-element-dropdown';
import FDData from '../data/FD';
import Accordion from '../components/Accordion';
import BannerAds from '../adMobAds/BannerAds';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';

const data1 = [
  {label: 'Years', value: '1'},
  {label: 'Months', value: '2'},
  {label: 'Days', value: '3'},
];

const FD = () => {
  const [value, setValue] = useState<any>('1');
  const [isFocus, setIsFocus] = useState(false);
  const [data, setdata] = useState({
    investment: 5000,
    intrest: 12,
    time: 10,
    amount: 0,
    return: 0,
    total: 0,
  });
  const [error, seterror] = useState({});
  const { isLoaded, isClosed, load, show } = useRewardedAd(TestIds.REWARDED);
  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      load();
    }
  }, [isClosed]);

  const handleChange = (name: string, value: string) => {
    let error: any = {};
    if (name == 'investment') {
      if (parseInt(value) < 5000 || !parseInt(value)) {
        error['investment'] = 'Minimum value allowed is 500';
      }
      if (data.intrest < 1 || !parseInt(data.intrest)) {
        error['intrest'] = 'Minimum value allowed is 1';
      }
      if (data.time < 1 || !parseInt(data.time)) {
        error['time'] = 'Minimum value allowed is 1';
      }
    }
    if (name == 'intrest') {
      if (parseInt(value) < 1 || !parseInt(value)) {
        error['intrest'] = 'Minimum value allowed is 1';
      }
      if (data.investment < 5000 || !parseInt(data.investment)) {
        error['investment'] = 'Minimum value allowed is 500';
      }
      if (data.time < 1 || !parseInt(data.time)) {
        error['time'] = 'Minimum value allowed is 1';
      }
    }
    if (name == 'time') {
      if (parseInt(value) < 1 || !parseInt(value)) {
        error['time'] = 'Minimum value allowed is 1';
      }
      if (data.investment < 5000 || !parseInt(data.investment)) {
        error['investment'] = 'Minimum value allowed is 500';
      }
      if (data.intrest < 1 || !parseInt(data.intrest)) {
        error['intrest'] = 'Minimum value allowed is 1';
      }
    }
    seterror(error);
    setdata({
      ...data,
      [name]: parseInt(value) ? parseInt(value) : 0,
    });
  };

  console.log('error', error);

  const calculate = () => {
    const principalAmount = parseFloat(data.investment);
    const interestRatePerDay = parseFloat(data.intrest) / 100 / 365; // Convert annual interest rate to daily rate

    const interestRate = parseFloat(data.intrest) / 100;

    let timePeriod;
    let futureVal;
    if (value == '1') {
      timePeriod = parseInt(data.time);
    } else if (value == '2') {
      timePeriod = parseInt(data.time) / 12;
    } else if (value == '3') {
      timePeriod = parseInt(data.time);
    }

    if (value == '1' || value == '2') {
      futureVal = principalAmount * Math.pow(1 + interestRate, timePeriod);
    } else if (value == '3') {
      futureVal =
        principalAmount + principalAmount * interestRatePerDay * timePeriod;
    }

    console.log('futureVal', futureVal);
    setdata({
      ...data,
      amount: data.investment,
      return: Math.round(futureVal) - data.investment,
      total: data.investment + (Math.round(futureVal) - data.investment),
    });
  };
  return (
    <ScrollView style={{minHeight : "100%", backgroundColor : "white"}}>
    <SafeAreaView style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#00B386"
        // barStyle={'light-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      <View style={styles.container}>
        {/* <Text style={styles.name}>SIP Calculator</Text> */}
        <View style={styles.bottom1}>
        <View style={{paddingHorizontal : 15}}>
          <View style={styles.outer}>
            <Text style={styles.title}>Total investment</Text>
            <View
              style={[
                styles.box,
                {backgroundColor: error.investment ? '#FAE9E5' : '#EBF9F5'},
              ]}>
              <Text
                style={[
                  styles.sym,
                  {color: error.investment ? '#EB5B3C' : '#00B386'},
                ]}>
                ₹
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {color: error.investment ? '#EB5B3C' : '#00B386'},
                ]}
                keyboardType="numeric"
                value={data?.investment?.toString()}
                onChangeText={value =>
                  handleChange(
                    'investment',
                    parseInt(value) > 1000000 ? 1000000 : value,
                  )
                }
              />
            </View>
          </View>
          <Text style={styles.error}>
            {error?.investment && error?.investment}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={5000}
            maximumValue={1000000}
            value={data?.investment}
            onValueChange={(e: any) => handleChange('investment', e)}
            step={1}
            minimumTrackTintColor="#00B386"
            maximumTrackTintColor="#00B386"
            thumbTintColor="#00B386"
          />
        </View>
        <View style={{paddingHorizontal : 15}}>
          <View style={styles.outer}>
            <Text style={styles.title}>Rate of intrest (p.a)</Text>
            <View
              style={[
                styles.box1,
                {backgroundColor: error.intrest ? '#FAE9E5' : '#EBF9F5'},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {color: error.intrest ? '#EB5B3C' : '#00B386'},
                ]}
                keyboardType="numeric"
                value={data?.intrest?.toString()}
                onChangeText={value =>
                  handleChange('intrest', parseInt(value) > 15 ? 15 : value)
                }
              />
              <Text
                style={[
                  styles.sym,
                  {color: error.intrest ? '#EB5B3C' : '#00B386'},
                ]}>
                %
              </Text>
            </View>
          </View>
          <Text style={styles.error}>{error?.intrest && error?.intrest}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={15}
            value={data?.intrest}
            onValueChange={(e: any) => handleChange('intrest', e)}
            step={1}
            minimumTrackTintColor="#00B386"
            maximumTrackTintColor="#00B386"
            thumbTintColor="#00B386"
          />
        </View>
        <View style={{paddingHorizontal : 15}}>
          <View style={styles.outer}>
            <View style={styles.down}>
              <Text style={styles.title}>Time period</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{fontSize: 14, color : "black"}}
                data={data1}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View
              style={[
                styles.box1,
                {backgroundColor: error.time ? '#FAE9E5' : '#EBF9F5'},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {color: error.time ? '#EB5B3C' : '#00B386'},
                ]}
                keyboardType="numeric"
                value={data?.time?.toString()}
                onChangeText={val =>
                  handleChange(
                    'time',
                    value == '1' && parseInt(val) > 25
                      ? 25
                      : value == '2' && parseInt(val) > 11
                      ? 11
                      : value == '3' && parseInt(val) > 31
                      ? 31
                      : val,
                  )
                }
              />
              {/* <Text
                  style={[
                    styles.sym,
                    {color: error.time ? '#EB5B3C' : '#00B386'},
                  ]}>
                  Yr
                </Text> */}
            </View>
          </View>
          <Text style={styles.error}>{error?.time && error?.time}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={
              value == '1' ? 25 : value == '2' ? 11 : value == '3' ? 31 : 0
            }
            value={data?.time}
            onValueChange={(e: any) => handleChange('time', e)}
            step={1}
            minimumTrackTintColor="#00B386"
            maximumTrackTintColor="#00B386"
            thumbTintColor="#00B386"
          />
        </View>
        </View>
        <BannerAds />

        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={() => 
            // isLoaded ?  show() :
            calculate()}>
            <Text style={styles.btnName}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Keyboard.dismiss();
              setdata({
                investment: 1000,
                intrest: 12,
                time: 10,
                amount: 0,
                return: 0,
                total: 0,
              });
            }}>
            <Text style={styles.btnName}>Reset</Text>
          </TouchableOpacity>
        </View>

        {data?.amount > 0 && (
          <View style={styles.bottom1}>
            <Text style={styles.title2}>Results</Text>
            <View style={styles.abc}>
              <Text style={styles.t1}>Invested amount</Text>
              <Text style={styles.t2}>
                ₹{data.amount?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>Est. returns</Text>
              <Text style={styles.t2}>
                ₹{data?.return?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>Total value</Text>
              <Text style={styles.t2}>
                ₹{data.total?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.chart}>
           <PieChart
            widthAndHeight={250}
            series={[data.amount,data?.return]}
            sliceColor={['#EEF0FF', '#5367FF']}
            coverRadius={0.66}
            coverFill={'#FFF'}
          />
           </View>
           <View style={styles.lables}>
            <View style={styles.lables1}>
              <View style={[styles.lable, {backgroundColor : "#EEF0FF"}]}></View>
            <Text style={{color : "black"}} >Total investment</Text>
            </View>
            <View style={styles.lables1}>
            <View style={[styles.lable, {backgroundColor : "#5367FF"}]}></View>

            <Text style={{color : "black"}}>Total interest</Text>
            </View>
           </View>
          </View>
        )}
                <Accordion data={FDData}/>

      </View>
      <BannerAds />

    </SafeAreaView>
    </ScrollView>

  );
};

export default FD;

const styles = StyleSheet.create({
  error: {
    textAlign: 'right',
    marginTop: -15,
    marginBottom: 5,
    color: '#EB5E3F',
    fontSize: 12,
  },
  main: {
    backgroundColor: 'white',
    minHeight: '100%',
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    color: 'black',
  },
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  box: {
    width: 120,
    // backgroundColor: '#EBF9F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  box1: {
    width: 120,
    backgroundColor: '#EBF9F5',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  input: {
    marginLeft: 20,
    fontSize: 16,
    textAlign: 'right',
    // color: '#00B386',
    fontWeight: '700',
  },
  sym: {
    fontSize: 16,
    fontWeight: '700',
    // color: '#00B386',
  },
  slider: {
    marginVertical: 10,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#00B386',
    borderRadius: 5,
  },
  btnName: {
    color: 'white',
    fontSize: 16,
  },
  bottom1: {
    borderColor: '#e9e9eb',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    // alignItems: 'center',
  },
  abc: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  t1: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  t2: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  container1: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 8,
    width: 87,
    marginLeft: 5,
    color: '#00B386',
  },
  icon: {
    marginRight: 2,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: '#00B386',
    fontWeight: '500',
  },
  placeholderStyle: {
    fontSize: 12,
    color: '#00B386',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#00B386',
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: '#00B386',
    fontWeight: '500',
  },
  down: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    marginVertical : 20
  },
  lables: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom : 20,
    fontWeight : '400'
  },
  lable: {
    height : 7,
    width : 15,
    marginRight : 7,
    borderRadius : 10
    
  },
  lables1:{
    flexDirection : "row",
    alignItems : "center",
  }
});
