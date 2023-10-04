// import { Text, View } from "react-native";

const json_products = [
    {
        id: 100,
        name: 'ReactProX Headset',
        price: 350,
        // image: require('../assets/products/headset-100.jpg'),
        description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
    },
    {
        id: 101,
        name: 'FastLane Toy Car',
        price: 600,
        // image: require('../assets/products/car-101.jpg'),
        description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
    },
    {
        id: 102,
        name: 'SweetHome Cupcake',
        price: 2,
        // image: require('../assets/products/cake-102.jpg'),
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];

// function Products() {
//     return (
//         <View>

//             {
//                 json_products?.map((product, index) => {
//                     return (
//                         <View key={index}>
//                             <Text>
//                                 fsd
//                             </Text>
//                         </View>
//                     )
//                 })
//             }
//         </View>
//     );
// }

// export default Products;


import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import React from "react";
// import { useNavigation } from "@react-navigation/native";

const Card = () => {
    // const navigation = useNavigation();


    const product = json_products?.[0]

    return (
        <View
            style={{ display: 'flex', flexDirection: 'row', overflow: 'scroll' }}
        // onPress={() => navigation.navigate("Product", routeParams)}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://ahaliyasdeensquare.com/upload/products/10059/1693991182137-921854465.webp"
                    }}
                />
                <Text style={styles.product_title}>
                    {product.name}
                </Text>
                <Text
                    style={styles.productprice}
                >
                    Rs. {product.price}/piece
                </Text>
            </View>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://ahaliyasdeensquare.com/upload/products/10059/1693991182137-921854465.webp"
                    }}
                />
                <Text style={styles.product_title}>
                    {product.name}
                </Text>
                <Text
                    style={styles.productprice}
                >
                    Rs. {product.price}/piece
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 12,
        display: "flex",
        alignItems: "flex-start",
        width: "auto",
        paddingBottom: 15,
        borderRadius: 5
    },
    image: {
        width: "100%",
        borderRadius: 6,
        maxWidth: 500,
        height: 250,
        objectFit: 'contain',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    product_title: {
        color: "#000",
        fontSize: 16
    },
    productprice: {
        color: "#000",
        fontSize: 14
    }
});

export default Card;