import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route
        path="/signup"
        component={Signup}
        />
    </BrowserRouter>
  );
}

export default App;
