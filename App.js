/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  CheckBox, 
  FlatList,
  Alert
} from 'react-native';
import Item from './Item';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      data : [{
        id:1,
        status: true,
        task: 'Task 1'
      }, {
        id:2,
        status: false,
        task: 'Task 2'
      }, {
        id:3,
        status: false,
        task: 'Task 3'
      }],
      selected: (new Map(): Map<string, boolean>)
    }
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = () => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _onPressDelete = (index) => {
    const data = this.state.data;
    data.splice(index,1);
    this.setState({data:data});
  };

  _renderItem = ({item}) => (
    <Item
      id={item.id}
      task={item.task}
      status={item.status}
      onPressItem={this._onPressItem}
      onPressDelete={this._onPressDelete}
      selected={!this.state.selected.get(item.id)}
    />
  );

  _addItem = () => {
    const item = this.state.text;
    if (item == '') {
      Alert.alert(
        'Error',
        'Tidak Boleh Kosong',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      const data = this.state.data;
      data.push({
        id: data.length + 1,
        status: false,
        task: item
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={{fontSize: 16, textAlign: 'center'}}>
        To Do List
      </Text>
        <View style={{ margin: 5, width: '100%', flexDirection: 'row'}}>
          <TextInput 
          style={{fontSize: 12, width: '70%', marginRight: 5}}     
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} />
          <Button onPress={() => this._addItem()} style={{width:10, height: 10}}title="+">
          </Button>
        </View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  todo: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
