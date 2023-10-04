import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Text,
} from "react-native";
import Colors from "../../../utils/colors";
import ProductItem from "./ProductItem";

const json_products = [
    {
        id: 100,
        name: 'ReactProX Headset',
        price: 350,
        image: require('../../../assets/images/banner/banner1.jpg'),
        description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
    },
    {
        id: 101,
        name: 'FastLane Toy Car',
        price: 600,
        image: require('../../../assets/images/banner/banner1.jpg'),
        description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
    },
    {
        id: 102,
        name: 'SweetHome Cupcake',
        price: 2,
        image: require('../../../assets/images/banner/banner1.jpg'),
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];
//PropTypes check

export default function CategorySection({ bg, name }) {
    // const rings = data.filter((ring) => ring.type === "ring");
    // const bracelets = data.filter((bracelet) => bracelet.type === "bracelet");
    // const stones = data.filter((stone) => stone.type === "stone");
    // function getItems() {
    //     const items =
    //         name === "Vòng Thạch Anh"
    //             ? bracelets
    //             : name === "Đá Ruby"
    //                 ? stones
    //                 : rings;
    //     return items;
    // }
    return (
        <View style={[styles.category]}>
            <Image style={styles.background} source={bg} blurRadius={10} />
            <View style={styles.titleHeader}>
                <Text style={styles.title}>
                    {name}
                </Text>
            </View>
            <View style={styles.productList}>
                <FlatList
                    // data={getItems()}
                    data={json_products}
                    keyExtractor={(item): any => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.list}
                    renderItem={({ item }) => {
                        return (
                            <ProductItem
                                key={item.id}
                                item={item}
                            />
                        );
                    }}
                />
            </View>
            {/* <TouchableOpacity
                    onPress={() => navigation.navigate("Product")}
                    style={{ marginHorizontal: 10 }}
                >
                    <BlurView tint="light" intensity={100} style={styles.seeMore}>
                        <CustomText style={styles.seeMoreText}>Xem Thêm</CustomText>
                    </BlurView>
                </TouchableOpacity> */}
        </View>
    );
}



const styles = StyleSheet.create({
    category: {
        height: 518,
        marginHorizontal: 5,
        marginVertical: 5,
        paddingVertical: 15,
        borderRadius: 5,
        overflow: "hidden",
    },
    background: {
        position: "absolute",
        resizeMode: "stretch",
        borderRadius: 5,
        height: 518,
        width: "100%",
        bottom: 0,
    },
    titleHeader: {
        marginHorizontal: 10,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        color: Colors.light_green,
        fontWeight: "500",
    },
    list: {
        justifyContent: "space-between",
    },
    productList: {
        width: "100%",
        marginTop: 10,
        paddingHorizontal: 10,
    },
    seeMore: {
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "100%",
        height: 45,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    seeMoreText: {
        fontSize: 14,
        color: Colors.lighter_green,
    },
});
