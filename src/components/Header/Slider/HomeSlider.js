import React from 'react'
import Slider from "react-slick";
import './slider.css'
import LeafShadow from '../../../images/shapes/leaf-shadow.png'
import Mangopng from '../../../images/shapes/mango.png'
import HerCircle from '../../../images/shapes/hero-circle-sm.png'
import Fruits from '../../../images/home1/fruits.png'
import Tree from '../../../images/shapes/tree.png'
import Orange from '../../../images/shapes/orange-1.png'
import Orange2 from '../../../images/shapes/orange-2.png'
import Heroimage from '../../../images/shapes/hero-circle-lg.png'
import { useSelector, useDispatch } from 'react-redux'
import Banner2 from '../../../images/home1/banner2.png'
import Banner3 from '../../../images/home1/banner3.png'
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InstagramIcon from '@mui/icons-material/Instagram';

const HomeSlider = () => {

    const settings1 = useSelector((state) => state.settingReducer.settings)
    const images = useSelector((state) => state.imageReducer.images.staticImages)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
    };


    return (
        <>

            {
                settings1 && settings1.caraousel1 ? (
                    <section className="gshop-hero pt-120 bg-white position-relative z-1 overflow-hidden">
                        <img src={LeafShadow} alt="leaf" className="position-absolute leaf-shape z--1 rounded-circle" />
                        <img src={Mangopng} alt="mango" className="position-absolute mango z--1" data-parallax='{"y": -120}' />
                        <img src={HerCircle} alt="circle" className="position-absolute hero-circle circle-sm z--1" />
                        <div className="container">
                            <div className="gshop-hero-slider swiper">
                                <div className="swiper-wrapper">
                                    <Slider {...settings} className='home_slider_Main'>
                                        <div className="item">
                                            <div className="row align-items-center justify-content-between">
                                                <div className="col-xl-5 col-lg-8">
                                                    <div className="hero-left-content">
                                                        <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">{settings1.headerCaraosuel1}</span>
                                                        <h1 className="display-4 mb-3">{settings1.middleCaraosuel1}</h1>
                                                        <p className="mb-7 fs-6">{settings1.footerCaraosuel1}</p>
                                                        <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                                                            <Link to="/products" className="btn btn-secondary">Shop Now<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                                            {/* <a href="about.html" className="btn btn-primary">About Us<span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span></a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-7">
                                                    <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                                                        <img src={images && images.caraousel1} alt="fruits" className="img-fluid position-absolute end-0  hero-img" />
                                                        <img src={Tree} alt="tree" className="img-fluid position-absolute tree z-1" />
                                                        <img src={Orange} alt="orange" className="position-absolute orange-1 z-1" />
                                                        <img src={Orange2} alt="orange" className="position-absolute orange-2 z-1" />
                                                        <img src={Heroimage} alt="circle shape" className="img-fluid hero-circle" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            {/* <img src={Banner2} className="w-100" /> */}
                                            <div className="swiper-slide gshop-hero-single">
                                                <div className="row align-items-center justify-content-between">
                                                    <div className="col-xl-5 col-lg-8">
                                                        <div className="hero-left-content">
                                                            <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">{settings1.headerCaraosuel2}</span>
                                                            <h1 className="display-4 mb-3">{settings1.middleCaraosuel2}</h1>
                                                            <p className="mb-7 fs-6">{settings1.footerCaraosuel2}</p>
                                                            <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                                                                <Link to="/products" className="btn btn-secondary">Shop Now<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                                                {/* <a href="about.html" className="btn btn-primary">About Us<span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span></a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-7">
                                                        <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                                                            <img src={images && images.caraousel2} alt="fruits" className="img-fluid position-absolute end-0" />
                                                            <img src={Orange} alt="orange" className="position-absolute orange-1 z-1" />
                                                            <img src={Orange2} alt="orange" className="position-absolute orange-2 z-1" />
                                                            <img src={Heroimage} alt="circle shape" className="img-fluid hero-circle" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            {/* <img src={Banner3} className="w-100" /> */}
                                            <div className="swiper-slide gshop-hero-single">
                                                <div className="row align-items-center justify-content-between">
                                                    <div className="col-xl-5 col-lg-8">
                                                        <div className="hero-left-content">
                                                            <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">{settings1.headerCaraosuel3}</span>
                                                            <h1 className="display-4 mb-3">{settings1.middleCaraosuel3}</h1>
                                                            <p className="mb-7 fs-6">{settings1.footerCaraosuel3}</p>
                                                            <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                                                                <Link to="/products" className="btn btn-secondary">Shop Now<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                                                {/* <a href="about.html" className="btn btn-primary">About Us<span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span></a> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-7">
                                                        <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                                                            <img src={images && images.caraousel3} alt="fruits" className="img-fluid position-absolute end-0" />
                                                            <img src={Orange} alt="orange" className="position-absolute orange-1 z-1" />
                                                            <img src={Orange2} alt="orange" className="position-absolute orange-2 z-1" />
                                                            <img src={Heroimage} alt="circle shape" className="img-fluid hero-circle" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </Slider>
                                </div>
                            </div>

                        </div>

                        <div className="at-header-social d-none d-sm-flex align-items-center position-absolute">
                            <span className="title fw-medium">Follow on</span>
                            <ul className="social-list ms-3">
                                <li><a href={settings1.fb} target="_blank"><FacebookIcon /></a></li>
                                <li><a href={settings1.insta}target="_blank"><InstagramIcon /></a></li>
                                <li><a href={settings1.linkdin} target="_blank"><LinkedInIcon /></a></li>
                                <li><a href={settings1.youtube} target="_blank"><YouTubeIcon /></a></li>
                            </ul>
                        </div>
                        <div className="gshop-hero-slider-pagination theme-slider-control position-absolute top-50 translate-middle-y z-5">

                        </div>
                    </section>

                ) : ("")
            }

        </>
    )
}

export default HomeSlider