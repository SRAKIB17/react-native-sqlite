import React, { useState } from 'react';
import colors from '../../../utils/colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import TouchableOpacityButton from '../../../components/button/TouchableOpacityButton';
import { global_styles } from '../../../styles/global';
import genQueryInsertSql from '../../../mysql_gen/genQueryInsertSql';
import { db } from '../../../navigators/NavigationContainer';
import Toast from '../../../components/toast/Toast';
import genQueryUpdateSql from '../../../mysql_gen/genQueryUpdateSql';

function UpdateTimeSlot({ navigation, setUpdateEntry, getAllTimeSlots, updateEntry }: { setUpdateEntry: any, navigation: any, getAllTimeSlots: any, updateEntry: any }) {
    const [fromTime, setFromTime] = useState(updateEntry?.fromTime)
    const [details, setDetails] = useState(updateEntry?.details)
    const [toTime, setToTime] = useState(updateEntry?.toTime)
    const [title, setTitle] = useState(updateEntry?.title)

    const [error, setError] = useState('')

    const addTimeSlots = async () => {
        setError('')
        if (!Boolean(fromTime) || !Boolean(details) || !Boolean(toTime) || !Boolean(title)) {
            setError("Please fill all box")
        }
        else {

            const insertSql = genQueryUpdateSql({
                table: 'routine_time_slots',
                update_data: {
                    fromTime: fromTime,
                    toTime: toTime,
                    dayID: navigation?.params?.routineID,
                    details: details,
                    title: title
                },
                condition: `id = ${updateEntry?.id} AND dayID = ${updateEntry?.dayID}`
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
            setUpdateEntry({});
        }
    }
    return (
        <View style={{ display: "flex", gap: 16, padding: 4, }}>

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
                    defaultValue={updateEntry?.title}
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
                    defaultValue={updateEntry?.details}
                    onChangeText={(text) => setDetails(text)}
                    placeholder="Write a details of time slots"
                    style={[{ height: 100, borderColor: colors.primary, borderWidth: 1, paddingHorizontal: 4, }]}
                    multiline
                />
            </View>
            <View style={{ display: 'flex', flexDirection: "row", gap: 4, }}>
                <View>
                    <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                        From
                    </Text>
                    <TextInput
                        onChangeText={(text) => setToTime(text)}
                        placeholder="From time slot"
                        style={styles.input}
                        defaultValue={updateEntry?.fromTime}
                    />
                </View>
                <View>
                    <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                        To
                    </Text>
                    <TextInput
                        onChangeText={(text) => setFromTime(text)}
                        placeholder="To time slot"
                        style={styles.input}
                        defaultValue={updateEntry?.toTime}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacityButton
                    onPress={addTimeSlots}
                    text='Update'
                    containerStyles={{ height: 40, backgroundColor: colors.primary, borderWidth: 0 }}
                    textStyle={{ color: colors.primary_text }}
                />
            </View>
        </View>
    );
}

export default UpdateTimeSlot;


export const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        padding: 8,
    },
});