import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Slider from '@react-native-community/slider';
import RadioGroup from 'react-native-radio-buttons-group';

const GST = () => {
  const [selectedId, setSelectedId] = useState('1');

  useEffect(() => {
    calculate()
  }, [selectedId])
  

  const [data, setdata] = useState({
    investment: 1000,
    intrest: 12,
    time: 10,
    amount: 0,
    return: 0,
    total: 0,
  });
  const [error, seterror] = useState({});

  const handleChange = (name: string, value: string) => {
    let error: any = {};
    if (name == 'investment') {
      if (parseInt(value) < 500 || !parseInt(value)) {
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
      if (data.investment < 500 || !parseInt(data.investment)) {
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
      if (data.investment < 500 || !parseInt(data.investment)) {
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
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'GST Exclusive',
        value: '1',
      },
      {
        id: '2',
        label: 'GST Inclusive',
        value: '2',
      },
    ],
    [],
  );

  const calculate = () => {
    
    const amountValue = parseFloat(data.investment);
    const gstRateValue = parseFloat(data.intrest) / 100;
    const gstIncludedAmount = amountValue * (1 + gstRateValue);
    const gstExcludedAmount = amountValue / (1 + gstRateValue);

    if(selectedId == "1"){
        setdata({
            ...data,
            amount: data.investment * data.time * 12,
            return:   Math.round(gstIncludedAmount) - data.investment,
            total:Math.round(gstIncludedAmount) ,
          });
    }else{
        setdata({
            ...data,
            amount: data.investment * data.time * 12,
            return: data.investment - Math.round(gstExcludedAmount),
            total:data.investment - (data.investment - Math.round(gstExcludedAmount))
          });
    }
    Keyboard.dismiss();
   
  };
  return (
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
        <View>
          <View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              borderColor	="#444"
              
              containerStyle={styles.containerRadio}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.outer}>
            <Text style={styles.title}>Total amount</Text>
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
            minimumValue={500}
            maximumValue={1000000}
            value={data?.investment}
            onValueChange={(e: any) => handleChange('investment', e)}
            step={1}
            minimumTrackTintColor="#00B386"
            maximumTrackTintColor="#00B386"
            thumbTintColor="#00B386"
          />
        </View>
        <View>
          <View style={styles.outer}>
            <Text style={styles.title}>Tax slab</Text>
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
                  handleChange('intrest', parseInt(value) > 30 ? 30 : value)
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
            maximumValue={30}
            value={data?.intrest}
            onValueChange={(e: any) => handleChange('intrest', e)}
            step={1}
            minimumTrackTintColor="#00B386"
            maximumTrackTintColor="#00B386"
            thumbTintColor="#00B386"
          />
        </View>

        <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={calculate}>
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
            {/* <View style={styles.abc}>
              <Text style={styles.t1}>Invested amount</Text>
              <Text style={styles.t2}>
                ₹{data.amount?.toLocaleString('en-IN')}
              </Text>
            </View> */}
            <View style={styles.abc}>
              <Text style={styles.t1}>Total GST</Text>
              <Text style={styles.t2}>
                ₹{data?.return?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>{selectedId == "1"?"Post" : "Pre"} GST amount</Text>
              <Text style={styles.t2}>
                ₹{data.total?.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GST;

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
    fontSize: 20,
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
    marginVertical: 20,
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
  containerRadio: {
    flexDirection: 'row',
    marginLeft: -10,
    marginTop: 20,
  },
  labelStyle: {
    fontWeight: '500',
    // color : "red"
  },
});
