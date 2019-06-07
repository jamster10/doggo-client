import React from 'react';
import ReactDOM from 'react-dom';
import MyPlaces from './MyPlaces';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyPlaces />, div);
  ReactDOM.unmountComponentAtNode(div);
});
