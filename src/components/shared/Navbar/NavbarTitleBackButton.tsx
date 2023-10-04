import React, { useContext, useRef, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Button, TouchableHighlight, DrawerLayoutAndroid } from 'react-native';
import Colors from '../../../utils/colors';
import { assets_images } from '../../../assets/assets_images';
import TouchableOpacityButton from '../../button/PressableButton';
import { global_styles } from '../../../styles/global';
import colors from '../../../utils/colors';
import { NavigationProvider } from '../../../navigators/NavigationContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Router from '../../../navigators/router';


const NavbarTitleBackButton = ({
    title,
    backward
}: {
    title: string
    backward: string,
}) => {

    // const router: any = Router()
    const { navigation, drawerRef } = useContext(NavigationProvider)
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
                <View style={styles.title}>

                    <View style={{ position: 'absolute' }}>
                        <TouchableOpacityButton
                            key={title}

                            onPress={async () => {
                                // await AsyncStorage.removeItem('params')
                                navigation.navigate(backward)
                            }}
                            image={assets_images.arrow_right_light}
                            imageStyle={{ transform: [{ rotate: "180deg" }] }}
                            containerStyles={{
                                backgroundColor: 'transparent',
                                width: 36,
                                height: 36,
                                borderWidth: 0,
                            }}
                        />
                    </View>

                    <View style={{ width: "100%", display: 'flex', justifyContent: "center", alignContent: 'center', flexDirection: 'row' }}>
                        <Text style={[global_styles.text_xl, global_styles.font_bold, { color: colors.primary_text }]}
                        >
                            {
                                title
                            }
                        </Text>
                    </View>
                </View>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    navbar: {
        paddingHorizontal: 20,
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
    title: {
        display: 'flex',
        position: "relative",
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

export default NavbarTitleBackButton;
