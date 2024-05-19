import React from "react";
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Index from './Pages/Index';
import Analyze from './Pages/Analyze';
import DetailMain from './Pages/Details/Main';
import DetailResult from './Pages/Details/Result';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/index" exact element={<Index/>}/>
         <Route path="/when_post" element={<Analyze/>}/>
         <Route path="/detail/main" element={<DetailMain/>}/>
         <Route path="/detail/result" element={<DetailResult/>}/> 
         {/* 定義されていないパスは全てここへ */}
        <Route path="*" element={<NotFoundPage/>}/> 
       </Routes>
     </Router>
    
  );
}

export default App;
