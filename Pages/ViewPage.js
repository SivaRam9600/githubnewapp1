import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Toast
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { BackHandler } from 'react-native';

const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      data: [],
      expandedItem: null,
    };
  }

  backButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount = () => {
    this.loadData();
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  }

  componentWillUnmount = () =>{
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }



  loadData = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM MyTable', [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({ data: temp });
        Toast.show('Record deleted successfully');
      });
    });
    
  };

  handleEdit = (id) => {
    this.props.navigation.navigate('Update', { itemId: id });
  };

  handleDelete = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.confirmDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  confirmDelete = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM MyTable WHERE id = ?',
        [id],
        (tx, result) => {
          console.log('Record deleted successfully');
          this.loadData(); // Refresh data after deletion
         
        },
        (error) => {
          console.log('Error in deleting record:', error);
          Alert.alert('Error', 'Failed to delete record');
        }
      );
    });
  };

  toggleItem = (id) => {
    this.setState((prevState) => ({
      expandedItem: prevState.expandedItem === id ? null : id,
    }));
  };

  renderDetailsItem = ({ item }) => {
    const isExpanded = this.state.expandedItem === item.id;

    return (
      <TouchableOpacity onPress={() => this.toggleItem(item.id)}>
        <View style={styles.itemContainer}>
          <Text style={[styles.itemText, { fontWeight: 'bold', color: '#2196F3' }]}>
            Name: {item.user_name}
          </Text>
          <Text style={styles.itemText}>Contact No: {item.user_contact}</Text>
          {isExpanded && (
            <>
              <Text style={styles.itemText}>Age: {item.user_age}</Text>
              <Text style={styles.itemText}>Address: {item.user_address}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => this.handleDelete(item.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={() => this.handleEdit(item.id)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
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
          <Text style={styles.headerText}>Employee List</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderDetailsItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
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

export default DetailsScreen;
