import React from "react";
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Index from './Pages/Index';
import Analyze from './Pages/Analyze';
import DetailMain from './Pages/Details/Main';
import DetailResult from './Pages/Details/Result';
import ShowErrorPage from "./Pages/Error";
import NotFoundPage from './Pages/NotFoundPage';
import BaseLayout from "./Pages/Components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* レイアウト */}
        <Route path="/" element={<BaseLayout />}>
          {/* 各ページ */}
            <Route index element={<Index/>}/>
            <Route path="/index" element={<Index/>}/>
            <Route path="/when_post" element={<Analyze/>}/>
            <Route path="/detail/main" element={<DetailMain/>}/>
            <Route path="/detail/result" element={<DetailResult/>}/> 
            {/* 定義されていないパスは全てここへ */}
            <Route path="/error" element={<ShowErrorPage/>}/> 
            <Route path="*" element={<NotFoundPage/>}/> 
        </Route>
       </Routes>
     </Router>
    
  );
}

export default App;
