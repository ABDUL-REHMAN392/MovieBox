import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from './UI/Layout';
import { Home, Search, SinglePage } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path=":type/:id" element={<SinglePage />} />
      <Route path="search" element={<Search />} />
    </Route>
  )
);

function App() {
  const { darkTheme } = useSelector(state => state.conditions);

  return (
    <>
      <RouterProvider router={router} />

     
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar 
        closeOnClick
        pauseOnHover
        draggable
        theme={darkTheme ? "dark" : "light"} 
      />
    </>
  );
}

export default App;
