import React, { useState } from 'react';
import colors from '../../../utils/colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import TouchableOpacityButton from '../../../components/button/TouchableOpacityButton';
import { global_styles } from '../../../styles/global';
import genQueryInsertSql from '../../../mysql_gen/genQueryInsertSql';
import { db } from '../../../navigators/NavigationContainer';
import Toast from '../../../components/toast/Toast';

function AddNewTimeSlot({ navigation, setNewEntry, getAllTimeSlots }: { setNewEntry: any, navigation: any, getAllTimeSlots: any }) {
    const [fromTime, setFromTime] = useState('')
    const [details, setDetails] = useState('')
    const [toTime, setToTime] = useState('')
    const [title, setTitle] = useState('')

    const [error, setError] = useState('')


    const addTimeSlots = async () => {
        setError('')
        if (!Boolean(fromTime) || !Boolean(details) || !Boolean(toTime) || !Boolean(title)) {
            setError("Please fill all box")
        }
        else {

            const insertSql = genQueryInsertSql({
                table: 'routine_time_slots',
                insert_data: {
                    fromTime: fromTime,
                    toTime: toTime,
                    dayID: navigation?.params?.routineID,
                    details: details,
                    title: title
                }
            })
            db.transaction(
                (tx) => {
                    tx.executeSql(insertSql, [], (err, result) => {
                        if (!Boolean(result?.rowsAffected)) {
                            Toast({ text: "Something is wrong" })
                        } else {
                            getAllTimeSlots()
                        }
                    });
                },
            );
            setNewEntry(false);
        }
    }
    return (
        <View style={{ display: "flex", gap: 16 }}>

            {
                Boolean(error) &&
                <Text style={[global_styles.text_sm, global_styles.font_medium, { color: colors.danger }]}>
                    {error}
                </Text>
            }
            <View>
                <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                    Title
                </Text>
                <TextInput
                    onChangeText={(text) => setTitle(text)}
                    placeholder="Write a title of time slots"
                    style={styles.input}
                />
            </View>

            <View>
                <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                    Details
                </Text>
                <TextInput
                    onChangeText={(text) => setDetails(text)}
                    placeholder="Write a details of time slots"
                    style={[{ height: 100, borderColor: colors.primary, borderWidth: 1, paddingHorizontal: 4, }]}
                    multiline
                // numberOfLines={4}
                // maxLength={40}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: "row", gap: 4, }}>
                <View>
                    <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                        From
                    </Text>
                    <TextInput
                        onChangeText={(text) => setToTime(text)}
                        placeholder="11:00 am"
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                        To
                    </Text>
                    <TextInput
                        onChangeText={(text) => setFromTime(text)}
                        placeholder="11:30 am"
                        style={styles.input}

                    />
                </View>
            </View>
            <View>
                <TouchableOpacityButton
                    onPress={addTimeSlots}
                    text='Add New'
                    containerStyles={{ height: 40, backgroundColor: colors.primary, borderWidth: 0 }}
                    textStyle={{ color: colors.primary_text }}
                />
            </View>
        </View>
    );
}

export default AddNewTimeSlot;


export const styles = StyleSheet.create({
    input: {
        borderColor: colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        padding: 8,
    },
});