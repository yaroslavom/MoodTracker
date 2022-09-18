import React from 'react';
import App from './App';
import renderer, { act } from 'react-test-renderer';

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});
