import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"

const getStorage = async () =>{
  try {
    const jsonValue = await AsyncStorage.getItem('tasks')
    const res = jsonValue ? JSON.parse(jsonValue) : null 
    // console.log("return from get", res)
    return res
  } catch(e) {
    console.log("error in get") 
  }
}

const setStorage = async (data) =>{
  try {
    // console.log("data came to setStorage", data)
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('tasks', jsonValue)
  } catch (e) {
    console.log("error in set")
  }
} 

const clearStorage = async (data) => {
  try {
    // console.log("data came to setStorage", data)
    await AsyncStorage.removeItem('tasks')
  } catch (e) {
    console.log("error in clearStorage")
  }
}

export {getStorage, setStorage, clearStorage}
