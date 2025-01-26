import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import addToCart from '../../utils/addToCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { noteRefs } from '../../redux/actions/userAction'
import { Link } from 'react-router-dom'
import ViewProduct from '../products/ViewProduct';
import { useAlert } from 'react-alert'
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'

const TrendingProducts = ({ topSellingData, load, setLoad }) => {

    const alert = useAlert()
    const userData = useSelector((state) => state.userDetails.user)
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")

    const [data, setData] = useState([])
    const dataRefe = useSelector((state) => state.noteRef.arr);
    const settings = useSelector((state) => state.settingReducer.settings)

    const [open, setOpen] = useState(false)
    const [viewData, setViewData] = useState([])
    const handleModalOpen = (e) => {
        setViewData(e)
        setOpen(true)
    }

    const handleAddWhish = async (status, productId, name, description, price, thumbnailimage, stock, ratings, numOfReviews,weight) => {
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
                stock: stock,
                weight:weight,
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
    const dispatch = useDispatch()
    useEffect(() => {
        if (topSellingData) {
            setData(topSellingData)
        }
    }, [topSellingData]);

    console.log("topTrending", data)

    const handleCart = async (id, data) => {
        try {

            if (userData.length === 0) {
                alert.error("Signin First")
                return
            }

            let json = {
                name: data.name,
                description: data.description,
                price: data.weight[0].price,
                weight:data.weight[0].weight,
                stock:data.weight[0].stock,
                color:'',
                itemCount: 1,
                discount: data.discount || 0,
                thumbImage: data.thumbnailimage,
                totalPrice: Number(data.weight[0].price) * 1
            }
            console.log("json", json)

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


    return (
        <>
            {
                settings && settings.trending_products ? (
                    <section className="pt-8 pb-100 bg-white position-relative overflow-hidden z-1 trending-products-area">
                        {/* <img src="assets/img/shapes/garlic.png" alt="garlic" className="position-absolute garlic z--1" data-parallax='{"y": 100}' />
                <img src="assets/img/shapes/carrot.png" alt="carrot" className="position-absolute carrot z--1" data-parallax='{"y": -100}' />
                <img src="assets/img/shapes/mashrom.png" alt="mashrom" className="position-absolute mashrom z--1" data-parallax='{"x": 100}' /> */}
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-5">
                                    <div className="section-title text-center text-xl-start">
                                        <h3 className="mb-0">Top Trending Products</h3>
                                    </div>
                                </div>
                                {/* <div className="col-xl-7">
                        <div className="filter-btns gshop-filter-btn-group text-center text-xl-end mt-4 mt-xl-0">
                            <button className="active" data-filter="*">All Products</button>
                            <button data-filter=".sea_food">Sea Food</button>
                            <button data-filter=".vegetables">Vegetables</button>
                            <button data-filter=".beans_peas">Beans & Peas</button>
                        </div>
                    </div> */}
                            </div>
                            <div className="row justify-content-center g-4 mt-5 filter_group">
                                {
                                    data && data.map((ele) => (
                                        <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10 filter_item sea_food">

                                            <div className="vertical-product-card rounded-2 position-relative">
                                                {/* {ele.discount === 0 ? ("") : (<span class="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">{ele.discount}% OFF</span>)} */}
                                                <div className="thumbnail position-relative text-center p-4">
                                                    <img src={ele.thumbnailimage} alt="apple" className="img-fluid" />
                                                    <div className="product-btns position-absolute d-flex gap-2 flex-column">
                                                        {
                                                            ele.whishListIds && ele.whishListIds.includes(userId) ? (
                                                                <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews,ele.weight[0].weight)}><FavoriteIcon /></span>

                                                            ) : (
                                                                <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews,ele.weight[0].weight)}><FavoriteBorderIcon /></span>
                                                            )
                                                        }
                                                        <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>
                                                    </div>
                                                </div>
                                                <Link to={`/details/${ele.productId}/${ele.category}`}>


                                                    <div className="card-content">
                                                        <a href="shop-grid.html" className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs">Fresh Organic</a>
                                                        <span className="card-title fw-bold d-block mb-2">{ele.name}</span>
                                                        <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                                                            <ul className="d-flex align-items-center me-2">
                                                                <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                            </ul>
                                                            <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                        </div>
                                                        <h6 className="price text-danger mb-3"> ₹ {ele?.weight[0]?.price}</h6>
                                                        <div className="card-progressbar mb-2 rounded-pill">
                                                            <span className="card-progress bg-primary" data-progress="60%"></span>
                                                        </div>
                                                        <p className="mb-0 fw-semibold">Available: <span className="fw-bold text-secondary">{ele.weight[0]?.stock}/100</span></p>
                                                    </div>
                                                </Link>
                                                <div className="card-btn bg-white">
                                                    <span className="btn btn-secondary d-block btn-md rounded-1" onClick={() => handleCart(ele.productId, ele)}>Add to Cart</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
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

export default TrendingProducts