import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeatureProducts = ({ featuredData }) => {

    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);


    useEffect(() => {
        const halfwayIndex = Math.ceil(featuredData.length / 2);
        const firstHalfData = featuredData.slice(0, halfwayIndex);
        const secondHalfData = featuredData.slice(halfwayIndex);
        setFirstHalf(firstHalfData); // Set the first half to the state
        setSecondHalf(secondHalfData); // Set the second half to the state
    }, [featuredData])



    return (
        <>
            <section class="featured-products pt-120 pb-200 bg-shade position-relative overflow-hidden z-1">
                <img src="assets/img/shapes/roll-1.png" alt="roll" class="position-absolute roll-1 z--1" data-parallax='{"y": -120}' />
                <img src="assets/img/shapes/roll-2.png" alt="roll" class="position-absolute roll-2 z--1" data-parallax='{"y": 120}' />
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-6">
                            <div class="section-title text-center mb-4">
                                <h3 class="mb-2">Featured Brand Products</h3>
                                <p class="mb-0">Platform mindshare through effective infomediaries Dynamically implement.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4 justify-content-center">
                        <div class="col-xxl-4 col-lg-6">
                            {
                                firstHalf && firstHalf.map((ele)=>(
                                    <div class="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 gap-4 mt-4">
                                    <div class="thumbnail position-relative rounded-2">
                                        <a href="product-details.html"><img src={ele.thumbnailimage} alt="product" class="img-fluid" /></a>
                                        <div class="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                            <a href="#" class="rounded-btn"><FavoriteBorderIcon /></a>
                                            <a href="#quickview_modal" data-bs-toggle="modal" class="rounded-btn"><VisibilityOutlinedIcon /></a>
                                            <a href="#" class="rounded-btn">
                                                <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z" fill="#5D6374" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-content mt-4 mt-sm-0">
                                        <div class="d-flex align-items-center flex-nowrap star-rating">
                                            <ul class="d-flex align-items-center me-2">
                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                            </ul>
                                            <span class="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                        </div>
                                        <a href="product-details.html" class="fw-bold text-heading title d-block">{ele.name}</a>
                                        <div class="pricing mt-2">
                                            <span class="fw-bold h4 deleted me-1 text-muted"> ₹ {ele.price}</span>
                                            <span class="fw-bold h4 text-danger"> ₹ {ele.actualpricebydiscount}</span>
                                        </div>
                                        <a href="product-details.html" class="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span class="ms-1"><ArrowForwardIcon/></span></a>
                                    </div>
                                </div>
                                ))
                            }
                        
                           
                           
                        </div>














                        <div class="col-xxl-4 col-lg-6 order-3 order-xxl-2">
                            <div class="product-card-lg bg-white rounded-2 d-flex flex-coloumn h-100">
                                <div>
                                    <div class="card-content position-relative z-2">
                                        <span class="fs-xs gshop-subtitle text-secondary">100% Organic Products</span>
                                        <h4 class="mb-0">Fresh Fruits</h4>
                                        <h3 class="mb-3">Healthy Juice</h3>
                                        <p class="mb-4">Get 50% Off on Selected Organic Items</p>
                                        <a href="product-details.html" class="btn btn-secondary">Shop Now <span class="ms-2"><i class="fas fa-arrow-right"></i></span></a>
                                    </div>

                                    <div class="thumbnail position-relative z-1">
                                        <img src="assets/img/products/pago.png" alt="pago" class="img-fluid p-4" />
                                        <img src="assets/img/shapes/circle-md.png" alt="circle" class="position-absolute end-0 bottom-0 z--1 d-none d-sm-block" />
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="col-xxl-4 col-lg-6 order-2 order-xxl-3">
                          {
                            secondHalf && secondHalf.map((ele)=>(
                                <div class="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 gap-4 mt-4">
                                <div class="thumbnail position-relative rounded-2">
                                    <a href="product-details.html"><img src={ele.thumbnailimage} alt="product" class="img-fluid" /></a>
                                    <div class="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                        <a href="#" class="rounded-btn"><FavoriteBorderIcon /></a>
                                        <a href="#quickview_modal" data-bs-toggle="modal" class="rounded-btn"><VisibilityOutlinedIcon /></a>
                                        <a href="#" class="rounded-btn">
                                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z" fill="#5D6374" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div class="card-content mt-4 mt-sm-0">
                                    <div class="d-flex align-items-center flex-nowrap star-rating">
                                        <ul class="d-flex align-items-center me-2">
                                        <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                        </ul>
                                        <span class="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                    </div>
                                    <a href="product-details.html" class="fw-bold text-heading title d-block">{ele.name}</a>
                                    <div class="pricing mt-2">
                                        <span class="fw-bold h4 deleted me-1 text-muted"> ₹ {ele.price}</span>
                                        <span class="fw-bold h4 text-danger"> ₹ {ele.actualpricebydiscount}</span>
                                    </div>
                                    <a href="product-details.html" class="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span class="ms-1"><ArrowForwardIcon/></span></a>
                                </div>
                            </div>
                            )) 
                          }
                          
                            
                        </div>
                    </div>
                </div>
                <img src="assets/img/shapes/bg-shape-2.png" alt="bg shape" class="position-absolute start-0 bottom-0 w-100 z--1" />
            </section>

        </>
    )
}

export default FeatureProducts