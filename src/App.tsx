import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import View from './components/View';
import { CourseContextProvider } from './contexts/CourseContext';

function App() {
  return (
    <BrowserRouter>
      <CourseContextProvider>
        <Route exact path='/' component={Home} />
        <Route path='/view' component={View} />
      </CourseContextProvider>
    </BrowserRouter>
  );
}

export default App;
