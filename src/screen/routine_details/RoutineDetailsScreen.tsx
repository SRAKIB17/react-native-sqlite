import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';
import { NavigationProvider, db, navigationInterface } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import PressableButton from '../../components/button/PressableButton';
import genQueryInsertSql from '../../mysql_gen/genQueryInsertSql';
import TouchableOpacityButton from '../../components/button/TouchableOpacityButton';
import genQueryDeleteSql from '../../mysql_gen/genQueryDeleteSql';
import Toast from '../../components/toast/Toast';
import AddNewTimeSlot from './components/AddNewTimeSlot';
import UpdateTimeSlot from './components/UpdateTimeSlot';


export default function RoutineDetailsScreen(props: navigationInterface) {
    const { routine, navigation, translate } = props
    const { not_found } = translate
    const getAllTimeSlots = () => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM routine_time_slots WHERE dayID=?;`, [navigation?.params?.routineID], (err, result) => {
                const rows = result?.rows;
                setTimeSlots(rows?._array)
            });
        });
    }

    const [newEntry, setNewEntry] = useState<boolean>(false)
    const [updateEntry, setUpdateEntry] = useState<{}>({})
    const [timeSlots, setTimeSlots] = useState<any[]>([])

    useEffect(() => {
        getAllTimeSlots()
    }, [newEntry, updateEntry])

    return (

        <SafeAreaView style={[{ flex: 1 }, global_styles.container, styles.routine]}>

            <View style={{ alignItems: 'flex-end', paddingBottom: 6 }}>
                <PressableButton
                    onPress={() => {
                        if (Boolean(Object.values(updateEntry)?.length)) {
                            setUpdateEntry({})
                        }
                        else {
                            setNewEntry(!newEntry)
                            setUpdateEntry({})
                        }
                    }}
                    text={Boolean(Object.values(updateEntry)?.length) ? "Back" : (newEntry ? "Back" : 'Add New')}
                    containerStyles={{ height: 40, backgroundColor: colors.primary, width: 100, borderWidth: 0 }}
                    textStyle={{ color: colors.primary_text }}
                />
            </View>
            {
                newEntry && <AddNewTimeSlot
                    getAllTimeSlots={getAllTimeSlots}
                    navigation={navigation}
                    setNewEntry={setNewEntry}
                />
            }
            {
                Boolean(Object.values(updateEntry)?.length) && <UpdateTimeSlot
                    getAllTimeSlots={getAllTimeSlots}
                    updateEntry={updateEntry}
                    navigation={navigation}
                    setUpdateEntry={setUpdateEntry}
                />
            }

            {
                newEntry || Boolean(Object.values(updateEntry)?.length) ||
                <View>
                    {
                        timeSlots?.length ?

                            <>
                                {
                                    timeSlots?.map((r: any, index: any) => {
                                        // const check = pathname === r.link;
                                        return (
                                            <View key={index} style={styles.each_routine}>
                                                <View style={styles.title_image}>
                                                    <View>
                                                        <Image
                                                            source={assets_images.clock_3d}
                                                            style={{
                                                                height: 32, width: 32, objectFit: 'contain',
                                                            }}
                                                        />
                                                    </View>

                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[global_styles.text_lg, global_styles.font_bold, { textTransform: "capitalize" }]}>
                                                            {
                                                                r?.title
                                                            }
                                                        </Text>

                                                        <Text style={[global_styles.text_xs, global_styles.font_light, { textTransform: "capitalize" }]}>
                                                            {
                                                                r?.details
                                                            }
                                                        </Text>

                                                        <Text style={[global_styles.text_base, global_styles.font_medium]}>
                                                            {
                                                                `${r?.fromTime} to ${r?.toTime}`
                                                            }
                                                        </Text>


                                                        <View style={{ alignItems: 'center', gap: 4, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <PressableButton
                                                                onPress={() => { setUpdateEntry(r) }}
                                                                containerStyles={{ width: 40, backgroundColor: 'transparent' }}
                                                                image={assets_images.edit_3d}
                                                                imageStyle={{ height: 40 }}
                                                            />
                                                            <PressableButton
                                                                onPress={() => {
                                                                    const deleteRoute = genQueryDeleteSql({
                                                                        table: 'routine_time_slots',
                                                                        condition: `id = ${r?.id} AND ${r?.dayID}`
                                                                    })
                                                                    db.transaction(
                                                                        (tx) => {
                                                                            tx.executeSql(deleteRoute, [], (err, result) => {
                                                                                if (!Boolean(result?.rowsAffected)) {
                                                                                    Toast({ text: "Something is wrong" })
                                                                                } else {
                                                                                    getAllTimeSlots()
                                                                                }
                                                                            });
                                                                        }
                                                                    );
                                                                }}
                                                                containerStyles={{ width: 40, backgroundColor: 'transparent' }}
                                                                image={assets_images.delete_3d}
                                                                imageStyle={{ height: 40 }}
                                                            />
                                                        </View>
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
                                <Image source={assets_images.clock_3d} />
                            </View>
                    }
                </View>
            }

        </SafeAreaView>

    );
}

export const styles = StyleSheet.create({
    routine: {
        marginVertical: 4,
        borderRadius: 6,
        padding: 5,
    },
    each_routine: {
        marginVertical: 4,
        borderRadius: 6,
        padding: 10,
        backgroundColor: colors.white,
        borderColor: colors.border_color,
        borderWidth: 1
    },
    title_image: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },

    input: {
        borderColor: colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        padding: 8,
    },
});