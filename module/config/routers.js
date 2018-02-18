import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../login';
import Register from '../register';
import TodoList from '../todo';

export const Router = StackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
      header: null
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
      header: null
		}
	},
	TodoList: {
		screen: TodoList,
		navigationOptions: {
      header: null
		}
	},
}, { initialRouteName: 'Login'});