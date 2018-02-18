import React, { Component } from 'react';
import {
	View,
	Alert,
	ActivityIndicator,
	Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Container, Content, Item, Input, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import colors from '../color/color';
import api from '../config/config';
import url from '../config/urlApi';

export default class LogIn extends Component {

	constructor(props){
    super(props);
    this.state = {
			username: '',
			password: '',
			isLoading: false
		}
	}
	
	register = () =>  {
		const { navigate } = this.props.navigation;
		navigate('Register');
	}

	todoList = () =>  {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'TodoList' })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	login = () => {
		const { username, password } = this.state;
		if (username === '' || password === '') {
			Alert.alert('Username and password can\'t be empty!');
		} else {
			this.setState({ isLoading: true });
			api.post(url.LOGIN, {
				username: username,
				password: password
			})
			.then((response) => {
				this.setState({ isLoading: false });
				const data = response.data;
				if (data.success) {
					this.todoList();
				} else {
					Alert.alert('Failed', data.message);
				}
			})
			.catch((error) => {
				this.setState({ isLoading: false });
				Alert.alert('Error', error);
			});
		}
	}

  render() {
    return (
			<Container style={{ backgroundColor: colors.bgLight }}>
				<Container style={{ paddingHorizontal: '10%', paddingTop: 48, justifyContent: 'center' }}>
					<Item style={{ marginBottom: 8 }}>
						<Input onChangeText={(username) => this.setState({username})} placeholderTextColor={colors.greyLight} placeholder="Username" style={{ fontSize: 20, color: colors.greyLight }} />
					</Item>
					<Item style={{ marginBottom: 8 }}>
						<Input onChangeText={(password) => this.setState({password})} secureTextEntry placeholderTextColor={colors.greyLight} placeholder="Password" style={{ fontSize: 20, color: colors.greyLight }} />
					</Item>
					<Button onPress={this.login.bind(this)} block style={{ borderRadius: 5, backgroundColor: colors.primaryDark, marginTop: 16 }}>
						<Text uppercase={false} style={{ fontSize: 18, fontWeight: '100' }}>Login</Text>
					</Button>
					<Button onPress={this.register.bind(this)} transparent block style={{ marginTop: 16 }}>
						<Text uppercase={false} style={{ fontSize: 14, fontWeight: '100', color: colors.primaryDark }}>Don't have an account ?</Text>
                    </Button>
                </Container>
				{
          this.state.isLoading &&
            (
              <Container style={{
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(240,240,240,0.6)',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 99
              }}>
                <ActivityIndicator
                  size="large"
                />
              </Container>
            )
        }
			</Container>
    );
  }
}