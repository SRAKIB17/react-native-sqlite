import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProvider } from '../../navigators/NavigationContainer';
import { global_styles } from '../../styles/global';
import LanguageSettings from './components/LanguageSettings';
import colors from '../../utils/colors';

const user_info = {
    name: "MD Rakibul Islam",
    email: 'reakibulssc5@gmail.com',
    profile: require('../../assets/images/male_avatar.png')
}

export default function SettingsScreen() {
    const { translate } = useContext(NavigationProvider)
    const { change_language } = translate
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={global_styles.container}>

            <View style={{ borderTopColor: colors.border_color, borderTopWidth: 0.5 }}>

                <View>
                    <LanguageSettings button={styles.button} button_title_image={styles.button_title_image} />
                </View>

                {/* <View>
                    <TouchableOpacity
                        onPress={() => navigate("r?.link")}
                    // style={{ marginTop: -48 }}
                    // disabled={check}
                    >
                        <View style={styles.button}>
                            <View style={styles.button_title_image}>
                                <View>
                                    <Image
                                        source={assets_images.log_out_dark}
                                        style={{
                                            height: 20, width: 20, objectFit: 'contain',
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text style={global_styles.text_lg}>
                                        {
                                            log_out
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
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

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