/* eslint-disable prettier/prettier */
import React, { createContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate, translateInterface } from '../translate/translate';
import { DrawerLayoutAndroid } from 'react-native';
import default_routine from '../db/default_routine.json'

// import * as SQLite from 'expo-sqlite';
// export const db = SQLite.openDatabase('student_tools');

// const routine_time_slots = `
// CREATE TABLE IF NOT EXISTS routine_time_slots (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     fromTime VARCHAR(255) NOT NULL,
//     toTime VARCHAR(255) NOT NULL NOT NULL,
//     dayID INTEGER NOT NULL,
//     details TEXT,
//     title TEXT
// );
// `
// const income_expenditure = `
// CREATE TABLE IF NOT EXISTS income_expenditure (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     type VARCHAR(255) NOT NULL,
//     amount INT NOT NULL,
//     createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     details TEXT,
//     monthID REAL NOT NULL,
//     title TEXT
// );
// `
// const x = `INSERT INTO routine_time_slots (from_time, to_time, details, title,dayID) VALUES('12:00 am', '1:00 am', 'Midnight', 'Sleep',2)`

// db.exec([
//     { sql: routine_time_slots, args: [] },
//     { sql: income_expenditure, args: [] },
// ], false, (err, result) => {
//     console.log(result)
//     // console.log(result);
// });

export interface navigationInterface {
    navigation: {
        navigate: (value: string, paramsProps?: { key: string; value?: string | number | undefined; }[]) => void,
        params: {} | any,
        pathname: string,
        setParams: (props: { key: string; value?: string | number | undefined; }[]) => void,
    },
    translate: translateInterface,
    drawerRef: React.RefObject<DrawerLayoutAndroid>,
    routine: {
        id: number,
        day: string,
        time_slots: {
            from: string,
            to: string,
            details: string,
            title: string
        }[]
    }[],
}

export const NavigationProvider = createContext<navigationInterface>({
    navigation: {
        params: {},
        navigate(value, hasParams) { },
        pathname: '',
        setParams: () => { },
    },
    translate: translate?.en,
    drawerRef: { current: null },
    routine: default_routine,
})



export default function NavigationContainer({ children }: { children: React.ReactNode }): JSX.Element {

    const [screen, setScreen] = useState('/home');
    const [params, setAllParams] = useState<{}>({});
    const [routine, setRoutine] = useState<{}[]>([{}]);
    const drawerRef = useRef<DrawerLayoutAndroid>(null);

    class navigation {
        navigate = async (value: string, paramsProps = [{ key: '', value: '' }]) => {

            if (Boolean(paramsProps?.[0]?.key) && (Boolean(paramsProps?.[0]?.value) || paramsProps?.[0]?.value == '0')) {

                const paramsObj: Array<{ [key: string]: any }> = paramsProps?.map(r => {
                    return {
                        [r?.key]: r?.value
                    }
                })

                const mergedObject = Object.assign({}, ...paramsObj);


                const p = {
                    ...params,
                    ...mergedObject
                }
                setScreen(value)
                setAllParams(p)
                await AsyncStorage.setItem('link', value)
                await AsyncStorage.setItem('params', JSON.stringify(p))
            }
            else {
                setScreen(value)
                await AsyncStorage.setItem('link', value)
                await AsyncStorage.removeItem('params')
            }
        }

        setParams = async (paramsProps = [{ key: '', value: '' }]) => {
            const paramsObj: Array<{ [key: string]: any }> = paramsProps?.map(r => {
                return {
                    [r?.key]: r?.value
                }
            })
            const mergedObject = Object.assign({}, ...paramsObj);

            const p = {
                ...params,
                ...mergedObject
            }

            setAllParams(p)
            await AsyncStorage.setItem('params', JSON.stringify(p))
        }

        get params() {
            return params
        }
        get pathname() {
            return screen
        }
    }


    const [language, setLanguage] = useState<translateInterface>(translate?.bn)



    useEffect(() => {
        setLanguage(translate?.bn)
        setRoutine(default_routine)
        AsyncStorage.getItem('link').then(r => {
            if (r) {
                setScreen(r)
            }
            else {
                setScreen('/home')
            }
        })
        // *****************************************************

        AsyncStorage.getItem('params').then(r => {
            if (r) {
                setAllParams(JSON.parse(r))
            }
            else {
                setAllParams({})
            }
        })

        return () => { }
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('language').then(r => {
            if (r == 'bn') {
                setLanguage(translate?.bn)
            }
            else {
                setLanguage(translate?.en)
            }
        })
    }, [screen])
    const navigationConstructor: any = new navigation()

    return (
        <NavigationProvider.Provider
            value={{
                routine: routine,
                navigation: navigationConstructor,
                translate: language,
                drawerRef: drawerRef,
            }}
        >
            {
                children
            }
        </NavigationProvider.Provider>
    );
}