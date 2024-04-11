
import { createBrowserRouter,createRoutesFromElements,
    RouterProvider,  Route, Link } from 'react-router-dom';

import "./App.css";

import Home from './SubPage/Home';
import ChampionShow from './SubPage/ChampionShow';

import RootLayout from './layout/RootLayout'

const router =createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
         <Route path="/" element={<Home/>}></Route>
         <Route path="ChampionShow" element={<ChampionShow/>}></Route>
     </Route>
))
const App = () => {
    
    
    
    return(
        
        /**/
            <RouterProvider router={router}/>
        
    );
}

export default App;
