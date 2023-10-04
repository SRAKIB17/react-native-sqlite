import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { global_styles } from '../../../styles/global';
import TouchableOpacityButton from '../../../components/button/PressableButton';
import colors from '../../../utils/colors';
import timeAgoSince from '../../../hooks/timeAgo';
interface notification {
    "userID": number | null,
    "email": string | null,
    "notificationID": number,
    "notificationMessage": string,
    "readAt": boolean,
    "actionURL": string,
    "isArchived": boolean,
    "isDeleted": boolean,
    "createdAt": string,
    "notificationType": string,
    "notificationTitle": string,
    "isFromAdmin": boolean,
    "issuedBy": boolean,
    "images": string,
    "priority": boolean | null
}

export default function EachNotifications({ notification }: { notification: notification }) {
    const { images, notificationTitle } = notification
    const product_image = images?.split(',')?.[0]?.trim();
    return (
        <View style={styles.notification}>
            {
                Boolean(product_image) &&
                <View>
                    <Image source={{ uri: product_image, cache: 'force-cache', }} style={styles.notifications_image} />
                </View>
            }

            <View style={styles.notification_info}>
                {/* Notification Title */}
                <View>
                    <View>
                        <Text style={[global_styles.text_base, global_styles.font_medium]}>
                            {
                                notificationTitle?.slice(0, 30)
                            }
                            {
                                notificationTitle?.length >= 30 && "\n"
                            }
                            {
                                notificationTitle?.slice(30, 60)
                            }
                            {
                                notificationTitle?.length >= 60 && "\n"
                            }
                            {
                                notificationTitle?.length >= 60 && "..."
                            }
                        </Text>
                    </View>

                    <View>
                        <Text style={[global_styles.text_xs, { color: colors.grey }]}>
                            {
                                timeAgoSince(notification?.createdAt)
                            }
                        </Text>
                    </View>
                </View>
                {/* Messages notification */}
                <View>
                    <Text style={global_styles.text_sm}>
                        {
                            notification?.notificationMessage
                        }
                    </Text>
                </View>

                {/* _____________________Product price stock quantity_____________________ */}
                {/* <View>
                    <View style={{ alignItems: 'baseline' }}>
                        <Text style={styles.stock}>
                            {
                                "availabilityStatus"
                            }
                        </Text>
                    </View>

                    <View>
                    </View>
                </View> */}
                {/* ___________ Product price stock quantity _____________*/}
            </View>

            {/* <View style={{ position: 'absolute', right: 16, top: '50%' }}>
                <TouchableOpacityButton
                    key={title}
                    onPress={() => { }}
                    image={assets_images.arrow_right_light}
                    containerStyles={{
                        backgroundColor: colors.primary,
                        width: 32,
                        height: 32,
                        borderWidth: 0,
                    }}
                />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    notification: {
        backgroundColor: colors.white,
        padding: 10,
        borderColor: colors.border_color,
        borderWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        marginVertical: 6,
        // borderRadius: 6,
    },
    notification_info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    notifications_image: {
        width: 80,
        borderRadius: 6,
        height: 80,
        objectFit: 'fill'
    },
});
