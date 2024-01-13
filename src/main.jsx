import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import Home from './pages/home'
 import Login from './pages/Login'
 import Register from './pages/Register'
 import { Provider } from 'react-redux'
 import store from './store/store.js'
 import { useSelector } from 'react-redux'


 const ProtectedRoute =({children}) =>{
   const selector = useSelector((state)=>state.auth.currentUser)
   console.log(selector);
  if(selector){
    return children
  }
  return <Navigate to="/login"/>
 }
  

const router = createBrowserRouter([ 
  {
  
    path:'/',
     element:
      <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
      },
     
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      }
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  

)
