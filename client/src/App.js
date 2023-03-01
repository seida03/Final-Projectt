import React, { useEffect } from 'react'
import Headerandfooter from './pages/headerandfooter/headerandfooter';
import Home from './pages/home/home';
import AboutUs from './pages/aboutUs/aboutUs';
import Contact from './pages/contact/contact';
import Products from './pages/products/products';
import Account from './pages/account/account';
import Cart from './pages/cart/cart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/authSlice';
import Details from './pages/details/details';
import Wishlist from './pages/wishlist/wishlist';
import Checkout from './pages/checkout/checkout';
import Profile from './pages/account/profile/profile';
import Productdetails from './pages/products/productDetail';
import AboutDetail from './pages/aboutUs/section4/aboutDetail';
import Dashboard from './adminPanel/dashboard/dashboard';
import Users from './adminPanel/users/users';
import Blogs from './adminPanel/blogs/blogs';
import Productss from './adminPanel/products/products';
import ProductAdd from './adminPanel/products/productsAdd/productsAdd';
import BlogsAdd from './adminPanel/blogs/blogsAdd/blogsAdd';
import EditProduct from './adminPanel/products/editProduct/editProduct';
import EditBlog from './adminPanel/blogs/editBlog/editBlog';

let user = "Admin"

const router = createBrowserRouter([

  {
    path: "/",
    element: <Headerandfooter />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/my-account",
        element: <Account />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/productdetails/:id",
        element: <Productdetails />,
      },
      {
        path: "/aboutdetail/:id",
        element: <AboutDetail />,
      },

    ],
  },
  { 
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "/admin",
        element: <Users />,
      },
      {
        path: "/admin/products",
        element: <Productss />,
      },
      {
        path: "/admin/blogs",
        element: <Blogs />,
      },
      {
        path: "/admin/productAdd",
        element: <ProductAdd />,
      },
      {
        path: "/admin/blogsadd",
        element: <BlogsAdd />,
      },
      {
        path: "/admin/editproduct/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/editblog/:id",
        element: <EditBlog />,
      },
    ]
  },

]);

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
    <RouterProvider router={router} />

  )
}

export default App