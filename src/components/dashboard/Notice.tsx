import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NoticeHeight } from "../../utils/Scalling";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../ui/CustomText";
import { Fonts } from "../../utils/Constants";
import Svg, { Defs, G, Path, Use } from "react-native-svg";
import { wavyData } from "../../utils/dummyData";
import { StatusBar } from "expo-status-bar";

const Notice:FC = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      {/* <StatusBar style="dark"/> */}
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText style={styles.heading} varient="h6" fontFamily={Fonts.Itim}>
                Its raining near this location
                </CustomText>
            <CustomText varient="h9" style={styles.textCenter}>
              Our delivery partner may take longer to reach you.
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg style={styles.wave} width='100%' height="35" fill="#CCD5E4" viewBox="0 0 4000 1000" preserveAspectRatio="none">
        <Defs>
            <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
            <Use href="#wavepath" y='321'/>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCD5E4",
  },
  noticeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCD5E4",
  },
  heading: {
    color: '#2D3875',
    marginBottom: 8,
    textAlign: 'center',
  },
  textCenter:{
    textAlign: 'center',
    marginBottom: 8
  },
  wave: {
    paddingTop: 10,
    width: '100%',
    transform: [{rotateX: '180deg'}]
  }
});

export default Notice;
