import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {Link} from 'react-router-dom'

const Contents = () => {

    const [data, setData] = useState([])
    const products = useSelector((state) => state.productDetails.products.bestSellingData)

    console.log("datadatadata", data)



    return (
        <>


            <div className="sidebar-widget products-widget py-5 px-4 bg-white border-top" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }} >
                <div className="widget-title d-flex">
                    <h6 className="mb-0 flex-shrink-0">Best Selling</h6>
                    <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                </div>
                <div className="sidebar-products-list">
                    {
                        products && products?.length === 0 ? ("") :
                            (
                                <>
                                    {
                                        products?.map((ele) => (
                                            <div className="horizontal-product-card d-sm-flex align-items-center bg-white rounded-2 mt-4 gap-3 card-md">
                                                <div className="thumbnail position-relative rounded-2">
                                                    <img src={ele.thumbnailimage} alt="product" className="img-fluid" />
                                                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                        <Link to={`/details/${ele.productId}/${ele.category}`} className="rounded-btn"><VisibilityOutlinedIcon/></Link>
                                                    </div>
                                                </div>
                                                <div className="card-content mt-3 mt-sm-0">
                                                    <span className="d-block fs-sm fw-bold text-heading title d-block">{ele.name}</span>
                                                    <div className="pricing mt-0">
                                                         <span className="fw-bold fs-xxs text-danger">  ₹ {ele?.weight[0]?.price}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center flex-nowrap star-rating mt-1">
                                                        <ul className="d-flex align-items-center me-2">
                                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </>
                            )
                    }


                </div>
            </div>
        </>
    )
}

export default Contents
