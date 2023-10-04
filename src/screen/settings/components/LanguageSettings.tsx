import React, { useContext, useEffect, useState } from 'react';
import { Image, Switch, Text, View } from 'react-native';
import { NavigationProvider } from '../../../navigators/NavigationContainer';
import { assets_images } from '../../../assets/assets_images';
import { global_styles } from '../../../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../utils/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';


function LanguageSettings({ button, button_title_image }: { button: object, button_title_image: object }) {
    const { navigation: { navigate }, translate } = useContext(NavigationProvider)
    const { change_language } = translate
    const [isEnabled, setIsEnabled] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('language')
            .then(r => {
                if (r == 'bn') {
                    setIsEnabled(true)
                }
                else {
                    setIsEnabled(false)
                }
            })
    }, [])

    const toggleSwitch = async () => {
        const language = await AsyncStorage.getItem('language');

        if (language == 'en') {
            await AsyncStorage.setItem('language', 'bn')
        }
        else {
            await AsyncStorage.setItem('language', 'en')
        }
        await navigate('/home')
        setIsEnabled(previousState => !previousState)
    };

    return (
        <View style={button}>

            <View style={button_title_image}>
                <View>
                    <Image
                        source={assets_images.language_dark}
                        style={{
                            height: 20, width: 20, objectFit: 'contain',
                        }}
                    />
                </View>
                <View>
                    <Text style={[global_styles.text_lg, { color: colors.black }]}>
                        {
                            change_language
                        }
                    </Text>
                </View>
            </View>

            <View style={{ display: "flex", flexDirection: 'row', alignItems: "center", gap: 2 }}>
                <Text style={{ color: colors.black }}>
                    English
                </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={{ color: colors.black }}>
                    Bangla
                </Text>

            </View>
        </View>
    );
}

export default LanguageSettings;