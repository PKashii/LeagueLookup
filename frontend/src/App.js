
import { createBrowserRouter,createRoutesFromElements,
    RouterProvider,  Route, Link } from 'react-router-dom';

import "./App.css";

import Home from './SubPage/Home';
import ChampionShow from './SubPage/ChampionShow';
import Login from './SubPage/Login';
import RootLayout from './layout/RootLayout'

const router =createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/build/:id" element={<ChampionShow/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
     </Route>
))
const App = () => {
    return(
        <div>
            <RouterProvider router={router}/>   
         </div>
    );
}

export default App;

