import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux'
import ViewProduct from '../products/ViewProduct';
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import { useAlert } from 'react-alert'

const FeatureProducts = ({ featuredData, load, setLoad }) => {
    const alert = useAlert()
    const navigate = useNavigate()
    const [firstHalf, setFirstHalf] = useState([]);
    const [secondHalf, setSecondHalf] = useState([]);
    const [open, setOpen] = useState(false)
    const [viewData, setViewData] = useState([])
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const settings = useSelector((state) => state.settingReducer.settings)

    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")

    const handleModalOpen = (e) => {
        setOpen(true)
        setViewData(e)
    }


    const handleAddWhish = async (status, productId, name, description, price, thumbnailimage, stock, ratings, numOfReviews, weight) => {
        try {

            if (!userId || userId === undefined || userId === null) {
                alert.error("Please Signin First")
                return
            }
            let json = {
                name: name,
                description: description,
                price: price,
                // discount: discount,
                thumbnailimage: thumbnailimage,
                weight: Number(weight),
                stock: stock,
                numOfReviews: numOfReviews,
                ratings: ratings
            }
            console.log("json11", json)
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

    const handleCheckout = (pd) => {
        let data = [{
            color: pd.color,
            description: pd.description,
            // discount: pd.discount,
            itemCount: 1,
            name: pd.name,
            price: pd.weight[0].price,
            productId: pd.productId,
            thumbImage: pd.thumbnailimage,
            totalPrice: pd.weight[0].price,
            weight: pd.weight[0].weight,
            _id: pd._id,
        }]

        navigate('/checkout', { state: { data: data } });
    }



    useEffect(() => {
        const halfwayIndex = Math.ceil(featuredData.length / 2);
        const firstHalfData = featuredData.slice(0, halfwayIndex);
        const secondHalfData = featuredData.slice(halfwayIndex);
        setFirstHalf(firstHalfData); // Set the first half to the state
        setSecondHalf(secondHalfData); // Set the second half to the state
    }, [featuredData])



    return (
        <>
            {
                settings && settings.feature_products ? (
                    <section className="featured-products pt-120 pb-200 bg-shade position-relative overflow-hidden z-1">
                        {/* <img src="assets/img/shapes/roll-1.png" alt="roll" className="position-absolute roll-1 z--1" data-parallax='{"y": -120}' />
                <img src="assets/img/shapes/roll-2.png" alt="roll" className="position-absolute roll-2 z--1" data-parallax='{"y": 120}' /> */}
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6">
                                    <div className="section-title text-center mb-4">
                                        <h3 className="mb-2">Featured Brand Products</h3>
                                        <p className="mb-0">{settings.featureHeading}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-center">
                                <div className="col-xxl-4 col-lg-6">
                                    {
                                        firstHalf && firstHalf.map((ele) => (

                                            <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 gap-4 mt-4">
                                                <div className="thumbnail position-relative rounded-2">
                                                    <img src={ele.thumbnailimage} alt="product" className="img-fluid" />
                                                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                        {
                                                            ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteIcon /></span>

                                                            ) : (
                                                                <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteBorderIcon /></span>
                                                            )
                                                        }
                                                        <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

                                                    </div>
                                                </div>

                                                <div className="card-content mt-4 mt-sm-0">
                                                    <div className="d-flex align-items-center flex-nowrap star-rating">
                                                        <ul className="d-flex align-items-center me-2">
                                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                        </ul>
                                                        <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                    </div>
                                                    <Link to={`/details/${ele.productId}/${ele.category}`}>  <span className="fw-bold text-heading title d-block">{ele.name}</span></Link>
                                                    <div className="pricing mt-2">
                                                        {/* <span className="fw-bold h4 deleted me-1 text-muted"> ₹ {ele?.weight[0]?.price}</span> */}
                                                        <span className="fw-bold h4 text-danger"> ₹ {ele?.weight[0]?.price}</span>
                                                    </div>
                                                    <span onClick={() => handleCheckout(ele)} style={{ cursor: "pointer" }} className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></span>
                                                </div>

                                            </div>

                                        ))
                                    }



                                </div>













                                {
                                    settings && settings.feature_card ? (
                                        <div className="col-xxl-4 col-lg-6 order-3 order-xxl-2">
                                            <div className="product-card-lg bg-white rounded-2 d-flex flex-coloumn h-100">
                                                <div>
                                                    <div className="card-content position-relative z-2">
                                                        <span className="fs-xs gshop-subtitle text-secondary">{settings.headerFeatureCard}</span>
                                                        <h4 className="mb-0">{settings.middleFeatureCard}</h4><br />

                                                        <p className="mb-4">{settings.footerFeatureCard}</p><br />
                                                        <Link to="/products" className="btn btn-secondary">Shop Now <span className="ms-2"><ArrowForwardIcon /></span></Link>
                                                    </div>

                                                    <div className="thumbnail position-relative z-1">
                                                        <img src={images?.middle_banner1} alt="pago" className="img-fluid p-4" />
                                                        {/* <img src="assets/img/shapes/circle-md.png" alt="circle" className="position-absolute end-0 bottom-0 z--1 d-none d-sm-block" /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ) : ("")
                                }



                                <div className="col-xxl-4 col-lg-6 order-2 order-xxl-3">
                                    {
                                        secondHalf && secondHalf.map((ele) => (

                                            <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 gap-4 mt-4">
                                                <div className="thumbnail position-relative rounded-2">
                                                    <img src={ele.thumbnailimage} alt="product" className="img-fluid" />
                                                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                        {
                                                            ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteIcon /></span>

                                                            ) : (
                                                                <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteBorderIcon /></span>
                                                            )
                                                        }
                                                        <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

                                                    </div>
                                                </div>

                                                <div className="card-content mt-4 mt-sm-0">
                                                    <div className="d-flex align-items-center flex-nowrap star-rating">
                                                        <ul className="d-flex align-items-center me-2">
                                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                        </ul>
                                                        <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                    </div>
                                                    <Link to={`/details/${ele.productId}`}>  <span className="fw-bold text-heading title d-block">{ele.name}</span></Link>
                                                    <div className="pricing mt-2">
                                                        {/* <span className="fw-bold h4 deleted me-1 text-muted"> ₹ {ele.price}</span> */}
                                                        <span className="fw-bold h4 text-danger"> ₹ {ele?.weight[0]?.price}</span>
                                                    </div>
                                                    <span onClick={() => handleCheckout(ele)} style={{ cursor: "pointer" }} className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></span>
                                                </div>

                                            </div>

                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                        {/* <img src="assets/img/shapes/bg-shape-2.png" alt="bg shape" className="position-absolute start-0 bottom-0 w-100 z--1" /> */}
                    </section>
                ) : ("")
            }
          
            {
                open === true ? (
                    <ViewProduct setOpen={setOpen} open={open} viewData={viewData} />
                ) : ("")
            }
        </>
    )
}

export default FeatureProducts