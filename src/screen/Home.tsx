import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Data from "../data/Home"

const gap = 18;

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safe}>
      {/* <ScrollView> */}
      <View style={{marginTop : 22}}>
        {/* <View>
          <Text style={styles.heading}>Calculators</Text>
        </View> */}
        <View>
          <FlatList
            data={Data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate(item?.redirect)}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.backgroundImage}></Image>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            // horizontal
            numColumns={2}
            contentContainerStyle={{gap}}
            columnWrapperStyle={{gap}}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    minHeight: '100%',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
  },
  card: {
    borderColor: '#e9e9eb',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    width: '47.5%',
    minHeight: 222,
    position: 'relative',
   
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 25,
    color: 'black',
  },
  desc: {
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
    lineHeight: 20,
    color: 'black',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 70,
    height: 80,
    opacity: 0.5,
  },
});
