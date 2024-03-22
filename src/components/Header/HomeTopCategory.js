import React from 'react'
import BgShape from '../../images/shapes/bg-shape.png'
import Vegetable from '../../images/category/vegetable.png'
import FreshFruit from '../../images/category/fresh-fruits.png'
import Milk from '../../images/category/milk.png'
import Coffe from '../../images/category/coffee-drinks.png'
import Meat from '../../images/category/meat.png'
import Cleaning from '../../images/category/cleaning.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const HomeTopCategory = () => {
    return (
        <>

            <section className="gshop-category-section bg-white pt-120 position-relative z-1 overflow-hidden">
                <img src={BgShape} alt="bg shape" className="position-absolute bottom-0 start-0 w-100 z--1" />
                <div className="container">
                    <div className="gshop-category-box border-secondary rounded-3 bg-white">
                        <div className="text-center section-title">
                            <h4 className="d-inline-block px-2 bg-white mb-4">Our Top Category</h4>
                        </div>
                        <div className="row justify-content-center g-4">
                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={Vegetable} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Vegetable</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden color-2">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={FreshFruit} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Fresh Fruits</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>

                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden color-3">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={Milk} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Milk & Dairy</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden color-4">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={Coffe} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Coffee & Drinks</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden color-5">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={Meat} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Meat</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>
                            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden color-3">
                                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                                        <img src={Cleaning} alt="flower" className="img-fluid" />
                                    </div>
                                    <a href="shop-grid.html" className="text-dark fs-sm fw-bold d-block mt-3">Cleaning Essential</a>
                                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">25 Items</span>
                                    <a href="shop-grid.html" className="explore-btn position-absolute"><ArrowOutwardIcon /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
        </>
    )
}

export default HomeTopCategory