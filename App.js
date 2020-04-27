import React from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import keys from './constants/Keys';
import Parse from "parse/react-native.js";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default class App extends React.Component {
  componentWillMount() {
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
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});