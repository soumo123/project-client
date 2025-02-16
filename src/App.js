import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Header/Navbar';
import axios from 'axios'
import { fetchImages, fetchUserDetails } from './redux/actions/userAction';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Home from './components/Header/Home/Home';
import AllProduct from './components/products/AllProduct';
import Footer from './components/Footer/Footer';
import Cart from './components/cart/Cart';
import Whishlist from './components/Header/Home/Whishlist';
import { fetchCategoriesSuccess } from './redux/actions/productAction';
import { fetchSettingData } from './redux/actions/settingAction'
import Account from './components/Header/Home/Account';
import Details from './components/products/Details';
import Aboutus from './components/Header/Home/Aboutus';
import Checkout from './components/checkout/Checkout';
import Contactus from './components/Footer/Contactus';
import Qrproducts from './components/Qr-products/Qrproducts';
import QrAppbar from './components/custom/QrAppbar';
import QrCart from './components/Qr-products/QrCart';
import { jwtDecode } from "jwt-decode";

function App() {
  const dispatch = useDispatch()
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const type = localStorage.getItem("type")
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const typess = queryParams.get('type');
  useEffect(() => {
    if (typess) {
      localStorage.setItem("type", typess)
    } else {
      localStorage.setItem("type", 1)
      localStorage.setItem("shop_id", "SHOP0001")

    }
  }, [typess])




  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/v1/getUser?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Replace `yourAccessToken` with the actual access token you want to send
          },
        }
      );
      if (response.status === 200) {
        dispatch(fetchUserDetails(response.data.data))
      }
    } catch (error) {
      console.log(error, "login error")
    }
  }




  const allImages = async () => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/v1/getImages?type=${typess ? typess : 1}`
      );

      dispatch(fetchImages(response.data.data[0]))


    } catch (error) {
      console.log(error, "login error")
    }


  }


  const browseAllCategories = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getalltags?type=${typess ? typess : 1}`)
      if (response.status === 200) {
        dispatch(fetchCategoriesSuccess(response.data.data))

      }

    } catch (error) {
      console.log(error)
    }
  }

  const allSettings = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/settings/setting_rules?type=${typess ? typess : 1}`)
      if (response.status === 200) {
        dispatch(fetchSettingData(response.data.data))

      }

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    if (type || userId) {
      getUser()
      allImages()
      allSettings()
      browseAllCategories()
    }
  }, [type, userId])


  setInterval(() => {

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > decodedToken.exp) {
        localStorage.removeItem("userId")
        localStorage.removeItem("type")
        localStorage.removeItem("token")
        window.location.reload()
      }
    }

  }, 10000);


  const hideNavbarRoutes = ['/results','/product-cart']; // Add any routes where you don't want to show the Navbar


  return (
    <>

      {hideNavbarRoutes.includes(location.pathname) ? <QrAppbar /> : <Navbar/>}
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/about-us" element={<Aboutus />} />
        <Route exact={true} path="/products" element={<AllProduct />} />

        <Route exact={true} path="/details/:id/:category" element={<Details />} />
        <Route exact={true} path="/cart" element={<Cart />} />
        <Route exact={true} path="/whishlist" element={<Whishlist />} />
        <Route exact={true} path="/account" element={<Account />} />
        <Route exact={true} path="/checkout" element={<Checkout />}></Route>
        <Route exact={true} path="/contact-us" element={<Contactus />}></Route>

        <Route exact={true} path="/results" element={<Qrproducts />} />
        <Route exact={true} path="/product-cart" element={<QrCart />} />
      </Routes>
      {hideNavbarRoutes.includes(location.pathname) ? "" :<Footer />}
      
    </>
  );
}

export default App;
