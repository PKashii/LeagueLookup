import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import Home from "./SubPage/Home";
import ChampionShow from "./SubPage/ChampionShow";
import Login from "./SubPage/Login";
import RootLayout from "./layout/RootLayout";
import Register from "./SubPage/Register";
import Favorites from "./SubPage/Favorites";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/build/:id" element={<ChampionShow />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/favorites" element={<Favorites />}></Route>
    </Route>
  )
);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
