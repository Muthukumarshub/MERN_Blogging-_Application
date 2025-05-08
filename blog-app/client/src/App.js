import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import CreatePost from './components/Blog/CreatePost';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Create a root layout component
const RootLayout = () => {
  return (
    <div className="App">
      <Header />
      {/* Outlet will render the child routes */}
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <BlogList />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "post/:id",
        element: <BlogPost />
      },
      {
        path: "create-post",
        element: <CreatePost />
      }
    ]
  }
], {
  future: {
    v7_startTransition: true
  }
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;