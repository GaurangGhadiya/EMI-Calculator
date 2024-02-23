import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={[styles.title, {fontWeight : expanded ? "500" : "400"}]}>{title}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const Accordion1 = ({ items }) => {
  return (
    <View>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </View>
  );
};

// Example usage:
const Accordion = ({data}:any) => {

  return (
    <View style={styles.main}>
<Text style={styles.title1}> FAQs</Text>
        <Accordion1 items={data} />
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
    container: {
    //   borderWidth: 1,
      borderBottomWidth : 1,
      borderTopWidth : 0,
      borderColor: '#e9e9eb',
      // marginLeft : -5,
    //   backgroundColor : "white"
    //   marginBottom: 10,
    },
    title: {
      fontSize: 16,
    //   fontWeight: '400',
      padding: 10,
      backgroundColor: 'white',
      lineHeight :20,
      color : "black",
      paddingLeft : 10

    },
    content: {
      color : "black",
      padding: 10,
      fontWeight: '400',
      fontSize : 14,
      marginBottom :14,
      lineHeight :22,
      paddingLeft : 10

    },
    title1:{
      paddingLeft : 5,
        fontSize : 20,
        lineHeight:25,
        fontWeight : "700",
color :"black",
marginTop : 20,
marginBottom :5
    },
    main: {
      borderColor: '#e9e9eb',
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      marginTop : 10
    }
  });
  
