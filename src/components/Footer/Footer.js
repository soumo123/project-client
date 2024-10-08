import React, { useState, useMemo ,useEffect} from 'react'
import BorderLine from '../../images/shapes/border-line.svg'
import MaterCard from '../../images/brands/mastercard.png'
import Payoner from '../../images/brands/payoneer.png'
import Paypal from '../../images/brands/paypal.png'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import gpay from '../../images/gpay.png';
import Paytm from '../../images/paytm.png'
import Phonepay from '../../images/phonepe.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Authentication from '../custom/Authentication'

const Footer = () => {
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const userDetails = useSelector((state) => state.userDetails.user)
    const cartDetails = useSelector((state) => state.cartDetails.carts)
    const [open, setOpen] = useState(false)
    const [logoutOpen, setLogOutOpen] = useState(false);
    const[totalPrice,setTotalPrice]=useState(0)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickModalOpen = () => {
        setLogOutOpen(true);
    };

    console.log("cartDetailscartDetails", cartDetails)

    useEffect(() => {
        setTotalPrice(cartDetails.reduce((sum, product) => sum + product.totalPrice, 0))
    }, [cartDetails])
    

    return (
        <>

            <div className="footer-curve position-relative overflow-hidden">
                <span className="position-absolute section-curve-wrapper top-0 h-100" data-background="assets/img/shapes/section-curve.png"></span>
            </div>
            <footer className="gshop-footer position-relative pt-8 bg-dark z-1 overflow-hidden">
                {/* <img src="assets/img/shapes/tomato.svg" alt="tomato" className="position-absolute z--1 tomato vector-shape"/>
            <img src="assets/img/shapes/pata-lg.svg" alt="pata" className="position-absolute z--1 pata-lg vector-shape"/>
            <img src="assets/img/shapes/pata-xs.svg" alt="pata" className="position-absolute z--1 pata-xs vector-shape"/>
            <img src="assets/img/shapes/frame-circle.svg" alt="frame" className="position-absolute z--1 frame-circle vector-shape"/>
            <img src="assets/img/shapes/leaf.svg" alt="leaf" className="position-absolute z--1 leaf vector-shape"/>
          
            <img src="assets/img/shapes/leaf.svg" alt="pata" className="position-absolute leaf-2 z--1 vector-shape"/>
            <img src="assets/img/shapes/pata-xs.svg" alt="pata" className="position-absolute pata-xs-2 z--1 vector-shape"/>
            <img src="assets/img/shapes/tomato-slice.svg" alt="tomato slice" className="position-absolute tomato-slice vector-shape z--1"/>
            <img src="assets/img/shapes/tomato-half.svg" alt="tomato" className="position-absolute tomato-half z--1 vector-shape"/> */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6">
                            <div className="gshop_subscribe_form text-center">
                                <h4 className="text-white gshop-title" style={{ fontSize: "21px" }}>Subscribe to the Creamyafairs <mark className="p-0 position-relative text-secondary bg-transparent">New Arrivals <img src={BorderLine} alt="border line" className="position-absolute border-line" /></mark><br className="d-none d-sm-block" />& Other Information.</h4>
                                <form className="mt-5 d-flex align-items-center bg-white rounded subscribe_form">
                                    <input type="email" className="form-control" placeholder="Enter Email Address" />
                                    <button type="submit" className="btn btn-primary flex-shrink-0">Subscribe Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <span className="gradient-spacer my-8 d-block"></span>
                    <div className="row g-5">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h5 className="text-white mb-4">Category</h5>
                                <ul className="footer-nav">
                                    {/* <li><a href="#">Testimonials</a></li> */}
                                    <li><Link to="/contact-us">Contact</Link></li>
                                    <li><Link to="/about-us">About us</Link></li>
                                    {/* <li><a href="#">Our Guarantee</a></li> */}
                                    {/* <li><a href="#">Track Your Order</a></li> */}
                                    {/* <li><a href="#">Help Page</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h5 className="text-white mb-4">Quick Links</h5>
                                <ul className="footer-nav">
                                    <li><a href="#">Business registration</a></li>
                                    <li><a href="#">Open your shop </a></li>
                                    {/* <li><a href="#">Return Center</a></li>
                                <li><a href="#">Purchase History</a></li>
                                <li><a href="#">Latest News Blog</a></li>
                                <li><a href="#">Shipping & Delivery</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h5 className="text-white mb-4">Contact Us</h5>
                                <ul className="footer-nav">
                                    <li><a href="#">Contact</a></li>
                                    {/* <li><a href="#">Contact</a></li> */}
                                    <li><a href="#">Location & Working Hours</a></li>
                                    {/* <li><a href="#">Our Guarantee</a></li>
                                <li><a href="#">Track Your Order</a></li>
                                <li><a href="#">Help Page</a></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                            <div className="footer-widget">
                                <h5 className="text-white mb-4">Customer Support</h5>
                                <ul className="footer-nav">
                                    <li><a href="#">Chat with us</a></li>
                                    {/* <li><a href="#">Returns & Exchanges</a></li>
                                <li><a href="#">Return Center</a></li>
                                <li><a href="#">Purchase History</a></li>
                                <li><a href="#">Latest News Blog</a></li>
                                <li><a href="#">Shipping & Delivery</a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright pt-120 pb-3">
                    <span className="gradient-spacer d-block mb-3"></span>
                    <div className="container">
                        <div className="row align-items-center g-3">
                            <div className="col-lg-4">
                                <div className="copyright-text">
                                    <p className="mb-0 text-white">&copy;Made by <a href="#" className="text-secondary">Emunity</a></p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="logo-wrapper text-center">
                                    <span className="logo"><img src={images && images.logo} alt="logo" className="img-fluid" /></span>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="footer-payments-info d-flex align-items-center justify-content-lg-end gap-2">
                                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                                        <img src={gpay} alt="G-pay" className="img-fluid" />
                                    </div>
                                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                                        <img src={Paytm} alt="Paytm" className="img-fluid" />
                                    </div>
                                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                                        <img src={Phonepay} alt="Phonpe" className="img-fluid" />
                                    </div>
                                    {/* <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                                    <img src={Paypal} alt="visa" className="img-fluid"/>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="mobile-toolbar d-block d-md-none d-lg-none">
                <div className="d-table table-layout-fixed w-100">
                    <Link to="/" className="d-table-cell mobile-toolbar-item mobile-menu-toggle" >
                        <span className="mobile-toolbar-icon"><HomeIcon /></span><span
                            className="mobile-toolbar-label">Home
                        </span>
                    </Link>
                    <div className="gshop-header-search dropdown d-table-cell mobile-toolbar-item">
                        <button className="header-icon" type="button" data-bs-toggle="dropdown" style={{ position: "relative", top: "18px" }}>
                            <span className="mobile-toolbar-icon">
                                <SearchIcon />
                            </span>
                            <span className="mobile-toolbar-label">Search</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-start border-0">
                            <form className="search-form d-flex align-items-center" action="#">
                                <input type="text" placeholder="Search products..." className="w-100" />
                                <button type="submit" className="submit-icon-btn-secondary"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="gshop-header-user profil dropdown d-table-cell mobile-toolbar-item">
                        <button type="button" className="header-icon">
                            {
                                userDetails.length === 0 ? (
                                    <svg width="18" height="25" viewBox="0 0 22 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.092 11.9546C12.6656 11.9546 14.0281 11.3902 15.1416 10.2766C16.2547 9.16322 16.8193 7.80093 16.8193 6.2271C16.8193 4.65382 16.2549 3.29134 15.1414 2.1776C14.0279 1.0644 12.6654 0.5 11.092 0.5C9.51825 0.5 8.156 1.0644 7.04266 2.17778C5.92931 3.29116 5.36475 4.65363 5.36475 6.2271C5.36475 7.80093 5.92931 9.1634 7.04266 10.2768C8.15636 11.39 9.51879 11.9546 11.092 11.9546ZM8.0281 3.16308C8.88239 2.30877 9.88453 1.89349 11.092 1.89349C12.2993 1.89349 13.3017 2.30877 14.1561 3.16308C15.0104 4.01757 15.4259 5.01992 15.4259 6.2271C15.4259 7.43464 15.0104 8.43681 14.1561 9.2913C13.3017 10.1458 12.2993 10.5611 11.092 10.5611C9.88489 10.5611 8.88275 10.1456 8.0281 9.2913C7.17364 8.43699 6.7582 7.43464 6.7582 6.2271C6.7582 5.01992 7.17364 4.01757 8.0281 3.16308Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                                        <path d="M21.1339 18.893C21.1012 18.4201 21.0352 17.9043 20.9379 17.3596C20.8397 16.8108 20.7133 16.292 20.562 15.8178C20.4055 15.3277 20.1931 14.8438 19.9301 14.38C19.6575 13.8986 19.3371 13.4794 18.9776 13.1345C18.6016 12.7736 18.1414 12.4835 17.6091 12.2719C17.0787 12.0614 16.4909 11.9547 15.8621 11.9547C15.6152 11.9547 15.3763 12.0564 14.9151 12.3576C14.6313 12.5433 14.2993 12.7581 13.9287 12.9956C13.6118 13.1982 13.1825 13.3879 12.6523 13.5598C12.135 13.7277 11.6098 13.8129 11.0912 13.8129C10.5729 13.8129 10.0477 13.7277 9.53001 13.5598C9.00034 13.3881 8.57088 13.1984 8.25455 12.9958C7.88747 12.7605 7.55527 12.5457 7.26718 12.3574C6.80634 12.0562 6.56753 11.9545 6.32059 11.9545C5.69163 11.9545 5.10401 12.0614 4.57378 12.2721C4.04189 12.4833 3.58143 12.7734 3.20512 13.1347C2.84561 13.4798 2.52522 13.8988 2.25281 14.38C1.99019 14.8438 1.77758 15.3276 1.62108 15.818C1.46993 16.2922 1.34351 16.8108 1.24533 17.3596C1.14788 17.9035 1.082 18.4195 1.04933 18.8935C1.01722 19.3569 1.00098 19.8393 1.00098 20.3266C1.00098 21.5934 1.40238 22.6189 2.19394 23.3752C2.97572 24.1216 4.00996 24.5 5.26808 24.5H16.9157C18.1735 24.5 19.2077 24.1216 19.9897 23.3752C20.7814 22.6194 21.1828 21.5935 21.1828 20.3264C21.1826 19.8374 21.1662 19.3551 21.1339 18.893ZM19.0123 22.3449C18.4957 22.8381 17.8099 23.0779 16.9155 23.0779H5.26808C4.37354 23.0779 3.68773 22.8381 3.17135 22.3451C2.66474 21.8613 2.41854 21.2008 2.41854 20.3266C2.41854 19.8718 2.43349 19.4229 2.46339 18.9918C2.49255 18.569 2.55216 18.1044 2.64056 17.6108C2.72786 17.1233 2.83896 16.6658 2.9711 16.2516C3.09789 15.8545 3.27082 15.4612 3.48527 15.0824C3.68995 14.7214 3.92544 14.4116 4.18529 14.1621C4.42835 13.9286 4.73471 13.7375 5.0957 13.5942C5.42956 13.4616 5.80476 13.3891 6.21208 13.3781C6.26172 13.4046 6.35012 13.4552 6.49334 13.5488C6.78475 13.7394 7.12064 13.9567 7.49197 14.1946C7.91054 14.4624 8.44981 14.7042 9.09409 14.9128C9.75277 15.1265 10.4245 15.235 11.0913 15.235C11.7581 15.235 12.4301 15.1265 13.0884 14.913C13.7333 14.704 14.2723 14.4624 14.6915 14.1943C15.0715 13.9506 15.3979 13.7395 15.6894 13.5488C15.8326 13.4553 15.921 13.4046 15.9706 13.3781C16.3781 13.3891 16.7533 13.4616 17.0874 13.5942C17.4482 13.7375 17.7545 13.9288 17.9976 14.1621C18.2574 14.4114 18.4929 14.7212 18.6976 15.0826C18.9122 15.4612 19.0854 15.8547 19.212 16.2515C19.3443 16.6662 19.4556 17.1235 19.5427 17.6106C19.6309 18.1052 19.6907 18.5699 19.7199 18.992V18.9924C19.7499 19.4218 19.7651 19.8705 19.7653 20.3266C19.7651 21.201 19.5189 21.8613 19.0123 22.3449Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                                    </svg>
                                ) : (
                                    <img style={{ borderRadius: "50%", width: "40px", height: "40px" }} src={userDetails.image} />
                                )
                            }
                            <div className="user-menu-wrapper">
                                <ul className="user-menu" style={{ textAlign: "justify" }}>

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
                        </button>
                        <span className="mobile-toolbar-label">
                            {
                                userDetails.length === 0 ? ("Account") : (
                                    <>
                                        {userDetails.name}
                                    </>
                                )
                            }

                        </span>
                    </div>
                    {/* <a className="d-table-cell mobile-toolbar-item" href="my-account.html">
                        <span className="mobile-toolbar-icon">
                            <svg width="18" height="25" viewBox="0 0 22 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.092 11.9546C12.6656 11.9546 14.0281 11.3902 15.1416 10.2766C16.2547 9.16322 16.8193 7.80093 16.8193 6.2271C16.8193 4.65382 16.2549 3.29134 15.1414 2.1776C14.0279 1.0644 12.6654 0.5 11.092 0.5C9.51825 0.5 8.156 1.0644 7.04266 2.17778C5.92931 3.29116 5.36475 4.65363 5.36475 6.2271C5.36475 7.80093 5.92931 9.1634 7.04266 10.2768C8.15636 11.39 9.51879 11.9546 11.092 11.9546ZM8.0281 3.16308C8.88239 2.30877 9.88453 1.89349 11.092 1.89349C12.2993 1.89349 13.3017 2.30877 14.1561 3.16308C15.0104 4.01757 15.4259 5.01992 15.4259 6.2271C15.4259 7.43464 15.0104 8.43681 14.1561 9.2913C13.3017 10.1458 12.2993 10.5611 11.092 10.5611C9.88489 10.5611 8.88275 10.1456 8.0281 9.2913C7.17364 8.43699 6.7582 7.43464 6.7582 6.2271C6.7582 5.01992 7.17364 4.01757 8.0281 3.16308Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                                <path d="M21.1339 18.893C21.1012 18.4201 21.0352 17.9043 20.9379 17.3596C20.8397 16.8108 20.7133 16.292 20.562 15.8178C20.4055 15.3277 20.1931 14.8438 19.9301 14.38C19.6575 13.8986 19.3371 13.4794 18.9776 13.1345C18.6016 12.7736 18.1414 12.4835 17.6091 12.2719C17.0787 12.0614 16.4909 11.9547 15.8621 11.9547C15.6152 11.9547 15.3763 12.0564 14.9151 12.3576C14.6313 12.5433 14.2993 12.7581 13.9287 12.9956C13.6118 13.1982 13.1825 13.3879 12.6523 13.5598C12.135 13.7277 11.6098 13.8129 11.0912 13.8129C10.5729 13.8129 10.0477 13.7277 9.53001 13.5598C9.00034 13.3881 8.57088 13.1984 8.25455 12.9958C7.88747 12.7605 7.55527 12.5457 7.26718 12.3574C6.80634 12.0562 6.56753 11.9545 6.32059 11.9545C5.69163 11.9545 5.10401 12.0614 4.57378 12.2721C4.04189 12.4833 3.58143 12.7734 3.20512 13.1347C2.84561 13.4798 2.52522 13.8988 2.25281 14.38C1.99019 14.8438 1.77758 15.3276 1.62108 15.818C1.46993 16.2922 1.34351 16.8108 1.24533 17.3596C1.14788 17.9035 1.082 18.4195 1.04933 18.8935C1.01722 19.3569 1.00098 19.8393 1.00098 20.3266C1.00098 21.5934 1.40238 22.6189 2.19394 23.3752C2.97572 24.1216 4.00996 24.5 5.26808 24.5H16.9157C18.1735 24.5 19.2077 24.1216 19.9897 23.3752C20.7814 22.6194 21.1828 21.5935 21.1828 20.3264C21.1826 19.8374 21.1662 19.3551 21.1339 18.893ZM19.0123 22.3449C18.4957 22.8381 17.8099 23.0779 16.9155 23.0779H5.26808C4.37354 23.0779 3.68773 22.8381 3.17135 22.3451C2.66474 21.8613 2.41854 21.2008 2.41854 20.3266C2.41854 19.8718 2.43349 19.4229 2.46339 18.9918C2.49255 18.569 2.55216 18.1044 2.64056 17.6108C2.72786 17.1233 2.83896 16.6658 2.9711 16.2516C3.09789 15.8545 3.27082 15.4612 3.48527 15.0824C3.68995 14.7214 3.92544 14.4116 4.18529 14.1621C4.42835 13.9286 4.73471 13.7375 5.0957 13.5942C5.42956 13.4616 5.80476 13.3891 6.21208 13.3781C6.26172 13.4046 6.35012 13.4552 6.49334 13.5488C6.78475 13.7394 7.12064 13.9567 7.49197 14.1946C7.91054 14.4624 8.44981 14.7042 9.09409 14.9128C9.75277 15.1265 10.4245 15.235 11.0913 15.235C11.7581 15.235 12.4301 15.1265 13.0884 14.913C13.7333 14.704 14.2723 14.4624 14.6915 14.1943C15.0715 13.9506 15.3979 13.7395 15.6894 13.5488C15.8326 13.4553 15.921 13.4046 15.9706 13.3781C16.3781 13.3891 16.7533 13.4616 17.0874 13.5942C17.4482 13.7375 17.7545 13.9288 17.9976 14.1621C18.2574 14.4114 18.4929 14.7212 18.6976 15.0826C18.9122 15.4612 19.0854 15.8547 19.212 16.2515C19.3443 16.6662 19.4556 17.1235 19.5427 17.6106C19.6309 18.1052 19.6907 18.5699 19.7199 18.992V18.9924C19.7499 19.4218 19.7651 19.8705 19.7653 20.3266C19.7651 21.201 19.5189 21.8613 19.0123 22.3449Z" fill="#5D6374" stroke="#5D6374" stroke-width="0.2" />
                            </svg>
                        </span>
                        <span className="mobile-toolbar-label">Account</span>
                    </a> */}
                    <Link to="/cart" className="d-table-cell mobile-toolbar-item" href="checkout.html">
                        <span className="mobile-toolbar-icon mobile-cart-icon">
                            <svg width="18" height="25" viewBox="0 0 22 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.1704 23.9559L19.6264 7.01422C19.5843 6.55156 19.1908 6.19718 18.7194 6.19718H15.5355V4.78227C15.5355 2.14533 13.3583 0 10.6823 0C8.00628 0 5.82937 2.14533 5.82937 4.78227V6.19718H2.6433C2.17192 6.19718 1.77839 6.55156 1.73625 7.01422L0.186259 24.0225C0.163431 24.2735 0.248671 24.5223 0.421216 24.7082C0.593761 24.8941 0.837705 25 1.0933 25H20.2695C20.2702 25 20.2712 25 20.2719 25C20.775 25 21.1826 24.5982 21.1826 24.1027C21.1825 24.0528 21.1784 24.0036 21.1704 23.9559ZM7.65075 4.78227C7.65075 3.1349 9.01071 1.79465 10.6824 1.79465C12.3542 1.79465 13.7142 3.1349 13.7142 4.78227V6.19718H7.65075V4.78227ZM2.08948 23.2055L3.47591 7.99183H5.82937V9.59649C5.82937 10.0921 6.237 10.4938 6.74006 10.4938C7.24313 10.4938 7.65075 10.0921 7.65075 9.59649V7.99183H13.7142V9.59649C13.7142 10.0921 14.1219 10.4938 14.6249 10.4938C15.128 10.4938 15.5356 10.0921 15.5356 9.59649V7.99183H17.8869L19.2733 23.2055H2.08948Z" fill="#5D6374" />
                            </svg>
                            {
                                cartDetails ?
                                    <small className="badge bg-primary">{cartDetails.length}</small> : ("")
                            }

                        </span>
                        <span className="mobile-toolbar-label">₹ {totalPrice}</span>
                    </Link>
                </div>
            </div>
            <div className="offcanvas-left-menu position-fixed">
                <div className="mobile-menu">
                    <button className="offcanvas-close"><i className="fa-solid fa-xmark"></i></button>
                    <a href="#" className="d-inline-block mb-5"><img src="assets/img/logo.png" alt="logo" /></a>
                    <nav className="mobile-menu-wrapper scrollbar">
                        <ul>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/baby-care.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Baby Care</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/cleaning.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Cleaning</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/bakery-biscuits.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Bakery & Biscuits</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/coffee-drinks.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Coffee & Drinks</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/beauty-health.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Beauty & Health</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/breakfast.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Breakfast</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/cold-drinks.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Cold Drinks</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/fresh-fruits.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Fresh Fruits</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/honey.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Honey</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/fresh-organic.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Fresh & Organic</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/jam-jelly.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Jam & Jelly</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/sports-fitness.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Sports & Fitness</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/sea-fish.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Sea Fish</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/pet-care.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Pet Care</span>
                                </a>
                            </li>
                            <li>
                                <a href="shop-grid.html" className="d-flex align-items-center">
                                    <div className="me-2 avatar-icon">
                                        <img src="assets/img/category/meat.png" alt="vegetables" className="w-100 h-100 rounded-circle" />
                                    </div>
                                    <span>Meat</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


            <Authentication openModal={open} setOpenModal={setOpen} setLogOutOpenModal={setLogOutOpen} logoutOpenModal={logoutOpen} />



        </>
    )
}

export default Footer
