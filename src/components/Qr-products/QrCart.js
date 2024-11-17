import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { cleanCartItems, removeCartItem } from '../../redux/actions/productAction';
import { useAlert } from 'react-alert'
import axios from 'axios'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const QrCart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const type = localStorage.getItem("type")

    const cartData = useSelector((state) => state.qrProducts.carts)
    const totalPrice = cartData.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [err, setErr] = useState(false)
    const [errMess, setErrMess] = useState("")
    const [sgst, setSgst] = useState(0)
    const [cgst, setCgst] = useState(0)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [productData, setProductData] = useState([])
    const [tokenId, setTokenId] = useState("")
    const [err1, setErr1] = useState(false)

    const handleRemove = (productId, weight) => {
        dispatch(removeCartItem(productId, weight));  // Dispatch the remove action
        alert.success("Product remove from cart")
    };
    const homePage = () => {
        navigate("/results")
    }


    const handleClose = () => {
        setOpen(false);
        setTokenId('')

    };
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
            if (!name || !phone) {
                setErr1(true)
                return
            }

            if (phone.length < 10) {
                setErr(true)
                setErrMess("Number must be at least 10 digit")
                return
            }

            if (err) {
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

            const result = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/v1/orders/manualorder?type=${type}`, json, config)
            if (result.status === 201) {
                alert.success("Request Sent")
                setTokenId(result.data.token)
                setOpen(true)
                dispatch(cleanCartItems([]))
            } else {
                alert.error("Oops..Something Went Wrong")

            }


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
            purchaseprice:Number(ele.purchaseprice),
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
                <section className="containerwishlist-section ptb-120">
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
                                        <div class="row g-4">
                                            <div className="col-xl-7"></div>
                                            <div className="col-xl-5">
                                                <div className="cart-summery bg-white rounded-2 pt-4 pb-6 px-5 mt-4">
                                                    <table className="w-100">

                                                        <tr className="border-top">
                                                            <td className="py-3">
                                                                <h5 className="mb-0">Total</h5>
                                                            </td>
                                                            <td className="text-end py-3">
                                                                <h5 className="mb-0">₹ {totalPrice}</h5>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <p className="mb-5 mt-2">Add Details</p>
                                                    <input type="text" class="form-control" placeholder="* Your Name" aria-label="Your Name" aria-describedby="basic-addon1" value={name} onChange={(e) => handleNameChange(e.target.value)} />
                                                    <input type="text" class="form-control" placeholder="* Mobile Number" aria-label="Mobile Number" aria-describedby="basic-addon1" value={phone} onChange={(e) => handlePhone(e.target.value)} />
                                                    {
                                                        err ? (
                                                            <p style={{ color: "red" }}>* {errMess}</p>
                                                        ) : ("")
                                                    }
                                                    {
                                                        err1 ? (
                                                            <p style={{ color: "red" }}>* Fill the mandatory fields</p>
                                                        ) : ("")
                                                    }
                                                    <div className="btns-group d-flex gap-3 mt-5">
                                                        <button type="submit" className="btn btn-primary btn-md rounded-1" onClick={handleOrder}>Confirm Order</button>

                                                    </div>
                                                </div>
                                            </div>

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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="">
                    <CheckCircleOutlineIcon style={{ color: "green" }} /> You successfully order the items
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <div className="row">
                            <div className="col">
                                <h3> This is your Tokenid : {tokenId} & get your product from the nearest shop.</h3>
                                <h3>
                                    Creamyaffairs ,
                                    Location - Baidyabati ,
                                    Phone Number - +91 9836241497
                                
                                </h3>
                                <h5> <PriorityHighIcon style={{color: "#ff2600"}}/>Make sure , dont forget your tokenid</h5>

                            </div>
                           
                        </div>
                        <div className="row">
                            <div className="col">
                            </div>
                        </div>

                    </DialogContentText>
           
                        Thank You
                  
                </DialogContent>
             
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default QrCart
