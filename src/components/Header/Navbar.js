import React, { useState, useEffect } from 'react'
import Eng from '../../images/usd.svg'
import Bdt from '../../images/bdt.svg'
import Inr from '../../images/inr.svg'
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import WalletIcon from '@mui/icons-material/Wallet';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SignIn from '../../images/sign-in.jpg'
import SignUp from '../../images/signup-image.jpg'
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUserDetails } from '../../redux/actions/userAction';
import { fetchCartProducts, fetchCartProductsFail } from '../../redux/actions/productAction'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { noteRefs } from '../../redux/actions/userAction'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import { useAlert } from 'react-alert'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = () => {
     const alert = useAlert()
     const navigate = useNavigate()
     const [showLan, setShowLan] = useState(false)
     const [showCurrency, setShowCurrency] = useState(false)
     const [browseCategory, setBrowseCat] = useState(false)
     const [message, setMessage] = useState(false);
     const [messageType, setMessageType] = useState();
     const dispatch = useDispatch()
     const [open, setOpen] = React.useState(false);
     const [mode, setMode] = useState("1")
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
     const [name, setName] = useState("")
     const [number, setNumber] = useState("")
     const [file, setFile] = useState()
     const [imagePreview, setImagePreview] = useState("./avatar.jpg")
     const [carts, setCarts] = useState([])
     const [totalPrice, setTotalPrice] = useState("")
     const [logoutOpen, setLogOutOpen] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
     const [showLoader, setShowLoader] = useState(true);
     const userData = useSelector((state) => state.userDetails.user)
     const images = useSelector((state) => state.imageReducer.images.staticImages)
     const categories = useSelector((state) => state.categoryDetails.categories)
     const settings = useSelector((state) => state.settingReducer.settings)
     const [search, setSearch] = useState("")
     const [aboutOpen, setAboutOpen] = useState(false)


     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          mobile: '',
          file: null // for storing the selected file
     });
     const userDetails = useSelector((state) => state.userDetails.user)
     const dataRefe = useSelector((state) => state.noteRef.arr);



     const userId = localStorage.getItem("userId")

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleOpenSignup = () => {
          setMode("2")
          setName("")
          setNumber("")
          setEmail("")
          setPassword("")

     }

     const handleClose = () => {
          setOpen(false);
          setMode("1")
          setName("")
          setNumber("")
          setEmail("")
          setPassword("")
          setFormData({})
     };

     const handleReturnLogin = () => {
          setMode("1")
          setName("")
          setNumber("")
          setEmail("")
          setPassword("")
     }



     const handleSignIn = async () => {
          try {
               const json = {
                    email: email,
                    password: password
               }
               const config = {
                    headers: {
                         'Content-Type': "application/json",
                    },
                    withCredentials: true
               }
               const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/signin`, json, config)
               if (response.status === 200) {
                    alert.success("login Successfull")
                    setEmail("")
                    setPassword("")
                    setOpen(false)

                    const profileData = response.data
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("userId", response.data.user.userId)
                    // localStorage.setItem("type", response.data.user.type)
                    localStorage.setItem("profile", JSON.stringify(profileData))
                    dispatch(fetchUserDetails(response.data.user))
                    dispatch(noteRefs(new Date().getSeconds()))
                    navigate("/")
               } else {
                    alert.error("Invalid email or password")
               }
          } catch (error) {
               console.log(error.stack, "errorrrrrrrrrrrrrrrrr")
               alert.error("Invalid email or password")
          }

     }

     const handleSignout = () => {
          localStorage.removeItem("token")
          localStorage.removeItem("userId")
          localStorage.removeItem("profile")
          alert.success("Logout successfully")
          setLogOutOpen(false);
          dispatch(fetchUserDetails([]))
          dispatch(noteRefs(new Date().getSeconds()))
     }
     const handleClickModalOpen = () => {
          setLogOutOpen(true);
     };

     const handleLogoutModalClose = () => {
          setLogOutOpen(false);
     }


     const getAllCartProducts = async () => {

          try {
               const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getallcartproducts?type=1&userId=${userId === null ? "" : userId}`)
               if (response.status === 200) {
                    setCarts(response.data.data)
                    setTotalPrice(response.data.totalPrice)
                    dispatch(fetchCartProducts(response.data.data))
               }


          } catch (error) {
               setCarts([])
               setTotalPrice("")
               dispatch(fetchCartProductsFail([]))
          }
     }



     const handleDelete = async (pd_id) => {

          try {

               const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/deleteById?type=1&userId=${userId === null ? "" : userId}&productId=${pd_id}`)

               if (response.status === 200) {
                    dispatch(noteRefs(new Date().getSeconds()))
               }

          } catch (error) {
               console.log(error)
          }
     }

     useEffect(() => {
          getAllCartProducts()
     }, [dataRefe])



     const handleChange = (e) => {
          if (e.target.type === 'file') {
               setFormData({ ...formData, file: e.target.files[0] });
               const reader = new FileReader();
               reader.onload = () => {
                    document.getElementById('selectedImage').src = reader.result;
               };
               reader.readAsDataURL(e.target.files[0]);


          } else {
               setFormData({ ...formData, [e.target.name]: e.target.value });
          }
     };

     const handleAbout = () => {
          setAboutOpen(!aboutOpen);
     }

     const handleCloseAbout = () => {
          setAboutOpen(false);
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          const { name, email, password, mobile, file } = formData;
          if (!name || !email || !password || !mobile || !file) {
               setErrorMessage('Please fill in all fields');
               return;
          }
          try {
               const formDataToSend = new FormData();
               formDataToSend.append("name", name);
               formDataToSend.append("email", email);
               formDataToSend.append("password", password);
               formDataToSend.append("mobile", mobile);
               formDataToSend.append("file", file);

               const config = {
                    headers: {
                         'Content-Type': 'multipart/form-data'
                    }
               };

               const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/signup`, formDataToSend, config);

               if (response.status === 200) {
                    alert.success("Sign up successfully")
                    setFormData({})
                    setOpen(false);
                    setMode("1")

               } else {
                    alert.error("Sign up Failed")
               }
          } catch (error) {
               console.error('Error signing up:', error);
          }
     };

     const handleSearchChange = (e) => {
          e.preventDefault();
          navigate(`/products?search=${search}`)
          setSearch("")
     }


     const handleCategoryChange = (value) => {
          navigate(`/products?tags=${value}`)
     }

     const handleAboutRedirect = () => {
          setAboutOpen(false)
          navigate('/about-us')
     }

     useEffect(() => {
          // Hide the preloader after 2 seconds
          const timer = setTimeout(() => {
               setShowLoader(false);
          }, 2000);

          return () => clearTimeout(timer);
     }, []);

     return (
          <>
               {showLoader && (
                    <div id="preloader">
                         <img src={images && images?.loader} alt="preloader" width="450" className="img-fluid" />
                    </div>
               )}
               <div className="main-wrapper">
                    <header className="gheader position-relative z-2 header-sticky">
                         <div className="ghead-topbar bg-primary d-none d-lg-block">
                              <div className="container">
                                   <div className="row align-items-center">
                                        <div className="col-xxl-4 col-xl-3">
                                             <div className="topbar-info d-none d-xl-block">
                                                  <p className="text-white fs-sm fw-medium mb-0">{settings && settings?.logoheading}</p>
                                             </div>
                                        </div>
                                        <div className="col-xxl-8 col-xl-9">
                                             <ul className="d-flex align-items-center justify-content-center justify-content-xl-end topbar-info-right">
                                                  <li className="nav-item">
                                                       <a href={`mailto:${settings && settings?.email}`}>
                                                            <span className="me-1">
                                                                 <svg width="16" height="14" viewBox="0 0 20 14" fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg">
                                                                      <path
                                                                           d="M18.2422 0H1.75781C0.790547 0 0 0.783572 0 1.75V12.25C0 13.2168 0.791055 14 1.75781 14H18.2422C19.2095 14 20 13.2164 20 12.25V1.75C20 0.783339 19.2091 0 18.2422 0ZM17.9723 1.16667C17.4039 1.73433 10.7283 8.40194 10.4541 8.67588C10.225 8.90462 9.77512 8.90478 9.54594 8.67588L2.02773 1.16667H17.9723ZM1.17188 12.0355V1.96447L6.21348 7L1.17188 12.0355ZM2.02773 12.8333L7.04078 7.82631L8.71598 9.49951C9.40246 10.1852 10.5978 10.1849 11.2841 9.49951L12.9593 7.82635L17.9723 12.8333H2.02773ZM18.8281 12.0355L13.7865 7L18.8281 1.96447V12.0355Z"
                                                                           fill="white" />
                                                                 </svg>
                                                            </span>
                                                            {settings && settings?.email}
                                                       </a>
                                                  </li>
                                                  {
                                                       settings && settings?.location ? (
                                                            <li className="nav-item">
                                                                 <span className="me-1">
                                                                      <svg width="12" height="17" viewBox="0 0 12 17" fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg">
                                                                           <path
                                                                                d="M6.00011 8.16427C7.44543 8.16427 8.62131 6.98781 8.62131 5.54175C8.62131 4.09569 7.44543 2.91925 6.00011 2.91925C4.55478 2.91925 3.37891 4.09569 3.37891 5.54175C3.37891 6.98781 4.55478 8.16427 6.00011 8.16427ZM6.00011 3.85662C6.92883 3.85662 7.68441 4.61259 7.68441 5.54175C7.68441 6.47093 6.92886 7.2269 6.00011 7.2269C5.07136 7.2269 4.31581 6.47093 4.31581 5.54175C4.31581 4.61259 5.07139 3.85662 6.00011 3.85662Z"
                                                                                fill="white" stroke="white" stroke-width="0.3" />
                                                                           <path
                                                                                d="M3.14593 10.2541C3.85594 11.2159 3.57069 10.8418 5.61579 13.7635C5.80167 14.0301 6.19695 14.0314 6.38389 13.7639C8.43824 10.8284 8.15557 11.2002 8.85403 10.254C9.56155 9.29555 10.2932 8.30443 10.6941 7.14299C11.2744 5.46171 11.0236 3.79818 9.9879 2.45881C9.98787 2.45881 9.98787 2.45878 9.98784 2.45878C9.03913 1.23225 7.54834 0.5 5.99998 0.5C4.45163 0.5 2.96083 1.23225 2.01209 2.45884C0.976407 3.79821 0.725568 5.46177 1.30588 7.14305C1.70675 8.30446 2.43841 9.29558 3.14593 10.2541ZM2.75305 3.03246C3.52562 2.03369 4.73944 1.43737 5.99998 1.43737C7.26052 1.43737 8.47434 2.03369 9.24691 3.03246L9.24684 3.03243C10.0828 4.11343 10.2822 5.46462 9.80852 6.83705C9.4544 7.86293 8.76606 8.79539 8.10039 9.69717C7.5821 10.3993 7.73721 10.1845 5.99998 12.6763C4.26456 10.187 4.41771 10.399 3.89957 9.69717C3.2339 8.79539 2.54556 7.86289 2.19144 6.83705C1.71775 5.46459 1.91718 4.11343 2.75305 3.03246Z"
                                                                                fill="white" stroke="white" stroke-width="0.3" />
                                                                           <path
                                                                                d="M3.53116 12.2865C3.393 12.0677 3.10369 12.0023 2.88495 12.1405L1.55299 12.9823C1.26243 13.1659 1.26214 13.591 1.55299 13.7748L5.75031 16.4276C5.90312 16.5242 6.09787 16.5241 6.25065 16.4276L10.448 13.7748C10.7386 13.5912 10.7388 13.1661 10.448 12.9823L9.116 12.1405C8.8972 12.0023 8.60792 12.0677 8.46979 12.2865C8.3316 12.5053 8.39693 12.7948 8.61567 12.933L9.32065 13.3786L6.00046 15.4769L2.6803 13.3786L3.38529 12.933C3.60402 12.7948 3.66933 12.5053 3.53116 12.2865Z"
                                                                                fill="white" stroke="white" stroke-width="0.3" />
                                                                      </svg>
                                                                 </span>
                                                                 {settings && settings?.location}
                                                            </li>
                                                       ) : ("")
                                                  }


                                                  <li className="nav-item dropdown tt-language-dropdown">
                                                       <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true" onClick={() => setShowLan(!showLan)}>
                                                            <img src={Eng} alt="country" className="img-fluid me-1" />
                                                            English
                                                       </a>

                                                       {
                                                            showLan ? (
                                                                 <ClickAwayListener onClick={(e) => setShowLan(false)}>
                                                                      <ul className="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                                                           <li>
                                                                                <a className="dropdown-item" href="#">
                                                                                     <img src={Eng} alt="country" className="img-fluid me-1" />
                                                                                     English
                                                                                </a>
                                                                           </li>
                                                                           <li>
                                                                                <a className="dropdown-item" href="#">
                                                                                     <img src={Bdt} alt="country" className="img-fluid me-1" />
                                                                                     Bangla
                                                                                </a>
                                                                           </li>
                                                                           <li>
                                                                                <a className="dropdown-item" href="#">
                                                                                     <img src={Inr} alt="country" className="img-fluid me-1" />
                                                                                     Hindi
                                                                                </a>
                                                                           </li>
                                                                      </ul>
                                                                 </ClickAwayListener>
                                                            ) : ""
                                                       }

                                                  </li>
                                                  <li className="nav-item dropdown tt-curency-dropdown" onClick={() => setShowCurrency(!showCurrency)}>
                                                       <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">₹ INR</a>
                                                       {
                                                            showCurrency ? (
                                                                 <ClickAwayListener onClick={(e) => setShowCurrency(false)}>
                                                                      <ul className="dropdown-menu dropdown-menu-end">
                                                                           {/* <li>
                                                                                <a className="dropdown-item fs-xs" href="#">
                                                                                     $ USD
                                                                                </a>
                                                                           </li>
                                                                           <li>
                                                                                <a className="dropdown-item fs-xs" href="#">
                                                                                     ৳ BDT
                                                                                </a>
                                                                           </li> */}
                                                                           {/* <li>
                                                                                <a className="dropdown-item fs-xs" href="#">
                                                                                     ₹ INR
                                                                                </a>
                                                                           </li> */}
                                                                           {/* <li>
                                                                                <a className="dropdown-item fs-xs" href="#">
                                                                                     € EUR
                                                                                </a>
                                                                           </li> */}
                                                                      </ul>
                                                                 </ClickAwayListener>
                                                            ) : ""
                                                       }

                                                  </li>

                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="container">
                              <div className="gshop-navbar bg-white rounded ps-lg-5 position-relative">
                                   <div className="row align-items-center">
                                        <div className="col-xxl-2 col-xl-3 col-md-3 col-5">
                                             <Link to="/" className="logo">
                                                  <img src={images?.logo} alt="logo" className="img-fluid" />

                                             </Link>
                                        </div>
                                        <div className="col-xxl-10 col-xl-9 col-md-9 col-7">
                                             <div className="gshop-navbar-right d-flex align-items-center justify-content-end position-relative">
                                                  <div className="category-dropdown position-relative d-none d-md-inline-block">


                                                       {
                                                            settings && settings.browse_category ? (
                                                                 <span className="category-dropdown-btn fw-bold d-none d-sm-inline-block" style={{cursor:"pointer"}}onClick={() => setBrowseCat(!browseCategory)}>Browse Category
                                                                      <span
                                                                           className="ms-1"><KeyboardArrowDownIcon />
                                                                      </span>
                                                                 </span>
                                                            ) : ("")
                                                       }

                                                       <a href="javascript:void(0)" className="category-dropdown-btn fw-bold d-sm-none">Categories
                                                            <span className="ms-1"><KeyboardArrowDownIcon /></span></a>
                                                       {
                                                            browseCategory ? (
                                                                 <ClickAwayListener onClickAway={() => setBrowseCat(false)}>
                                                                      <div className="category-dropdown-box scrollbar active">
                                                                           <ul className="category-dropdown-menu">
                                                                                {
                                                                                     categories && categories.map((ele) => (
                                                                                          <li>
                                                                                               <span className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={(e) => handleCategoryChange(ele.value)}>
                                                                                                    <div className="me-2 avatar-icon">
                                                                                                         <img src={ele.thumbnailImage} alt="vegetables" className="w-100 h-100 rounded-circle" />
                                                                                                    </div>
                                                                                                    <span>{ele.label}</span>
                                                                                               </span>
                                                                                          </li>
                                                                                     ))
                                                                                }


                                                                           </ul>
                                                                      </div>
                                                                 </ClickAwayListener>
                                                            ) : ""
                                                       }

                                                  </div>
                                                  <nav className="gshop-navmenu ms-3 d-none d-xl-block">
                                                       <ul className="d-flex align-itmes-center justify-content-end">
                                                            <li>
                                                                 {settings && settings.home ? (
                                                                      <Link to="/">Home<span className="ms-1 fs-xs float-end"></span></Link>
                                                                 ) : ("")}
                                                            </li>

                                                            <li className="">
                                                                 {settings && settings.products ? (
                                                                      <Link to="/products">Products</Link>
                                                                 ) : ("")}

                                                            </li>
                                                            <li>
                                                                 {settings && settings.blog ? (
                                                                      <Link to="/blogs">Blog<span className="ms-1 fs-xs float-end"></span></Link>
                                                                 ) : ("")}

                                                            </li>
                                                       </ul>
                                                  </nav>
                                                  <div className="gshop-header-icons d-none d-md-inline-flex align-items-center justify-content-end ms-3">
                                                       {
                                                            settings && settings.search ? (
                                                                 <div className="gshop-header-search dropdown">
                                                                      <button type="button" className="header-icon" data-bs-toggle="dropdown">

                                                                           <svg width="18" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M9.68859 0.5C4.34645 0.5 0 4.84646 0 10.1886C0 15.5311 4.34645 19.8772 9.68859 19.8772C15.031 19.8772 19.3772 15.5311 19.3772 10.1886C19.3772 4.84646 15.031 0.5 9.68859 0.5ZM9.68859 18.0886C5.33261 18.0886 1.78866 14.5447 1.78866 10.1887C1.78866 5.83266 5.33261 2.28867 9.68859 2.28867C14.0446 2.28867 17.5885 5.83262 17.5885 10.1886C17.5885 14.5446 14.0446 18.0886 9.68859 18.0886Z" fill="#5D6374" />
                                                                                <path d="M21.7406 20.9824L16.6436 15.8853C16.2962 15.538 15.7338 15.538 15.3865 15.8853C15.0391 16.2323 15.0391 16.7954 15.3865 17.1424L20.4835 22.2395C20.6571 22.4131 20.8845 22.5 21.1121 22.5C21.3393 22.5 21.5669 22.4131 21.7406 22.2395C22.0879 21.8925 22.0879 21.3294 21.7406 20.9824Z" fill="#5D6374" />
                                                                           </svg>
                                                                      </button>
                                                                      <div className="dropdown-menu dropdown-menu-end border-0">
                                                                           <form className="search-form d-flex align-items-center" action="#">
                                                                                <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-100" />
                                                                                <button type="submit" className="submit-icon-btn-secondary" onClick={handleSearchChange}><SearchIcon /></button>
                                                                           </form>
                                                                      </div>
                                                                 </div>
                                                            ) : ("")
                                                       }

                                                       <div className="gshop-header-user position-relative">
                                                            <button type="button" className="header-icon">

                                                                 {

                                                                      userDetails.length === 0 ? (
                                                                           <svg width="18" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.092 11.9546C12.6656 11.9546 14.0281 11.3902 15.1416 10.2766C16.2547 9.16322 16.8193 7.80093 16.8193 6.2271C16.8193 4.65382 16.2549 3.29134 15.1414 2.1776C14.0279 1.0644 12.6654 0.5 11.092 0.5C9.51825 0.5 8.156 1.0644 7.04266 2.17778C5.92931 3.29116 5.36475 4.65363 5.36475 6.2271C5.36475 7.80093 5.92931 9.1634 7.04266 10.2768C8.15636 11.39 9.51879 11.9546 11.092 11.9546ZM8.0281 3.16308C8.88239 2.30877 9.88453 1.89349 11.092 1.89349C12.2993 1.89349 13.3017 2.30877 14.1561 3.16308C15.0104 4.01757 15.4259 5.01992 15.4259 6.2271C15.4259 7.43464 15.0104 8.43681 14.1561 9.2913C13.3017 10.1458 12.2993 10.5611 11.092 10.5611C9.88489 10.5611 8.88275 10.1456 8.0281 9.2913C7.17364 8.43699 6.7582 7.43464 6.7582 6.2271C6.7582 5.01992 7.17364 4.01757 8.0281 3.16308Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                                                                                <path d="M21.1339 18.893C21.1012 18.4201 21.0352 17.9043 20.9379 17.3596C20.8397 16.8108 20.7133 16.292 20.562 15.8178C20.4055 15.3277 20.1931 14.8438 19.9301 14.38C19.6575 13.8986 19.3371 13.4794 18.9776 13.1345C18.6016 12.7736 18.1414 12.4835 17.6091 12.2719C17.0787 12.0614 16.4909 11.9547 15.8621 11.9547C15.6152 11.9547 15.3763 12.0564 14.9151 12.3576C14.6313 12.5433 14.2993 12.7581 13.9287 12.9956C13.6118 13.1982 13.1825 13.3879 12.6523 13.5598C12.135 13.7277 11.6098 13.8129 11.0912 13.8129C10.5729 13.8129 10.0477 13.7277 9.53001 13.5598C9.00034 13.3881 8.57088 13.1984 8.25455 12.9958C7.88747 12.7605 7.55527 12.5457 7.26718 12.3574C6.80634 12.0562 6.56753 11.9545 6.32059 11.9545C5.69163 11.9545 5.10401 12.0614 4.57378 12.2721C4.04189 12.4833 3.58143 12.7734 3.20512 13.1347C2.84561 13.4798 2.52522 13.8988 2.25281 14.38C1.99019 14.8438 1.77758 15.3276 1.62108 15.818C1.46993 16.2922 1.34351 16.8108 1.24533 17.3596C1.14788 17.9035 1.082 18.4195 1.04933 18.8935C1.01722 19.3569 1.00098 19.8393 1.00098 20.3266C1.00098 21.5934 1.40238 22.6189 2.19394 23.3752C2.97572 24.1216 4.00996 24.5 5.26808 24.5H16.9157C18.1735 24.5 19.2077 24.1216 19.9897 23.3752C20.7814 22.6194 21.1828 21.5935 21.1828 20.3264C21.1826 19.8374 21.1662 19.3551 21.1339 18.893ZM19.0123 22.3449C18.4957 22.8381 17.8099 23.0779 16.9155 23.0779H5.26808C4.37354 23.0779 3.68773 22.8381 3.17135 22.3451C2.66474 21.8613 2.41854 21.2008 2.41854 20.3266C2.41854 19.8718 2.43349 19.4229 2.46339 18.9918C2.49255 18.569 2.55216 18.1044 2.64056 17.6108C2.72786 17.1233 2.83896 16.6658 2.9711 16.2516C3.09789 15.8545 3.27082 15.4612 3.48527 15.0824C3.68995 14.7214 3.92544 14.4116 4.18529 14.1621C4.42835 13.9286 4.73471 13.7375 5.0957 13.5942C5.42956 13.4616 5.80476 13.3891 6.21208 13.3781C6.26172 13.4046 6.35012 13.4552 6.49334 13.5488C6.78475 13.7394 7.12064 13.9567 7.49197 14.1946C7.91054 14.4624 8.44981 14.7042 9.09409 14.9128C9.75277 15.1265 10.4245 15.235 11.0913 15.235C11.7581 15.235 12.4301 15.1265 13.0884 14.913C13.7333 14.704 14.2723 14.4624 14.6915 14.1943C15.0715 13.9506 15.3979 13.7395 15.6894 13.5488C15.8326 13.4553 15.921 13.4046 15.9706 13.3781C16.3781 13.3891 16.7533 13.4616 17.0874 13.5942C17.4482 13.7375 17.7545 13.9288 17.9976 14.1621C18.2574 14.4114 18.4929 14.7212 18.6976 15.0826C18.9122 15.4612 19.0854 15.8547 19.212 16.2515C19.3443 16.6662 19.4556 17.1235 19.5427 17.6106C19.6309 18.1052 19.6907 18.5699 19.7199 18.992V18.9924C19.7499 19.4218 19.7651 19.8705 19.7653 20.3266C19.7651 21.201 19.5189 21.8613 19.0123 22.3449Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                                                                           </svg>
                                                                      ) : (
                                                                           <img style={{ borderRadius: "50%", width: "40px", height: "40px" }} src={userDetails.image} />

                                                                      )
                                                                 }

                                                            </button>
                                                            <div className="user-menu-wrapper">
                                                                 <ul className="user-menu">

                                                                      {userDetails.length === 0 ? ("") : (
                                                                           <li><Link to="/account"><span className="me-2"><PersonIcon /></span>My Account</Link></li>

                                                                      )}
                                                                      <li><Link to="/cart"><span className="me-2"><SellIcon /></span>My Cart</Link></li>
                                                                      <li><Link to="/whishlist"><span className="me-2"><FavoriteIcon /></span>My Wishlist</Link></li>
                                                                      {
                                                                           userDetails.length === 0 ? (

                                                                                <li><a className="me-2" onClick={handleClickOpen}><LoginIcon />  Signin</a></li>
                                                                           ) : (

                                                                                <li><a className="me-2" onClick={handleClickModalOpen}><LogoutIcon />SignOut</a></li>
                                                                           )
                                                                      }

                                                                 </ul>
                                                            </div>
                                                       </div>
                                                       {
                                                            settings && settings.cart ? (
                                                                 <div className="gshop-header-cart position-relative">
                                                                      <button type="button" className="header-icon">
                                                                           <svg width="18" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M21.1704 23.9559L19.6264 7.01422C19.5843 6.55156 19.1908 6.19718 18.7194 6.19718H15.5355V4.78227C15.5355 2.14533 13.3583 0 10.6823 0C8.00628 0 5.82937 2.14533 5.82937 4.78227V6.19718H2.6433C2.17192 6.19718 1.77839 6.55156 1.73625 7.01422L0.186259 24.0225C0.163431 24.2735 0.248671 24.5223 0.421216 24.7082C0.593761 24.8941 0.837705 25 1.0933 25H20.2695C20.2702 25 20.2712 25 20.2719 25C20.775 25 21.1826 24.5982 21.1826 24.1027C21.1825 24.0528 21.1784 24.0036 21.1704 23.9559ZM7.65075 4.78227C7.65075 3.1349 9.01071 1.79465 10.6824 1.79465C12.3542 1.79465 13.7142 3.1349 13.7142 4.78227V6.19718H7.65075V4.78227ZM2.08948 23.2055L3.47591 7.99183H5.82937V9.59649C5.82937 10.0921 6.237 10.4938 6.74006 10.4938C7.24313 10.4938 7.65075 10.0921 7.65075 9.59649V7.99183H13.7142V9.59649C13.7142 10.0921 14.1219 10.4938 14.6249 10.4938C15.128 10.4938 15.5356 10.0921 15.5356 9.59649V7.99183H17.8869L19.2733 23.2055H2.08948Z" fill="#5D6374" />
                                                                           </svg>
                                                                      </button>



                                                                      <div className="cart-box-wrapper">
                                                                           <div className="apt_cart_box theme-scrollbar">
                                                                                <ul className="at_scrollbar scrollbar">
                                                                                     {
                                                                                          carts && carts.length === 0 ? (
                                                                                               <span>No Cart Items</span>
                                                                                          ) : (
                                                                                               <>
                                                                                                    {
                                                                                                         carts.map((ele) => (
                                                                                                              <li className="d-flex align-items-center">
                                                                                                                   <div className="thumb-wrapper">
                                                                                                                        <a href="#">
                                                                                                                             <img src={ele.thumbImage} alt="products" className="img-fluid" />
                                                                                                                        </a>
                                                                                                                   </div>
                                                                                                                   <div className="items-content ms-3">
                                                                                                                        <a href="product-details.html">
                                                                                                                             <h6 className="mb-1">{ele.name}</h6>
                                                                                                                        </a>
                                                                                                                        <div className="products_meta d-flex align-items-center">
                                                                                                                             <div>
                                                                                                                                  <span className="price text-primary fw-semibold">₹ {ele.price}</span>
                                                                                                                                  <span className="count">x {ele.itemCount}</span>
                                                                                                                             </div>
                                                                                                                             <button className="remove_cart_btn" onClick={() => handleDelete(ele.productId)}><DeleteIcon /></button>
                                                                                                                        </div>
                                                                                                                   </div>
                                                                                                              </li>

                                                                                                         ))
                                                                                                    }
                                                                                               </>
                                                                                          )
                                                                                     }

                                                                                </ul>
                                                                                {
                                                                                     carts && carts.length===0 ? (
                                                                                          ""
                                                                                     ):(
                                                                                          <>
                                                                                          <div className="d-flex align-items-center justify-content-between mt-3">
                                                                                     <h6 className="mb-0">Subtotal:</h6>
                                                                                     <span className="fw-semibold text-primary">₹ {totalPrice}</span>
                                                                                </div>
                                                                                <Link to="/checkout" className="btn btn-primary btn-md d-block mt-4"><span
                                                                                     className="me-2"><WalletIcon /></span>Checkout</Link>
                                                                                          </>
                                                                                     )
                                                                                }
                                                                                
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            ) : ("")
                                                       }

                                                  </div>
                                                  {
                                                       settings && settings?.phone ? (
                                                            <>
                                                                 <div className="gshop-header-contact ms-7 position-relative d-none d-lg-flex d-xl-none d-xxl-flex">
                                                                      <a href={`tel:${settings && settings?.phone}`} className="d-flex align-items-center">
                                                                           <span
                                                                                className="icon d-inline-flex rounded-circle justify-content-center align-items-center bg-secondary-light">
                                                                                <svg width="20" height="24" viewBox="0 0 23 24" fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                     <path
                                                                                          d="M1.98193 3.44444C1.98193 2.09441 2.97352 1 4.19672 1H7.82812C8.30477 1 8.72795 1.33664 8.87867 1.83572L10.5373 7.3277C10.7116 7.90472 10.475 8.53538 9.98206 8.8074L7.48236 10.1868C8.70297 13.1748 10.884 15.5821 13.5913 16.9292L14.8411 14.1703C15.0876 13.6263 15.659 13.3651 16.1818 13.5575L21.1577 15.3881C21.61 15.5545 21.915 16.0215 21.915 16.5476V20.5556C21.915 21.9056 20.9234 23 19.7002 23H18.5928C9.41887 23 1.98193 14.7919 1.98193 4.66667V3.44444Z"
                                                                                          stroke="#FF7C08" stroke-width="2" stroke-linecap="round"
                                                                                          stroke-linejoin="round" />
                                                                                </svg>
                                                                           </span>

                                                                           <div className="ms-3">
                                                                                <span className="text-muted fs-xs">Phone & Telephone</span>
                                                                                <h6 className="mb-0 mt-1 fs-sm"> {settings && settings?.phone}</h6>
                                                                           </div>


                                                                      </a>
                                                                 </div>
                                                            </>
                                                       ) : ("")
                                                  }

                                                  <button className="gshop-offcanvas-btn offcanvas-toggle ms-3" title="About us" onClick={handleAbout} >
                                                       <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.5892 0C1.66061 0 0.0917969 1.56893 0.0917969 3.4974C0.0917969 5.42588 1.65997 6.9947 3.5892 6.9947C5.51844 6.9947 7.08661 5.42588 7.08661 3.4974C7.08661 1.56893 5.51768 0 3.5892 0Z" fill="white" />
                                                            <path d="M14.909 0C12.9805 0 11.4116 1.56893 11.4116 3.4974C11.4116 5.42588 12.9805 6.9947 14.909 6.9947C16.8376 6.9947 18.4068 5.42588 18.4068 3.4974C18.4068 1.56893 16.8383 0 14.909 0Z" fill="white" />
                                                            <path d="M26.411 6.99481C28.3391 6.99481 29.9084 5.42599 29.9084 3.49751C29.9084 1.56903 28.3404 0 26.411 0C24.4815 0 22.9136 1.56893 22.9136 3.4974C22.9136 5.42588 24.4827 6.99481 26.411 6.99481Z" fill="white" />
                                                            <path d="M3.49805 18.2016C5.42653 18.2016 6.99578 16.6331 6.99578 14.7043C6.99578 12.7754 5.42653 11.2066 3.49805 11.2066C1.56958 11.2066 0 12.7755 0 14.7043C0 16.6331 1.56958 18.2016 3.49805 18.2016Z" fill="white" />
                                                            <path d="M14.8172 18.2016C16.7454 18.2016 18.3146 16.6331 18.3146 14.7043C18.3146 12.7754 16.7467 11.2066 14.8172 11.2066C12.8881 11.2066 11.3198 12.7754 11.3198 14.7043C11.3198 16.6331 12.8888 18.2016 14.8172 18.2016Z" fill="white" />
                                                            <path d="M26.3205 18.2016C28.2494 18.2016 29.8179 16.6331 29.8179 14.7043C29.8179 12.7754 28.2494 11.2066 26.3205 11.2066C24.3916 11.2066 22.8218 12.7754 22.8218 14.7043C22.8218 16.6331 24.391 18.2016 26.3205 18.2016Z" fill="white" />
                                                            <path d="M3.57813 22.3786C1.64965 22.3786 0.0800781 23.9471 0.0800781 25.876C0.0800781 27.8041 1.64965 29.3733 3.57813 29.3733C5.50661 29.3733 7.07543 27.8049 7.07543 25.876C7.07543 23.9471 5.50661 22.3786 3.57813 22.3786Z" fill="white" />
                                                            <path d="M14.898 22.3786C12.9694 22.3786 11.3999 23.9471 11.3999 25.876C11.3999 27.8041 12.9688 29.3733 14.898 29.3733C16.8261 29.3733 18.3953 27.8049 18.3953 25.876C18.3953 23.9471 16.8261 22.3786 14.898 22.3786Z" fill="white" />
                                                            <path d="M26.4002 22.3786C24.4721 22.3786 22.9028 23.9471 22.9028 25.876C22.9028 27.8041 24.4721 29.3733 26.4002 29.3733C28.3291 29.3733 29.8976 27.8049 29.8976 25.876C29.8976 23.9471 28.3284 22.3786 26.4002 22.3786Z" fill="white" />
                                                       </svg>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </header>
                    {
                         aboutOpen ? (
                              <div class="offcanvas_menu position-fixed">
                                   <div class="tt-short-info d-none d-md-none d-lg-none d-xl-block">
                                        <button class="offcanvas-close" onClick={handleCloseAbout}><CloseIcon /></button>
                                        <span class="logo-wrapper d-inline-block mb-5"><img src={images && images?.logo} alt="logo" /></span>
                                        <div class="offcanvas-content">
                                             <h4 class="mb-4">About Us</h4>
                                             <p>
                                                  Welcome to Creamy Affairs, your one-stop destination for an exquisite array of confectionery delights. At Creamy Affairs, we take pride in offering a diverse range of delectable treats, from our velvety smooth ice creams to our heavenly pastries and decadent cakes. Indulge your senses with our artisanal beverages, crafted with precision to satisfy even the most discerning palate. Craving something savory? Dive into our tantalizing selection of momos and savory snacks, each bite bursting with flavor. And for those with a sweet tooth, our handcrafted chocolates are sure to delight. With a passion for quality and a commitment to culinary innovation, Creamy Affairs invites you to experience a world of flavor where every moment is a celebration of taste and texture.
                                             </p>
                                             <p>
                                                  Creamy Affairs, inspired by the legacy of renowned ice cream brands Havmor and Kwality Walls, brings you a world of frozen delights. With a commitment to quality and a dedication to flavor, we embody the spirit of these iconic names while adding our own unique twist. From the nostalgia-inducing classics to innovative new creations, Creamy Affairs offers an unparalleled ice cream experience that delights taste buds and creates lasting memories. Join us as we continue the tradition of excellence set forth by these esteemed brands, while carving our own path in the realm of frozen treats.
                                             </p>
                                             <button onClick={handleAboutRedirect} class="btn btn-primary mt-4">About Us</button>
                                        </div>
                                        <div class="offcanvas-contact mt-5">
                                             <h5 class="mb-20">Contact Info</h5>
                                             <address>
                                                  {settings && settings?.aboutuslocation}<br />
                                                  <a href={`tel:${settings && settings?.phone}`}>{settings && settings?.phone}</a> <br />
                                                  <a href={`mailto:${settings && settings?.email}`}>{settings && settings?.email}</a>
                                             </address>
                                        </div>
                                        <div class="social-contact offcanvas_social mt-4">
                                             <a href={settings.fb} target="_blank" class="social-btn"><FacebookIcon /></a>
                                             <a href={settings.insta} target="_blank" class="social-btn"><InstagramIcon /></a>
                                             <a href={settings.linkdin} target="_blank" class="social-btn"><LinkedInIcon /></a>
                                             <a href={settings.youtube} target="_blank" class="social-btn"><YouTubeIcon /></a>
                                        </div>
                                   </div>

                              </div>
                         ) : ("")
                    }

                    <Dialog
                         open={open}
                         onClose={handleClose}
                         aria-labelledby="alert-dialog-title"
                         aria-describedby="alert-dialog-description"
                    >

                         <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                   <span className="clear">

                                        <ClearIcon onClick={handleClose} />
                                   </span>
                                   <div className="row">
                                        <div className="col-md-6">
                                             {
                                                  mode === "1" ?
                                                       <img src={SignIn} /> : <img src={SignUp} />
                                             }

                                        </div>
                                        <div className="col-md-6">
                                             <div className="sign-name">
                                                  {mode === "1" ? <h1>{"Sign in"}</h1> : <h1>{"Sign up"}</h1>}
                                             </div>
                                             {
                                                  mode === "1" ? (
                                                       <>
                                                            <div className="form-title">
                                                                 <div className="email-input">
                                                                      <div className='form-group'>
                                                                           <label className="email-label" >
                                                                                <EmailIcon />
                                                                           </label>
                                                                           <input type="text" name="email" value={email} placeholder="Enter email " onChange={(e) => setEmail(e.target.value)} />
                                                                      </div>
                                                                 </div>
                                                                 <div className="email-input mt-3" >
                                                                      <div className='form-group'>
                                                                           <label className="password-label">
                                                                                <LockIcon />
                                                                           </label>
                                                                           <input type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                                                      </div>

                                                                      <Button variant="contained" className="mt-3 form-submit" onClick={handleSignIn} >Sign in</Button>
                                                                      <div className="mt-3">
                                                                           <span>or login with <Button style={{
                                                                                width: "115px",
                                                                                height: "30px",
                                                                                textTransform: "capitalize"
                                                                           }}>Phone Number</Button></span>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="mt-5">
                                                                 <p style={{ fontWeight: "700" }}>Dont have any account ? <Button style={{
                                                                      color: "#999",
                                                                      width: "68px",
                                                                      height: "30px",
                                                                      textTransform: "capitalize",
                                                                      fontWeight: "bold"
                                                                 }} onClick={handleOpenSignup}>Sign up</Button> </p>
                                                            </div>
                                                       </>
                                                  ) : (
                                                       <>
                                                            <div className="form-title">

                                                                 <div class="image-container">
                                                                      <img id="selectedImage" src={imagePreview} alt="Selected Image" class="default-image" />
                                                                      <label for="imageUpload" class="choose-image" onCl><AddCircleIcon /></label>
                                                                      <input type="file" id="imageUpload" name="file" onChange={handleChange} />
                                                                 </div>

                                                                 <div className="email-input">
                                                                      <div className='form-group'>
                                                                           <label className="name-label" >
                                                                                <PersonIcon />
                                                                           </label>
                                                                           <input type="text" name="name" value={formData.name} placeholder="Enter name " onChange={handleChange} />
                                                                      </div>
                                                                 </div>
                                                                 <div className="email-input mt-3">
                                                                      <div className='form-group'>
                                                                           <label className="number-label" >
                                                                                <StayCurrentPortraitIcon />
                                                                           </label>
                                                                           <input type="text" name="mobile" value={formData.mobile} placeholder="Enter Mobile No " onChange={handleChange} />
                                                                      </div>
                                                                 </div>

                                                                 <div className="email-input mt-3">
                                                                      <div className='form-group'>
                                                                           <label className="signup-email-label" >
                                                                                <EmailIcon />
                                                                           </label>
                                                                           <input type="text" name="email" value={formData.email} placeholder="Enter email " onChange={handleChange} />
                                                                      </div>
                                                                 </div>
                                                                 <div className="email-input mt-3" >
                                                                      <div className='form-group'>
                                                                           <label className="signup-pass-label">
                                                                                <LockIcon />
                                                                           </label>
                                                                           <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
                                                                      </div>
                                                                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                                                      <Button variant="contained" className="mt-3 form-submit" onClick={handleSubmit}>Sign up</Button>
                                                                      <div className="mt-3">
                                                                           <span>Do you want to login ?<Button onClick={handleReturnLogin} style={{
                                                                                width: "52px",
                                                                                height: "30px",
                                                                                textTransform: "capitalize"
                                                                           }}>Login</Button></span>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                       </>
                                                  )
                                             }

                                        </div>
                                   </div>
                              </DialogContentText>
                         </DialogContent>
                    </Dialog>

                    <Dialog
                         open={logoutOpen}
                         onClose={handleLogoutModalClose}
                         aria-labelledby="alert-dialog-title"
                         aria-describedby="alert-dialog-description"
                    >
                         <DialogTitle id="alert-dialog-title">
                         </DialogTitle>
                         <DialogContent>
                              <DialogContentText id="alert-dialog-description" style={{ fontSize: "larger" }}>
                                   Are you sure you want to log out?
                              </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                              <Button className="submit" onClick={handleSignout}>Yes</Button>
                              <Button className="submi1" onClick={handleLogoutModalClose} autoFocus>
                                   No
                              </Button>
                         </DialogActions>
                    </Dialog>
               </div>
          </>
     )
}

export default Navbar
