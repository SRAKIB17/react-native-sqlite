/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useContext, useRef, useEffect } from 'react';
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { navigationInterface } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';


export default function HomeScreen(props: navigationInterface) {
    const { navigation, translate } = props
    const { notes, income_expenditure, routine } = translate

    const home_menu = [
        {
            title: notes,
            link: '/notes',
            color: assets_images.notes_color,
        },
        {
            title: routine,
            link: '/routine',
            color: assets_images.calendar_color,
        },
        {
            title: income_expenditure,
            link: '/income-expenditure',
            color: assets_images.income_expenditure_3d,
        },
        {
            title: "Task Management",
            link: '/wishlists',
            color: assets_images.notes_color,
        },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={global_styles.container}>
                {
                    home_menu?.map((r: any, index) => {
                        // const check = pathname === r.link;
                        return (
                            <View key={index}>
                                <Pressable onPress={() => navigation.navigate(r?.link)}   >
                                    <View style={styles.button}>
                                        <View style={styles.button_title_image}>
                                            <View>
                                                <Image
                                                    source={r?.color}
                                                    style={{
                                                        height: 20, width: 20, objectFit: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={[global_styles.text_lg, { textTransform: "capitalize", color: colors.black }]}>
                                                    {
                                                        r?.title
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Image
                                                source={assets_images.arrow_right_grey}
                                                style={{
                                                    height: 16, objectFit: 'contain',
                                                }}
                                            />
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>

        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 56,
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