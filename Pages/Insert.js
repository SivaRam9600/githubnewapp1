

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { BackHandler } from 'react-native';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

class InsertData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      age: '',
      contactNo: '',
      Address: '',
    };
    this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
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

  handleInputChangeName = (key, value) =>{
  const onlyLetters = /^[a-zA-Z\s]*$/;
  if (onlyLetters.test(value) || value === '') {
    this.setState({ [key]: value });
  }
  }

  handleChangeAge = (key, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 3) {
      this.setState({ [key]: numericValue });
    }
  };


  handleChangeMobNum = (key, value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      this.setState({ [key]: numericValue });
    }
  };
  
  handleSave = () => {
    const { id, name, age, contactNo, Address } = this.state;

    if (!name || !age || !contactNo) {
      Alert.alert('Error', 'Please enter all required fields');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM MyTable WHERE id = ?',
        [id],
        (tx, resultSet) => {
          if (resultSet.rows.length > 0) {
            Alert.alert('Error', 'User ID already exists');
          } else {
            db.transaction((tx) => {
              tx.executeSql(
                'INSERT INTO MyTable (user_name, user_age, user_contact, user_address) VALUES (?,?,?,?)',
                [name, age, contactNo, Address],
                (tx, result) => {
                  console.log('Data inserted successfully');
                  this.setState({
                    id: '',
                    name: '',
                    age: '',
                    contactNo: '',
                    Address: '',
                  });
                  Toast.show('Data inserted successfully');
                  this.props.navigation.goBack();
                },
                (error) => {
                  console.log('Error in inserting data:', error);
                  Alert.alert('Error', 'Failed to save data');
                }
              );
            });
          }
        },
        (error) => {
          console.log('Error in checking user_id:', error);
          Alert.alert('Error', 'Failed to check user_id');
        }
      );
    });
  };

  render() {
    const { id, name, age, contactNo, Address } = this.state;

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
          <Text style={styles.headerText}>Add Employee Details</Text>
        </View>
      </View>

<View style={styles.container}>
{/* 
        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={(text) => this.handleInputChange('id', text)}
          value={id}
          keyboardType="numeric"
        /> */}


        {/* <View>
        <Text>NAME</Text>
        </View> */}
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleInputChangeName('name', text)}
          value={name}
        />
{/* <View style={{justifyContent:'center'}}>
        <Text>AGE</Text>
        </View> */}
        <TextInput
          style={styles.input}
          placeholder="Enter Your Age"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleChangeAge('age', text)}
          value={age}
          keyboardType="numeric"
         
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Your Mob No"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleChangeMobNum('contactNo', text)}
          value={contactNo}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Your Address"
          placeholderTextColor="black"
          onChangeText={(text) => this.handleInputChange('Address', text)}
          value={Address}
        />
       
        {/* <Button title="SAVE" onPress={this.handleSave} /> */}
        
       <View style={styles.ButtonContainer}> 
           
           <TouchableOpacity
             style={styles.button}
             onPress={this.handleSave} 
           >
             <Text style={{ color: '#fff', fontFamily: 'Roboto-Medium' }}>
              Submit
             </Text>
           </TouchableOpacity>
           </View> 
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

  backImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
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
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0080FF', // Theme color for back button
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




  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  ButtonContainer: {
    height: 45,
    width: '60%',
    marginTop: 30,
    marginHorizontal: 60,
    borderColor: '#0f76ae',
    borderWidth: 2,
    bottom:10,
 
    borderRadius: 25,
      backgroundColor: '#0f76ae',
  },

  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
  },

});

export default InsertData;

