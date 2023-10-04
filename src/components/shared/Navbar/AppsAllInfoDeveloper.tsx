import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProvider, navigationInterface } from '../../../navigators/NavigationContainer';
import { global_styles } from '../../../styles/global';
import { assets_images } from '../../../assets/assets_images';
import colors from '../../../utils/colors';


export default function AppsAllInfoDeveloper() {
    const { translate, navigation, drawerRef } = useContext(NavigationProvider)
    const { log_out, notifications, settings, about_apps } = translate

    const my_account_menu = [
        {
            title: notifications,
            link: '/notifications',
            icon: assets_images.cart_dark,
        },

        {
            title: settings,
            link: '/settings',
            icon: assets_images.settings3d,
        },
        {
            title: about_apps,
            link: '/developer',
            icon: assets_images.developer3d,
        },
    ]


    return (
        <View style={[global_styles.container, { marginTop: 40, flex: 1, justifyContent: 'flex-start' }]}>
            <View>
                {
                    my_account_menu?.map((r: any, index) => {
                        return (
                            <View key={index}>
                                <Pressable onPress={() => {
                                    navigation.navigate(r?.link)
                                    drawerRef.current?.closeDrawer()
                                }}   >
                                    <View style={styles.button}>
                                        <View>
                                            <Image
                                                source={r?.icon}
                                                style={{
                                                    height: 20, width: 20, objectFit: 'contain',
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <Text style={[global_styles.text_lg, { color: colors.black }]}>
                                                {
                                                    r?.title
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 56,
        gap: 4,
        paddingVertical: 16,
        paddingHorizontal: 4,
        width: '100%',
        borderColor: colors.border_color,
        borderBottomWidth: 0.5,
    },
    button_title_image: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    }
});