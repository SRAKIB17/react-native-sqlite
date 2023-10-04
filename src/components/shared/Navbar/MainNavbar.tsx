import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Button, TouchableHighlight, DrawerLayoutAndroid } from 'react-native';
import Colors from '../../../utils/colors';
import { assets_images } from '../../../assets/assets_images';


const MainNavbar = ({ drawerRef }: { drawerRef: React.RefObject<DrawerLayoutAndroid> }) => {
    const onPress = () => {
        return drawerRef.current?.openDrawer()
    }
    // <View style={styles.container}>

    //     <Text style={styles.paragraph}>
    //         Swipe from the side or press button below to see it!
    //     </Text>
    //     <Button
    //         title="Open drawer"
    //         onPress={() => drawer.current?.openDrawer()}
    //     />
    // </View>
    return (
        <>
            <View style={styles.navbar}>

                <View>
                    <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.primary_text }}>
                        Tools
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <View
                                style={styles.navbar_button}
                            >
                                <Image
                                    source={assets_images.search_white}
                                    style={{ height: 28, width: 28 }}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <View
                                style={styles.navbar_button}
                            >
                                <View style={{ height: 4, width: 24, backgroundColor: Colors.white }}></View>
                                <View style={{ height: 4, width: 24, backgroundColor: Colors.white }}></View>
                                <View style={{ height: 4, width: 24, backgroundColor: Colors.white }}></View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* <Button title='fsdf' /> */}
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    navbar: {
        display: 'flex',
        borderBottomColor: Colors.white,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        color: 'black',
        height: 64,
        paddingLeft: 10,
        paddingRight: 10,
        alignContent: 'space-between',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,
        elevation: 3,

    },
    navbar_button: {
        width: 40,
        padding: 8,
        backgroundColor: Colors.primary,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },

    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    countText: {
        color: '#FF00FF',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default MainNavbar;
