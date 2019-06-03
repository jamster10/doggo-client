import React from 'react';
import { Route } from 'react-router-dom';
import TokenService from '../Services/token-service'

const PrivateRoute = ({ component }) => {
  <Route
  render = 
  TokenService.hasAuthToken() ? component
}