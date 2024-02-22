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
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';

const EMI = () => {
  const [data, setdata] = useState({
    investment: 100000,
    intrest: 12,
    time: 10,
    amount: 0,
    return: 0,
    total: 0,
    emi : 0
  });
  const [error, seterror] = useState({});

  const handleChange = (name: string, value: string) => {
    let error: any = {};
    if (name == 'investment') {
      if (parseInt(value) < 100000 || !parseInt(value)) {
        error['investment'] = 'Minimum value allowed is 100000';
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
      if (data.investment < 100000 || !parseInt(data.investment)) {
        error['investment'] = 'Minimum value allowed is 100000';
      }
      if (data.time < 1 || !parseInt(data.time)) {
        error['time'] = 'Minimum value allowed is 1';
      }
    }
    if (name == 'time') {
      if (parseInt(value) < 1 || !parseInt(value)) {
        error['time'] = 'Minimum value allowed is 1';
      }
      if (data.investment < 100000 || !parseInt(data.investment)) {
        error['investment'] = 'Minimum value allowed is 100000';
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

    const principal = parseFloat(data.investment);
    const rateOfInterest = parseFloat(data.intrest) / 12 / 100; // Monthly interest rate
    const tenureInMonths = parseFloat(data.time) *12 // Loan tenure in months

    // Calculate EMI using the formula for EMI calculation
    const emiAmount = (principal * rateOfInterest * Math.pow(1 + rateOfInterest, tenureInMonths)) /
                      (Math.pow(1 + rateOfInterest, tenureInMonths) - 1);

                      const totalInterestAmount = emiAmount * tenureInMonths - principal;

    Keyboard.dismiss();
    let futureValue : 111
    setdata({
      ...data,
      emi : Math.round(emiAmount),
      amount: data.investment ,
      return: Math.round(totalInterestAmount) ,
      total:
        data.investment   + Math.round(totalInterestAmount) 
        // + (Math.round(futureValue) - data.investment ),
    });
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
          <View style={styles.outer}>
            <Text style={styles.title}>Loan amount</Text>
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
            minimumValue={100000}
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
            <Text style={styles.title}>Rate of interest (p.a)</Text>
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
        <View>
          <View style={styles.outer}>
            <Text style={styles.title}>Loan tenure (years)</Text>
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
                onChangeText={value =>
                  handleChange('time', parseInt(value) > 30 ? 30 : value)
                }
              />
              <Text
                style={[
                  styles.sym,
                  {color: error.time ? '#EB5B3C' : '#00B386'},
                ]}>
                Yr
              </Text>
            </View>
          </View>
          <Text style={styles.error}>{error?.time && error?.time}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            value={data?.time}
            onValueChange={(e: any) => handleChange('time', e)}
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
            <View style={styles.abc}>
              <Text style={styles.t1}>Monthly EMI</Text>
              <Text style={styles.t2}>
                ₹{data.emi?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>Principal amount</Text>
              <Text style={styles.t2}>
                ₹{data.amount?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>Total interest</Text>
              <Text style={styles.t2}>
                ₹{data?.return?.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.abc}>
              <Text style={styles.t1}>Total amount</Text>
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

export default EMI;

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
});
