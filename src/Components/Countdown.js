import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

const secondsToMillis = (sec) => (sec*1000)
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft/60) 
  const seconds = timeLeft%60 

  return <Text style={styles.clock}> {formatTime(minutes)}:{formatTime(seconds)} </Text>;
};

const styles = StyleSheet.create({
  clock: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4c8bc7',
  },
});
 