import { Animated, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationProvider, navigationInterface } from '../../navigators/NavigationContainer';
import colors from '../../utils/colors';
import { assets_images } from '../../assets/assets_images';
import { global_styles } from '../../styles/global';


export default function IncomeExpenditureScreen(props: navigationInterface) {
    const { routine, navigation, translate } = props
    const { current_income_expenditure, income_expenditure_history } = translate
    const menu = [
        {
            title: current_income_expenditure,
            link: '/income-expenditure/current',
            color: assets_images.income_expenditure_3d,
        },
        {
            title: income_expenditure_history,
            link: '/income-expenditure/history',
            color: assets_images.income_expenditure_3d,
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={global_styles.container}>
                {
                    menu?.map((r: any, index) => {
                        // const check = pathname === r.link;
                        return (
                            <View key={index}>
                                <Pressable onPress={() => navigation.navigate(r?.link)}   >
                                    <View style={styles.button}>
                                        <View style={styles.button_title_image}>
                                            <View>
                                                <Image
                                                    source={r?.color}
                                                    style={{
                                                        height: 20, width: 20, objectFit: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={[global_styles.text_lg,
                                                {
                                                    textTransform: "capitalize",
                                                    color: colors.black
                                                }
                                                ]}>
                                                    {
                                                        r?.title
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
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>

        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
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