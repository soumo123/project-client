import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import addToCart from '../../utils/addToCart';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { noteRefs } from '../../redux/actions/userAction'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slider from "react-slick";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import axios from 'axios'
import InterestedProducts from './InterestedProducts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ViewProduct from './ViewProduct';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Details = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const [pdName, setPdName] = useState("")
    const [ratings, setRatings] = useState("")
    const [description, setDescription] = useState("")
    const [description1, setDescription1] = useState("")
    const [logoutOpen, setLogOutOpen] = useState(false);
    const [noofReview, setNoOfReview] = useState("")
    const [price, setPrice] = useState("")
    const [actualPrice, setActualPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [thunbImage, setThumbImage] = useState("")
    const [weight, setWeight] = useState([])
    const [unit, setUnit] = useState("")
    const [count, setCount] = useState(1)
    const [stock, setStock] = useState("")
    const [colors, setColors] = useState("")
    const [reviews, setReviews] = useState([])
    const [tags, setTags] = useState([])
    const [otherDescription1, setOtherdescription1] = useState("")
    const [otherDescription2, setOtherdescription2] = useState("")
    const [comment, setComment] = useState("")
    const [err, setErr] = useState(false)
    const { id } = useParams()
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")
    const [selectedImage, setSelectedImage] = useState("");
    const [otherImages, setOtherImages] = useState([])
    const [addRating, setAddRating] = useState(0);
    const dataRefe = useSelector((state) => state.noteRef.arr);
    const categories = useSelector((state) => state.categoryDetails.categories)
    const [cartWeight, setCartWeight] = useState("")
    const [featuredData, setFeaturedData] = useState([])
    const userData = useSelector((state) => state.userDetails.user)
    const [viewData, setViewData] = useState([])
    const [open, setOpen] = useState(false)


    const sentences = description.match(/[^.!?]+[.!?]/g) || [];
    console.log("description", description)

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
    };
    var settings1 = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000,
        // centerMode: true
    };

    const getProductDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getProductById?type=${type}&productId=${id}`)
            if (response.status === 200) {
                setPdName(response.data.data[0].name)
                setRatings(response.data.data[0].ratings)
                setDescription(response.data.data[0].description)
                setDescription1(response.data.data[0].description)
                setNoOfReview(response.data.data[0].numOfReviews)
                setPrice(response.data.data[0].weight[0].price)
                // setActualPrice(response.data.data[0].actualpricebydiscount)
                setDiscount(response.data.data[0].discount)
                setWeight(response.data.data[0].weight)
                setUnit(response.data.data[0].unit)
                setStock(response.data.data[0].weight[0].stock)
                setOtherdescription1(response.data.data[0].other_description1)
                setOtherdescription2(response.data.data[0].other_description2)
                setThumbImage(response.data.data[0].thumbnailimage)
                setColors(response.data.data[0].color)
                setReviews(response.data.data[0].reviews)
                setSelectedImage(response.data.data[0].thumbnailimage)
                setOtherImages(response.data.data[0].otherimages)
                setTags(response.data.data[0].tags)
                setCartWeight(response.data.data[0].weight[0].weight)
            }
        } catch (error) {

        }
    }

    const getFeatureProducts = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getAllProducts?limit=${12}&offset=${0}&type=1&key=${""}&tags=${""}&startprice=${0}&lastprice=${10000}`)
            if (response.status === 200) {
                setFeaturedData(response.data.featuredData)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalOpen = (e) => {
        setViewData(e)
        setOpen(true)
    }

    const handleIncrement = () => {
        console.log("count , stock", count, stock)
        if (count + 1 > stock) {
            setErr(true)
            return
        } else {
            setErr(false)
            setCount(count + 1)
        }
    }

    const handleDecrement = () => {
        if (count <= 1) {
            return
        } else {
            setErr(false)
            setCount(count - 1)
        }
    }
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // Update selected image when clicked
    };

    const handleCart = async (id, pdName, description1, thunbImage) => {
        try {
            if (userData.length === 0) {
                alert.error("Please Signin First")
                return
            }
            let json = {
                name: pdName,
                description: description1,
                price: price,
                weight: cartWeight,
                stock: stock,
                color: '',
                itemCount: Number(count),
                // discount: discount,
                thumbImage: thunbImage,
                totalPrice: Number(price) * Number(count)
            }
            console.log("json---carttttt", json)

            const response = await addToCart(id, json)

            if (response) {
                alert.success("Item added in cart")
                dispatch(noteRefs(new Date().getSeconds()))

            } else {
                alert.error("Item alreday in cart")

            }

        } catch (error) {
            alert.error("Item not added in cart")

        }
    }

    const handleCart1 = async (id, data) => {
        try {
            if (userData.length === 0) {
                alert.error("Please Signin First")
                return
            }
            let json = {
                name: data.name,
                description: data.description,
                price: data.weight[0].price,
                weight: data.weight[0].weight,
                stock: data.weight[0].stock,
                color: '',
                itemCount: 1,
                // discount: data.discount,
                thumbImage: data.thumbnailimage,
                totalPrice: Number(data.weight[0].price) * 1
            }
            console.log("json---carttttt", json)

            const response = await addToCart(id, json)

            if (response) {
                alert.success("Item added in cart")
                dispatch(noteRefs(new Date().getSeconds()))

            } else {
                alert.error("Item alreday in cart")

            }

        } catch (error) {
            alert.error("Item not added in cart")

        }
    }

    const handleLogoutModalClose = () => {
        setLogOutOpen(false);
    }
    const handleClickModalOpen = () => {
        setLogOutOpen(true);
    };
    const handleAddReview = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                }
            };

            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/addreview?userId=${userId}&productId=${id}&type=${type}`, {
                rating: addRating,
                comment: comment
            }, config);
            if (response.status === 200) {
                alert.success("Review Added")
                setLogOutOpen(false);
                setComment("")
                setAddRating(0)
                dispatch(noteRefs(new Date().getSeconds()))

            }

        } catch (error) {
            alert.error("Review already added")
            setLogOutOpen(false);
            setComment("")
            setAddRating(0)
        }

    }

    const handleComment = (e) => {
        setComment(e)
    }

    const handleWeightChange = async (w, u) => {

        console.log("w,u", w)
        setCartWeight(w)
        await getPrice(w)
    }

    const getPrice = async (weight) => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/variation_price?type=${type}&productId=${id}&weight=${weight}`)
            if (response.status === 200) {
                setPrice(Number(response.data.data.price))
                setStock(Number(response.data.data.stock))
            }
        } catch (error) {
            setPrice(null)
        }
    }


    const handleAddWhish = async (status, productId, name, description, thumbnailimage, ratings, numOfReviews, price, stock, weight) => {
        try {

            if (!userId || userId === undefined || userId === null) {
                alert.error("Please Signin First")
                return
            }
            let json = {
                name: name,
                description: description,
                price: Number(price),
                // discount: discount,
                thumbnailimage: thumbnailimage,
                stock: stock,
                weight: weight,
                numOfReviews: numOfReviews,
                ratings: ratings
            }
            console.log("wishhh json", json)
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
                    dispatch(noteRefs(new Date().getSeconds()))

                } else {
                    alert.success("Product remove to whsihlist");
                    dispatch(noteRefs(new Date().getSeconds()))

                }
            }

        } catch (error) {
            console.log(error)
        }


    }




    console.log("priceeeeeeeeeeee", price)

    useEffect(() => {
        getProductDetails()
        getFeatureProducts()
    }, [id, dataRefe])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        Aos.init()
    }, [])
    console.log("addRating", addRating)
    console.log("cartWeight", cartWeight)

    return (
        <>
            <div class="main-wrapper">
                <section class="product-details-area ptb-120">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-xl-9">
                                <div class="product-details">
                                    <div class="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                                        <div class="row align-items-center g-4">
                                            <div class="col-xl-6 align-self-end">
                                                <div class="quickview-double-slider">
                                                    <div class="quickview-product-slider swiper">
                                                        <div class="swiper-wrapper">
                                                            <div class="swiper-slide text-center">
                                                                <InnerImageZoom zoomScale={0.3} zoomType="hover" src={selectedImage && selectedImage} />

                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="product-thumbnail-slider swiper mt-80">
                                                        <Slider {...settings} className='zoomSlider'>
                                                            {otherImages && otherImages.map((ele, index) => (
                                                                <div
                                                                    key={index}
                                                                    className='swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center'
                                                                    onClick={() => handleImageClick(ele)} // Call handleImageClick when image is clicked
                                                                >
                                                                    <img src={ele} className="w-100" />
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <div class="product-info">
                                                    <h4 class="mt-1 mb-3">{pdName}</h4>
                                                    <div class="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                                        <ul class="d-flex align-items-center me-2">
                                                            <Rating name="size-small" value={ratings && ratings} precision={0.5} readOnly size="small" />
                                                        </ul>
                                                        <span class="flex-shrink-0">({noofReview} Reviews)</span>
                                                    </div>
                                                    <div class="pricing mt-2">
                                                        <span class="fw-bold fs-xs text-danger">₹ {price}</span>
                                                        {/* <span class="fw-bold fs-xs deleted ms-1">₹ {price}</span> */}
                                                    </div>
                                                    <div class="widget-title d-flex mt-4">
                                                        <h6 class="mb-1 flex-shrink-0">Description</h6>
                                                        <span class="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                                                    </div>
                                                    {sentences.slice(0, 3).map((sentence, index) => (
                                                        <p className="mb-3" key={index}>{sentence}</p>
                                                    ))}

                                                    <ul className="d-flex flex-column gap-2">
                                                        {sentences.slice(3).map((sentence, index) => (
                                                            <li key={index}>
                                                                <span className="me-2 text-primary">
                                                                    <CheckCircleIcon style={{ color: 'rgb(109 179 84)', fontWeight: "900" }} />
                                                                    {sentence}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {weight && weight.length > 0 ? (<h6 class="fs-md mb-2 mt-3">Weight:</h6>) : ("")}
                                                    <ul class="product-radio-btn mb-4 d-flex align-items-center gap-2">
                                                        {weight && weight.map((ele, index) => (
                                                            <li key={index}>
                                                                <input
                                                                    type="radio"
                                                                    name="weight"
                                                                    value={ele.weight}
                                                                    onClick={(e) => handleWeightChange(ele.weight, unit)}
                                                                    defaultChecked={index === 0}
                                                                />
                                                                <label>{ele.weight} {unit.charAt(0).toLowerCase()}</label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div class="d-flex align-items-center gap-4 flex-wrap">
                                                        <div class="product-qty d-flex align-items-center">
                                                            <button class="decrese" onClick={handleDecrement}>-</button>
                                                            <input type="text" value={count} />
                                                            <button class="increase" onClick={handleIncrement}>+</button>

                                                        </div>

                                                        <span class="btn btn-secondary btn-md" onClick={() => handleCart(id, pdName, description1, thunbImage)}><span class="me-2"><LocalMallIcon /></span>Add to Cart</span>
                                                    </div>
                                                    {
                                                        err ? (<p className='text-danger'>Product out of stock</p>) : ("")
                                                    }
                                                    <div class="tt-category-tag mt-4">
                                                        {categories
                                                            .filter(item => tags.includes(item.value))
                                                            .map((item, index) => (
                                                                <a
                                                                    className="text-muted fs-xxs"
                                                                    key={item.value}
                                                                    data-toggle="tooltip"
                                                                    title={item.label}
                                                                >
                                                                    {item.label}
                                                                    {/* {index !== viewData?.tags?.length - 1 && ''} */}
                                                                </a>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-info-tab bg-white rounded-2 overflow-hidden pt-6 mt-4">
                                        <ul class="nav nav-tabs border-bottom justify-content-center gap-5 pt-info-tab-nav">
                                            <li><a href="#description" class="active" data-bs-toggle="tab">Description</a></li>
                                            <li><a href="#info" data-bs-toggle="tab">Additional Information</a></li>
                                            <li><a href="#review" data-bs-toggle="tab">Reviews({noofReview})</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade show active px-4 py-5" id="description">
                                                <h6 class="mb-2">Details:</h6>
                                                <p class="mb-4">
                                                    {description1}
                                                </p>
                                                {/* <ul class="list-style-type-disc mb-4">
                                                    <li>Natural ingredients</li>
                                                    <li>Tastes better with milk</li>
                                                    <li>Vitamins B2, B3, B5 and B6</li>
                                                    <li>Refrigerate for freshness</li>
                                                </ul> */}
                                                {
                                                    otherDescription1.length > 0 || otherDescription2.length > 0 ? (
                                                        <>
                                                            <h6 class="mb-2">Others:</h6>
                                                            <p class="mb-0">{otherDescription1}</p><br />
                                                            <p class="mb-0">{otherDescription2}</p>
                                                        </>
                                                    ) : ("")
                                                }


                                            </div>
                                            <div class="tab-pane fade px-4 py-5" id="info">

                                                <h6 class="mb-2">Additional Information:</h6>
                                                <table class="w-100 product-info-table">
                                                    {
                                                        colors ? (
                                                            <tr>
                                                                <td class="text-dark fw-semibold">Colors</td>
                                                                <td>{colors}</td>
                                                            </tr>
                                                        ) : ("")
                                                    }
                                                    {
                                                        weight && weight.length > 0 ? (
                                                            <tr>
                                                                <td class="text-dark fw-semibold">Variation</td>
                                                                <td>
                                                                    {weight?.map((ele) => (
                                                                        <p>
                                                                            {ele.weight} {unit.charAt(0).toLowerCase()}
                                                                        </p>
                                                                    ))}
                                                                </td>
                                                            </tr>
                                                        ) : ("")
                                                    }

                                                </table>
                                            </div>
                                            <div class="tab-pane fade px-4 py-5" id="review">
                                                <div class="review-tab-box bg-white rounded pt-30 pb-40 px-4">
                                                    <div class="d-flex flex-wrap align-items-center justify-content-between">
                                                        <div class="top-left">
                                                            <h5 class="mb-2">Reviews ({noofReview})</h5>
                                                            <p class="mb-0">Get specific details about this product from customers who own it.</p>
                                                            <ul class="fs-xs text-warning d-flex mt-1">
                                                                <Rating name="size-small" value={4} precision={0.5} readOnly size="small" />
                                                                <li class="ms-2 text-dark">(4 out of 5)</li>
                                                            </ul>
                                                        </div>
                                                        <span class="btn btn-outline-secondary border-secondary btn-md mt-3 mt-lg-0" onClick={handleClickModalOpen}>Write a Review</span>
                                                    </div>
                                                    <hr class="mt-4 mb-4" />
                                                    {
                                                        noofReview < 0 || noofReview === 0 ? (
                                                            <div class="users_review">
                                                                <span>No Reviews</span>
                                                            </div>
                                                        ) : (
                                                            <div class="users_review">
                                                                {
                                                                    reviews && reviews.map((ele) => (
                                                                        <>
                                                                            <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                                                                <div class="top-left d-flex align-items-center">
                                                                                    <img src={ele.userImage} alt="user" class="flex-shrink-0 rounded" style={{ height: "65px", width: "60px" }} />
                                                                                    <div class="ms-3">
                                                                                        <h6 class="mb-1">{ele.username}</h6>
                                                                                        <span>{new Date(ele.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <ul class="fs-xs text-warning d-flex">
                                                                                    <Rating name="size-small" value={ele.rating} precision={0.5} readOnly size="small" />
                                                                                </ul>
                                                                            </div>
                                                                            <p class="mt-3 mb-0">{ele.comment}</p><br />
                                                                        </>
                                                                    ))
                                                                }

                                                            </div>
                                                        )
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-md-8">
                                <div class="gshop-sidebar">
                                    <div class="sidebar-widget info-sidebar bg-white rounded-3 py-3">
                                        <div class="sidebar-info-list d-flex align-items-center gap-3 p-4">
                                            <span class="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                                                <LocalShippingIcon />
                                            </span>
                                            <div class="info-right">
                                                <h6 class="mb-1 fs-md">Free Shipping</h6>
                                                <span class="fw-medium fs-xs">For orders from ₹ 200</span>
                                            </div>
                                        </div>
                                        <div class="sidebar-info-list d-flex align-items-center gap-3 p-4 border-top">
                                            <span class="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                                                <CurrencyRupeeIcon />
                                            </span>
                                            <div class="info-right">
                                                <h6 class="mb-1 fs-md">100% Money Back</h6>
                                                <span class="fw-medium fs-xs">Guaranteed Product Warranty</span>
                                            </div>
                                        </div>
                                        <div class="sidebar-info-list d-flex align-items-center gap-3 p-4 border-top">
                                            <span class="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                                                <FavoriteBorderIcon />
                                            </span>
                                            <div class="info-right">
                                                <h6 class="mb-1 fs-md">Safety & Secure</h6>
                                                <span class="fw-medium fs-xs">Call us Anytime & Anywhere</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="sidebar-widget banner-widget mt-4 p-0 border-0">
                                        <div class="vertical-banner text-center bg-white rounded-2" data-background="assets/img/banner/banner-4.jpg">
                                            <h5 class="mb-1">Fresh &amp; Organic Spice</h5>
                                            <div class="d-flex align-items-center justify-content-center gap-2">
                                                <span class="hot-badge bg-danger fw-bold fs-xs position-relative text-white">HOT</span>
                                                <span class="offer-title text-danger fw-bold">30% Off</span>
                                            </div>
                                            <a href="#" class="explore-btn text-primary fw-bold">Shop Now<span class="ms-2"><i class="fas fa-arrow-right"></i></span></a>
                                        </div>
                                    </div> */}
                                    <div class="sidebar-widget products-widget py-5 px-4 bg-white mt-4" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                                        <div class="widget-title d-flex">
                                            <h6 class="mb-0 flex-shrink-0">Featured Products</h6>
                                            <span class="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                                        </div>
                                        <div class="sidebar-products-list">
                                            {
                                                featuredData && featuredData.map((ele) => (
                                                    <>
                                                        <div class="horizontal-product-card card-md d-sm-flex align-items-center bg-white rounded-2 gap-3 mt-4" >
                                                            <div class="thumbnail position-relative rounded-2">
                                                                <span><img src={ele.thumbnailimage} alt="product" class="img-fluid" /></span>
                                                                <div class="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                                    <Link to={`/details/${ele.productId}`} class="rounded-btn"><VisibilityOutlinedIcon /></Link>
                                                                </div>
                                                            </div>
                                                            <div class="card-content mt-3 mt-sm-0">
                                                                <span class="d-block fs-sm fw-bold text-heading title d-block">{ele.name}</span>
                                                                <div class="pricing mt-0">
                                                                    {/* <span class="fw-bold fs-xxs text-danger">₹ {ele.actualpricebydiscount}</span> */}
                                                                </div>
                                                                <div class="d-flex align-items-center flex-nowrap star-rating mt-1">
                                                                    <ul class="d-flex align-items-center me-2">
                                                                        <Rating name="size-small" value={ele.ratings} precision={0.5} readOnly size="small" />
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))
                                            }


                                        </div>
                                    </div>
                                    {/* <div class="vertical-product-card rounded-bottom-2 position-relative border-0 border-top bg-white shadow-none">
                                        <div class="thumbnail position-relative text-center p-4">
                                            <img src="assets/img/products/apple.png" alt="apple" class="img-fluid" />
                                            <div class="product-btns position-absolute d-flex gap-2 flex-column">
                                                <a href="#" class="rounded-btn"><i class="fa-regular fa-heart"></i></a>
                                                <a href="#" class="rounded-btn">
                                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z" fill="#AEB1B9"></path>
                                                    </svg>
                                                </a>
                                                <a href="#" class="rounded-btn"><i class="fa-regular fa-eye"></i></a>
                                            </div>
                                        </div>
                                        <div class="card-content">
                                            <a href="#" class="mb-2 d-inline-block text-secondary fw-semibold fs-xxs">Fresh Organic</a>
                                            <a href="#" class="card-title fw-bold d-block mb-2">Popped Rice Crisps Snacks Chocolate.</a>
                                            <div class="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                                <ul class="d-flex align-items-center me-2">
                                                    <li class="text-warning"><i class="fa-solid fa-star"></i></li>
                                                    <li class="text-warning"><i class="fa-solid fa-star"></i></li>
                                                    <li class="text-warning"><i class="fa-solid fa-star"></i></li>
                                                    <li class="text-warning"><i class="fa-solid fa-star"></i></li>
                                                    <li class="text-warning"><i class="fa-solid fa-star"></i></li>
                                                </ul>
                                                <span class="flex-shrink-0">(5.2k Reviews)</span>
                                            </div>
                                            <h6 class="price text-danger mb-4">$140.00</h6>
                                            <a href="#" class="btn btn-outline-secondary d-block btn-md border-secondary">Add to Cart</a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="related-product-slider pb-120" data-aos="fade-right">
                    <div class="container">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-sm-8">
                                <div class="section-title text-center text-sm-start">
                                    <h6 class="mb-0">You may be interested</h6>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                {/* <div class="rl-slider-btns text-center text-sm-end mt-3 mt-sm-0">
                                    <button class="rl-slider-btn slider-btn-prev"><i class="fas fa-arrow-left"></i></button>
                                    <button class="rl-slider-btn slider-btn-next ms-3"><i class="fas fa-arrow-right"></i></button>
                                </div> */}
                            </div>
                        </div>
                        <div class="rl-products-slider mt-8">
                            <div class="">
                                <Slider {...settings1}>
                                    {
                                        featuredData && featuredData.map((ele) => (
                                            <div class="vertical-product-card rounded-2 position-relative swiper-slide">
                                                {/* <span class="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">-12% OFF</span> */}
                                                <div class="thumbnail position-relative text-center p-4">
                                                    <img src={ele?.thumbnailimage} alt="apple" class="img-fluid" />
                                                    <div class="product-btns position-absolute d-flex gap-2 flex-column">
                                                        {
                                                            ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.thumbnailimage, ele.ratings, ele.numOfReviews, ele.weight[0]?.price, ele.weight[0]?.stock, ele.weight[0]?.weight)}><FavoriteIcon /></span>

                                                            ) : (
                                                                <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.thumbnailimage, ele.ratings, ele.numOfReviews, ele.weight[0]?.price, ele.weight[0]?.stock, ele.weight[0]?.weight)}><FavoriteBorderIcon /></span>
                                                            )
                                                        }

                                                        <span style={{ cursor: 'pointer' }} class="rounded-btn" onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>
                                                    </div>
                                                </div>
                                                <div class="card-content">
                                                    <div class="mb-2 tt-category tt-line-clamp tt-clamp-1">
                                                        {categories
                                                            .filter(item => ele.tags.includes(item.value))
                                                            .map((item, index) => (
                                                                <span
                                                                    key={item.value}
                                                                    data-toggle="tooltip"
                                                                    title={item.label}
                                                                >
                                                                    {item.label}
                                                                    {index !== ele.tags.length - 1 && ', '}
                                                                </span>
                                                            ))}
                                                    </div>
                                                    {/* <a href="#" class="mb-2 d-inline-block text-secondary fw-semibold fs-xxs">Fresh Organic</a> */}
                                                    <a href="#" class="card-title fw-bold d-block mb-2">{ele?.name}</a>
                                                    <div class="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                                        <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                        <span class="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                    </div>
                                                    <h6 class="price text-danger mb-3">₹ {ele?.weight[0]?.price}</h6>
                                                    <div class="card-progressbar mb-2 rounded-pill">
                                                        <span class="card-progress bg-primary" data-progress="60%" style={{ width: "60%" }}></span>
                                                    </div>
                                                    {/* <p class="mb-0 fw-semibold">Available: <span class="fw-bold text-secondary">40/100</span></p> */}
                                                    <a href="#" class="btn btn-outline-secondary btn-md border-secondary d-block mt-4" onClick={() => handleCart1(ele.productId, ele)}>Add to Cart</a>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>


            </div>



            <Dialog
                open={logoutOpen}
                onClose={handleLogoutModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">

                    Add Review
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="row">
                            <div className="col">
                                <label>How would you rate it ?</label>
                                <Rating
                                    name="simple-controlled"
                                    value={addRating}
                                    onChange={(event, newValue) => {
                                        setAddRating(newValue);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Write your review</label>
                                <textarea name="comment" value={comment} onChange={(e) => handleComment(e.target.value)}>

                                </textarea>
                            </div>
                        </div>

                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddReview}>Submit</Button>
                    <Button onClick={handleLogoutModalClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            {
                open === true ? (
                    <ViewProduct setOpen={setOpen} open={open} viewData={viewData} />
                ) : ("")
            }
        </>
    )
}

export default Details
