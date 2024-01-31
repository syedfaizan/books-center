import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


beforeEach(function() {
  global.sessionStorage = jest.genMockFunction();
  global.sessionStorage.setItem = jest.genMockFunction();
  global.sessionStorage.getItem = jest.genMockFunction();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
