import React, { PropsWithChildren, useContext, useRef, useState } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { NavigationProvider } from '../../../navigators/NavigationContainer';
import AppsAllInfoDeveloper from './AppsAllInfoDeveloper';
import { assets_images } from '../../../assets/assets_images';

type SectionProps = PropsWithChildren<{
    // drawerRef: React.RefObject<DrawerLayoutAndroid>
}>;
const DrawerMenuNavbar = ({ children }: SectionProps): JSX.Element => {
    const { drawerRef } = useContext(NavigationProvider)
    const drawer = useRef<DrawerLayoutAndroid>(null);

    const navigationView = () => {
        return <AppsAllInfoDeveloper />
    }

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}>
            {
                children
            }
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({

    navigationContainer: {
        backgroundColor: 'white',
        // backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});

export default DrawerMenuNavbar;