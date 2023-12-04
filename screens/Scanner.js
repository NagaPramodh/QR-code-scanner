import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Linking } from "react-native";
import { Button } from "react-native";

import axios from "axios";

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const postScannedDataToFirebase = async (type, data) => {
    try {
      const firebaseURL = "https://scannedlink-default-rtdb.firebaseio.com/";

      const postData = {
        type,
        data,
      };

      const response = await axios.post(
        `${firebaseURL}/scannedData.json`,
        postData
      );

      // console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar Code with ${data} has been scanned`);
    postScannedDataToFirebase(type, data)
      .then(() => {
        setTimeout(() => {
          Linking.openURL(data);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No Access To Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title="Tap to Scan Again"
          onPress={() => setScanned(false)}
          style={{ maxWidth: 30 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  absoluteFillObject: {},
});

export default Scanner;
