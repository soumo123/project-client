import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const BestDeals = ({ dealsData }) => {

    const [data, setData] = useState([])



    useEffect(() => {
        if (dealsData) {
            setData(dealsData)
        }
    }, [dealsData]);



    return (
        <>
            <section className="pb-120 position-relative z-1 pt-120">
                <div className="container">
                    <div className="row g-4 align-items-center justify-content-center">
                        <div className="col-xxl-4 col-xl-5 order-2 order-xxl-1">
                            <div className="banner-box banner-color-green position-relative overflow-hidden z-1 rounded-2 pe-0 pb-0">
                                <span className="gshop-subtitle text-secondary mb-1">100% Organic Vegetable</span>
                                <h6 className="mb-0">Vegetable</h6>
                                <h4 className="mb-2">Fresh & Healthy</h4>
                                <p className="fw-medium mb-5">Get 50% Off on Selected Organic Items</p>
                                <a href="product-details.html" className="btn btn-primary btn-md">Show Now<span className="ms-2"><i className="fas fa-arrow-right"></i></span></a>
                                <div className="banner-img-wrapper text-end mt--40">
                                    <img src="assets/img/banner/vegetables.png" alt="vegetables" className="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 order-1 order-xxl-2">
                            <div className="timing-box d-flex align-items-center justify-content-center justify-content-sm-between rounded-3 flex-wrap gap-3">
                                <h4 className="mb-0">Weekly Best Deals</h4>
                                <ul className="timing-countdown countdown-timer d-flex align-items-center gap-2" data-date="06/30/2023 23:59:59">
                                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                                        <h5 className="mb-0 days">00</h5>
                                        <span className="gshop-subtitle fs-xxs d-block">Days</span>
                                    </li>
                                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                                        <h5 className="mb-0 hours">00</h5>
                                        <span className="gshop-subtitle fs-xxs d-block">Days</span>
                                    </li>
                                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                                        <h5 className="mb-0 minutes">00</h5>
                                        <span className="gshop-subtitle fs-xxs d-block">Days</span>
                                    </li>
                                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                                        <h5 className="mb-0 seconds">00</h5>
                                        <span className="gshop-subtitle fs-xxs d-block">Days</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <div className="row g-4">
                                 {
                                    data.map((ele)=>(
                                       <div className="col-lg-6">
                                       <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 shadow gap-4">
                                           <div className="thumbnail position-relative rounded-2">
                                               <a href="product-details.html"><img src={ele.thumbnailimage} alt="product" className="img-fluid" /></a>
                                               <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                   <a href="#" className="rounded-btn"><FavoriteBorderIcon/></a>
                                                   <a href="#quickview_modal" data-bs-toggle="modal" className="rounded-btn"><VisibilityOutlinedIcon/></a>
                                                   <a href="#" className="rounded-btn">
                                                       <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                           <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z" fill="#5D6374"></path>
                                                       </svg>
                                                   </a>
                                               </div>
                                           </div>
                                           <div className="card-content mt-4 mt-sm-0">
                                               <div className="d-flex align-items-center flex-nowrap star-rating">
                                                   <ul className="d-flex align-items-center me-2">
                                                   <Rating  name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                   </ul>
                                                   <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                               </div>
                                               <a href="product-details.html" className="fw-bold text-heading title d-block">{ele.name}</a>
                                               <div className="pricing mt-2">
                                               <span className="fw-bold h4 deleted me-1">₹ {ele.price}</span>
                                                <span className="fw-bold h4 text-danger">₹ {ele.actualpricebydiscount}</span>

                                               </div>
                                               <a href="product-details.html" className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon/></span></a>

                                           </div>
                                       </div>
                                   </div>
                                    ))
                                 }
                                    
                                   
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BestDeals