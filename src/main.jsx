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



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  
   <App/>
  

)
