import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../../../utils/colors";
//Icon


export default function ProductItem({ item }) {

  return (
    <View style={{ width: "48%" }}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
          // onPress={toDetail}
          >
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            // onLoadStart={() => {
            //   this.setState({ loading: true });
            // }}
            // onLoadEnd={() => this.setState({ loading: false })}
            />
          </TouchableOpacity>

          {/* <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size='small' color={Colors.grey} />
          </View> */}

        </View>
        <View style={styles.center}>
          <Text style={styles.name}>{item.filename}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.rate}>
            <Text style={styles.score}>5.0</Text>
          </View>
          {/* <NumberFormat price={item.price} /> */}
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <TouchableOpacity style={styles.btn} >
            <Text style={styles.detailBtn}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 190,
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 15,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 3,
    color: Colors.lighter_green,
    textAlign: "center",
    fontWeight: "500",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.text,
  },
  btn: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lighter_green,
  },
  detailBtn: {
    color: Colors.lighter_green,
    marginRight: 5,
  },
});
