import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ViewProduct from '../../products/ViewProduct';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import { useAlert } from 'react-alert'

const BestDeals = ({ dealsData, load, setLoad }) => {
    const alert = useAlert()
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [viewData, setViewData] = useState([])
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")
    const handleModalOpen = (e) => {
        setViewData(e)
        setOpen(true)
    }


    useEffect(() => {
        if (dealsData) {
            setData(dealsData)
        }
    }, [dealsData]);

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
            <section className="pb-120 position-relative z-1 pt-120">
                <div className="container">
                    <div className="row g-4 align-items-center justify-content-center">
                        <div className="col-xxl-4 col-xl-5 order-2 order-xxl-1">
                            <div className="banner-box banner-color-green position-relative overflow-hidden z-1 rounded-2 pe-0 pb-0">
                                <span className="gshop-subtitle text-secondary mb-1">100% Organic Vegetable</span>
                                <h6 className="mb-0">Vegetable</h6>
                                <h4 className="mb-2">Fresh & Healthy</h4>
                                <p className="fw-medium mb-5">Get 50% Off on Selected Organic Items</p>
                                <a href="product-details.html" className="btn btn-primary btn-md">Show Now<span className="ms-2"><ArrowForwardIcon /></span></a>
                                <div className="banner-img-wrapper text-end mt--40">
                                    <img src={images?.middle_banner2} alt="vegetables" className="" />
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
                                        data.map((ele) => (
                                            <div className="col-lg-6">
                                                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 shadow gap-4">
                                                    <div className="thumbnail position-relative rounded-2">
                                                        <img src={ele.thumbnailimage} alt="product" className="img-fluid" />
                                                        <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                            {
                                                                ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                    <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteIcon /></span>

                                                                ) : (
                                                                    <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.actualpricebydiscount, ele.discount, ele.thumbnailimage, ele.stock, ele.ratings, ele.numOfReviews)}><FavoriteBorderIcon /></span>
                                                                )
                                                            }
                                                            <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

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
                                                            <span  className="fw-bold text-heading title d-block">{ele.name}</span>
                                                            <div className="pricing mt-2">
                                                                <span className="fw-bold h4 deleted me-1">₹ {ele.price}</span>
                                                                <span className="fw-bold h4 text-danger">₹ {ele.actualpricebydiscount}</span>
                                                            </div>
                                                            <Link to="/products" className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></Link>
                                                        </div>
                                                    </Link>
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
            <ViewProduct setOpen={setOpen} open={open} viewData={viewData} />

        </>
    )
}

export default BestDeals