import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import banners from './banners';
const { width } = Dimensions.get("window");

export default function Banner() {
    let currentSlideIndex = 0;
    const [currentSlide, setCurrentSlide] = useState(banners?.[0])

    const [slideIndex, setSlideIndex] = useState(0)
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % banners.length;
        setSlideIndex(currentSlideIndex)
        setCurrentSlide(banners[currentSlideIndex])
    }

    function previousSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + banners.length) % banners.length;
        setSlideIndex(currentSlideIndex)
        setCurrentSlide(banners[currentSlideIndex])
    }

    useEffect(() => {
        // Automatic slide change every 3 seconds

        const interval = setInterval(() => nextSlide(), 3000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Animated.ScrollView
            horizontal
            snapToInterval={100}
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false } //
            )}
        >
            {
                banners.map((slide) => {
                    return <View style={styles.container} key={slide.id}>
                        <Image
                            style={{
                                resizeMode: "cover",
                                width: "100%",
                                height: 150,
                                borderRadius: 10,
                            }}
                            source={slide.imageUrl}
                        />
                    </View>
                })
            }
        </Animated.ScrollView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: "center",
        paddingHorizontal: 15,
    },
});
