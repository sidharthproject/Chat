
import './App.css'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login' 
import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './store/store'




function App() {
  
 const ProtectedRoute =({children}) =>{
  const selector = useSelector((state)=>state.auth.currentUser)
  console.log(selector);
 if(selector){
   return children
 }
 return <Navigate to="/login"/>
}
 
//const root = ReactDOM.createRoot(document.getElementById('root'));
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


  return (
    <>
   
   <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>


    </>
    

  )
}

export default App
