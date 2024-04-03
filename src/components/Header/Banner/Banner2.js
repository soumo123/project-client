import React from 'react'
import { useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from 'react-router-dom'

const Banner2 = () => {

    const images = useSelector((state) => state.imageReducer.images.staticImages)

    return (
        <>

            <section className="banner-section position-relative z-1 overflow-hidden">
                <img src={images?.middle_banner3} alt="bg shape" className="position-absolute start-0 bottom-0 w-100 z--1" />
                <div className="container">
                    <div className="row g-4">
                        <div className="col-xl-8">
                            <div className="banner-box background-banner rounded-2 banner-lg" data-background="assets/img/banner/banner-2.jpg">
                                <span className="badge bg-danger mb-2">Top Offer</span>
                                <h3 className="mb-6 text-white gshop-title">Fresh & Natural Healthy<br className="d-none d-sm-block" /> Food <mark className="position-relative text-secondary position-relative bg-transparent">Special Offer<img src="assets/img/shapes/border-line.png" className="position-absolute start-0 border-line w-100" alt="border line"/></mark></h3>
                                <a href="product-details.html" className="btn btn-secondary btn-md">Shop Now<span className="ms-2"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="banner-img rounded-3 overflow-hidden">
                                <img src={images?.middle_banner4} alt="banner" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Banner2