import {Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutUs = () => {
  const redirect = () => {
    Linking.openURL('https://www.3dotinfotech.in');
  };

  const handlePress = () => {
    const email = 'gaurangghadiya99@gmail.com';
    const subject = 'Regarding to EMI Calculator app';
    const body = 'Hello,';
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url);
  };
  return (
    <ScrollView style={styles.safe}>
      <View style={styles.bottom1}>
        <View style={styles.logo}>
          <Image
            source={require('../assets/logo.png')}
            style={{height: 90, width: 90}}
          />
        </View>
        <Text style={styles.name}>EMI Calculator</Text>
        <Text style={styles.version}>Version : 1.1.0</Text>
        <Text style={styles.title}>Developed by</Text>
        <Text style={styles.dot}>3Dot Infotech</Text>
        <Text style={styles.link} onPress={redirect}>
          https://www.3dotinfotech.in
        </Text>
      </View>

      <View style={styles.bottom1}>
        <Text style={styles.data}>Hi,</Text>
        <Text style={styles.data}>
          Thank you so much for downloading and using this app!
        </Text>
        <Text style={styles.data}>
          We have a passion for finance and hence we develop finance related
          mobile Apps for the benifit of people in india and around the World.
        </Text>
        <Text style={styles.data}>
          Our goal is to make people's life financially healthy.
        </Text>
        <Text style={[styles.data, {marginBottom: 0}]}>
          We try to achieve this goal by developing various finance related
          calculators. These financial calculators help people take informed
          decisions about their finance there by saving them a lot of time,
          effort and money.
        </Text>
      </View>

      <View style={styles.bottom1}>
        <Text style={styles.data}>
          For any queries, issues or improvements related to this App, please
          contact us through the below email.
        </Text>
        <View style={styles.last}>
          <Text style={styles.emailT}>Email : </Text>
          <Text style={styles.email} onPress={handlePress}>
            gaurangghadiya99@gmail.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    minHeight: '100%',
    paddingHorizontal: 20,
  },
  bottom1: {
    borderColor: '#e9e9eb',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    padding: 20,
    // alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  version: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },
  title: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '500',
  },
  dot: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  data: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  last: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  emailT: {
    fontSize: 14,
    color: 'black',
    // fontWeight : "700",
  },
  email: {
    color: 'blue',
    fontSize: 14,
  },
});
