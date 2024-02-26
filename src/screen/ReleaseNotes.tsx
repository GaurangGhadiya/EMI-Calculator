import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReleaseNotes = () => {
  return (
    <ScrollView style={styles.safe}>
     <View style={styles.bottom1}>
        <Text style={styles.head}>Release Notes</Text>
        <Text style={styles.app}>App Version</Text>
        <Text style={styles.version}>1.1.0</Text>
        <Text style={styles.rel}>Release Date</Text>
        <Text style={styles.date}>10-Feb-2024</Text>
     </View>
     <View style={styles.bottom1}>
        <Text style={styles.ques}>What's new in this release?</Text>
        <Text style={styles.data}>1. Add GST Calculator</Text>
        <Text style={styles.data}>2. UI/UX Improvements</Text>
        <Text style={[styles.data, {marginBottom : 0}]}>3. Bug fixes</Text>
     </View>
    </ScrollView>
  )
}

export default ReleaseNotes

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
      data: {
        fontSize: 14,
        color: 'black',
        marginBottom: 10,
      },
      ques : {
        fontWeight : "700",
        fontSize : 15,
        color: 'black',
        marginBottom : 10
      },
      head : {
        fontSize : 22,
        fontWeight : "bold",
        color : "black",
        textAlign: 'center',
      },
      app : {
        marginTop : 25,
        textAlign: 'center',
        color : "gray",
        fontSize : 16,
      },
      version : {
        marginBottom : 25,
        textAlign: 'center',
        color : "black",
        fontSize : 22,
        marginTop : 5
      },
      rel : {
        textAlign: 'center',
        color : "gray",
        fontSize : 16,

      },
      date : {
        textAlign: 'center',
        color : "black",
        fontSize : 18,
        marginTop : 5

      },
})