import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { cleanCartItems, removeCartItem } from '../../redux/actions/productAction';
import { useAlert } from 'react-alert'
import axios from 'axios'
import { SolarPower } from '@mui/icons-material';

const QrCart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const type = localStorage.getItem("type")

    const cartData = useSelector((state) => state.qrProducts.carts)
    const totalPrice = cartData.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [err, setErr] = useState(false)
    const [errMess, setErrMess] = useState("")
    const [sgst, setSgst] = useState(0)
    const [cgst, setCgst] = useState(0)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [productData, setProductData] = useState([])

    const [err1, setErr1] = useState(false)

    const handleRemove = (productId, weight) => {
        dispatch(removeCartItem(productId, weight));  // Dispatch the remove action
        alert.success("Product remove from cart")
    };
    const homePage = () => {
        navigate("/results")
    }

    const handlePhone = (e) => {
        setErr(false)
        setErrMess("")
        let num = e.replace(/\D/g, '')
        if (num.length > 10) {
            setErr(true)
            setErrMess("Number Should be 10 digit")
        }
        setPhone(num)
        setErr1(false)

    }

    const handleNameChange = (e) => {
        setName(e)
        setErr1(false)
    }


    const getTax = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/get_tax`);
            if (response.status === 200) {
                setSgst(response.data.data.sgst)
                setCgst(response.data.data.cgst)
                setValue1(response.data.data.sgstvalue)
                setValue2(response.data.data.cgstvalue)
            }

        } catch (error) {
            console.log(error)
            setSgst(0)
            setCgst(0)
            setValue1(0)
            setValue2(0)
        }


    }

    const handleOrder = async (e) => {
        e.preventDefault()
        try {
            console.log("err || err1err || err1", err, err1)
            if (!name || !phone) {
                setErr1(true)
                return
            }

            if(phone.length<10){
                setErr(true)
                setErrMess("Number must be at least 10 digit")
                return
            }

            if(err){
               return 
            }
            let json = {
                products: productData,
                phone: phone,
                username: name,
                orderedPrice: totalPrice,

            }
            console.log("json==data", json)
            const config = {
                headers: {
                    'Content-Type': "application/json",
                },
                withCredentials: true
            }

            // const result = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/manualorder?type=${type}`, json, config)
            // if(result.status===201){
            //     alert.success("Request Sent")
            //     dispatch(cleanCartItems([]))
            // }else{
            //     alert.error("Oops..Something Went Wrong")

            // }


        } catch (error) {
            console.log(error.stack)
        }

    }




    useEffect(() => {

        const updatedProductData = cartData && cartData.map((ele) => ({
            productId: ele._id,
            name: ele.name,
            description: ele.description,
            color: "",
            thumbImage: ele.image,
            weight: ele.weight,
            price: ele.price,
            itemCount: ele.quantity,
            totalPrice: ele.price * ele.quantity,
            stock: ele.stock,
            unit: ele.unit,
        }));
        setProductData(updatedProductData)
    }, [cartData])


    return (
        <>

            <div className="main-wrapper">
                <div className="gstore-breadcrumb position-relative z-1 overflow-hidden mt--50">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-content">
                                    <h2 className="mb-2 text-center">Cart Products</h2>
                                    <div className="mb-2 text-center">

                                        <button type="button" className="btn btn-primary justify-content-center" onClick={homePage}>Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="wishlist-section ptb-120">

                    {
                        cartData && cartData.length > 0 ? (
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="wishlist-table bg-white">
                                            <table className="w-100">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">Image</th>
                                                        <th className="text-center">Product Name</th>
                                                        <th className="text-center">Quantity</th>
                                                        <th className="text-center">Unit Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartData && cartData.map((ele) => (
                                                            <tr>
                                                                <td className="text-center thumbnail">
                                                                    <img src={ele.image} alt="product-thumb" className="img-fluid" />
                                                                </td>
                                                                <td>

                                                                    <h6 className="mb-1 mt-1">{ele.name}</h6>
                                                                    <div className="star-rating">
                                                                        <ul className="rating-fields fs-xs text-warning d-inline-flex align-items-center">
                                                                            <Rating name="size-small" defaultValue={ele.ratings} precision={0.5} readOnly size="small" />

                                                                        </ul>
                                                                        {/* <span className="fs-xs">({ele.numOfReviews} Reviews)</span> */}
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span className={`stock-btn text-dark fw-bold fs-xxs d-inline-block rounded-pill`}>{ele.quantity} Items</span>
                                                                </td>

                                                                <td className="text-end">
                                                                    <span className="price fw-bold text-dark">₹ {ele.price}</span>
                                                                    <span style={{ cursor: "pointer" }} className="close-btn ms-3" onClick={() => handleRemove(ele._id, ele.weight)}><CloseIcon /></span>
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
                                            No  Product Found
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </section>

            </div>
            {
                totalPrice === 0 ? ("") : (
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div className="text-center">
                                    Total Price :₹ {totalPrice}
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="row">
                                    <div class="col">
                                        <label for="inputEmail4" class="form-label">* Name</label>
                                        <input type="text" class="form-control" placeholder="Your Name" aria-label="Your Name" aria-describedby="basic-addon1" value={name} onChange={(e) => handleNameChange(e.target.value)} />
                                    </div>
                                    <div class="col">
                                        <label for="inputEmail4" class="form-label">* Phone Number</label>
                                        <input type="text" class="form-control" placeholder="Mobile Number" aria-label="Mobile Number" aria-describedby="basic-addon1" value={phone} onChange={(e) => handlePhone(e.target.value)} />
                                        {
                                            err ? (
                                                <p style={{ color: "red" }}>* {errMess}</p>
                                            ) : ("")
                                        }
                                    </div>
                                </div>
                                {
                                    err1 ? (
                                        <p style={{ color: "red" }}>* Fill the mandatory fields</p>
                                    ) : ("")
                                }
                                <button type="button" class="btn btn-primary" onClick={handleOrder}>Order</button>

                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default QrCart