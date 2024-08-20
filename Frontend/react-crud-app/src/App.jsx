import React,{Suspense} from 'react'
import { Route, Routes } from 'react-router-dom'


const LazyLogin = React.lazy(()=>import('./pages/User/Login/Login'))
const LazyRegister = React.lazy(()=>import('./pages/User/Register/Register'))
const LazyHome = React.lazy(()=>import('./pages/User/Home/Home'))

const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LazyHome />} />
          <Route path='/login' element={<LazyLogin />} />
          <Route path='/register' element={<LazyRegister />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App