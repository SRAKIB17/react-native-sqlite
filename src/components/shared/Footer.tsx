import { useContext, useState } from 'react';
import { View, Text, Button, TouchableHighlight, TouchableOpacityBase, StyleSheet, Image, TouchableOpacity, Linking, Pressable } from 'react-native';
import { NavigationProvider } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';


export default function Footer() {
    const { navigation, translate } = useContext(NavigationProvider)
    const { home, profile } = translate

    const footerMenuButton = [
        {
            light: assets_images.home_light,
            dark: assets_images.home_dark,
            title: home,
            link: "/home",
        },
    ]


    return (
        <View style={styles.footer}>
            {
                footerMenuButton?.map((r: any, index) => {
                    const check = navigation.pathname === r.link;
                    return (
                        <View key={index}>
                            <Pressable
                                onPress={() => navigation.navigate(r?.link)}
                                disabled={check}
                            >
                                <View style={styles.button}>
                                    <View
                                        style={check && styles.select_button}
                                    >
                                        <Image
                                            source={
                                                check ? r?.light : r?.dark
                                            }
                                            style={{
                                                height: 24, width: 24, objectFit: 'contain',
                                            }}
                                        />
                                    </View>
                                    <Text style={{ fontSize: 10 }}>
                                        {
                                            r?.title
                                        }
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    )
                })
            }

        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: colors.white,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        padding: 16,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.border_color,
        borderWidth: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.00,
        elevation: 1,

        height: 64,
        width: '100%',
    },
    select_button: {
        marginTop: -24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 12,
        borderRadius: 99999,
        backgroundColor: colors.primary,
    },
    button: {
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 48,
        minWidth: 48,
        padding: 4,
    },
    buttonGPlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonFacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 10,
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
});