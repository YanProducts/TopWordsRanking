import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Index from './Pages/Index';
import Analyze from './Pages/Analyze';
import DetailMain from './Pages/Details/Main';
import DetailResult from './Pages/Details/Result';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="index" exact component={Index}/>
        <Route path="when_post" component={Analyze}/>
        <Route path="detail/main" component={DetailMain}/>
        <Route path="detail/result" component={DetailResult}/>
      </Switch>
    </Router>
  );
}

export default App;
