import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';

function DropDownPicker({ setValue, value, items, placeholder = 'Please select' }:
    {
        value: {
            label: string;
            value: string;
        },
        setValue: React.Dispatch<React.SetStateAction<{
            label: string;
            value: string;
        }>>
        items: {
            label: string;
            value: string;
        }[],

        placeholder?: string
    }) {
    // open = { open }
    // value = { value }
    // items = { items }
    // setOpen = { setOpen }
    // setValue = { setValue }
    // setItems = { setItems }

    const [open, setOpen] = useState(false);

    return (
        <View style={{ position: "relative" }}>
            {
                open &&
                <View style={styles.items}>
                    {
                        items?.map((r) => {
                            return (
                                <View key={r?.value}>
                                    <TouchableOpacity onPress={() => {
                                        setValue(r)
                                        setOpen(false)
                                    }}>
                                        <View style={[styles.item]}>
                                            <Text style={global_styles.text_base}>
                                                {
                                                    r?.label
                                                }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            }

            <TouchableOpacity onPress={() => setOpen(!open)}>
                <View style={styles.select}>
                    <Text style={[global_styles.text_base, { textTransform: "capitalize" }]}>
                        {value?.label ? value?.label : placeholder}
                    </Text>
                    <View>
                        <Image
                            source={assets_images.arrow_right_grey}
                            style={{
                                width: 20, height: 20, objectFit: 'contain',
                                transform: [{ rotate: "90deg" }]
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    select: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderColor: colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        padding: 8,
    },
    items: {
        backgroundColor: colors.white,
        position: 'absolute',
        width: '100%',
        bottom: 48,
        zIndex: 200,
    },
    item: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderColor: colors.primary,
        borderWidth: 0.5,
        flex: 1,
        height: 48,
        paddingHorizontal: 16,
        padding: 8,
    },
})

export default DropDownPicker;