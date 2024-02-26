import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const ConfirmationModal = ({ visible, onClose, onConfirm, title, message }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Text style={styles.btn}  onPress={onClose} >NO</Text>
              <Text style={[styles.btn, {marginLeft : 30}]}  onPress={onConfirm} >YES</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  export default ConfirmationModal

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left',
      color : "black"
    },
    message: {
      marginBottom: 25,
      marginTop : 5,
      fontSize : 16,
      lineHeight : 20,
      textAlign: 'left',
      color : "gray"
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    btn : {
        color : "#00B386",
        backgroundColor : "white",
        fontSize : 16,
        fontWeight : "500"
    }
  });