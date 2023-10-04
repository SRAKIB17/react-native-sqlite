import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationProvider, navigationInterface } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';
import { transactionsDBType } from './CurrentIncomeExpenditureScreen';
import transactionsDefaultDB from '../../db/transactions.json'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import PressableButton from '../../components/button/PressableButton';
import decimalPoint from '../../hooks/decimalPoint';
import UpdateIncomeExpenditure from './components/UpdateIncomeExpenditure';


export default function SpecificMonthlyHistory(props: navigationInterface) {
    const { routine, navigation, translate } = props
    const { not_found, income, expenditure, savings } = translate

    const [updateEntry, setUpdateEntry] = useState<{}>({})

    const [transactionsDB, setTransactionsDB] = useState<transactionsDBType[]>([])
    const getDatabase = () => {
        AsyncStorage.getItem('transactions').then(r => {
            if (r) {
                setTransactionsDB(JSON.parse(r))
            }
            else {
                AsyncStorage.setItem('transactions', JSON.stringify(transactionsDefaultDB.transactions))
            }
        })
    }
    useEffect(() => {
        getDatabase()
    }, [])


    const year = navigation.params?.expensiveYear
    const month = navigation?.params?.month

    const filter = transactionsDB?.filter(r => {
        return (new Date(r?.datetime)?.getMonth() == parseInt(month) && new Date(r?.datetime)?.getFullYear() == parseInt(year))
    })?.sort(function (a, b) {
        const a_date = new Date(a?.datetime).getDate()
        const b_date = new Date(b?.datetime).getDate()
        return b_date - a_date
    })

    function total(total: number, num: number) {
        return Number(total) + Number(num);
    }
    const total_expense: any = decimalPoint(filter?.filter(r => r.type == 'expense')?.map(r => r.amount)?.reduce(total, 0))
    const total_income: any = decimalPoint(filter?.filter(r => r.type == 'income')?.map(r => r.amount)?.reduce(total, 0))

    return (
        <SafeAreaView style={[global_styles.container, { flex: 1 }]}>

            <View style={{
                backgroundColor: colors.primary,
                padding: 16,
                marginBottom: 10,
                borderRadius: 6,
            }}>
                <Text style={[global_styles.text_lg, global_styles.font_medium, { color: colors.primary_text }]}>
                    {`${income}: $${total_income}`}
                </Text>
                <Text style={[global_styles.text_lg, global_styles.font_medium, { color: colors.primary_text }]}>
                    {`${expenditure}: $${total_expense}`}
                </Text>
                <View style={{ borderTopWidth: 1, borderTopColor: colors.border_color, marginVertical: 4 }} />


                <Text style={[global_styles.text_lg, global_styles.font_medium, { color: (total_income - total_expense < 0 ? colors.danger : colors.primary_text) }]}>
                    {`${savings}: $${total_income - total_expense}`}
                </Text>
            </View>
            {
                Boolean(Object.values(updateEntry)?.length) &&
                <>
                    <View style={{ alignItems: 'flex-end', paddingBottom: 6 }}>
                        <PressableButton
                            onPress={() => {
                                if (Boolean(Object.values(updateEntry)?.length)) {
                                    setUpdateEntry({})
                                }
                                else {
                                    setUpdateEntry({})
                                }
                            }}
                            text="Back"
                            containerStyles={{ height: 40, backgroundColor: colors.primary, width: 100, borderWidth: 0 }}
                            textStyle={{ color: colors.primary_text }}
                        />
                    </View>
                    <UpdateIncomeExpenditure
                        transactionsDB={transactionsDB}
                        navigation={navigation}
                        setUpdateEntry={setUpdateEntry}
                        updateEntry={updateEntry}
                    />
                </>
            }

            <View>
                {
                    Boolean(Object.values(updateEntry)?.length) ||
                    <View>
                        {
                            filter?.length ?
                                <>
                                    {
                                        filter?.map((r, index: any) => {
                                            // const check = pathname === r.link;
                                            return (
                                                <View key={index} style={styles.each_routine}>
                                                    <View style={{
                                                        justifyContent: 'center', alignContent: 'center'
                                                    }}>
                                                        <ImageBackground
                                                            source={assets_images.blank_date_3d}
                                                            style={{ width: 48, height: 54 }}
                                                        >
                                                            <Text style={[global_styles.text_base, global_styles.font_medium, {
                                                                textAlign: 'center',
                                                                paddingTop: 10,
                                                                color: colors.white
                                                            }]}>
                                                                {new Date(r?.datetime).getDate()}
                                                            </Text>
                                                        </ImageBackground>
                                                    </View>

                                                    <View style={{ gap: 4, flex: 1 }}>

                                                        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-start' }}>
                                                            <Text style={[global_styles.text_lg, global_styles.font_bold, { textTransform: "capitalize" }]}>
                                                                {
                                                                    r?.title
                                                                }

                                                            </Text>
                                                            <Text style={global_styles.text_xs}>
                                                                ({r?.type})
                                                            </Text>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image source={assets_images.clock_3d} style={{ width: 16, height: 16 }} />
                                                            <Text style={global_styles.text_xs}>
                                                                {new Date(r?.datetime).toLocaleTimeString()}
                                                            </Text>
                                                        </View>

                                                        <Text style={[global_styles.text_sm, global_styles.font_light, { textTransform: "capitalize" }]}>
                                                            {
                                                                r?.details
                                                            }
                                                        </Text>

                                                        <View style={{ flexDirection: "row", alignItems: 'center', gap: 4 }}>
                                                            <Image
                                                                source={r?.type == 'expense' ? assets_images.expenditure_3d : assets_images?.income_3d}
                                                                style={{
                                                                    height: 20, width: 20, objectFit: 'contain',
                                                                }}
                                                            />
                                                            <Text style={[global_styles.text_base, global_styles.font_medium]}>
                                                                ${r?.amount}
                                                            </Text>
                                                        </View>

                                                        <View style={{ alignItems: 'center', gap: 4, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <PressableButton
                                                                onPress={() => { setUpdateEntry(r) }}
                                                                containerStyles={{ width: 40, backgroundColor: 'transparent' }}
                                                                image={assets_images.edit_3d}
                                                                imageStyle={{ height: 40 }}
                                                            />
                                                            <PressableButton
                                                                onPress={() => {
                                                                    const filter = transactionsDB?.filter((del) => {
                                                                        return del?.id !== r?.id
                                                                    })
                                                                    AsyncStorage.setItem('transactions', JSON.stringify(filter)).then(r => {
                                                                        getDatabase()
                                                                    })
                                                                }}
                                                                containerStyles={{ width: 40, backgroundColor: 'transparent' }}
                                                                image={assets_images.delete_3d}
                                                                imageStyle={{ height: 40 }}
                                                            />
                                                        </View>

                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </>
                                :
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: "center", paddingTop: 100 }}>
                                    <Text style={[global_styles.text_lg, global_styles.font_bold]}>
                                        {not_found}
                                    </Text>
                                    <Image source={assets_images.income_expenditure_3d} />
                                </View>
                        }
                    </View>
                }

            </View>
        </SafeAreaView>
    );

}
export const styles = StyleSheet.create({
    routine: {
        borderRadius: 6,
        padding: 5,
    },
    each_routine: {
        flex: 1,
        marginVertical: 4,
        gap: 10,
        borderRadius: 6,
        padding: 10,
        flexDirection: "row",
        backgroundColor: colors.white,
        borderColor: colors.border_color,
        borderWidth: 1,
        alignItems: 'flex-start',

    },
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