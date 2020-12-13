import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import keys from './constants/Keys';
import Parse from "parse/react-native.js";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default class App extends Component {
  componentDidMount() {
    this.createInstallation();
  }

  createInstallation = async () => {
    const Installation = Parse.Object.extend(Parse.Installation);
    const installation = new Installation();

    installation.set("deviceType", Platform.OS);

    await installation.save();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
