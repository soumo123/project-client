import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { noteRefs } from '../../../redux/actions/userAction'
import addToCart from '../../../utils/addToCart';
import { useAlert } from 'react-alert'
import { LineWeight } from '@mui/icons-material';

const Whishlist = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [whishlistData, setWhishListData] = useState([])
    const userId = localStorage.getItem("userId");
    const type = localStorage.getItem("type")
    const dataRefe = useSelector((state) => state.noteRef.arr);
    const [loader, setloader] = useState(false);

    const getWhishListProducts = async () => {

        try {
            const result = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/get_whishlist?userId=${userId}&type=${Number(type)}`)
            if (result.status === 200) {
                setloader(true)
                setWhishListData(result.data.data)

            }
        } catch (error) {
            setloader(true)
            setWhishListData([])
            console.log(error)
        }

    }

    const handleRemove = async (status, productId) => {

        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }
            const response = await axios.put(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/product/add_whishlist?status=${status}&userId=${userId}&type=${Number(type)}&productId=${productId}`, config)
            if (response.status === 200) {
                alert.success("Product remove to whsihlist");
                dispatch(noteRefs(new Date().getSeconds()))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCart = async (id, data) => {
        try {

            let json = {
                name: data.name,
                description: data.description,
                price: data.price,
                stock:data.stock,
                weight:data.weight,
                itemCount: 1,
                // discount: data.discount,
                thumbImage: data.thumbnailimage,
                totalPrice: data.price
            }
            console.log("jsonjsonjson",json)

            // const response = await addToCart(id, json)

            // if (response) {
            //     alert.success("Product added in cart")
            //     dispatch(noteRefs(new Date().getSeconds()))

            // } else {
            //     alert.error("Product alreday in cart")

            // }

        } catch (error) {
            alert.error("Product not added in cart")

        }
    }


    useEffect(() => {
        getWhishListProducts()
    }, [dataRefe])



    return (
        <>

            <div className="main-wrapper">
                <div className="gstore-breadcrumb position-relative z-1 overflow-hidden mt--50">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-content">
                                    <h2 className="mb-2 text-center">Wishlist Page</h2>
                                    <nav>
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item fw-bold" aria-current="page"><a href="index-2.html">Home</a></li>
                                            <li className="breadcrumb-item fw-bold" aria-current="page">Page</li>
                                            <li className="breadcrumb-item fw-bold" aria-current="page">Wishlist Page</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="wishlist-section ptb-120">
                    {
                        !loader ?
                            (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="text-center">
                                                loading....
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {
                                        whishlistData && whishlistData.length > 0 ? (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="wishlist-table bg-white">
                                                            <table className="w-100">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="text-center">Image</th>
                                                                        <th className="text-center">Product Name</th>
                                                                        <th className="text-center">Stock Status</th>
                                                                        <th className="text-center">Unit Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        whishlistData && whishlistData.map((ele) => (
                                                                            <tr>
                                                                                <td className="text-center thumbnail">
                                                                                    <img src={ele.thumbnailimage} alt="product-thumb" className="img-fluid" />
                                                                                </td>
                                                                                <td>

                                                                                    <h6 className="mb-1 mt-1">{ele.name}</h6>
                                                                                    <div className="star-rating">
                                                                                        <ul className="rating-fields fs-xs text-warning d-inline-flex align-items-center">
                                                                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                                                        </ul>
                                                                                        <span className="fs-xs">({ele.numOfReviews} Reviews)</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    <span className={`stock-btn text-dark fw-bold fs-xxs d-inline-block rounded-pill`}>{ele.stock > 0 ? "In Stock" : "Out of stock"}</span>
                                                                                </td>
                                                                               
                                                                                <td className="text-end">
                                                                                    <span className="price fw-bold text-dark">₹ {ele.price}</span>
                                                                                    <span className="btn btn-secondary btn-sm ms-5 rounded-1" onClick={() => handleCart(ele.productId, ele)}>Add to Cart</span>
                                                                                    <span style={{ cursor: "pointer" }} className="close-btn ms-3" onClick={() => handleRemove(false, ele.productId)}><CloseIcon /></span>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="text-center">
                                                            No Whishlist Product Found
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )

                    }

                </section>
            </div>

        </>
    )
}

export default Whishlist