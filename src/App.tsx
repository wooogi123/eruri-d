import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import View from './components/View';
import { CourseContextProvider, DownloadContextProvider } from './contexts/CourseContext';

function App() {
  return (
    <Router>
      <CourseContextProvider>
        <Route exact path='/' component={Home} />
        <DownloadContextProvider>
          <Route path='/view' component={View} />
        </DownloadContextProvider>
      </CourseContextProvider>
    </Router>
  );
}

export default App;
