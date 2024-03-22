import React from 'react'

const Banner = () => {
    return (
        <>
            <section className="banner-section position-relative z-1 overflow-hidden bg-white pt-2">
                <img src="assets/img/shapes/bg-shape-3.png" alt="bg shape" className="position-absolute start-0 bottom-0 z--1 w-100" />
                <div className="container">
                    <div className="row align-items-center g-4 justify-content-center">
                        <div className="col-xl-4 col-md-6">
                            <div className="banner-box background-banner rounded-2 overflow-hidden" data-background="assets/img/banner/banner-1.jpg">
                                <span className="gshop-subtitle fs-xxs mb-1 text-dark d-inline-block">100% Pur Products</span>
                                <h6 className="mb-0">Fresh Fruits</h6>
                                <h4 className="mb-6">Healthy Juice</h4>
                                <a href="product-details.html" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="banner-box rounded-2 overflow-hidden position-relative banner-color-green z-1">
                                <img src="assets/img/products/capsicum.png" alt="capsicum" className="banner-img" />
                                <span className="gshop-subtitle fs-xxs mb-1 text-dark d-inline-block">Weekly Best Seller</span>
                                <h6 className="mb-0">Fresh Fruits</h6>
                                <h4 className="mb-6">Healthy Juice</h4>
                                <a href="product-details.html" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="banner-box rounded-2 overflow-hidden position-relative z-1 banner-color-secondary">
                                <img src="assets/img/products/lychee.png" alt="lychee" className="banner-img" />
                                <span className="badge bg-danger gshop-subtitle mb-1">Top Offer</span>
                                <h6 className="mb-0">Fresh Fruits</h6>
                                <h4 className="mb-6">Healthy Juice</h4>
                                <a href="product-details.html" className="explore-btn fw-bold text-dark">Shop Now<span className="ms-1"><i className="fas fa-arrow-right"></i></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Banner