import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';

const ShareWhatsApp = () => {
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
  return (
    <View style={styles.bottom1}>
       <View style={styles.share}>
       <Icon name="share-all" color="#00B386"  size={100} />
       </View>
        <Text style={styles.shareText}>Help friends in calculating EMI by sharing.</Text>
        <Text style={styles.shareDesc}>Let you friends and family know about EMI Calculator!</Text>
        <TouchableOpacity onPress={shareOnWhatsApp}>
       <View style={styles.otBtn}>
       <Icon name="share-variant-outline" color="white"  size={30} />
          <Text style={styles.btnText}>Share via...</Text>
       </View>
        </TouchableOpacity>
      </View>
  )
}

export default ShareWhatsApp

const styles = StyleSheet.create({
    bottom1: {
        borderColor: '#e9e9eb',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginTop : 5,
        marginVertical: 15,
        padding : 20
        // alignItems: 'center',
      },
      otBtn : {
        backgroundColor : "#00C63F",
        borderRadius : 8,
        flexDirection : "row",
        alignItems : 'center',
        padding : 15,
        justifyContent : 'center',
      },
      btnText : {
        color : "white",
        fontSize : 18,
        fontWeight : "700",
        marginLeft : 5
      },
      shareText: {
        fontSize : 22,
        fontWeight : "bold",
        color : "black",
        textAlign : "center",
      },
      shareDesc : {
        fontSize : 20,
        fontWeight : "500",
        color : "gray",
        textAlign : "center",
        marginVertical : 25
    
      },
      share : {
        flexDirection : "row",
        justifyContent : "center",
        marginBottom : 20
      }
})