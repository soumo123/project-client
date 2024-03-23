import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '@mui/material/Rating';


const Contents = () => {

    const [data, setData] = useState([])

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/getAllProducts?limit=${10}&offset=${0}&type=1&key=${""}&tags=${""}&startprice=${0}&lastprice=${10000}&isBestSelling=${true}&isFeatured=${false}&isTopSelling=${true}&isBranded=${false}`)
            if (response.status === 200) {
                setData(response.data.data)
            }
        } catch (error) {
            setData([])
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    console.log("datadatadata", data)



    return (
        <>


            <div className="sidebar-widget products-widget py-5 px-4 bg-white border-top">
                <div className="widget-title d-flex">
                    <h6 className="mb-0 flex-shrink-0">Best Selling</h6>
                    <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                </div>
                <div className="sidebar-products-list">
                    {
                        data && data.length === 0 ? ("") :
                            (
                                <>
                                    {
                                        data.map((ele) => (
                                            <div className="horizontal-product-card d-sm-flex align-items-center bg-white rounded-2 mt-4 gap-3 card-md">
                                                <div className="thumbnail position-relative rounded-2">
                                                    <a href="#"><img src={ele.thumbnailimage} alt="product" className="img-fluid" /></a>
                                                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                                                        <a href="product-details.html" className="rounded-btn"><i className="fa-solid fa-eye"></i></a>
                                                    </div>
                                                </div>
                                                <div className="card-content mt-3 mt-sm-0">
                                                    <a href="#" className="d-block fs-sm fw-bold text-heading title d-block">{ele.name}</a>
                                                    <div className="pricing mt-0">
                                                        <span className="fw-bold fs-xxs text-danger"> ₹ {ele.actualpricebydiscount}</span>
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