import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePosts from "./pages/CreatePosts";
import EditPosts from "./pages/EditPosts";
import CategoryPosts from "./pages/CategoryPosts"; 
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import DeletePosts from "./pages/DeletePosts";

import './app.css'
import UserProvider from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
        {index: true, element: <Home/>},
        {path: 'post/:id', element: <PostDetail /> },
        {path: 'post/:id/delete', element: <DeletePosts/>},
        {path: 'register', element: <Register/>},
        {path: 'login', element: <Login/>},
        {path: 'profile/:id', element: <UserProfile/>},
        {path: 'authors', element: <Authors/>},
        {path: 'create', element: <CreatePosts/>},
        {path: 'posts/:id/edit', element: <EditPosts/>},
        {path: 'posts/category/:category', element: <CategoryPosts/>},
        {path: 'posts/users/:id', element: <AuthorPosts/>},
        {path: 'mypost/:id', element: <Dashboard/>},
        {path: 'logout', element: <Logout/>},
    ]
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
