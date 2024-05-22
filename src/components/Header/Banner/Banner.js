import React from 'react'
import { useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom'


const Banner = () => {

    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const settings = useSelector((state) => state.settingReducer.settings)



    return (
        <>
            {
                settings && settings.trending_cards ? (
                    <section className="banner-section position-relative z-1 overflow-hidden bg-white pt-2">
                        {/* <img src="assets/img/shapes/bg-shape-3.png" alt="bg shape" className="position-absolute start-0 bottom-0 z--1 w-100" /> */}
                        <div className="container">
                            <div className="row align-items-center g-4 justify-content-center">
                                <div className="col-xl-4 col-md-6" style={{ cursor: "pointer" }}>
                                    <div className="banner-box rounded-2 overflow-hidden position-relative banner-color-green z-1">
                                        <img src={images?.banner1} alt="capsicum" className="banner-img" />
                                        <span className="gshop-subtitle fs-xxs mb-1 text-dark d-inline-block">Weekly Best Seller</span>
                                        <h6 className="mb-0">Fresh Fruits</h6>
                                        <h4 className="mb-6">Healthy Juice</h4>
                                        <Link to="/products" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6" style={{ cursor: "pointer" }}>
                                    <div className="banner-box rounded-2 overflow-hidden position-relative banner-color-green z-1">
                                        <img src={images?.banner2} alt="capsicum" className="banner-img" />
                                        <span className="gshop-subtitle fs-xxs mb-1 text-dark d-inline-block">Weekly Best Seller</span>
                                        <h6 className="mb-0">Fresh Fruits</h6>
                                        <h4 className="mb-6">Healthy Juice</h4>
                                        <Link to="/products" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-md-6" style={{ cursor: "pointer" }}>
                                    <div className="banner-box rounded-2 overflow-hidden position-relative z-1 banner-color-secondary">
                                        <img src={images?.banner3} alt="lychee" className="banner-img" />
                                        <span className="badge bg-danger gshop-subtitle mb-1">Top Offer</span>
                                        <h6 className="mb-0">Fresh Fruits</h6>
                                        <h4 className="mb-6">Healthy Juice</h4>
                                        <Link to="/products" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : ("")
            }


        </>
    )
}

export default Banner