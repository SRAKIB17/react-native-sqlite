import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationProvider, navigationInterface } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';
import { transactionsDBType } from './CurrentIncomeExpenditureScreen';
import transactionsDefaultDB from '../../db/transactions.json'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


export default function SpecificSelectYear(props: navigationInterface) {
    const { routine, navigation, translate } = props

    const [transactionsDB, setTransactionsDB] = useState<transactionsDBType[]>(transactionsDefaultDB.transactions)

    useEffect(() => {
        AsyncStorage.getItem('transactions').then(r => {
            if (r) {
                setTransactionsDB(JSON.parse(r))
            }
            else {
                AsyncStorage.setItem('transactions', JSON.stringify(transactionsDefaultDB.transactions))
            }
        })
    }, [])
    const months: any = translate;

    const year = parseInt(navigation?.params?.expensiveYear)
    const get_months = [...new Set(transactionsDB.filter(r => new Date(r?.datetime).getFullYear() == year)?.map(r => new Date(r?.datetime).getMonth()))]?.sort(function (a, b) { return a - b }).map(r => {
        return transactionsDefaultDB?.months.find(id => id?.id == r)
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                Boolean(year) &&
                <View style={global_styles.container}>
                    {
                        get_months?.map((r: any, index) => {
                            // const check = pathname === r.link;
                            // console.log(r)
                            return (
                                <View key={index}>
                                    <Pressable onPress={() => {
                                        navigation.navigate(`/income-expenditure/history/${navigation?.params?.expensiveYear}/${r?.id}`, [
                                            {
                                                key: 'month',
                                                value: r?.id
                                            },
                                            {
                                                "key": "expensiveYear",
                                                value: navigation?.params?.expensiveYear
                                            }
                                        ])
                                    }}>
                                        <View style={styles.button}>
                                            <View style={styles.button_title_image}>
                                                <View>
                                                    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                                                        <ImageBackground
                                                            source={assets_images.blank_date_3d}
                                                            style={{ width: 48, height: 54 }}
                                                        >
                                                            <Text style={[global_styles.text_sm, global_styles.font_medium, {
                                                                textAlign: 'center',
                                                                paddingTop: 10,
                                                                color: colors.white
                                                            }]}>
                                                                {r?.id + 1}
                                                            </Text>
                                                        </ImageBackground>
                                                    </View>

                                                </View>
                                                <View>
                                                    <Text style={[global_styles.text_lg, global_styles.font_medium, { textTransform: "capitalize" }]}>
                                                        {
                                                            months[r?.month?.toLowerCase()]
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
            }

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