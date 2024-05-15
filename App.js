/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */





import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Pages/HomePage';
import Insert from './Pages/Insert';
import Delete from './Pages/Delete';
import Update from './Pages/Update';
import ViewPage from './Pages/ViewPage';


import {
  Text,
  View,
  Dimensions,
  Alert,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();



export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
}

  componentDidMount = async () => {

  };

  componentWillUnmount() {

  }


  render() {



    return (

      // <View>
      //   <Text>This is an App.tsx</Text>
      // </View>

      // <GestureHandlerRootView>

      // <NavigationContainer>
      //   <Stack.Navigator initialRouteName="Login">
      //     <Stack.Screen name="Login" component={Login} />
      //   </Stack.Navigator>
      // </NavigationContainer>

      // </GestureHandlerRootView>


      <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="Insert" component={Insert} />
            <Stack.Screen name="Delete" component={Delete} />
            <Stack.Screen name="Update" component={Update} />
            <Stack.Screen name="ViewPage" component={ViewPage} />

            
    
          </Stack.Navigator>
        </NavigationContainer>
      
    </GestureHandlerRootView>


    );
  }
}


const styles = StyleSheet.create({

 
});














// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
