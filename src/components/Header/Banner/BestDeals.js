import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ViewProduct from '../../products/ViewProduct';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import { useAlert } from 'react-alert'
import CountdownItem from '../../custom/CountdownItem';

const BestDeals = ({ dealsData, load, setLoad }) => {
    const alert = useAlert()
    const navigate = useNavigate()
    const images = useSelector((state) => state.imageReducer.images.staticImages)
    const settings = useSelector((state) => state.settingReducer.settings)

    const [data, setData] = useState([])
    const [templates, setTemplates] = useState([])
    const [open, setOpen] = useState(false)
    const [viewData, setViewData] = useState([])
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")
    const shop_id = localStorage.getItem("shop_id")
    const handleModalOpen = (e) => {
        setViewData(e)
        setOpen(true)
    }


    useEffect(() => {
        if (dealsData) {
            setData(dealsData)
        }
    }, [dealsData]);

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
                weight: weight,
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

    const getSaleTemplates = async () => {

        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/settings/gettemplatesshop?limit=${1000000}&offset=${0}&shop_id=${shop_id}`, config)
            if (response.status === 200) {
                setTemplates(response.data.data)
            }
        } catch (error) {
            setTemplates([])
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

    const handleNavigate = (temp_id, cat) => {
        navigate(`/products?sales=${temp_id}&category=${cat}`)
    }


    useEffect(() => {
        getSaleTemplates()
    }, [])


    return (
        <>
            {
                settings && settings.deals ? (
                    <section className="pb-120 position-relative z-1 pt-120">
                        <div className="container">
                            <div className="row g-4 align-items-center justify-content-center">
                                {
                                    settings && settings.deals_products_card ? (
                                        <div className="col-xxl-4 col-xl-5 order-2 order-xxl-1">
                                            <div className="banner-box banner-color-green position-relative overflow-hidden z-1 rounded-2 pe-0 pb-0">
                                                <span className="gshop-subtitle text-secondary mb-1">{settings.dealsCardHeader}</span>
                                                <h6 className="mb-0">{settings.dealsCardMiddle}</h6><br />
                                                {/* <h4 className="mb-2">Fresh & Healthy</h4> */}
                                                <p className="fw-medium mb-5">{settings.dealsCardFooter}</p><br />
                                                <Link to="/products" className="btn btn-primary btn-md">Show Now<span className="ms-2"><ArrowForwardIcon /></span></Link>
                                                <div className="banner-img-wrapper text-end mt--40">
                                                    <img src={images?.middle_banner2} alt="vegetables" className="" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : ("")
                                }

                                <div className="col-xxl-8 order-1 order-xxl-2">
                                    <div className="row g-3">
                                        {
                                            templates && templates.map((ele) => {
                                                const isFutureDate = new Date(ele.start_date) > new Date(); // Check if the start_date is in the future

                                                return (
                                                    <div
                                                        key={ele.temp_id} // Add a unique key for each element
                                                        className={`col-md-4 timing-box d-flex align-items-center justify-content-center justify-content-sm-between rounded-3 flex-wrap gap-3 ${isFutureDate ? 'disabled' : ''}`} // Add a class if disabled
                                                        onClick={!isFutureDate ? () => handleNavigate(ele.temp_id, ele.category.value) : null} // Disable click if start_date is in the future
                                                        style={{ pointerEvents: isFutureDate ? 'none' : 'auto', opacity: isFutureDate ? 0.5 : 1 }} // Adjust styles for disabled state
                                                    >
                                                        <img src={ele.temp_url} alt="product" className="img-fluid" style={{ height: "100px" }} />
                                                        <h4 className="mb-0">{ele.caption}</h4>
                                                        <CountdownItem startDate={ele.start_date} endDate={ele.end_date} />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>

                                    {
                                        settings && settings.deals_products ? (
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
                                                                                    <span className="rounded-btn1" style={{ cursor: 'pointer', color: "#6eb356" }} onClick={() => handleAddWhish(false, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteIcon /></span>

                                                                                ) : (
                                                                                    <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleAddWhish(true, ele.productId, ele.name, ele.description, ele.weight[0].price, ele.thumbnailimage, ele.weight[0].stock, ele.ratings, ele.numOfReviews, ele.weight[0].weight)}><FavoriteBorderIcon /></span>
                                                                                )
                                                                            }
                                                                            <span className="rounded-btn" style={{ cursor: 'pointer' }} onClick={() => handleModalOpen(ele)}><VisibilityOutlinedIcon /></span>

                                                                        </div>
                                                                    </div>

                                                                    <div className="card-content mt-4 mt-sm-0">
                                                                        <span class="offer-badge text-white fw-bold fs-xxs bg-danger start-0 top-0">{ele.discount}% OFF</span>
                                                                        <div className="d-flex align-items-center flex-nowrap star-rating">

                                                                            <ul className="d-flex align-items-center me-2">

                                                                                <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                                            </ul>

                                                                            <span className="flex-shrink-0">({ele.numOfReviews} Reviews)</span>
                                                                        </div>
                                                                        <Link to={`/details/${ele.productId}/${ele.category}`}> <span className="fw-bold text-heading title d-block">{ele.name}</span> </Link>
                                                                        <div className="pricing mt-2">
                                                                            {/* <span className="fw-bold h4 deleted me-1">₹ {ele.price}</span> */}
                                                                            <span className="fw-bold h4 text-danger">₹ {ele?.weight[0]?.price}</span>
                                                                        </div>
                                                                        <span onClick={() => handleCheckout(ele)} style={{ cursor: "pointer" }} className="fs-xs fw-bold mt-3 d-inline-block explore-btn">Shop Now<span className="ms-1"><ArrowForwardIcon /></span></span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))
                                                    }



                                                </div>
                                            </div>

                                        ) : ("")
                                    }

                                </div>
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

export default BestDeals