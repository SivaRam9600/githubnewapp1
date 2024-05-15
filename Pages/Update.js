import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

class InsertData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '', // Employee ID (for editing)
      name: '',
      age: '',
      contactNo: '',
      Address: '',
    };
    this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
    const { itemId } = this.props.route.params;
    if (itemId) {
      // Load data for editing if itemId is provided
      this.loadData(itemId);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  backButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  handleInputChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSave = () => {
    const { id, name, age, contactNo, Address } = this.state;

    if (!name || !age || !contactNo || !Address) {
      Alert.alert('Error', 'Please enter all required fields');
      return;
    }

    db.transaction((tx) => {
      if (id) {
        // Update existing record
        tx.executeSql(
          'UPDATE MyTable SET user_name=?, user_age=?, user_contact=?, user_address=? WHERE id=?',
          [name, age, contactNo, Address, id],
          (tx, result) => {
            console.log('Data updated successfully');
            Toast.show('Data updated successfully');
            this.props.navigation.navigate('ViewPage');
            this.props.navigation.goBack();
          },
          (error) => {
            console.log('Error in updating data:', error);
            Alert.alert('Error', 'Failed to update data');
          }
        );
      } else {
        // Insert new record
        tx.executeSql(
          'INSERT INTO MyTable (user_name, user_age, user_contact, user_address) VALUES (?,?,?,?)',
          [name, age, contactNo, Address],
          (tx, result) => {
            console.log('Data inserted successfully');
            Toast.show('Data inserted successfully');
            this.setState({
              name: '',
              age: '',
              contactNo: '',
              Address: '',
            });
          },
          (error) => {
            console.log('Error in inserting data:', error);
            Alert.alert('Error', 'Failed to save data');
          }
        );
      }
    });
  };

  loadData = (itemId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM MyTable WHERE id = ?',
        [itemId],
        (tx, resultSet) => {
          if (resultSet.rows.length > 0) {
            const { user_name, user_age, user_contact, user_address } = resultSet.rows.item(0);
            this.setState({
              id: itemId,
              name: user_name,
              age: user_age.toString(),
              contactNo: user_contact.toString(),
              Address: user_address,
            });
          }
        },
        (error) => {
          console.log('Error in loading data:', error);
        }
      );
    });
  };

  render() {
    const { name, age, contactNo, Address, id } = this.state;

    return (
      <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props.navigation.goBack()}>
          <Image
              source={require('./assets/back_arrow.png')}
              style={styles.backImage}
            />
         
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Edit Employee Details</Text>
        </View>
      </View>
      
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleInputChange('name', text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Age"
          onChangeText={(text) => this.handleInputChange('age', text)}
          value={age}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Mob"
          onChangeText={(text) => this.handleInputChange('contactNo', text)}
          value={contactNo}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Address"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleInputChange('Address', text)}
          value={Address}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSave}>
          <Text style={{ color: '#fff', fontFamily: 'Roboto-Medium' }}>
            {id ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '60%',
    height: 45,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f76ae',
    borderRadius: 25,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#0f76ae',
    
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: 50,
    // height: '100%',
  },

  backImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF', // Theme color for header text
  },
});

export default InsertData;
