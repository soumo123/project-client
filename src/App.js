import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Header/Navbar';
import axios from 'axios'
import { fetchImages, fetchUserDetails } from './redux/actions/userAction';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Header/Home/Home';
import AllProduct from './components/products/AllProduct';
import Footer from './components/Footer/Footer';
import Cart from './components/cart/Cart';


function App() {
  const dispatch = useDispatch()

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

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
      console.log(error,"login error")
    }
  }




  const allImages = async()=>{

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/v1/getImages?type=1`
      );
        
      dispatch(fetchImages(response.data.data[0]))


    } catch (error) {
      console.log(error,"login error")
    }


  }

  useEffect(() => {
    if (userId) {
      getUser()
      allImages()
    }
  }, [userId])






  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/products" element={<AllProduct/>} />
          <Route exact={true} path="/cart" element={<Cart/>} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
