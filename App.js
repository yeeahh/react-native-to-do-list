import React, { Component } from 'react';
import { Container } from 'native-base';
import { Router } from './module/config/routers';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router />
      </Container>
    );
  }
}