import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    StyleSheet,
    CheckBox,
    Alert
} from 'react-native';
// import {  } from 'react-native-elements';


export default class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.status
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CheckBox
                    style={{ margin: 5 }}
                    onValueChange={value => this.setState({ checked: !this.state.checked })}
                    value={this.state.checked}
                />
                <Text style={{ fontSize: 12, margin: 5, flex: 1 }}>{this.props.task}</Text>
                <Button onPress={() => this.props.onPressDelete(this.props.id-1)} style={{ margin: 5 }}
                    title='X'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        margin: 5
    }
});
