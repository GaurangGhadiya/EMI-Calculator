import { Button, Linking, Modal, ScrollView,  StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import  Devider  from '../components/Devider'
import ConfirmationModal from '../components/ConfirmationModal';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const handleConfirm = () => {
      // Perform confirmation action here
      console.log("Confirmed");
      setIsEnabled(previousState => !previousState);
      closeModal();
    };

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
      };

      const shareOnWhatsApp = async () => {
        try {
          const shareOptions = {
            // social: Share.Social.WHATSAPP,
            title: 'Share via',
            message: 'This is the content you want to share on social media.',
            url: 'https://www.youtube.com/', 
          };
          await Share.open(shareOptions);
        } catch (error) {
          // Alert.alert('Error', error.message);
        }
      };

      const social = (url) => {
        Linking.openURL(url)
      }
  return (
    <ScrollView style={styles.safe}>
        <View style={styles.top}>

      <Text style={styles.text}>Data Collection Enabled</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#EBF9F5" }}
        thumbColor={isEnabled ? "#00B386" : "#f4f3f4"}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
       {isEnabled && <Text style={styles.text} onPress={() => setModalVisible(true)}>Request for data deletion</Text>}
        <Devider />
        <Text style={styles.heading}>SOCIAL</Text>
        <Text style={styles.text} onPress={()=> social("https://www.instagram.com/gaurang_ghadiya_007/")}>Follow us on Instagram</Text>
        <Text style={styles.text} onPress={()=> social("https://www.3dotinfotech.in/")}>Visit our Website</Text>
        <Devider />
        <Text style={styles.heading}>INFO</Text>
        <Text style={styles.text} onPress={shareOnWhatsApp}>Share app</Text>
        <Text style={styles.desc} onPress={shareOnWhatsApp}>Like our app? Recommend us on WhatsApp groups!</Text>
        <Text style={styles.text}>Rate this app</Text>
        <Text style={styles.text}>Remove all advertisements</Text>
        <Text style={styles.text} onPress={()=> social("https://www.termsfeed.com/live/cb1baf40-9914-4c94-a0ab-c3f46bf8c640")}>Privacy</Text>
        <Text style={styles.text}>More Apps</Text>
        <Devider />
        <Text style={styles.heading}>Release</Text>
        <Text style={styles.text} onPress={() => navigation.navigate("ReleaseNotes")}>Release Notes</Text>
        <ConfirmationModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title="Request for data deletion"
        message="Are you sure you want to delete the collected data. You can also turn off data collection from setting."
      />
    </ScrollView>
  )
}

export default Setting

const styles = StyleSheet.create({
    safe: {
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 20,
      },
      top : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
      },
      text: {
        fontSize : 16,
        marginBottom : 10,
        color : "black"
      },
      heading : {
        color : "#00B386",
        fontWeight : "bold",
        marginBottom :15,
        fontSize : 18,
        // letterSpacing : 1
      }, desc : {
        fontSize : 14,
        color : "gray",
        marginTop: -10,
        marginBottom : 10
      }
})