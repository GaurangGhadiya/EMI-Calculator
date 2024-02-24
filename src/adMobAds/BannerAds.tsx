import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

function BannerAds() {
  return (
    <View style={styles.adds}>

    <BannerAd
    unitId={adUnitId}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly : true
    }}
  />
  </View>
  );
}

export default BannerAds;
const styles = StyleSheet.create({
    adds: {
        marginLeft : -20,
        marginVertical : 10
      }
})