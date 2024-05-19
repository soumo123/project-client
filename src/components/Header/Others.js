import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import ViewProduct from '../products/ViewProduct';

const Others = ({ newProducts, load, setLoad }) => {
    const alert = useAlert()
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [open, setOpen] = useState(false)
    const [viewData, setViewData] = useState([])
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")

    const handleModalOpen = (e) => {
        setViewData(e)
        setOpen(true)
    }

    useEffect(() => {
        if (newProducts.length > 0) {

            const halfwayIndex = Math.ceil(newProducts.length / 2);
            const firstHalfData = newProducts.slice(0, halfwayIndex);
            const secondHalfData = newProducts.slice(halfwayIndex);
            setFirstHalf(firstHalfData); // Set the first half to the state
            setSecondHalf(secondHalfData); // Set the second half to the state
        }
    }, [newProducts])

    console.log("firstHalf , secondHalf", firstHalf, secondHalf)
    const handleAddWhish = async (status, productId, name, description, price, discount, thumbnailimage, stock, ratings, numOfReviews) => {
        try {

            if (!userId || userId === undefined || userId === null) {
                alert.error("Please Signin First")
                return
            }
            let json = {
                name: name,
                description: description,
                price: price,
                discount: discount,
                thumbnailimage: thumbnailimage,
                stock: stock,
                numOfReviews: numOfReviews,
                ratings: ratings
            }
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/add_whishlist?status=${status}&userId=${userId}&type=${Number(type)}&productId=${productId}`, json, config)
            if (response.status === 200) {
                if (status === true || status === "true") {
                    alert.success("Product add to whsihlist");
                    setLoad(new Date().getSeconds())
                } else {
                    alert.success("Product remove to whsihlist");
                    setLoad(new Date().getSeconds())
                }
            }

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>

            <section className="pt-80 pb-120">
                {
                    firstHalf && firstHalf.length > 0 || secondHalf && secondHalf > 0 ? (
                        <>
                            <div className="container">
                                <div className="row justify-content-center g-4">
                                    <h4 className="mb-0">New Products</h4>
                                    <div className="col-xxl-4 col-lg-6">
                                        <div className="product-listing-box bg-white">
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-5 flex-wrap">

                                                <Link to="/products" className="explore-btn text-secondary fw-bold">View More<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                            </div>
                                            {
                                                firstHalf && firstHalf.map((ele) => (
                                                    <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                                                        <div className="thumbnail position-relative rounded-2">
                                                            <a href="product-details.html"><img src={ele.thumbnailimage} alt="product" className="img-fluid" /></a>
                                                            <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                                                                {
                                                                    ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                        <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteIcon /></span>

                                                                    ) : (
                                                                        <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteBorderIcon /></span>
                                                                    )
                                                                }
                                                                <span className="rounded-btn fs-xs" onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

                                                            </div>
                                                        </div>
                                                        <Link to={`/details/${ele.productId}`}>
                                                            <div className="card-content mt-4 mt-sm-0">
                                                                <div className="d-flex align-items-center flex-nowrap star-rating">
                                                                    <ul className="d-flex align-items-center me-2">
                                                                        <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                                    </ul>
                                                                    <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                                </div>
                                                                <a href="product-details.html" className="fw-bold text-heading title d-block fs-sm">{ele.name}</a>
                                                                <div className="pricing mt-2">
                                                                    <span className="fw-bold h4 deleted me-1">₹ {ele.price}</span>
                                                                    <span className="fw-bold h4 text-danger">₹ {ele.actualpricebydiscount}</span>
                                                                </div>
                                                                <a href="product-details.html" className="fs-xs fw-bold mt-10 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></a>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            }


                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-lg-6">
                                        <div className="product-listing-box bg-white">
                                            <div className="d-flex align-items-center justify-content-between gap-3 mb-5 flex-wrap">
                                                {/* <h4 className="mb-0">Organic Bestseller</h4> */}
                                                <Link to="/products" className="explore-btn text-secondary fw-bold">View More<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                            </div>
                                            {
                                                secondHalf && secondHalf.map((ele) => (
                                                    <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                                                        <div className="thumbnail position-relative rounded-2">
                                                            <a href="product-details.html"><img src={ele.thumbnailimage} alt="product" className="img-fluid" /></a>
                                                            <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                                                                {
                                                                    ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                        <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteIcon /></span>

                                                                    ) : (
                                                                        <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteBorderIcon /></span>
                                                                    )
                                                                }
                                                                <span className="rounded-btn fs-xs" onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

                                                            </div>
                                                        </div>
                                                        <Link to={`/details/${ele.productId}`}>
                                                            <div className="card-content mt-4 mt-sm-0">
                                                                <div className="d-flex align-items-center flex-nowrap star-rating">
                                                                    <ul className="d-flex align-items-center me-2">
                                                                        <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                                    </ul>
                                                                    <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                                </div>
                                                                <a href="product-details.html" className="fw-bold text-heading title d-block fs-sm">{ele.name}</a>
                                                                <div className="pricing mt-2">
                                                                    <span className="fw-bold h4 deleted me-1">₹ {ele.price}</span>
                                                                    <span className="fw-bold h4 text-danger">₹ {ele.actualpricebydiscount}</span>
                                                                </div>
                                                                <Link to="/order" className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))
                                            }


                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
                                        <div className="vertical-banner text-center bg-white rounded-2" >
                                            <img src={images?.middle_banner5} className="img-fluid" />
                                            <h5 className="mb-1">Fresh & Organic Spice</h5>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <span className="hot-badge bg-danger fw-bold fs-xs position-relative text-white">HOT</span>
                                                <span className="offer-title text-danger fw-bold">30% Off</span>
                                            </div>
                                            <Link to="/order" className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                        </div>
                                        <div className="counter-box bg-white rounded-2 mt-4">
                                            <div className="horizontal-counter d-flex align-items-center gap-3">
                                                <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-2 bg-glimpse-pink flex-shrink-0">
                                                    <img src="assets/img/icons/letter-box.svg" alt="icon" className="img-fluid" />
                                                </span>
                                                <div className="numbers">
                                                    <h3 className="mb-1"><span className="counter">456</span>k+</h3>
                                                    <h6 className="mb-0 text-gray fs-sm">Total Products</h6>
                                                </div>
                                            </div>
                                            <span className="gradient-spacer-2 d-block my-4"></span>
                                            <div className="horizontal-counter d-flex align-items-center gap-3">
                                                <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-2 bg-azure-mist flex-shrink-0">
                                                    <img src="assets/img/icons/thumbs-up.svg" alt="icon" className="img-fluid" />
                                                </span>
                                                <div className="numbers">
                                                    <h3 className="mb-1"><span className="counter">16</span>M+</h3>
                                                    <h6 className="mb-0 text-gray fs-sm">Customer Satisfaction</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )
                }

            </section>

            <ViewProduct setOpen={setOpen} open={open} viewData={viewData} />
        </>
    )
}

export default Others