import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
