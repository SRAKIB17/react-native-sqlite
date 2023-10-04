import React, { useState } from 'react';
import colors from '../../../utils/colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import TouchableOpacityButton from '../../../components/button/TouchableOpacityButton';
import { global_styles } from '../../../styles/global';
import Toast from '../../../components/toast/Toast';
import DropDownPicker from '../../../components/dropdown/DropDownPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transactionsDBType } from '../CurrentIncomeExpenditureScreen';

function AddNewIncomeExpenditure(
    { navigation, setNewEntry, transactionsDB }:
        { setNewEntry: any, navigation: any, transactionsDB: transactionsDBType[] }) {
    const [details, setDetails] = useState('')
    const [amount, setAmount] = useState<number>(0)
    const [title, setTitle] = useState('');
    const [typeExpense, setType] = useState<{
        label: string;
        value: string;
    }>({ label: "", value: "" })

    const currentMonth = new Date().getMonth()

    const addTimeSlots = async () => {
        if (!Boolean(amount) || !Boolean(details) || !Boolean(amount) || !Boolean(title) || !Boolean(typeExpense)) {
            Toast({
                text: "Please fill all input filled"
            })
        }
        else {
            const add_new = {
                "id": transactionsDB?.length + 1,
                "datetime": new Date(),
                "title": title,
                "amount": amount,
                "details": details,
                "type": typeExpense?.value
            }
            AsyncStorage.setItem('transactions', JSON.stringify([...transactionsDB, add_new])).then(r => {
                setNewEntry(false)
            })
        }
    }

    return (
        <View style={{ display: "flex", gap: 16 }}>

            <View>
                <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                    Title
                </Text>
                <TextInput
                    onChangeText={(text) => setTitle(text)}
                    placeholder="Title"
                    style={styles.input}
                />
            </View>

            <View>
                <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                    Details
                </Text>
                <TextInput
                    onChangeText={(text) => setDetails(text)}
                    placeholder="Details"
                    style={[{ height: 100, borderColor: colors.primary, borderWidth: 1, paddingHorizontal: 4, }]}
                    multiline
                // numberOfLines={4}
                // maxLength={40}
                />
            </View>

            <View>
                <Text style={[global_styles.text_base, global_styles.font_medium, { paddingBottom: 4 }]}>
                    Amount
                </Text>
                <TextInput
                    onChangeText={(text) => {
                        const x = parseFloat(text)
                        if (x) {
                            setAmount(x)
                        }
                        else {
                            Toast({ text: "only integer or float value allow" })
                            setAmount(0)
                        }
                    }}
                    value={String(amount)}
                    placeholder="amount"
                    style={styles.input}
                />
            </View>
            <View>
                <DropDownPicker
                    items={[{ label: 'Income', value: 'income' }, { label: "Expense", value: 'expense' }]}
                    setValue={setType}
                    value={typeExpense}
                />
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

export default AddNewIncomeExpenditure;


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