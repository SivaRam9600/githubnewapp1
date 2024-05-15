import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('TableCreate');

    if (data !== '1') {
      this.database();
    }

    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  };

  backButtonClick() {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => console.log('NO Pressed') },
      ],
      { cancelable: false }
    );

    // Return true to enable back button override.
    return true;
  }

  database = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS MyTable(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_age INT(5), user_contact INT(10), user_address VARCHAR(255))',
        [],
        (tx, result) => {
          console.log('Table created successfully');
          // Alert.alert('Table created successfully');
        },
        (error) => {
          console.log('Error in table creation:', error);
        }
      );
    });

    await AsyncStorage.setItem('TableCreate', '1');
  };

  render() {
    return (
      <>
        <View style={styles.header}>

        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Employee</Text>
        </View>
      </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
              this.props.navigation.navigate('Insert');
            }}>
            <Text style={styles.gridText}>Add Employee</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
              this.props.navigation.navigate('ViewPage', { segmentIndex: 1 });
            }}>
            <Text style={styles.gridText}>Employee List</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    width: windowWidth,
    backgroundColor: '#0f76ae', // Steel Blue
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5', // Light Gray
  },
  gridItem: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4682B4', // Steel Blue
    elevation: 3, // Shadow effect
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4', // Steel Blue
  },
});

export default Notification;
