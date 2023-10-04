import React from 'react';
import { assets_images } from '../../assets/assets_images';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { global_styles } from '../../styles/global';
import colors from '../../utils/colors';

const developer = {
    name: "RAKIBUL ISLAM",
    email: 'rakibul.islam.r608@gmail.com',
    profile: assets_images.developer_srakib17,
    title: 'Software Engineer',
    phone: "+8801873989651",
    social: [
        {
            icon: assets_images.github3d,
            link: 'https://github.com/SRAKIB17'
        },
        {
            icon: assets_images.facebook3d,
            link: 'https://www.facebook.com/rakib2017'
        },
        {
            icon: assets_images.email3d,
            link: 'mailto:rakibul.islam.r608@gmail.com'
        },
        {
            icon: assets_images.phone3d,
            link: 'tel:+8801873989651'
        },
    ]
}

function DeveloperScreen() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20, }}>
                <Image
                    source={developer?.profile}
                    style={{ width: 100, height: 100, borderRadius: 8888888888, borderWidth: 1, borderColor: colors.primary }} />
            </View>
            <View>
                <Text style={[global_styles.text_2xl, global_styles.font_extrabold, { textAlign: 'center', paddingTop: 16, color: colors.black }]}>
                    {
                        developer?.name
                    }
                </Text>
            </View>
            <View>
                <Text style={[global_styles.text_base, global_styles.font_normal, { textAlign: 'center', color: colors.black }]}>
                    {
                        developer?.title
                    }
                </Text>
                <Text style={[global_styles.text_sm, global_styles.font_medium, { textAlign: 'center', color: colors.black }]}>
                    {
                        developer?.phone
                    }
                </Text>
            </View>
            <View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingVertical: 16

            }}>
                {
                    developer?.social?.map((r, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={async () => await Linking.openURL(r?.link)}>
                                <Image
                                    source={r?.icon} style={{
                                        height: 40,
                                        width: 40,
                                        objectFit: 'contain',
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View >
    );
}

export default DeveloperScreen;