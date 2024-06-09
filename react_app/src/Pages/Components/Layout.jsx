// レイアウトの定義

import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BaseLayout(){
  return(
    <>
      <div className='base_body'>
        <Outlet/>
      </div>
    </>
  )
}