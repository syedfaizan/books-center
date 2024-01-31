import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Auth from './Auth';
import assert from 'assert';

let div = document.createElement('div');

beforeEach(function() {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
  });
  
it('Render #Auth Component', () => {
    ReactDOM.render(<Auth />, div);
});

it('should update the username in state when value is entered', ()=> {
    const app = shallow(<Auth />);
    const sampleInput = 'Hello';
    let input = app.find('input');
    input.simulate('change', { target: { value:  sampleInput} })
    assert.equal(app.instance().state.username, sampleInput);
});

it('redirect to dashboard if session is active', ()=> {
    const auth = shallow(<Auth />);
    let authInstance = auth.instance();
    authInstance.setState({redirect: true});
});