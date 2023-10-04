import React, { createContext, useRef } from 'react';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import AuthenticationCheckProvider from './src/context/Authentication/AuthenticationCheckProvider';
import colors from './src/utils/colors';
import NavigationContainer from './src/navigators/NavigationContainer';
import DrawerMenuNavbar from './src/components/shared/Navbar/DrawerMenuNavbar';
import Navigator from './src/navigators/Navigator';
import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase({
  name: "test",
  location: "default",
  createFromLocation: 'test.db'
}, () => console.log('success'),
  (err) => console.log(err, 'error')
);

(db.executeSql('select * from test', [], (err, result) => {
  console.log(err)
}))

function App(): JSX.Element {

  return (
    <AuthenticationCheckProvider>
      <NavigationContainer>
        <DrawerMenuNavbar>
          <StatusBar
            animated={true}
            barStyle='light-content'
            backgroundColor={colors.primary}
            showHideTransition={'slide'}
            hidden={false}
          />
          <Navigator />
        </DrawerMenuNavbar>
      </NavigationContainer>
    </AuthenticationCheckProvider>
  );
}

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
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
});

export default App;
