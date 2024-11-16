import React from "react";
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import LoginSessionCheck from "./Pages/Auth/LoginSessionCheck";
import Index from './Pages/Index';
import Analyze from './Pages/Analyze';
import DetailMain from './Pages/Details/Main';
import DetailResult from './Pages/Details/Result';
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Register from "./Pages/Auth/Register";
import DataChange from "./Pages/Auth/DataChange";
import DataChangeDecide from "./Pages/Auth/DataChangeDecide";
import Sign from "./Pages/Sing";
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

            <Route index element={<LoginSessionCheck/>}/>
          
            {/* ログイン系列 */}
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/logout" element={<Logout/>}/>
            <Route path="/auth/register" element={<Register/>}/>
            <Route path="/auth/data_change" element={<DataChange/>}/>
            <Route path="/auth/data_change_decide" element={<DataChangeDecide/>}/>

            {/* コンテンツ */}
            <Route path="/index" element={<Index/>}/>
            <Route path="/when_post" element={<Analyze/>}/>
            <Route path="/detail/main" element={<DetailMain/>}/>
            <Route path="/detail/result" element={<DetailResult/>}/> 
            <Route path="/sign" element={<Sign/>}/> 
            {/* 定義されていないパスは全てここへ */}
            <Route path="/error" element={<ShowErrorPage/>}/> 
            <Route path="*" element={<NotFoundPage/>}/> 
        </Route>
       </Routes>
     </Router>
  );
}

export default App;
