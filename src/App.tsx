import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import View from './components/View';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} />
      <Route path='/view' component={View} />
    </BrowserRouter>
  );
}

export default App;
